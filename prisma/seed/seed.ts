import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./user.seed";
import { seedProducts } from "./product.seed";
import { seedOrders } from "./order.seed";
import { seedHeroSliderImage } from "./hero-slider-image.seed";
import { seedBanners } from "./baner.seed";
import { seedCategories } from "./category.seed";
import { seedBrands } from "./brand.seed";

const MAX_ORDER_COUNT = 100;

const prisma = new PrismaClient();

async function main() {
  try {
    await seedUsers({ prisma });
    // await seedHeroSliderImage({ prismaClient: prisma });
    // await seedBanners({ prismaClient: prisma });
    // await seedCategories({ prismaClient: prisma });
    // await seedBrands({ prismaClient: prisma });
    // await seedProducts({ prismaClient: prisma });
    // await seedOrders({ prisma, count: MAX_ORDER_COUNT });
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
