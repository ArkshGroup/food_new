"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Decimal } from "decimal.js";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import {
  CreateProductDTO,
  createProductValidationSchema,
  productImageValidationSchema,
  updateProductValidationSchema,
} from "../../_validation/products.validation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  BanknoteIcon,
  BoxesIcon,
  BoxIcon,
  BrushIcon,
  CoinsIcon,
  CrownIcon,
  EyeIcon,
  PercentIcon,
  RulerIcon,
  SirenIcon,
  TagIcon,
  WeightIcon,
  ZapIcon,
} from "lucide-react";
import RichTextEditor from "@/components/global/rich-text-editor/editor";
import { UNIT } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ImageUploadContainer } from "./image-upload-container";
import { useAction } from "next-safe-action/hooks";

import z from "zod";
import { IGetProductById } from "../../types/products";
import {
  createProductMutation,
  updateProductMutation,
} from "@/app/(admin)/_mutation/products.mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { adminNavigationPath } from "../../_config/admin.config";
import Image from "next/image";
import VideoUploadContainer from "./video-upload-container";
import { uploadImageFile } from "@/lib/handle-upload";
import { isFileLike } from "@/lib/file-utils";

interface IProductFormProps {
  categories?: { id: number; name: string }[];
  brands?: {
    id: number;
    name: string;
    subBrands: { id: number; name: string; position: number }[];
  }[];
  banners?: { id: number; name: string; image: string }[];
  initialData?: IGetProductById;
}

