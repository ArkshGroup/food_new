import { publicActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { IProductGetAll } from "../_types/products";
import { getAllProductsFilterValidation } from "../_validations/get-all-products-filter.validation";
import { encodeRemoteUrlForImage } from "@/lib/encode-remote-url";

export class ProductService {
  getAllProducts = publicActionClient
    .schema(getAllProductsFilterValidation)
    .action(async ({ parsedInput }) => {
      const page = parsedInput.page || 1;
      const limit = parsedInput.limit || 12;
      const skip = (page - 1) * limit;

      const where: Prisma.ProductWhereInput = {
        isVisible: true,
      };

      if (parsedInput.isFlashSale !== undefined) {
        where.isFlashSale = parsedInput.isFlashSale;
      }

      if (parsedInput.newArrivals !== undefined) {
        where.isNewProduct = parsedInput.newArrivals;
      }

      if (parsedInput.onSale !== undefined) {
        where.onSale = parsedInput.onSale;
      }

      if (parsedInput.isFeatured !== undefined) {
        where.isFeatured = parsedInput.isFeatured;
      }

      if (parsedInput.categoryNames && parsedInput.categoryNames.length > 0) {
        const categoryFilters = parsedInput.categoryNames.flatMap((catName) => {
          const stem = catName.trim().replace(/s$/i, "");
          return [
            { name: { equals: catName, mode: "insensitive" as const } },
            { name: { contains: catName, mode: "insensitive" as const } },
            { name: { contains: stem, mode: "insensitive" as const } },
          ];
        });

        where.category = {
          OR: categoryFilters,
        };
      }

      if (parsedInput.brandNames && parsedInput.brandNames.length > 0) {
        where.brand = {
          name: {
            in: parsedInput.brandNames,
            mode: "insensitive",
          },
        };
      }

      if (parsedInput.name && parsedInput.name.trim() !== "") {
        const searchTerm = parsedInput.name.trim();
        where.OR = [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
        ];
      }

      let orderBy: Prisma.ProductOrderByWithRelationInput = {
        createdAt: "desc",
      };

      if (parsedInput.sortBy) {
        const order = parsedInput.sortOrder || "asc";
        if (parsedInput.sortBy === "specialPrice") {
          orderBy = { specialPrice: order };
        } else if (parsedInput.sortBy === "productName") {
          orderBy = { name: order };
        }
      }

      const [totalCount, products] = await Promise.all([
        prisma.product.count({ where }),
        prisma.product.findMany({
          where,
          skip,
          take: limit,
          orderBy,
          include: {
            images: {
              take: 1,
              orderBy: {
                sortOrder: "asc",
              },
            },
            banner: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        }),
      ]);

      const formattedProducts: IProductGetAll[] = products.map((prod) => {
        const imageUrl = prod.images[0]?.imageUrl || prod.banner?.imageUrl || "";
        return {
          id: prod.id,
          name: prod.name,
          slug: prod.slug,
          unitSellingPrice: Number(prod.unitSellingPrice),
          specialPrice: Number(prod.specialPrice),
          stockQuantity: prod.stockQuantity,
          isFlashSale: prod.isFlashSale,
          banner: prod.banner,
          categoryName: prod.category?.name,
          images: {
            id: prod.images[0]?.id || "",
            url: imageUrl,
            alt: prod.name,
          },
        };
      });

      return {
        data: formattedProducts,
        pagination: {
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page,
          limit,
        },
      };
    });

  getProductBySlug = publicActionClient
    .schema(
      z.object({
        slug: z.string().min(1, { message: "Slug is required" }),
      })
    )
    .action(async ({ parsedInput }) => {
      const product = await prisma.product.findFirst({
        where: {
          slug: parsedInput.slug,
          isVisible: true,
        },
        include: {
          images: {
            orderBy: {
              sortOrder: "asc",
            },
          },
          banner: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          brand: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        unitSellingPrice: Number(product.unitSellingPrice),
        specialPrice: Number(product.specialPrice),
        stockQuantity: product.stockQuantity,
        sku: (product as any).sku || "",
        isFlashSale: product.isFlashSale,
        isNewArrival: product.isNewProduct,
        isOnSale: product.onSale,
        isBestSeller: (product as any).isBestSeller || false,
        isFeatured: product.isFeatured,
        categoryId: product.categoryId,
        categoryName: product.category?.name,
        brandId: product.brandId,
        brandName: product.brand?.name,
        banner: product.banner,
        images: product.images.map((img) => ({
          id: img.id,
          url: encodeRemoteUrlForImage(img.imageUrl || ""),
          alt: product.name,
        })),
      };
    });

  getProductsWhichAreOnFlashSale = publicActionClient.action(async () => {
    const products = await prisma.product.findMany({
      where: {
        isFlashSale: true,
        isVisible: true,
      },
      include: {
        images: {
          take: 1,
          orderBy: {
            sortOrder: "asc",
          },
        },
        banner: true,
      },
    });

    const formattedProducts: IProductGetAll[] = products.map((prod) => {
      const imageUrl = prod.images[0]?.imageUrl || prod.banner?.imageUrl || "";
      return {
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        unitSellingPrice: Number(prod.unitSellingPrice),
        specialPrice: Number(prod.specialPrice),
        stockQuantity: prod.stockQuantity,
        isFlashSale: prod.isFlashSale,
        banner: prod.banner,
        images: {
          id: prod.images[0]?.id || "",
          url: imageUrl,
          alt: prod.name,
        },
      };
    });

    return formattedProducts;
  });

  getProductsWhichAreNewArrivals = publicActionClient.action(async () => {
    const products = await prisma.product.findMany({
      where: {
        isNewProduct: true,
        isVisible: true,
      },
      include: {
        images: {
          take: 1,
          orderBy: {
            sortOrder: "asc",
          },
        },
        banner: true,
      },
    });

    const formattedProducts: IProductGetAll[] = products.map((prod) => {
      const imageUrl = prod.images[0]?.imageUrl || prod.banner?.imageUrl || "";
      return {
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        unitSellingPrice: Number(prod.unitSellingPrice),
        specialPrice: Number(prod.specialPrice),
        stockQuantity: prod.stockQuantity,
        isFlashSale: prod.isFlashSale,
        banner: prod.banner,
        images: {
          id: prod.images[0]?.id || "",
          url: imageUrl,
          alt: prod.name,
        },
      };
    });

    return formattedProducts;
  });

  getProductsWhichAreOnSale = publicActionClient.action(async () => {
    const products = await prisma.product.findMany({
      where: {
        onSale: true,
        isVisible: true,
      },
      include: {
        images: {
          take: 1,
          orderBy: {
            sortOrder: "asc",
          },
        },
        banner: true,
      },
    });

    const formattedProducts: IProductGetAll[] = products.map((prod) => {
      const imageUrl = prod.images[0]?.imageUrl || prod.banner?.imageUrl || "";
      return {
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        unitSellingPrice: Number(prod.unitSellingPrice),
        specialPrice: Number(prod.specialPrice),
        stockQuantity: prod.stockQuantity,
        isFlashSale: prod.isFlashSale,
        banner: prod.banner,
        images: {
          id: prod.images[0]?.id || "",
          url: imageUrl,
          alt: prod.name,
        },
      };
    });

    return formattedProducts;
  });

  getSimilarProductsByCategory = publicActionClient
    .schema(
      z.object({
        categoryId: z.union([z.string(), z.number()]),
        currentProductId: z.string(),
      })
    )
    .action(async ({ parsedInput }) => {
      const catId = Number(parsedInput.categoryId);
      const products = await prisma.product.findMany({
        where: {
          categoryId: isNaN(catId) ? undefined : catId,
          id: {
            not: parsedInput.currentProductId,
          },
          isVisible: true,
        },
        take: 4,
        include: {
          images: {
            take: 1,
            orderBy: {
              sortOrder: "asc",
            },
          },
          banner: true,
        },
      });

      const formattedProducts: IProductGetAll[] = products.map((prod) => {
        const imageUrl = prod.images[0]?.imageUrl || prod.banner?.imageUrl || "";
        return {
          id: prod.id,
          name: prod.name,
          slug: prod.slug,
          unitSellingPrice: Number(prod.unitSellingPrice),
          specialPrice: Number(prod.specialPrice),
          stockQuantity: prod.stockQuantity,
          isFlashSale: prod.isFlashSale,
          banner: prod.banner,
          images: {
            id: prod.images[0]?.id || "",
            url: imageUrl,
            alt: prod.name,
          },
        };
      });

      return formattedProducts;
    });

  getAllCategoriesWithCount = publicActionClient.action(async () => {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            product: {
              where: {
                isVisible: true,
              },
            },
          },
        },
      },
    });

    return categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: (cat as any).slug || cat.name.toLowerCase().replace(/\s+/g, "-"),
      productCount: cat._count.product,
    }));
  });

  getAllBrandsWithCount = publicActionClient.action(async () => {
    const brands = await prisma.brand.findMany({
      include: {
        _count: {
          select: {
            product: {
              where: {
                isVisible: true,
              },
            },
          },
        },
      },
    });

    const formattedBrands = await Promise.all(
      brands.map(async (brand) => {
        let firstProductImage = "";

        if (!brand.imageUrl) {
          const firstProduct = await prisma.product.findFirst({
            where: {
              brandId: brand.id,
              isVisible: true,
            },
            include: {
              images: {
                take: 1,
                orderBy: {
                  sortOrder: "asc",
                },
              },
            },
          });

          firstProductImage = firstProduct?.images[0]?.imageUrl || "";
        }

        const bannerImageUrl = brand.imageUrl || firstProductImage;

        return {
          id: brand.id,
          name: brand.name,
          slug: (brand as any).slug || brand.name.toLowerCase().replace(/\s+/g, "-"),
          imageUrl: encodeRemoteUrlForImage(bannerImageUrl),
          productCount: brand._count.product,
        };
      })
    );

    return formattedBrands;
  });

  getFourLatestProductsPerCategory = publicActionClient.action(async () => {
    const products = await prisma.product.findMany({
      where: {
        isVisible: true,
      },
      take: 24,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        images: {
          take: 1,
          orderBy: {
            sortOrder: "asc",
          },
        },
        banner: true,
      },
    });

    const formattedProducts: IProductGetAll[] = products.map((prod) => {
      const imageUrl = prod.images[0]?.imageUrl || prod.banner?.imageUrl || "";
      return {
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        unitSellingPrice: Number(prod.unitSellingPrice),
        specialPrice: Number(prod.specialPrice),
        stockQuantity: prod.stockQuantity,
        isFlashSale: prod.isFlashSale,
        banner: prod.banner,
        images: {
          id: prod.images[0]?.id || "",
          url: imageUrl,
          alt: prod.name,
        },
      };
    });

    return formattedProducts;
  });

  getTwoLatestProductsPerCategory = publicActionClient.action(async () => {
    const products = await prisma.product.findMany({
      where: {
        isVisible: true,
      },
      take: 24,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        images: {
          take: 1,
          orderBy: {
            sortOrder: "asc",
          },
        },
        banner: true,
      },
    });

    const formattedProducts: IProductGetAll[] = products.map((prod) => {
      const imageUrl = prod.images[0]?.imageUrl || prod.banner?.imageUrl || "";
      return {
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        unitSellingPrice: Number(prod.unitSellingPrice),
        specialPrice: Number(prod.specialPrice),
        stockQuantity: prod.stockQuantity,
        isFlashSale: prod.isFlashSale,
        banner: prod.banner,
        images: {
          id: prod.images[0]?.id || "",
          url: imageUrl,
          alt: prod.name,
        },
      };
    });

    return formattedProducts;
  });
}
