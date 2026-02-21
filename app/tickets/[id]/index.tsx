import { currentUserQueryOptions } from "@/api/auth/query";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { getOwnedTicketById } from "@/data/tickets";
import { ASSETS, useAssets } from "@/hooks/use-assets";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useGlobalSearchParams } from "expo-router";
import { GraduationCapIcon, QrCodeIcon } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { id } = useGlobalSearchParams<{
    id: string;
  }>();

  const ticket = getOwnedTicketById(id);
  const [assets] = useAssets();
  const { data: user } = useSuspenseQuery(currentUserQueryOptions());

  if (!ticket) {
    return null;
  }

  const totalPrice = ticket.ticketOffer.price - (ticket.discount ?? 0);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header backgroundColor="white" title="Detail Tiket" />
      <ScrollView
        className="flex-1 px-4"
        contentContainerClassName="gap-4 pb-8"
      >
        <Card className="border-0 bg-white pt-0 shadow-sm">
          <View className="rounded-lg bg-[#D41D07] px-4 py-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Icon as={QrCodeIcon} className="text-white" size={20} />
                <Text className="font-bold text-white">Scan Me</Text>
              </View>
              <Text className="font-bold text-white">Scan Me</Text>
            </View>
          </View>
          <CardContent className="items-center gap-2">
            {assets ? (
              <Image
                source={assets[ASSETS.DUMMY_QRIS]}
                style={{ width: 280, height: 280, resizeMode: "cover" }}
              />
            ) : null}
            <Text className="text-center font-bold text-sm">
              Tunjukan Kode QR mu kepada Petugas Tiket Bus
            </Text>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="gap-4">
            <View className="flex-row items-center gap-3">
              <View className="rounded-lg bg-[#D41D07] p-3">
                <Icon as={GraduationCapIcon} className="text-white" size={24} />
              </View>
              <View className="flex-1">
                <Text className="font-semibold">{ticket.ticketOffer.name}</Text>
                <Text className="font-semibold text-[#494949] text-xs">
                  Rp {ticket.ticketOffer.price.toLocaleString("id-ID")}/ tiket
                </Text>
              </View>
            </View>
            <View>
              <View className="flex-row">
                <Text className="w-32 font-semibold text-[#494949] text-xs">
                  Order ID
                </Text>
                <Text className="flex-1 font-semibold text-[#494949] text-xs">
                  : {ticket.id}
                </Text>
              </View>
              <View className="flex-row">
                <Text className="w-32 font-semibold text-[#494949] text-xs">
                  Purchase Date
                </Text>
                <Text className="flex-1 font-semibold text-[#494949] text-xs">
                  :{" "}
                  {ticket.createdAt.toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {ticket.createdAt.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
              <View className="flex-row">
                <Text className="w-32 font-semibold text-[#494949] text-xs">
                  Payment
                </Text>
                <Text className="flex-1 font-semibold text-[#494949] text-xs">
                  : {ticket.payment.bank}
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>

        <Card className="gap-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Data Pembeli</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="font-semibold text-xs">
              {user?.fullName ?? "Guest User"}
            </Text>
            <Text className="font-semibold text-[#494949] text-xs">
              {user?.email ?? "guest@example.com"}
            </Text>
          </CardContent>
        </Card>

        <Card className="gap-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="font-semibold text-xs">
              Detail Pembelian
            </CardTitle>
          </CardHeader>
          <CardContent className="gap-2">
            <View className="gap-1">
              <View className="flex-row items-center justify-between">
                <Text className="font-semibold text-[#494949] text-xs">
                  Harga
                </Text>
                <Text className="font-semibold text-xs">
                  Rp{ticket.ticketOffer.price.toLocaleString("id-ID")}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="font-semibold text-[#494949] text-xs">
                  Diskon
                </Text>
                <Text className="font-semibold text-xs">
                  {ticket.discount
                    ? "-" // TODO: Handle discount display properly
                    : "-"}
                </Text>
              </View>
            </View>
            <View className="border-[#494949] border-t opacity-20" />
            <View className="flex-row items-center justify-between">
              <Text className="font-semibold text-[#494949] text-xs">
                Total Bayar
              </Text>
              <Text className="font-semibold text-[#00C221] text-xs">
                Rp{totalPrice.toLocaleString("id-ID")}
              </Text>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
