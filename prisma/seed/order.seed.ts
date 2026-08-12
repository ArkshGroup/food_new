import {
  PrismaClient,
  ORDER_STATUS,
  SALES_CHANNEL,
  PAYMENT_STATUS,
  Prisma,
  PAYMENT_METHOD,
} from "@prisma/client";
import { faker } from "@faker-js/faker";
import { Decimal } from "decimal.js";
import pLimit from "p-limit";

export const seedOrders = async ({
  prisma,
  count,
}: {
  prisma: PrismaClient;
  count: number;
}) => {
  const users = await prisma.user.findMany({ select: { id: true } });
  if (users.length === 0) {
    console.log("⚠️ No users found. Please seed users first.");
    return;
  }

  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      unitSellingPrice: true,
      specialPrice: true,
      approxWeight: true,
      images: {
        select: { imageUrl: true },
        take: 1,
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (products.length === 0) {
    console.log("⚠️ No products found. Please seed products first.");
    return;
  }

  console.log(`🛒 Creating ${count} orders...`);

  const ordersData = Array.from({ length: count }).map(() => {
    const customer = faker.helpers.arrayElement(users);
    const orderProducts = faker.helpers.arrayElements(
      products,
      faker.number.int({ min: 5, max: 20 })
    );

    let orderTotal = new Decimal(0);

    const itemsData = orderProducts.map((product) => {
      const quantity = faker.number.int({ min: 1, max: 5 });
      const unitSellingPrice = new Decimal(product.unitSellingPrice);
      const specialPrice = new Decimal(product.specialPrice);
      const totalPrice = specialPrice.mul(quantity);
      orderTotal = orderTotal.add(totalPrice);

      return {
        productId: product.id,
        productName: product.name,
        productImage: product.images[0]?.imageUrl || "",
        unitSellingPrice: unitSellingPrice.toNumber(),
        specialPrice: specialPrice.toNumber(),
        quantity,
        totalPrice: totalPrice.toNumber(),
        productApproxWeight: product.approxWeight.toNumber(),
      };
    });

    const deliveryCharge = new Decimal(faker.number.int({ min: 20, max: 200 }));
    const discountAmount = new Decimal(
      faker.number.float({ min: 0, max: 50, fractionDigits: 2 })
    );
    const finalTotal = orderTotal.add(deliveryCharge).sub(discountAmount);

    return {
      order: {
        customerId: customer.id,
        salesChannel: faker.helpers.arrayElement([
          SALES_CHANNEL.RETAIL,
          SALES_CHANNEL.WHOLESALE,
        ]),
        orderStatus: faker.helpers.arrayElement([
          ORDER_STATUS.PENDING,
          ORDER_STATUS.DISPATCHED,
          ORDER_STATUS.CANCELLED,
        ]),
        paymentMethod: faker.helpers.arrayElement([
          PAYMENT_METHOD.CASH_ON_DELIVERY,
          PAYMENT_METHOD.ONLINE_PAYMENT,
          PAYMENT_METHOD.DRAFT
        ]),
        paymentStatus: faker.helpers.weightedArrayElement([
          { value: PAYMENT_STATUS.PAID, weight: 0.5 },
          { value: PAYMENT_STATUS.ON_VERIFICATION, weight: 0.2 },
          { value: PAYMENT_STATUS.UNPAID, weight: 0.2 },
          { value: PAYMENT_STATUS.REFUNDED, weight: 0.1 },
        ]),
        createdAt: new Date(2025, 8, faker.number.int({ min: 1, max: 28 })),
        subTotalAmount: orderTotal.toNumber(),
        deliveryCharge: deliveryCharge.toNumber(),
        discountAmount: discountAmount.toNumber(),
        discountCode: faker.helpers.maybe(
          () => faker.string.alphanumeric(8).toUpperCase(),
          { probability: 0.3 }
        ),
        totalAmount: finalTotal.toNumber(),
      },
      items: itemsData,
      shipping: {
        recipientName: faker.person.fullName(),
        email: faker.internet.email(),
        addressLine1: faker.location.streetAddress(),
        city: faker.location.city(),
        phoneNumber: faker.phone.number(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
    };
  });

  const limit = pLimit(5); // only 5 concurrent transactions
  const chunkSize = 50;

  for (let i = 0; i < ordersData.length; i += chunkSize) {
    const chunk = ordersData.slice(i, i + chunkSize);

    await Promise.all(
      chunk.map(({ order, items, shipping }) =>
        limit(async () => {
          try {
            await prisma.$transaction(async (tx) => {
              const createdOrder = await tx.order.create({
                data: { ...order },
              });

              await tx.orderItem.createMany({
                data: items.map((item) => ({
                  ...item,
                  orderId: createdOrder.id,
                })),
              });

              await tx.orderShippingDetails.create({
                data: { ...shipping, orderId: createdOrder.id },
              });
            });
          } catch (err) {
            console.error("❌ Failed to seed one order:", err);
          }
        })
      )
    );

    console.log(`  - Seeded ${i + chunk.length}/${count} orders`);
  }

  console.log(`✅ Seeded ${count} orders successfully`);
};
