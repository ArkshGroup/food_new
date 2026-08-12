"use server";

import ContactMail from "@/emails/contact/contact-mail";
import ContactRequestAdminNotification from "@/emails/contact/contact-mail-to-admin";
import prisma from "@/lib/db";
import { publicActionClient } from "@/lib/next-safe-action";
import { sendEmail } from "@/lib/nodemailer";
import z from "zod";

export const createContactMutation = publicActionClient
  .inputSchema(
    z.object({
      name: z.string(),
      email: z.email(),
      subject: z.string(),
      message: z.string(),
    })
  )
  .action(async ({ parsedInput }) => {
    sendEmail({
      to: parsedInput.email,
      subject: "Arksh Food",
      reactComponent: ContactMail({
        name: parsedInput.name,
        email: parsedInput.email,
        subject: parsedInput.subject,
        message: parsedInput.message,
      }),
    }).catch((error) => {
      console.error("Failed to send bulk inquiry email:", error);
    });

    sendEmail({
      to: process.env.INQUIRY_EMAIL || "arkshdigital@gmail.com",
      subject: "Thank You for Your Message!",
      reactComponent: ContactRequestAdminNotification({
        name: parsedInput.name,
        email: parsedInput.email,
        subject: parsedInput.subject,
        message: parsedInput.message,
      }),
    }).catch((error) => {
      console.error("Failed to send bulk inquiry email:", error);
    });

    await prisma.contact.create({
      data: {
        message: parsedInput.message,
        name: parsedInput.name,
        subject: parsedInput.subject,
        email: parsedInput.email,
      },
    });

    return {
      success: true,
      message: "Contact Request Submitted",
    };
  });
