import { Text } from "@/components/ui/text";
import { ownedTickets } from "@/data/tickets";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Badge } from "../../components/ui/badge";

export default function Screen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center gap-2 bg-white px-4 py-2">
        <Text className="font-bold text-black">Tiket</Text>
      </View>
      <View className="flex-1 gap-4 px-4">
        <FlatList
          className="flex-1"
          contentContainerClassName="grow gap-4"
          data={ownedTickets}
          renderItem={({ item }) => (
            <View className="relative gap-2 rounded-lg bg-[#D41D07] p-4">
              <View className="flex-row items-center justify-between gap-2">
                <Text className="font-bold text-white">
                  {item.ticketOffer.name}
                </Text>
                <Badge className="bg-[#FE554F]">
                  <Text className="font-semibold text-white text-xs">
                    {item.status === "used" ? "Sudah Digunakan" : null}
                    {item.status === "active" ? "Belum Digunakan" : null}
                    {item.status === "expired" ? "Kadaluarsa" : null}
                  </Text>
                </Badge>
              </View>
              <View className="my-4 border-white border-t border-dashed" />
              {item.status === "used" ? (
                <View>
                  <View className="flex-row justify-between">
                    <Text className="font-bold text-white text-xl">
                      {item.plan.departureTime}
                    </Text>
                    <View className="items-center gap-0">
                      <Text className="font-bold text-white">
                        {item.plan.durationInMinutes} menit
                      </Text>
                      <Text className="text-white text-xs">Perjalanan</Text>
                    </View>
                    <Text className="font-bold text-white text-xl">
                      {item.plan.arrivalTime}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="font-bold text-white">
                      {item.usedAt.toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Text>
                    <Text className="font-bold text-white">
                      {item.usedAt.toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Text>
                  </View>
                </View>
              ) : null}
              {item.status === "active" ? (
                <View>
                  <Text className="font-semibold text-white">
                    Berlaku sampai dengan{" "}
                    <Text className="font-bold text-white">
                      {item.expiresAt.toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      pukul{" "}
                      {item.expiresAt.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </Text>
                </View>
              ) : null}
              {item.status === "expired" ? (
                <View>
                  <Text className="font-semibold text-white">
                    Tiket ini kadaluarsa pada{" "}
                    <Text className="font-bold text-white">
                      {item.expiresAt.toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      pukul{" "}
                      {item.expiresAt.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </Text>
                </View>
              ) : null}
              <View
                className="absolute top-0 left-1/2 size-8 rounded-full bg-white"
                style={{ transform: [{ translateY: -16 }] }}
              />
              <View
                className="absolute right-1/2 bottom-0 size-8 rounded-full bg-white"
                style={{ transform: [{ translateY: 16 }] }}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
