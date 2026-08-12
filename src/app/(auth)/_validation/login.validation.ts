import z from "zod";

export const loginValidationSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password must be at least 8 characters long"),
});
