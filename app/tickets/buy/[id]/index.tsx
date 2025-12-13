import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { router, useGlobalSearchParams } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTicketOfferById } from "../../../../data/tickets";

export default function Screen() {
  const { id } = useGlobalSearchParams<{
    id: "general-ticket" | "student-ticket";
  }>();

  const ticket = getTicketOfferById(id);
  if (!ticket) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center gap-2 bg-white px-4 py-2">
        <Button onPress={() => router.back()} size="icon" variant="ghost">
          <Icon as={ArrowLeftIcon} className="text-black" size={24} />
        </Button>
        <Text className="font-bold text-black">Beli Tiket</Text>
      </View>
      <ScrollView className="flex-1 px-4" contentContainerClassName="gap-4">
        <View className="gap-4 rounded-lg bg-[#E02922] p-4 text-center">
          <Text className="text-center font-extrabold text-white">
            SUROBOYO BUS - 1 {ticket.name.toUpperCase()}
          </Text>
          <View className="rounded-lg bg-[#FE554F] p-4">
            <Text className="text-center font-medium text-white">
              Tiket hanya valid untuk{" "}
              <Text className="font-bold text-white">
                Layanan bus Suroboyo Bus
              </Text>
              . Tiket yang sudah dibeli tidak dapat dikembalikan atau diuangkan
              kembali
            </Text>
          </View>
          <View className="rounded-lg bg-[#FE554F] p-4">
            <Text className="text-center font-medium text-white">
              Tiket hanya dapat dipergunakan{" "}
              <Text className="font-bold text-white">
                pada tanggal pembelian, yaitu dari pukul 07:00 sampai dengan
                23:59 dan 00:01 sampai dengan 04:59
              </Text>
            </Text>
          </View>
          <View className="gap-2">
            <View className="flex-row justify-between gap-2">
              <Text className="font-semibold text-white text-xs">
                Layanan Bus
              </Text>
              <Text className="font-semibold text-white text-xs">
                Tgl Kadaluwarsa Tiket
              </Text>
            </View>
            <View className="flex-row justify-between gap-2">
              <Text className="font-extrabold text-white text-xs">
                Suroboyo Bus
              </Text>
              <Text className="font-extrabold text-white text-xs">
                {new Date().toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
            </View>
            <View className="h-px w-full bg-white" />
            <View className="flex-row justify-between gap-2">
              <Text className="font-extrabold text-white text-xs">
                Total Pembayaran
              </Text>
              <Text className="font-extrabold text-white text-xs">
                {ticket.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}
              </Text>
            </View>
          </View>
        </View>

        <View className="gap-4 rounded-lg bg-[#E02922] p-4 text-center">
          <Text className="text-center font-medium text-white text-xs">
            Dengan ini saya setuju mematuhi syarat dan ketentuan pemesanan
            tiket, termasuk pembayaran, dan juga mematuhi peraturan serta
            batasan mengenai ketersediaan tarif atua pelayanan
          </Text>
        </View>
      </ScrollView>
      <View className="gap-4 px-4 pb-4">
        <View className="flex-row justify-between gap-2">
          <Text className="font-bold text-black">Total Untuk Dibayar</Text>
          <Text className="font-bold text-black">
            {ticket.price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            })}
          </Text>
        </View>
        <Button className="bg-[#E02922] active:bg-[#E02922]/80">
          <Text className="font-bold text-white text-xs">Lanjut</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
