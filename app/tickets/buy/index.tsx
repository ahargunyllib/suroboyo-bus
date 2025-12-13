import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { ticketOffers } from "@/data/tickets";
import { router } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center gap-2 bg-white px-4 py-2">
        <Button onPress={() => router.back()} size="icon" variant="ghost">
          <Icon as={ArrowLeftIcon} className="text-black" size={24} />
        </Button>
        <Text className="font-bold text-black">Beli Tiket</Text>
      </View>
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
                  onPress={() =>
                    router.push({
                      pathname: "/tickets/buy/[id]",
                      params: {
                        id: item.id,
                      },
                    })
                  }
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
    </SafeAreaView>
  );
}
