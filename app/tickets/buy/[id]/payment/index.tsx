import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { getTicketOfferById } from "@/data/tickets";
import { ASSETS, useAssets } from "@/hooks/use-assets";
import BottomSheet, {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useGlobalSearchParams } from "expo-router";
import { ChevronRightCircleIcon } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const width = Dimensions.get("window").width;

export default function Screen() {
  const { id } = useGlobalSearchParams<{
    id: "general-ticket" | "student-ticket";
  }>();
  const [assets] = useAssets();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();

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

  // Countdown timer for payment completion (10 minutes)
  const [countdown, setCountdown] = useState(
    new Date(10 * 60 * 1000).toISOString().substring(14, 19)
  );

  // Start countdown timer when the component mounts
  useEffect(() => {
    const targetTime = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    const interval = setInterval(() => {
      const remainingTime = targetTime - Date.now();
      if (remainingTime <= 0) {
        setCountdown("00:00");
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor(remainingTime / (60 * 1000))
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000)
        .toString()
        .padStart(2, "0");
      setCountdown(`${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const ticket = getTicketOfferById(id);
  if (!ticket) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header backgroundColor="white" title="Pembayaran" />
      <ScrollView className="flex-1 px-4" contentContainerClassName="gap-4">
        <View className="items-center justify-center gap-2 text-center">
          <Text className="font-bold text-black">
            Selesaikan pembayaran dalam waktu
          </Text>
          <Text className="font-bold text-[#5C5B5B]">{countdown}</Text>
        </View>
        <View className="items-center justify-center gap-2">
          <View className="flex-row items-center justify-between gap-12">
            {assets ? (
              <Image
                source={assets[ASSETS.QRIS_LOGO].localUri}
                style={{
                  height: 32,
                  resizeMode: "contain",
                  aspectRatio: 3.28 / 1,
                }}
              />
            ) : null}
            {assets ? (
              <Image
                source={assets[ASSETS.GPN_LOGO].localUri}
                style={{
                  height: 32,
                  aspectRatio: 0.77 / 1,
                  resizeMode: "contain",
                }}
              />
            ) : null}
          </View>
          {assets ? (
            <Image
              source={assets[ASSETS.DUMMY_QRIS].localUri}
              style={{
                width: width * 0.7,
                height: width * 0.7,
                resizeMode: "cover",
              }}
            />
          ) : null}
        </View>

        <View className="flex-row justify-center">
          <Button
            onPress={() => bottomSheetRef.current?.expand()}
            variant="ghost"
          >
            <Text className="font-bold">Tata Cara Pembayaran</Text>
            {/* TODO: Wrap Icon as */}
            <ChevronRightCircleIcon />
          </Button>
        </View>
      </ScrollView>

      <BottomSheet
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#ffffff" }}
        enableDynamicSizing={false}
        enablePanDownToClose
        index={-1}
        ref={bottomSheetRef}
        snapPoints={["80%"]}
      >
        <BottomSheetScrollView
          className="flex-1 gap-4 p-4"
          contentContainerClassName="gap-4"
          style={{ paddingBottom: insets.bottom + 16 }}
        >
          <View className="gap-2">
            <Text className="font-bold text-black">
              Tata Cara Pembayaran QRIS Suroboyo Bus
            </Text>
            <View className="gap-1">
              <View className="flex-row gap-2">
                <Text className="font-bold text-black">1.</Text>
                <Text className="flex-1 text-black">
                  <Text className="font-bold">Penyimpanan Kode Bayar</Text>:
                  Pengguna melakukan pengambilan gambar layar (
                  <Text className="font-bold">Screenshot</Text>) pada kode QRIS
                  pembayaran yang tersedia.
                </Text>
              </View>
              <View className="flex-row gap-2">
                <Text className="font-bold text-black">2.</Text>
                <Text className="flex-1 text-black">
                  <Text className="font-bold">Akses Fitur QRIS</Text>: Buka
                  aplikasi perbankan atau yang lainnya, kemudia pilih dan klik
                  ikon <Text className="font-bold">QRIS</Text> yang terletak
                  pada halaman utama aplikasi.
                </Text>
              </View>
              <View className="flex-row gap-2">
                <Text className="font-bold text-black">3.</Text>
                <Text className="flex-1 text-black">
                  <Text className="font-bold">Pemindaian melalui Galeri</Text>:
                  Klik ikon gambar/galeri pada antarmuka pemindai QRIS, lalu
                  pilih gambar kode QRIS yang telah disimpan sebelumnya di
                  galeri ponsel Anda.
                </Text>
              </View>
              <View className="flex-row gap-2">
                <Text className="font-bold text-black">4.</Text>
                <Text className="flex-1 text-black">
                  <Text className="font-bold">
                    Verfikasi Merchant & Sumber Dana
                  </Text>
                  : Pastikan nama merchant yang muncul pada layar (misal:
                  Suraboyo Bus) telah sesuai, kemudian pilih sumber dana yang
                  akan digunakan dan klik <Text className="font-bold">OK</Text>.
                </Text>
              </View>
              <View className="flex-row gap-2">
                <Text className="font-bold text-black">5.</Text>
                <Text className="flex-1 text-black">
                  <Text className="font-bold">Input Nominal</Text> : Masukan
                  nominal pembayaran dengan tarik yang berlaku (apabila nominal
                  belum terisi secara otomatis)
                </Text>
              </View>
              <View className="flex-row gap-2">
                <Text className="font-bold text-black">6.</Text>
                <Text className="flex-1 text-black">
                  <Text className="font-bold">Finalisasi Transaksi</Text>:
                  Periksa kembali detail pembayaran pada halaman konfirmasi.
                  Jika data sudah benar, klik Bayar dan masukkan nomor PIN
                  transaksi Anda untuk menyelesaikan proses pembayaran.
                </Text>
              </View>
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
}
