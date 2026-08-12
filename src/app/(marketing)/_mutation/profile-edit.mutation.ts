"use server";
import { customerActionClient } from "@/lib/next-safe-action";
import { profileEditValidation } from "../_validations/profile-edit-validation";
import prisma from "@/lib/db";

export const editProfileMutation = customerActionClient
  .inputSchema(profileEditValidation)
  .action(async ({ ctx, parsedInput }) => {
    const user = await prisma.user.update({
      where: { id: ctx.user.id },
      data: {
        userName: parsedInput.userName,
        country: parsedInput.country,
        zipCode: parsedInput.zipCode,
        gender: parsedInput.gender?.toLocaleLowerCase(),
        dateOfBirth: new Date(
          `${parsedInput.dobYear}-${parsedInput.dobMonth}-${parsedInput.dobDay}`
        ),
        phoneNumber: parsedInput.phoneNumber,
      },
    });
    return { success: true, message: "Profile updated successfully", user };
  });
