import type { Session } from "@supabase/supabase-js";
import z from "zod";

export const loginSchema = z.object({
	email: z.string().email("Email tidak valid"),
	password: z.string().min(8, "Password harus terdiri dari minimal 8 karakter"),
});

export type LoginRequest = z.infer<typeof loginSchema>;

export type LoginResponse = {
	user: {
		id: string;
		email: string;
		fullName?: string;
	};
	session: Session | null;
};

export const registerSchema = z
	.object({
		email: z.string().email("Email tidak valid"),
		fullName: z.string().min(1, "Nama lengkap harus diisi"),
		password: z
			.string()
			.min(8, "Password harus terdiri dari minimal 8 karakter"),
		confirmPassword: z.string().min(8, "Konfirmasi password harus diisi"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password dan konfirmasi password tidak sesuai",
	});

export type RegisterRequest = z.infer<typeof registerSchema>;

export type RegisterResponse = {
	user: {
		id: string;
		email: string;
		fullName?: string;
	};
	session: Session | null;
};

export const resetPasswordSchema = z.object({
	email: z.string().email("Email tidak valid"),
});

export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;

export type ResetPasswordResponse = {
	message: string;
};
