import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  type ResetPasswordRequest,
  resetPasswordSchema,
} from "../../api/auth/dto";
import { useResetPassword } from "../../api/auth/query";
import { FormField, FormInput } from "../../components/form";
import { Text } from "../../components/ui/text";

export default function Screen() {
  const form = useForm<ResetPasswordRequest>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const resetPasswordMutation = useResetPassword();

  const onSubmitHandler = form.handleSubmit((data) => {
    resetPasswordMutation.mutate(data, {
      onSuccess: (response) => {
        Alert.alert("Berhasil", response.message, [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      },
      onError: (error) => {
        Alert.alert("Gagal", error.message ?? "Terjadi kesalahan");
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
          <View className="gap-2">
            <Text className="font-bold text-black">Forgot Password</Text>
            <Text className="text-[#A8A8A8] text-xs">
              It's okay, Just type your Email and We will send a Link to rest
              your password
            </Text>
          </View>
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
            <Button
              className="rounded-full bg-[#E02922] shadow-none active:bg-[#E02922]/80"
              disabled={resetPasswordMutation.isPending}
              onPress={onSubmitHandler}
            >
              <Text className="font-medium text-white">
                {resetPasswordMutation.isPending ? "Memproses..." : "Atur Ulang Password"}
              </Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
