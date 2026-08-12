"use server";
import { baseActionClient } from "@/lib/next-safe-action";
import { registerValidationSchema } from "../_validation/register.validation";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export const handleRegisterMutation = baseActionClient
  .inputSchema(registerValidationSchema)
  .action(async ({ parsedInput }) => {
    const {
      email,
      password,
      userName,
      country,
      zipCode,
      termsAndConditionsAccepted,
      address,
      phoneNumber,
    } = parsedInput;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (existingUser) {
      return {
        message: "User already exists, Please use a different email",
        success: false,
        data: null,
      };
    }

    const registeredUser = await prisma.user.create({
      data: {
        password: hashedPassword,
        email: email.toLowerCase(),
        userName: userName.toLowerCase(),
        country: country.toLowerCase(),
        zipCode: zipCode,
        phoneNumber: phoneNumber,
        address: address,
        termsAndConditionsAccepted: termsAndConditionsAccepted,
      },
    });

    return {
      message: "Registration successful",
      data: registeredUser,
      success: true,
    };
  });
