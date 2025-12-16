import { type RegisterRequest, registerSchema } from "@/api/auth/dto";
import { useRegister } from "@/api/auth/query";
import { FormField, FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { ASSETS, useAssets } from "@/hooks/use-assets";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { router } from "expo-router";
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

export default function Screen() {
  const [assets] = useAssets();

  const form = useForm<RegisterRequest>({
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useRegister();

  const onSubmitHandler = form.handleSubmit((data) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        Alert.alert("Registrasi Berhasil", undefined, [
          {
            text: "OK",
            onPress: () => router.replace("/login"),
          },
        ]);
      },
      onError: (error) => {
        Alert.alert("Registrasi Gagal", error.message ?? "Terjadi kesalahan");
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
              error={form.formState.errors.fullName?.message}
              label="Nama Lengkap"
            >
              <Controller
                control={form.control}
                name="fullName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    className="w-full"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Masukkan nama lengkap Anda"
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
            <FormField
              error={form.formState.errors.confirmPassword?.message}
              label="Konfirmasi Password"
            >
              <Controller
                control={form.control}
                name="confirmPassword"
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
              disabled={registerMutation.isPending}
              onPress={onSubmitHandler}
            >
              <Text className="font-medium text-white">
                {registerMutation.isPending ? "Memproses..." : "Daftar"}
              </Text>
            </Button>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="h-px flex-1 bg-[#D9D9D9]" />
            <Text className="font-semibold text-[#8E8E8E] text-xs">
              atau registrasi dengan
            </Text>
            <View className="h-px flex-1 bg-[#D9D9D9]" />
          </View>
          <View className="flex-row items-center justify-center gap-4">
            <View className="size-12 items-center justify-center rounded-full bg-[#D9D9D9]">
              <Image
                source={assets?.[ASSETS.GOOGLE_LOGO]}
                style={{
                  width: "50%",
                  height: "50%",
                  resizeMode: "cover",
                }}
              />
            </View>
            <View className="size-12 items-center justify-center rounded-full bg-black">
              <Image
                source={assets?.[ASSETS.APPLE_LOGO]}
                style={{
                  width: "50%",
                  height: "50%",
                  resizeMode: "cover",
                }}
              />
            </View>
            <View className="size-12 items-center justify-center rounded-full bg-black">
              <Image
                source={assets?.[ASSETS.FACEBOOK_LOGO]}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
