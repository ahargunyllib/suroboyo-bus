import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTripPlanStore } from "@/stores/use-trip-plan-store";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router, useGlobalSearchParams } from "expo-router";
import { ArrowLeftIcon, BusFrontIcon } from "lucide-react-native";
import { useRef } from "react";
import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Screen() {
  const { optionId, stepId } = useGlobalSearchParams<{
    stepId: string;
    optionId: string;
  }>();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const { plan } = useTripPlanStore();
  const insets = useSafeAreaInsets();

  if (!plan) {
    return null;
  }

  const step = plan.steps.find((p) => p.id === Number(stepId));
  if (!step || step.type !== "bus") {
    return null;
  }

  const option = step.options.find((o) => o.id === Number(optionId));
  if (!option) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F3F5F9]">
      <View className="flex-row items-center gap-2 bg-[#F3F5F9] px-4 py-2">
        <Button onPress={() => router.back()} size="icon" variant="ghost">
          <Icon as={ArrowLeftIcon} className="text-black" size={24} />
        </Button>
        <Text className="font-bold text-black">Rencana Perjalanan</Text>
      </View>
      <MapView
        loadingEnabled
        provider={PROVIDER_GOOGLE}
        showsBuildings={false}
        showsIndoors={false}
        showsPointsOfInterest={false}
        style={{
          flexGrow: 1,
        }}
        zoomControlEnabled={true}
        zoomEnabled={true}
      />

      <BottomSheet
        backgroundStyle={{ backgroundColor: "#F3F5F9" }}
        enableDynamicSizing={false}
        ref={bottomSheetRef}
        snapPoints={["20%", "80%"]}
      >
        <BottomSheetScrollView
          className="flex-1 gap-4 p-4"
          contentContainerClassName="gap-4"
          style={{ paddingBottom: insets.bottom + 16 }}
        >
          <View className="flex-row items-center gap-2">
            <View className="items-center justify-center rounded-lg bg-[#D41D07] p-2">
              <Text className="font-semibold text-white text-xs">
                {step.bus.code}
              </Text>
            </View>
            <View className="items-center justify-center rounded-lg bg-[#D41D07] p-2">
              <Text className="font-semibold text-white text-xs">
                {option.code}
              </Text>
            </View>
          </View>

          <View className="flex-row gap-2">
            <View className="flex-1 rounded-lg border border-[#D3CDCD] p-2">
              <Text className="font-bold text-[#8B8B8B] text-xs">Tipe</Text>
              <Text className="font-bold text-black">
                {step.bus.type === "electric" ? "Electric Bus" : step.bus.type}
              </Text>
            </View>
            <View className="flex-1 rounded-lg border border-[#D3CDCD] p-2">
              <Text className="font-bold text-[#8B8B8B] text-xs">
                Tujuan Akhir
              </Text>
              <Text className="font-bold text-black">{step.endingStop}</Text>
            </View>
          </View>

          <View className="gap-2">
            <Text className="font-bold text-black">Rute</Text>
            <View className="gap-1">
              {option.routes.map((route) => (
                <View
                  className="flex-row items-center justify-between gap-2 rounded-lg border border-[#D3CDCD] p-2"
                  key={route.id}
                >
                  <View className="flex-1 flex-row items-center gap-2">
                    <Icon
                      as={BusFrontIcon}
                      className="text-[#E02922]"
                      size={24}
                    />
                    <Text className="font-bold text-black">{route.name}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="font-bold text-black text-xl">
                      {route.durationInMinutes}{" "}
                      <Text className="text-[#CDCDCD]">min</Text>
                    </Text>
                    <Text className="font-bold text-[#A6A6A6]">
                      {new Date(
                        Date.now() + route.durationInMinutes * 60_000
                      ).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
}
