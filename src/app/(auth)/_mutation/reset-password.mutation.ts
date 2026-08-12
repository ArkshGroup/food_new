"use server";

import { baseActionClient } from "@/lib/next-safe-action";
import { resetPasswordValidationSchema } from "../_validation/reset-password.validation";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export const resetPasswordMutation = baseActionClient
	.inputSchema(resetPasswordValidationSchema)
	.action(async ({ parsedInput }) => {
		const { userId, token, password } = parsedInput;

		const isValidUser = await prisma.user.findUnique({
			where: { id: userId },
		});
		if (!isValidUser) {
			return {
				message: "Invalid user ID",
				success: false,
				data: null,
			};
		}
		const isValidToken = await prisma.resetPassword.findFirst({
			where: {
				userId: userId,
				token: token,
				expiresAt: {
					gt: new Date(),
				},
			},
		});
		if (!isValidToken) {
			return {
				message: "Invalid or expired token",
				success: false,
				data: null,
			};
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await prisma.user.update({
			where: { id: userId },
			data: { password: hashedPassword },
		});

		await prisma.resetPassword.delete({
			where: { id: isValidToken.id },
		});

		return {
			message: "Password reset successfully",
			success: true,
			data: null,
		};
	});
