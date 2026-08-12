"use server";
import { customerActionClient } from "@/lib/next-safe-action";
import { bulkOrderInquiryValidation } from "../_validations/bulk-order-inquiry.validation";
import prisma from "@/lib/db";
import { sendEmail } from "@/lib/nodemailer";
import BulkInquiryMail from "@/emails/inquiry/bulk-inquiry.mail";
import BulkInquiryMailForAdmin from "@/emails/inquiry/bulk-inquiry-response.mail";

export const createBulkOrderInquiryMutation = customerActionClient
  .inputSchema(bulkOrderInquiryValidation)
  .action(async ({ parsedInput, ctx }) => {
    const { productId, unit, quantity, notes } = parsedInput;

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: {
          select: { imageUrl: true },
          orderBy: {
            sortOrder: "asc",
          },
          take: 1,
        },
      },
    });

    if (!existingProduct) {
      throw new Error("Product not found");
    }
    const bulkOrderInquiry = await prisma.bulkInquiry.create({
      data: {
        productName: existingProduct.name,
        productId,
        productPrice: existingProduct.unitSellingPrice,
        productQuantity: quantity,
        notes,
        phoneNumber: parsedInput.phoneNumber,
        productUnit: unit,
        userId: ctx.user.id,
      },
    });

    if (!bulkOrderInquiry) {
      throw new Error("Failed to create bulk order inquiry");
    }

    await sendEmail({
      to: ctx.user.email!,
      subject: "Bulk Order Inquiry Received",
      reactComponent: BulkInquiryMail({
        product: {
          ...bulkOrderInquiry,
          productImage: existingProduct.images[0].imageUrl!,
        },
      }),
    }).catch((error) => {
      console.error("Failed to send bulk inquiry email:", error);
    });

    sendEmail({
      to: ["nibwarehouse@arkshgroup.com", "digital.marketing@arkshgroup.com"],
      subject: "Bulk Order Inquiry Received",
      reactComponent: BulkInquiryMailForAdmin({
        product: {
          ...bulkOrderInquiry,
          email: ctx.user.email!,
          phoneNumber: bulkOrderInquiry.phoneNumber || "",
          productImage: existingProduct.images[0].imageUrl ?? "",
        },
      }),
    }).catch((error) => {
      console.error("Failed to send bulk inquiry email:", error);
    });

    return {
      success: true,
      message:
        "Bulk order inquiry created successfully , We will contact you soon",
    };
  });
