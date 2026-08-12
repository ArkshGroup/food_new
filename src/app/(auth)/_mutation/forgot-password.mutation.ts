"use server";
import { baseActionClient } from "@/lib/next-safe-action";
import { forgotPasswordValidationSchema } from "../_validation/forgot-password.validation";
import prisma from "@/lib/db";
import { sendEmail } from "@/lib/nodemailer";
import ResetPasswordEmail from "@/emails/auth/reset-password";

export const forgotPasswordMutation = baseActionClient
  .inputSchema(forgotPasswordValidationSchema)
  .action(async ({ parsedInput }) => {
    const { email } = parsedInput;

    const doesEmailExist = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!doesEmailExist) {
      return {
        message: "Email does not exist, Please register",
        success: false,
        data: null,
      };
    }

    const doesExistingPasswordResetRequest =
      await prisma.resetPassword.findFirst({
        where: {
          userId: doesEmailExist.id,
          expiresAt: {
            gt: new Date(),
          },
        },
      });
    if (doesExistingPasswordResetRequest) {
      return {
        message:
          "A password reset request already exists. Please check your email.",
        success: false,
        data: null,
      };
    }
    const createdPasswordResetRequest = await prisma.resetPassword.create({
      data: {
        userId: doesEmailExist.id,
        token: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    await sendEmail({
      to: email,
      subject: "Reset your password",
      reactComponent: ResetPasswordEmail({
        resetUrl: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${createdPasswordResetRequest.token}&userId=${createdPasswordResetRequest.userId}`,
      }),
    });

    return {
      message: "Password reset email sent successfully",
      success: true,
      data: null,
    };
  });
