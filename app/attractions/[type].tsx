import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
  type Attraction,
  type AttractionCategory,
  getAttractionsByCategory,
  getCategoryDisplayName,
} from "@/data/attractions";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon, SearchIcon, StarIcon } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../components/ui/card";
import { Icon } from "../../components/ui/icon";

export default function AttractionCategoryScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();

  // Convert URL slug to category type
  const categoryMap: Record<string, AttractionCategory> = {
    kuliner: "kuliner",
    mall: "mall",
    "ruang-terbuka": "ruang_terbuka",
    "tempat-ibadah": "tempat_ibadah",
  };

  const category = categoryMap[type || ""] || "kuliner";
  const attractions = getAttractionsByCategory(category);
  const displayName = getCategoryDisplayName(category);

  // Customize search placeholder based on category
  const searchPlaceholder =
    category === "kuliner"
      ? "Ayo cari kuliner anda!"
      : `Ayo cari ${displayName.toLowerCase()} anda!`;

  return (
    <SafeAreaView className="flex-1 bg-[#F3F5F9]">
      <View className="flex-row items-center gap-2 px-4 py-2">
        <Button onPress={() => router.back()} size="icon" variant="ghost">
          <Icon as={ArrowLeftIcon} className="text-black" size={24} />
        </Button>
        <Text className="font-bold">Attraction Site</Text>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerClassName="gap-4 pb-8"
      >
        <View className="flex-row items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3">
          <Icon as={SearchIcon} size={16} />
          <Text className="font-medium text-[#8B8B8B] text-xs">
            {searchPlaceholder}
          </Text>
        </View>

        <View className="gap-2">
          <Text className="font-bold">{displayName}</Text>

          {attractions.map((attraction) => (
            <AttractionCard
              attraction={attraction}
              key={attraction.id}
              onPress={() => {
                // TODO: Navigate to detail screen
                console.log("Navigate to detail:", attraction.id);
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function AttractionCard({
  attraction,
  onPress,
}: {
  attraction: Attraction;
  onPress?: () => void;
}) {
  return (
    <Card className="overflow-hidden p-4">
      <View className="flex-row gap-3 p-0">
        <Image
          source={{ uri: attraction.imageUrl }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 8,
            resizeMode: "cover",
          }}
        />
        <View className="flex-1 justify-between">
          <View className="gap-1">
            <Text className="font-bold text-sm">{attraction.name}</Text>
            <Text className="line-clamp-2 font-semibold text-[#8B8B8B] text-xs">
              {attraction.address}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            {attraction.rating ? (
              <View className="flex-row items-center gap-1 rounded-full border border-black px-2 py-1">
                <Icon as={StarIcon} className="text-yellow-500" size={12} />
                <Text className="font-medium text-xs">
                  {attraction.rating.toFixed(1)}
                </Text>
              </View>
            ) : null}
            <Button
              className="rounded-full bg-[#D41D07] shadow-none active:bg-[#D41D07]/80"
              onPress={onPress}
              size="sm"
            >
              <Text className="font-medium text-white text-xs">
                Lihat Detail Lokasi
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Card>
  );
}
