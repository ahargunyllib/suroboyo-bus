import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { ASSETS, useAssets } from "@/hooks/use-assets";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  BottleWineIcon,
  Building2Icon,
  CloudIcon,
  MessageCircleMoreIcon,
  PlusIcon,
  RouteIcon,
  SearchIcon,
  TicketIcon,
} from "lucide-react-native";
import { ScrollView, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Home() {
  const insets = useSafeAreaInsets();
  const time = new Date().getHours();
  let greeting = "Selamat Malam";
  const fullName = "Bayu Prasetya";

  if (time >= 5 && time < 12) {
    greeting = "Selamat Pagi";
  } else if (time >= 12 && time < 15) {
    greeting = "Selamat Siang";
  } else if (time >= 15 && time < 18) {
    greeting = "Selamat Sore";
  }

  const weather = "Sunny Day";
  const temperature = "30°C";

  return (
    <SafeAreaView
      className="h-full bg-white"
      edges={["bottom", "left", "right"]}
      style={{
        paddingBottom: 64 + 16, // tab bar height + padding
      }}
    >
      <View>
        <View className="bg-[#D41D07]" style={{ height: insets.top }} />
        <View className="flex-row items-start justify-between bg-[#D41D07] px-8 pt-4">
          <View className="flex-row gap-2">
            <View className="size-10 rounded-full bg-white" />
            <View>
              <Text className="font-medium text-white text-xs">{greeting}</Text>
              <Text className="font-bold text-base text-white">{fullName}</Text>
            </View>
          </View>
          <View className="flex-row gap-2">
            <Icon as={CloudIcon} className="text-white" size={40} />
            <View>
              <Text className="font-medium text-white text-xs">{weather}</Text>
              <Text className="font-bold text-base text-white">
                {temperature}
              </Text>
            </View>
          </View>
        </View>
        <View className="h-8 rounded-b-full bg-[#D41D07]" />
      </View>

      <ScrollView className="flex-col p-4" contentContainerClassName="gap-4">
        <View className="gap-4">
          <Text className="font-bold">Mau kemana hari ini??</Text>
          <Button
            className="justify-start rounded-lg shadow-none active:bg-background"
            onPress={() =>
              router.push({
                pathname: "/trips",
              })
            }
            variant="outline"
          >
            <Icon as={SearchIcon} size={16} />
            <Text className="font-medium text-[#8B8B8B] text-xs">
              Ayo, cari rute bus Anda !
            </Text>
          </Button>
          <SavedDestinations />
        </View>

        <Menu />

        <Services />

        <Offer />

        <View className="gap-4">
          <View>
            <Text className="font-bold text-black">
              Ikuti Suroboyo Bus Di Sosial Media
            </Text>
            <Text className="font-semibold text-black text-xs">
              Dapatkan informasi terbaru seputar layanan Suroboyo Bus yang
              dibagikan di sosial media kami
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="h-px flex-1 bg-black" />
            <Icon as={CloudIcon} className="text-black" size={32} />
            <Icon as={CloudIcon} className="text-black" size={32} />
            <Icon as={CloudIcon} className="text-black" size={32} />
            <View className="h-px flex-1 bg-black" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Menu() {
  const menus = [
    {
      title: "Beli Tiket",
      icon: TicketIcon,
    },
    {
      title: "Info Rute",
      icon: PlusIcon,
    },
    {
      title: "Peta Tematik",
      icon: RouteIcon,
    },
    {
      title: "FAQ",
      icon: MessageCircleMoreIcon,
    },
  ];
  return (
    <ScrollView
      className="flex-row"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {menus.map((menu) => (
        <Button
          className="h-fit flex-col gap-2"
          key={menu.title}
          variant="ghost"
        >
          <View className="aspect-square rounded-full bg-[#D41D07] p-4">
            <Icon as={menu.icon} className="text-white" size={24} />
          </View>

          <Text className="font-semibold text-xs">{menu.title}</Text>
        </Button>
      ))}
    </ScrollView>
  );
}

function SavedDestinations() {
  const savedDestinations = ["Kampus", "Rumah", "Kantor"];
  return (
    <ScrollView
      className="flex-row"
      contentContainerClassName="gap-4"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {savedDestinations.map((destination) => (
        <Button
          className="rounded-lg shadow-none"
          key={destination}
          size="sm"
          variant="outline"
        >
          <Text className="font-medium text-xs">{destination}</Text>
        </Button>
      ))}
      <Button className="rounded-lg shadow-none" size="sm" variant="outline">
        <Icon as={PlusIcon} size={12} />
        <Text className="font-medium text-xs">Tambah Destinasi</Text>
      </Button>
    </ScrollView>
  );
}

function Services() {
  return (
    <View className="gap-2">
      <Text className="font-bold">Jelajahi Layanan</Text>
      <View className="flex-row gap-4">
        <View className="flex-1 flex-row gap-2 rounded-md bg-[#D41D07] p-4">
          <Icon as={BottleWineIcon} className="text-white" size={24} />
          <View className="flex-1 gap-2">
            <Text className="font-semibold text-white text-xs">
              Penukaran Botol
            </Text>
            <View className="shrink flex-row">
              <Button
                className="h-fit rounded-full bg-white py-1 shadow-none active:bg-white/80"
                size="sm"
              >
                <Text className="font-bold text-[#D41D07] text-[10px]">
                  Klik disini
                </Text>
              </Button>
            </View>
          </View>
        </View>
        <View className="flex-1 flex-row gap-2 rounded-md bg-[#D41D07] p-4">
          <Icon as={Building2Icon} className="text-white" size={24} />
          <View className="flex-1 gap-2">
            <Text className="font-semibold text-white text-xs">
              Tempat Wisata
            </Text>
            <View className="shrink flex-row">
              <Button
                className="h-fit rounded-full bg-white py-1 shadow-none active:bg-white/80"
                size="sm"
              >
                <Text className="font-bold text-[#D41D07] text-[10px]">
                  Klik disini
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function Offer() {
  const [assets] = useAssets();
  return (
    <View className="gap-2">
      <Text className="font-bold">Penawaran dan Kupon</Text>
      <View className="relative gap-2 rounded-md bg-[#A80000]">
        <View className="w-1/2 gap-2 p-4">
          <Text className="font-bold text-white">
            Hemat hingga Rp 2.500 untuk tiket bus
          </Text>
          <Text className="font-medium text-[10px] text-white">
            Berlaku sampai 20 Dec 2025
          </Text>
          <View className="shrink flex-row">
            <Button
              className="h-fit w-fit rounded-full bg-[#D41D07] py-1 shadow-none active:bg-[#D41D07]/80"
              size="sm"
            >
              <Text className="font-bold text-[10px] text-white">
                Klik disini
              </Text>
            </Button>
          </View>
        </View>

        {assets !== undefined && (
          <Image
            contentFit="contain"
            source={assets[ASSETS.SUROBOYO_BUS_ILLUSTRATION]}
            style={{
              width: "50%",
              height: "100%",
              position: "absolute",
              right: 0,
              bottom: 0,
            }}
          />
        )}
      </View>
    </View>
  );
}
