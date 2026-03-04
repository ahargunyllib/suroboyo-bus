import Header from "@/components/header";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        backgroundColor="white"
        onBack={() => router.dismissTo("/(tabs)")}
        title="Pembayaran"
      />

      <View className="flex-1 items-center justify-center gap-4 px-4">
        <LottieView
          autoPlay
          source={require("@/assets/checked.json")}
          // Find more Lottie files at https://lottiefiles.com/featured
          style={{
            width: 200,
            height: 200,
          }}
        />
        <View className="items-center gap-2">
          <Text className="text-center font-bold text-[#00A01B] text-xl">
            Pembayaran QRIS berhasil
          </Text>
          <Text className="text-center font-bold text-[#646464]">
            Silahkan kembalik ke halaman sebelumnya
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
