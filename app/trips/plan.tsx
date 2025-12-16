import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useTripPlanStore } from "@/stores/use-trip-plan-store";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import {
  ArrowLeftIcon,
  BusFrontIcon,
  FootprintsIcon,
  MapPinIcon,
  TicketIcon,
} from "lucide-react-native";
import { useRef } from "react";
import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Screen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { plan } = useTripPlanStore();
  const insets = useSafeAreaInsets();

  if (!plan) {
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
          <View className="gap-2">
            <Text className="font-bold text-black">
              {plan.fromAddress} - {plan.toAddress}
            </Text>
            <View className="flex-row flex-wrap items-center gap-2">
              <Badge className="rounded-full bg-[#DADADA] px-2 py-1">
                <Text className="font-medium text-black text-xs">
                  {plan.durationInMinutes} menit
                </Text>
              </Badge>
              <Badge className="rounded-full bg-[#DADADA] px-2 py-1">
                <Text className="font-medium text-black text-xs">
                  {plan.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </Text>
              </Badge>
            </View>
          </View>
          <Button className="flex-1 bg-[#D41D07] shadow-none active:bg-[#D41D07]/80">
            <Icon as={TicketIcon} className="text-white" size={20} />
            <Text className="font-medium text-white text-xs">Beli Tiket</Text>
          </Button>
          <Plan />
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
}

function Plan() {
  const { plan } = useTripPlanStore();

  if (!plan) {
    return null;
  }

  return (
    <View className="flex-1 gap-2">
      {plan.plans.map((p, idx, arr) => {
        if (p.type === "bus") {
          return (
            <View className="gap-2" key={p.id}>
              <View className="flex-row gap-2">
                <View className="items-center gap-1">
                  <View className="size-3 rounded-full bg-[#A90101]" />
                  <View className="min-h-8 w-[2px] flex-1 bg-[#D41D07]" />
                </View>
                <View className="flex-1 gap-2">
                  <Text className="font-semibold text-[#4CD964] text-xs">
                    Start
                  </Text>
                  <Text className="font-semibold text-black text-xs">
                    {p.startingStop}
                  </Text>
                  <View className="flex-row items-center gap-2">
                    <View className="items-center justify-center rounded-lg bg-[#B31E4E] p-2">
                      <Text className="font-semibold text-white text-xs">
                        {p.bus.code}
                      </Text>
                    </View>
                    <Text className="font-semibold text-[#D41D07] text-xs">
                      {p.bus.name}
                    </Text>
                  </View>
                  <View className="rounded-lg bg-white p-2">
                    {p.options.map((option) => (
                      <View className="gap-2" key={option.id}>
                        <View className="flex-row items-center gap-2">
                          <Icon
                            as={BusFrontIcon}
                            className="text-[#D41D07]"
                            size={24}
                          />
                          <View className="items-center justify-center rounded-lg bg-[#D41D07] p-2">
                            <Text className="font-semibold text-white text-xs">
                              {p.bus.code}
                            </Text>
                          </View>
                          <View className="items-center justify-center rounded-lg bg-[#D41D07] p-2">
                            <Text className="font-semibold text-white text-xs">
                              {option.code}
                            </Text>
                          </View>
                        </View>
                        <View className="flex-row items-center justify-between gap-2">
                          <View className="flex-row items-center gap-2">
                            <View className="rounded-lg bg-[#F2F2F2] px-4 py-2">
                              <Text className="font-semibold text-black text-xs">
                                Tujuan Akhir
                              </Text>
                            </View>
                            <Button className="h-fit w-fit bg-[#D41D07] shadow-none active:bg-[#D41D07]/80">
                              <Icon
                                as={BusFrontIcon}
                                className="text-white"
                                size={16}
                              />
                              <Text className="font-medium text-white text-xs">
                                Detail Bus
                              </Text>
                            </Button>
                          </View>
                          <Text className="font-bold text-black text-xl">
                            {option.durationInMinutes}{" "}
                            <Text className="text-[#CDCDCD]">min</Text>
                          </Text>
                        </View>
                        <Text className="font-bold text-black text-xs">
                          {option.startingStop} - {option.endingStop}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              <View className="flex-row gap-2">
                <View className="size-3 rounded-full bg-[#A90101]" />
                <View className="flex-1 gap-2">
                  <Text className="font-semibold text-[#D41D07] text-xs">
                    Exit
                  </Text>
                  <Text className="font-semibold text-black text-xs">
                    {p.endingStop}
                  </Text>
                  <View className="h-[2px] w-full bg-[#CDCDCD]" />
                </View>
              </View>
            </View>
          );
        }

        if (p.type === "walk") {
          return (
            <View className="flex-row gap-2" key={p.id}>
              <View className="items-center gap-1">
                <Icon as={FootprintsIcon} className="text-black" size={12} />
                <View className="min-h-8 w-[2px] bg-[#D9D9D9]" />
                {p.details ? (
                  <Icon as={MapPinIcon} className="text-black" size={12} />
                ) : null}
              </View>
              <View className="flex-1 gap-2">
                <Text className="font-semibold text-black text-xs">
                  {p.instruction}
                </Text>
                {p.details ? (
                  <View className="rounded-lg bg-white p-2">
                    <Text className="font-semibold text-black text-xs">
                      Detail Rute
                    </Text>
                    {p.details.map((detail) => (
                      <View key={detail}>
                        <Text className="ml-4 font-semibold text-black text-xs">
                          {detail}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null}
                {idx !== arr.length - 1 ? (
                  <View className="h-[2px] w-full bg-[#CDCDCD]" />
                ) : null}
              </View>
            </View>
          );
        }

        return null;
      })}
    </View>
  );
}
