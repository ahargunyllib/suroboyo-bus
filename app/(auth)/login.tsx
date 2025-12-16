import { loginSchema, type LoginRequest } from "@/api/auth/dto";
import { useLogin } from "@/api/auth/query";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormField, FormInput } from "../../components/form";
import { Text } from "../../components/ui/text";

export default function Screen() {
  const form = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const onSubmitHandler = form.handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        router.dismissTo("/(tabs)");
      },
      onError: (error) => {
        Alert.alert("Login Gagal", error.message ?? "Terjadi kesalahan");
      },
    });
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center gap-2 bg-white px-4 py-2">
        <Button onPress={() => router.back()} size="icon" variant="ghost">
          <Icon as={ArrowLeftIcon} className="text-black" size={24} />
        </Button>
        <Text className="font-bold text-black">Buat Akun</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="w-full flex-1"
      >
        <ScrollView
          className="flex-1 px-4"
          contentContainerClassName="gap-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-4">
            <FormField
              error={form.formState.errors.email?.message}
              label="Email"
            >
              <Controller
                control={form.control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    autoCapitalize="none"
                    className="w-full"
                    keyboardType="email-address"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Masukkan email Anda"
                    value={value}
                  />
                )}
              />
            </FormField>

            <FormField
              error={form.formState.errors.password?.message}
              label="Password"
            >
              <Controller
                control={form.control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    className="w-full"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Masukan kata sandi Anda"
                    secureTextEntry
                    value={value}
                  />
                )}
              />
            </FormField>
            <Button
              className="rounded-full bg-[#E02922] shadow-none active:bg-[#E02922]/80"
              disabled={loginMutation.isPending}
              onPress={onSubmitHandler}
            >
              <Text className="font-medium text-white">
                {loginMutation.isPending ? "Memproses..." : "Login"}
              </Text>
            </Button>
          </View>
          <Text className="text-center text-xs">
            Lupa Password?{" "}
            <Link
              className="font-semibold text-[#E02922]"
              href="/reset-password"
            >
              Reset Password
            </Link>
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="h-px flex-1 bg-[#D9D9D9]" />
            <Text className="font-semibold text-[#8E8E8E] text-xs">
              atau login dengan
            </Text>
            <View className="h-px flex-1 bg-[#D9D9D9]" />
          </View>
          <View className="flex-row items-center justify-center gap-4">
            <View className="size-16 rounded-full bg-red-200" />
            <View className="size-16 rounded-full bg-red-200" />
            <View className="size-16 rounded-full bg-red-200" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
