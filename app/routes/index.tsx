import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { ArrowLeftIcon, ClockIcon } from "lucide-react-native";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { routes } from "../../data/routes";

export default function Screen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F3F5F9]">
      <View className="flex-row items-center gap-2 bg-[#F3F5F9] px-4 py-2">
        <Button onPress={() => router.back()} size="icon" variant="ghost">
          <Icon as={ArrowLeftIcon} className="text-black" size={24} />
        </Button>
        <Text className="font-bold text-black">Info Rute</Text>
      </View>
      <View className="flex-1 gap-4">
        <FlatList
          className="flex-1 px-4"
          contentContainerClassName="grow gap-4"
          data={routes}
          renderItem={({ item }) => (
            <View className="relative flex-row gap-2 rounded-lg bg-white p-4 pl-6 shadow-sm">
              <View className="justify-center">
                <View
                  className="size-12 items-center justify-center rounded-md p-2"
                  style={{ backgroundColor: item.color }}
                >
                  <Text className="font-semibold text-white">{item.code}</Text>
                </View>
              </View>
              <View className="flex-1 gap-2">
                <Text className="flex-1 font-semibold text-black">
                  {item.from} {" > "} {item.to}
                </Text>
                <View className="flex-row justify-between gap-4">
                  {item.status === "operational" ? (
                    <View className="flex-row gap-2">
                      <Icon
                        as={ClockIcon}
                        className="text-green-500"
                        size={16}
                      />
                      <Text className="font-semibold text-green-500 text-xs uppercase">
                        Operasional
                      </Text>
                    </View>
                  ) : null}
                  <Text className="font-semibold text-[#727272] text-xs">
                    {item.openedAt} - {item.closedAt} WIB
                  </Text>
                </View>
              </View>

              <View
                className="absolute left-0 h-12 w-2"
                style={{
                  backgroundColor: item.color,
                  top: "50%",
                  transform: [{ translateY: -12 / 2 }],
                }}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
