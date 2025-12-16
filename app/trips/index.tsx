import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { plans } from "@/data/plans";
import { cn } from "@/lib/utils";
import { useTripPlanStore } from "@/stores/use-trip-plan-store";
import { router } from "expo-router";
import {
  ArrowLeftIcon,
  ArrowUpDownIcon,
  BusFrontIcon,
  ChevronRightIcon,
  FootprintsIcon,
  HistoryIcon,
  LocateIcon,
  MapPinIcon,
  RouteIcon,
  StarIcon,
  XIcon,
} from "lucide-react-native";
import { Fragment, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const [search, setSearch] = useState({ from: "", to: "" });

  const filteredPlans = plans.filter((plan) => {
    if (search.from === "" || search.to === "") {
      return false;
    }

    const fromMatch = plan.fromAddress
      .toLowerCase()
      .includes(search.from.toLowerCase());
    const toMatch = plan.toAddress
      .toLowerCase()
      .includes(search.to.toLowerCase());
    return fromMatch && toMatch;
  });

  const { setPlan } = useTripPlanStore();

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
                onChangeText={(text) =>
                  setSearch((prev) => ({ ...prev, from: text }))
                }
                placeholder="Pilih titik awal Anda..."
                value={search.from}
              />
              <View className="absolute start-0 top-0 bottom-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <Icon as={LocateIcon} className="text-black" size={16} />
              </View>
            </View>
            <Button
              onPress={() => setSearch({ from: "", to: "" })}
              size="icon"
              variant="ghost"
            >
              <Icon as={XIcon} className="text-black" size={16} />
            </Button>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="relative flex-1">
              <Input
                className="peer flex-1 rounded-t-none border-[#E2E0E0] bg-[#F2F7FB] ps-9 text-xs shadow-none placeholder:font-semibold placeholder:font-urbanist placeholder:text-[#A6A6A6]"
                onChangeText={(text) =>
                  setSearch((prev) => ({ ...prev, to: text }))
                }
                placeholder="Cari tujuan Anda..."
                value={search.to}
              />
              <View className="absolute start-0 top-0 bottom-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <Icon as={MapPinIcon} className="text-black" size={16} />
              </View>
            </View>
            <Button
              onPress={() =>
                setSearch((prev) => ({ from: prev.to, to: prev.from }))
              }
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
          contentContainerClassName="grow gap-4"
          data={filteredPlans}
          ListEmptyComponent={
            <View className="h-full flex-row items-center justify-center gap-2">
              <Icon as={RouteIcon} className="text-[#E02922]" size={24} />
              <Text className="font-semibold text-black">
                Rute Tidak Ditemukan
              </Text>
            </View>
          }
          renderItem={({ item: plan }) => (
            <TouchableOpacity
              className="flex-row justify-between gap-2 rounded-lg bg-[#E02922] p-4"
              onPress={() => {
                setPlan(plan);

                router.push({
                  pathname: "/trips/plan",
                });
              }}
            >
              <View className="flex-row gap-4">
                <View className="gap-1">
                  <View className="gap-2">
                    <Text className="font-bold text-white text-xs">
                      Lama Perjalanan
                    </Text>
                    <Text className="font-bold text-white text-xl">
                      {plan.durationInMinutes} menit
                    </Text>
                  </View>
                  <View className="shrink flex-row">
                    <Badge className="shrink rounded-full bg-white px-2 py-1">
                      <Text className="font-medium text-[#E02922] text-xs">
                        {plan.distanceInMeters / 1000} km
                      </Text>
                    </Badge>
                  </View>
                </View>
                <View className="flex-col gap-2">
                  <Text className="font-bold text-white text-xs">
                    Perjalanan
                  </Text>
                  <View className="flex-row items-center gap-1">
                    {plan.steps.map((step, idx, arr) => {
                      let IconComp = FootprintsIcon;
                      if (step.type === "bus") {
                        IconComp = BusFrontIcon;
                      }

                      return (
                        // biome-ignore lint/suspicious/noArrayIndexKey: TODO
                        <Fragment key={idx}>
                          <Icon
                            as={IconComp}
                            className="text-white"
                            size={28}
                          />
                          {idx !== arr.length - 1 && (
                            <Icon
                              as={ChevronRightIcon}
                              className="text-white"
                              size={24}
                            />
                          )}
                        </Fragment>
                      );
                    })}
                  </View>
                </View>
              </View>
              <Icon as={StarIcon} className="text-white" size={24} />
            </TouchableOpacity>
          )}
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
