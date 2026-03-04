import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { events } from "@/data/attractions";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  ChurchIcon,
  CoffeeIcon,
  StoreIcon,
  TreesIcon,
} from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AttractionSiteScreen() {
  const categories = [
    {
      id: "kuliner",
      label: "Kuliner",
      icon: CoffeeIcon,
      route: "/attractions/kuliner",
    },
    {
      id: "mall",
      label: "Mall",
      icon: StoreIcon,
      route: "/attractions/mall",
    },
    {
      id: "ruang_terbuka",
      label: "Ruang Terbuka",
      icon: TreesIcon,
      route: "/attractions/ruang-terbuka",
    },
    {
      id: "tempat_ibadah",
      label: "Tempat Ibadah",
      icon: ChurchIcon,
      route: "/attractions/tempat-ibadah",
    },
  ] as const;

  return (
    <SafeAreaView className="flex-1 bg-[#F3F5F9]">
      <Header backgroundColor="#F3F5F9" title="Attraction Site" />

      <ScrollView
        className="flex-1 px-4"
        contentContainerClassName="gap-4 pb-8"
      >
        {/* <View className="flex-row items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3">
          <Icon as={SearchIcon} size={16} />
          <Text className="font-medium text-[#8B8B8B] text-xs">
            Ayo cari destinasi anda!
          </Text>
        </View> */}

        <View className="gap-2">
          <Text className="font-bold">Mari bereksplorasi</Text>
          <ScrollView
            className="flex-row"
            contentContainerClassName="gap-2"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category) => (
              <Button
                className="h-fit w-20 flex-col gap-2 bg-[#D41D07] active:bg-[#D41D07]/80"
                key={category.id}
                onPress={() => router.push(category.route)}
              >
                <View className="aspect-square p-1">
                  <Icon as={category.icon} className="text-white" size={24} />
                </View>
                <Text className="wrap text-center font-semibold text-white text-xs">
                  {category.label}
                </Text>
              </Button>
            ))}
          </ScrollView>
        </View>

        <View className="gap-2">
          <Text className="font-bold">Event</Text>
          {events.map((event) => (
            <Image
              key={event.id}
              source={{ uri: event.imageUrl }}
              style={{
                height: 140,
                width: "100%",
                borderRadius: 8,
                resizeMode: "cover",
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
