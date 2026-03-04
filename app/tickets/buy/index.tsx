import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { ticketOffers } from "@/data/tickets";
import { ASSETS, useAssets } from "@/hooks/use-assets";
import BottomSheet, {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Screen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();
  const [selectedTicket, setSelectedTicket] = useState<
    (typeof ticketOffers)[0] | null
  >(null);
  const [assets] = useAssets();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header backgroundColor="white" title="Beli Tiket" />
      <View className="flex-1 gap-4 px-4">
        <FlatList
          className="flex-1"
          contentContainerClassName="grow gap-4"
          data={ticketOffers}
          renderItem={({ item }) => (
            <View className="relative gap-2 rounded-lg bg-[#D41D07] p-4">
              <Text className="font-bold text-white">{item.name}</Text>
              <View className="my-4 border-white border-t border-dashed" />
              <View className="flex-row items-center justify-between gap-4">
                <Text className="font-medium text-white">
                  {item.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  })}{" "}
                  / Tiket
                </Text>
                <Button
                  className="rounded-full bg-[#ECECEC80]/50 active:bg-[#ECECEC80]/30"
                  onPress={() => {
                    setSelectedTicket(item);
                    bottomSheetRef.current?.expand();
                  }}
                  size="sm"
                  variant="secondary"
                >
                  <Text className="font-semibold text-white">Beli Tiket</Text>
                </Button>
              </View>
              <View
                className="-left-4 absolute top-1/2 size-8 rounded-full bg-white"
                style={{ transform: [{ translateY: -8 }] }}
              />
              <View
                className="-right-4 absolute top-1/2 size-8 rounded-full bg-white"
                style={{ transform: [{ translateY: -8 }] }}
              />
            </View>
          )}
        />
      </View>

      <BottomSheet
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#ffffff" }}
        enableDynamicSizing={false}
        enablePanDownToClose
        index={-1}
        ref={bottomSheetRef}
        snapPoints={["60%"]}
      >
        <BottomSheetScrollView
          className="flex-1 gap-4 p-4"
          contentContainerClassName="gap-4"
          style={{ paddingBottom: insets.bottom + 16 }}
        >
          {selectedTicket ? (
            <View className="gap-2">
              <View className="flex-row items-center gap-3 rounded-3xl border p-3">
                <View className="rounded-lg bg-[#D41D07] p-3">
                  <Icon
                    as={selectedTicket.icon}
                    className="text-white"
                    size={24}
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-base text-black">
                    {selectedTicket.name}
                  </Text>
                  <Text className="font-semibold text-black">
                    {selectedTicket.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    })}{" "}
                    / tiket
                  </Text>
                </View>
              </View>

              <View className="gap-2">
                <Text className="font-bold text-black">Syarat & Ketentuan</Text>
                {selectedTicket.tnc.map((term) => (
                  <View className="flex-row gap-2" key={term}>
                    <Text className="text-[#020202] text-xs">{"\u25CF"}</Text>
                    <Text className="flex-1 font-medium text-[#535353] text-xs">
                      {term}
                    </Text>
                  </View>
                ))}
              </View>

              <View className="flex-row items-center justify-between gap-4">
                <Text className="font-semibold text-black">
                  Metode Pembayaran
                </Text>
                {assets ? (
                  <Image
                    source={assets[ASSETS.QRIS_LOGO].localUri}
                    style={{
                      resizeMode: "contain",
                      width: 100,
                      height: 32,
                    }}
                  />
                ) : null}
              </View>

              <Button
                className="bg-[#D41D07] py-3 active:bg-[#B01806]"
                onPress={() =>
                  router.push({
                    pathname: "/tickets/buy/[id]",
                    params: {
                      id: selectedTicket.id,
                    },
                  })
                }
              >
                <Text className="font-semibold text-white">Lanjutkan</Text>
              </Button>
            </View>
          ) : null}
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
}