const ProductForm = ({
  initialData,
  categories,
  banners,
  brands,
}: IProductFormProps) => {
  // #region react state
  const router = useRouter();
  // #endregion

  // #region Form State
  const form = useForm<CreateProductDTO>({
    resolver: zodResolver(createProductValidationSchema),
    defaultValues: {
      name: initialData?.name || "",
      categoryId: initialData?.categoryId || undefined,
      bannerId: initialData?.bannerId || undefined,
      subBrandId: initialData?.subBrandId || undefined,
      brandId: initialData?.brandId || undefined,
      description: initialData?.description || "",
      onSale: initialData?.onSale || false,
      isNewProduct: initialData?.isNewProduct || false,
      isFeatured: initialData?.isFeatured || false,
      isWholeSale: initialData?.isWholeSale || false,
      isVisible: initialData?.isVisible || true,
      isFlashSale: initialData?.isFlashSale || false,
      unitSellingPrice: initialData?.unitSellingPrice || 0,
      specialPrice: initialData?.specialPrice || 0,
      stockQuantity: initialData?.stockQuantity || 0,
      approxWeight: initialData?.approxWeight || 0,
      unit: initialData?.unit || "pcs",
      metaTitle: initialData?.metaTitle || "",
      metaDescription: initialData?.metaDescription || "",
      metaKeywords: initialData?.metaKeywords || "",
      videoUrl: initialData?.videoUrl || "",
      productPosition: initialData?.productPosition || 0,
    },
  });

  const [productImages, setProductImages] = React.useState<
    Array<z.infer<typeof productImageValidationSchema>>
  >(
    (initialData?.images ?? []).map((img, idx) => ({
      sortOrder: img.sortOrder ?? idx,
      id: img.id!,
      file: img.imageUrl!,
      isImageRemoved: false,
    }))
  );
  const [isUploadingImages, setIsUploadingImages] = React.useState(false);

  // #endregion

  //#region Calculation
  const unitSellingPrice = form.getValues("unitSellingPrice");
  const specialPrice = form.getValues("specialPrice");

  form.watch(["unitSellingPrice", "specialPrice", "unit"]);
  // Calculate discount rate as percentage
  const discountRate =
    unitSellingPrice && specialPrice && unitSellingPrice > 0
      ? new Decimal(unitSellingPrice)
          .minus(specialPrice)
          .div(unitSellingPrice)
          .mul(100)
          .toDecimalPlaces(2)
          .toNumber()
      : 0;
  //#endregion

  // #region Submit Handler
  const { execute, isPending: isCreating } = useAction(createProductMutation, {
    onSuccess: (res) => {
      if (!res.data.success) {
        toast.error(res.data.message || "Something went wrong");
      } else {
        toast.success(res.data.message || "Product created successfully");
        router.push(adminNavigationPath.products.path);
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.error.serverError?.message || "Something went wrong");
    },
  });

  const { execute: excUpdate, isPending: isUpdating } = useAction(
    updateProductMutation,
    {
      onSuccess: (res) => {
        if (!res.data.success) {
          toast.error(res.data.message || "Something went wrong");
        } else {
          toast.success(res.data.message || "Product updated successfully");
          router.push(adminNavigationPath.products.path);
        }
      },
      onError: (err) => {
        const validationMessage = err.error.validationErrors
          ? "Please check the product images and form fields."
          : null;
        toast.error(
          validationMessage ||
            err.error.serverError?.message ||
            "Something went wrong"
        );
      },
    }
  );

  const uploadProductImages = async (
    images: Array<z.infer<typeof productImageValidationSchema>>
  ) => {
    return Promise.all(
      images.map(async (image) => {
        if (image.isImageRemoved || !image.file || typeof image.file === "string") {
          return image;
        }

        if (!isFileLike(image.file)) {
          throw new Error("One or more selected images are invalid.");
        }

        if (image.file.size > 5 * 1024 * 1024) {
          throw new Error("Each image must be 5 MB or smaller.");
        }

        const uploadedImage = await uploadImageFile(image.file);

        return {
          ...image,
          file: uploadedImage.url,
        };
      })
    );
  };

  const onSubmit = async (data: CreateProductDTO) => {
    setIsUploadingImages(true);

    try {
      const uploadedProductImages = await uploadProductImages(productImages);

      if (initialData) {
        const parsedData: z.infer<typeof updateProductValidationSchema> = {
          ...data,
          id: initialData.id,
          categoryId: data.categoryId!,
          brandId: data.brandId!,
          subBrandId: data.subBrandId!,
        };

        excUpdate({
          ...parsedData,
          productImages: uploadedProductImages,
        });
        return;
      }

      execute({
        ...data,
        productImages: uploadedProductImages,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload product images"
      );
    } finally {
      setIsUploadingImages(false);
    }
  };
  // #endregion

  const watchBrandIdChange = form.watch("brandId");

  return (
    <div>
      <Form {...form}>
        <form className="py-12" onSubmit={form.handleSubmit(onSubmit)}>
          {/* ////////////////////////////////////////////////////////////////////////
  
         PRODUCT BASIC INFO

          ///////////////////////////////////////////////////////////////////////// 
          */}
          <Card className=" shadow-none  border-none">
            <CardContent className=" flex flex-col gap-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <BoxIcon /> Product Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is public product display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {" "}
                      <TagIcon />
                      Brand
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={
                          field.value !== undefined
                            ? String(field.value)
                            : undefined
                        }
                      >
                        <SelectTrigger className=" w-full">
                          <SelectValue placeholder="Select Brands" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Brands</SelectLabel>
                            {brands?.map((brand) => (
                              <SelectItem
                                key={brand.id}
                                value={String(brand.id)}
                              >
                                {brand.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      This is the brand under which the product will be listed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subBrandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <TagIcon />
                      Sub Brand
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={
                          field.value !== undefined
                            ? String(field.value)
                            : undefined
                        }
                      >
                        <SelectTrigger className=" w-full">
                          <SelectValue placeholder="Select Sub Brands" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Sub Brands</SelectLabel>
                            {brands
                              ?.find(
                                (brand) =>
                                  brand.id === form.getValues("brandId")
                              )
                              ?.subBrands?.map((subBrand) => (
                                <SelectItem
                                  key={subBrand.id}
                                  value={String(subBrand.id)}
                                >
                                  {subBrand.name}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      This is the sub brand under which the product will be
                      listed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productPosition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {" "}
                      <TagIcon />
                      Product Position
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the position of the product in the list.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {" "}
                      <TagIcon />
                      Category
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={
                          field.value !== undefined
                            ? String(field.value)
                            : undefined
                        }
                      >
                        <SelectTrigger className=" w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {categories?.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={String(category.id)}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      This is the category under which the product will be
                      listed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bannerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <BrushIcon />
                      Banner
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={
                          field.value !== undefined
                            ? String(field.value)
                            : undefined
                        }
                      >
                        <SelectTrigger className=" w-full">
                          <SelectValue placeholder="Select Banner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="0">No Banner</SelectItem>
                            {banners?.map((banner) => (
                              <SelectItem
                                key={banner.id}
                                value={String(banner.id)}
                              >
                                <Image
                                  width={30}
                                  height={30}
                                  src={banner.image}
                                  alt="banner image"
                                />
                                {banner.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      This is the category under which the product will be
                      listed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" flex justify-start gap-x-4 flex-wrap gap-y-6">
                <FormField
                  control={form.control}
                  name="isFlashSale"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start  border p-2 space-x-3 space-y-0">
                      <ZapIcon />
                      <FormLabel className="text-sm font-normal">
                        On Flash Sale
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="onSale"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start border p-2   space-x-3 space-y-0">
                      <ZapIcon />
                      <FormLabel className="text-sm font-normal">
                        On Sale
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isNewProduct"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start border p-2  space-x-3 space-y-0">
                      <SirenIcon />
                      <FormLabel className="text-sm font-normal">
                        New Product
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isVisible"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start border p-2  space-x-3 space-y-0">
                      <EyeIcon />
                      <FormLabel className="text-sm font-normal">
                        Product Visible
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start border p-2   space-x-3 space-y-0">
                      <CrownIcon />
                      <FormLabel className="text-sm font-normal">
                        Featured Product
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isWholeSale"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 border p-2   space-y-0">
                      <BoxesIcon />
                      <FormLabel className="text-sm font-normal">
                        Wholesale Product
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          {/* /////////////////////////////////////////////////////////////////////
  
         PRODUCT PRICING ,UNIT ,STOCK 

          ///////////////////////////////////////////////////////////////////////// 
          */}
          <Card className=" shadow-none">
            <CardContent>
              <div className="  grid  grid-cols-3 gap-y-4 gap-x-2">
                <FormField
                  control={form.control}
                  name="unitSellingPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <CoinsIcon />
                        Unit Selling Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        This represent the base price of product without any
                        discount
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specialPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <PercentIcon />
                        Special Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        This represents the discount rate applied to the product
                        price.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <RulerIcon />
                        Unit{" "}
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className=" w-full">
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Units</SelectLabel>
                              {Object.values(UNIT).map((unit) => (
                                <SelectItem key={unit} value={unit}>
                                  {unit}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        This represents the unit of measurement for the product
                        (e.g., kg, liter, piece).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stockQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <BoxIcon />
                        Stock Quantity
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        This represents the no of product available.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="approxWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <WeightIcon />
                        Approx Weight (in grams)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        This represents the approximate weight of the product in
                        grams.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* stats */}
              <div className=" grid grid-cols-4">
                <div className=" py-12 flex flex-col">
                  <span className=" text-sm flex items-center gap-x-2">
                    <BanknoteIcon />
                    Discounted Amount
                  </span>
                  <span>
                    NPR
                    <span className=" font-bold px-1">
                      {new Decimal(unitSellingPrice || 0)
                        .minus(specialPrice || 0)
                        .toNumber()}
                    </span>
                    per {form.getValues("unit")}
                  </span>
                </div>
                <div className=" py-12 flex flex-col">
                  <span className=" text-sm flex items-center gap-x-2">
                    <BanknoteIcon />
                    Discounted percentage
                  </span>
                  <span className=" flex items-center">
                    <PercentIcon />
                    <span className=" font-bold px-1">{discountRate}</span>
                    per {form.getValues("unit")}
                  </span>
                </div>
                <div className=" py-12 flex flex-col">
                  <span className=" text-sm flex items-center gap-x-2">
                    <BanknoteIcon />
                    Final Selling Price
                  </span>
                  <span>
                    NPR {specialPrice} per {form.getValues("unit")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* /////////////////////////////////////////////////////////////////////
  
         PRODUCT DESCRIPTION ,SPECIFICATION AND ORDER DETAILS INFO

          ///////////////////////////////////////////////////////////////////////// 
          */}
          <Card className=" shadow-none border-none ">
            <Tabs defaultValue="description" className="">
              <TabsList>
                <TabsTrigger
                  className=" [state=active]:text-white "
                  value="description"
                >
                  Description
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <RichTextEditor field={field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
          </Card>
          {/* ///////////////OOrder */}

          {/* /////////////////////////////////////////////////////////////////////
  
         SEO META DATA

          ///////////////////////////////////////////////////////////////////////// 
          */}
          <Card className=" shadow-none">
            <CardContent className=" flex flex-col gap-y-8">
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input placeholder="meta title" {...field} />
                    </FormControl>
                    <FormDescription>Min 60 characters.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Input placeholder="meta description" {...field} />
                    </FormControl>
                    <FormDescription>Max 160 characters.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metaKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Keywords (comma separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="meta keywords" {...field} />
                    </FormControl>
                    <FormDescription>Max 10 keywords.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          {/* /////////////////////////////////////////////////////////////////////

          IMAGE UPLOAD
          ///////////////////////////////////////////////////////////////////////////////
          */}
          <ImageUploadContainer
            productImages={productImages}
            setProductImages={setProductImages}
          />
          {/* /////////////////////////////////////////////////////////////////////

          VIDEO UPLOAD
          ///////////////////////////////////////////////////////////////////////////////
          */}

          <VideoUploadContainer form={form} />

          {/* *
          /////////////////////////////////////////////////////////////////////
          Submit handler
          /////////////////////////////////////////////////////////////////////////
          */}
          <Button
            disabled={isCreating || isUpdating || isUploadingImages}
            type="submit"
            className=" w-full mt-4 md:w-1/4"
          >
            {isUploadingImages ? "Uploading images..." : "Save Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
