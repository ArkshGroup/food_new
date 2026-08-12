import z from "zod";

export const resetPasswordValidationSchema = z
	.object({
		userId: z.string().min(1, "Invalid user ID"),
		token: z.string().min(1, "Token is required"),
		password: z.string().min(8, "Password must be at least 8 characters long"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});
