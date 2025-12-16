import { supabase } from "@/utils/supabase";
import type {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
	ResetPasswordRequest,
	ResetPasswordResponse,
} from "./dto";

export const login = async (req: LoginRequest): Promise<LoginResponse> => {
	const { data: authData, error } = await supabase.auth.signInWithPassword({
		email: req.email,
		password: req.password,
	});

	if (error) {
		throw new Error(error.message);
	}

	if (!authData.user) {
		throw new Error("Login gagal");
	}

	return {
		user: {
			id: authData.user.id,
			email: authData.user.email ?? "",
			fullName: authData.user.user_metadata?.full_name as string | undefined,
		},
		session: authData.session,
	};
};

export const register = async (
	req: RegisterRequest,
): Promise<RegisterResponse> => {
	const { data: authData, error } = await supabase.auth.signUp({
		email: req.email,
		password: req.password,
		options: {
			data: {
				full_name: req.fullName,
			},
		},
	});

	if (error) {
		throw new Error(error.message);
	}

	if (!authData.user) {
		throw new Error("Registrasi gagal");
	}

	return {
		user: {
			id: authData.user.id,
			email: authData.user.email ?? "",
			fullName: req.fullName,
		},
		session: authData.session,
	};
};

export const resetPassword = async (
	req: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
	const { error } = await supabase.auth.resetPasswordForEmail(req.email, {
		redirectTo: "suroboyo-bus://reset-password",
	});

	if (error) {
		throw new Error(error.message);
	}

	return {
		message: "Email reset password telah dikirim. Silakan cek email Anda.",
	};
};

export const logout = async (): Promise<void> => {
	const { error } = await supabase.auth.signOut();

	if (error) {
		throw new Error(error.message);
	}
};

export const getCurrentUser = async () => {
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		return null;
	}

	return {
		id: user.id,
		email: user.email ?? "",
		fullName: user.user_metadata?.full_name as string | undefined,
	};
};
