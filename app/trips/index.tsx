import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import {
  ArrowLeftIcon,
  ArrowUpDownIcon,
  HistoryIcon,
  LocateIcon,
  MapPinIcon,
  RouteIcon,
  XIcon,
} from "lucide-react-native";
import { useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "../../lib/utils";

export default function Screen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center gap-2 bg-white px-4 py-2">
        <Button onPress={() => router.back()} size="icon" variant="ghost">
          <Icon as={ArrowLeftIcon} className="text-black" size={24} />
        </Button>
        <Text className="font-bold text-black">Tujuan Kamu</Text>
      </View>
      <View className="flex-1 gap-4 px-4">
        <View>
          <View className="flex-row items-center gap-2">
            <View className="relative flex-1">
              <Input
                className="peer flex-1 rounded-b-none border-[#E2E0E0] bg-[#F2F7FB] ps-9 text-xs shadow-none placeholder:font-semibold placeholder:font-urbanist placeholder:text-[#A6A6A6]"
                placeholder="Pilih titik awal Anda..."
              />
              <View className="absolute start-0 top-0 bottom-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <Icon as={LocateIcon} className="text-black" size={16} />
              </View>
            </View>
            <Button size="icon" variant="ghost">
              <Icon as={XIcon} className="text-black" size={16} />
            </Button>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="relative flex-1">
              <Input
                className="peer flex-1 rounded-t-none border-[#E2E0E0] bg-[#F2F7FB] ps-9 text-xs shadow-none placeholder:font-semibold placeholder:font-urbanist placeholder:text-[#A6A6A6]"
                placeholder="Cari tujuan Anda..."
              />
              <View className="absolute start-0 top-0 bottom-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <Icon as={MapPinIcon} className="text-black" size={16} />
              </View>
            </View>
            <Button
              onPress={() => router.push("/trips/plan")}
              size="icon"
              variant="ghost"
            >
              <Icon as={ArrowUpDownIcon} className="text-black" size={16} />
            </Button>
          </View>
        </View>

        <Tab />

        <FlatList
          className="flex-1"
          contentContainerClassName="grow"
          data={[]}
          ListEmptyComponent={
            <View className="h-full flex-row items-center justify-center gap-2">
              <Icon as={RouteIcon} className="text-[#E02922]" size={24} />
              <Text className="font-semibold text-black">
                Rute Tidak Ditemukan
              </Text>
            </View>
          }
          renderItem={() => <View />}
        />
      </View>
    </SafeAreaView>
  );
}

function Tab() {
  const tabs = [
    {
      key: "available-routes",
      content: "Rute Tersedia",
      type: "text" as const,
    },
    {
      key: "favorite",
      content: "Favorit",
      type: "text" as const,
    },
    {
      key: "history",
      content: <Icon as={HistoryIcon} size={12} />,
      type: "icon" as const,
    },
  ];
  const [activeTab, _setActiveTab] = useState(tabs[0]);

  return (
    <ScrollView
      className="grow-0 flex-row"
      contentContainerClassName="gap-2"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {tabs.map((tab) => (
        <Button
          className={cn(
            "h-6 rounded-full shadow-none",
            activeTab.key === tab.key
              ? "bg-[#E02922] active:bg-[#E02922]/90"
              : "border border-[#E02922] bg-white active:bg-[#FDEDED]"
          )}
          key={tab.key}
          size="sm"
          variant="outline"
        >
          {tab.type === "text" ? (
            <Text
              className={cn(
                "font-semibold text-xs",
                activeTab.key === tab.key
                  ? "text-white group-active:text-white"
                  : "text-[#E02922] group-active:text-[#E02922]"
              )}
            >
              {tab.content}
            </Text>
          ) : (
            tab.content
          )}
        </Button>
      ))}
    </ScrollView>
  );
}
