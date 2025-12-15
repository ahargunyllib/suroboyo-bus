import { Text } from "@/components/ui/text";
import { ASSETS, useAssets } from "@/hooks/use-assets";
import { Image } from "expo-image";
import { View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button } from "../../components/ui/button";

export default function Screen() {
  const [assets] = useAssets();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1" edges={["bottom", "left", "right"]}>
      {assets ? (
        <Image
          source={assets[ASSETS.ONBOARDING]}
          style={{ resizeMode: "cover", height: "80%" }}
        />
      ) : null}
      <View
        className="absolute bottom-0 w-full gap-8 rounded-t-3xl bg-white p-4 pt-8"
        style={{ paddingBottom: insets.bottom }}
      >
        <View className="gap-2">
          <Text className="text-center font-bold text-2xl text-black">
            Get ready to be excited!
          </Text>
          <Text className="text-center text-black">
            Bersiaplah untuk perjalanan yang seru dan penuh inspirasi—get ready
            to be excited!
          </Text>
        </View>
        <View className="gap-2">
          <Button className="rounded-full bg-[#E02922] shadow-none active:bg-[#E02922]/80">
            <Text className="font-poppins font-semibold text-white">
              Buat Akun
            </Text>
          </Button>
          <Button
            className="rounded-full border-[#E02922] shadow-none"
            variant="outline"
          >
            <Text className="font-poppins font-semibold text-[#E02922] group-active:text-[#E02922]">
              Masuk
            </Text>
          </Button>
        </View>
        <Text className="text-center text-black/50 text-xs">
          Dengan melanjutkan, Anda menyetujui syarat dan ketentuan serta
          kebijakan privasi Suroboyo Bus.
        </Text>
      </View>
    </SafeAreaView>
  );
}
