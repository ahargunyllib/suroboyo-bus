import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
  type Attraction,
  type AttractionCategory,
  getAttractionsByCategory,
  getCategoryDisplayName,
} from "@/data/attractions";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { SearchIcon, StarIcon } from "lucide-react-native";
import { useState } from "react";
import { Linking, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../components/ui/card";
import { Icon } from "../../components/ui/icon";
import { Input } from "../../components/ui/input";

export default function AttractionCategoryScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();

  const [query, setQuery] = useState({ search: "" });

  // Convert URL slug to category type
  const categoryMap: Record<string, AttractionCategory> = {
    kuliner: "kuliner",
    mall: "mall",
    "ruang-terbuka": "ruang_terbuka",
    "tempat-ibadah": "tempat_ibadah",
  };

  const category = categoryMap[type || ""] || "kuliner";
  const attractions = getAttractionsByCategory(category).filter((attraction) =>
    attraction.name.toLowerCase().includes(query.search.toLowerCase())
  );
  const displayName = getCategoryDisplayName(category);

  // Customize search placeholder based on category
  const searchPlaceholder =
    category === "kuliner"
      ? "Ayo cari kuliner anda!"
      : `Ayo cari ${displayName.toLowerCase()} anda!`;

  const openMaps = (attraction: Attraction) => {
    if (!attraction.coordinate) {
      return;
    }

    const { latitude, longitude } = attraction.coordinate;
    const label = encodeURIComponent(attraction.name);

    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F3F5F9]">
      <Header backgroundColor="#F3F5F9" title="Attraction Site" />

      <ScrollView
        className="flex-1 px-4"
        contentContainerClassName="gap-4 pb-8"
      >
        <View className="relative flex-1">
          <Input
            className="peer flex-row items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 ps-9 font-medium text-xs shadow-none placeholder:text-[#8B8B8B]"
            onChangeText={(text) =>
              setQuery((prev) => ({ ...prev, search: text }))
            }
            placeholder={searchPlaceholder}
            value={query.search}
          />
          <View className="absolute start-0 top-0 bottom-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <Icon as={SearchIcon} className="text-black" size={16} />
          </View>
        </View>

        <View className="gap-2">
          <Text className="font-bold">{displayName}</Text>

          {attractions.map((attraction) => (
            <AttractionCard
              attraction={attraction}
              key={attraction.id}
              onPress={() => openMaps(attraction)}
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
          source={attraction.imageUrl}
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
