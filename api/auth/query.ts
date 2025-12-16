import {
	queryOptions,
	useMutation,
	useQueryClient,
	type UseQueryOptions,
} from "@tanstack/react-query";
import { getCurrentUser, login, logout, register, resetPassword } from ".";
import type {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
	ResetPasswordRequest,
	ResetPasswordResponse,
} from "./dto";

export const currentUserQueryOptions = (
	options?: Omit<
		UseQueryOptions<
			Awaited<ReturnType<typeof getCurrentUser>>,
			Error,
			Awaited<ReturnType<typeof getCurrentUser>>,
			readonly ["auth", "current-user"]
		>,
		"queryKey" | "queryFn"
	>,
) =>
	queryOptions({
		queryKey: ["auth", "current-user"] as const,
		queryFn: () => getCurrentUser(),
		...options,
	});

export const useLogin = () => {
	const queryClient = useQueryClient();

	return useMutation<LoginResponse, Error, LoginRequest>({
		mutationFn: (req) => login(req),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth", "current-user"] });
		},
	});
};

export const useRegister = () => {
	const queryClient = useQueryClient();

	return useMutation<RegisterResponse, Error, RegisterRequest>({
		mutationFn: (req) => register(req),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth", "current-user"] });
		},
	});
};

export const useResetPassword = () =>
	useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
		mutationFn: (req) => resetPassword(req),
	});

export const useLogout = () => {
	const queryClient = useQueryClient();

	return useMutation<void, Error, void>({
		mutationFn: () => logout(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth", "current-user"] });
		},
	});
};
