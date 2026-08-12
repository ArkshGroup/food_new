import z from "zod";

export const registerValidationSchema = z
  .object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
    userName: z.string().min(1, "Username is required"),
    country: z.string(),
    phoneNumber: z
      .string()
      .min(10, "Valid phone number is required")
      .regex(/^[0-9]+$/, "Phone number must contain only numbers"),
    address: z.string().min(1, "Address is required"),
    zipCode: z.string().optional(),
    termsAndConditionsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
