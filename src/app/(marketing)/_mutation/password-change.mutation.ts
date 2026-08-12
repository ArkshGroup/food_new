"use server";

import { customerActionClient } from "@/lib/next-safe-action";
import { passwordChangeValidation } from "../_validations/password-change.validation";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export const passwordChangeMutation = customerActionClient
  .inputSchema(passwordChangeValidation)
  .action(async ({ parsedInput, ctx }) => {
    const { id } = ctx.user;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      parsedInput.currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    const hashedNewPassword = await bcrypt.hash(parsedInput.newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedNewPassword,
      },
    });

    return { success: true, message: "Password changed successfully" };
  });
