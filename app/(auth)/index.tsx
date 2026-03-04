import { Text } from "@/components/ui/text";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ChevronRightIcon } from "lucide-react-native";
import { useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  Pagination,
  type ICarouselInstance,
} from "react-native-reanimated-carousel";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button } from "../../components/ui/button";
import { Icon } from "../../components/ui/icon";
import { ASSETS, useAssets } from "../../hooks/use-assets";

const width = Dimensions.get("window").width - 32;

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export default function OnboardingScreen() {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [assets] = useAssets();
  const insets = useSafeAreaInsets();

  const safeIndex = (i: number) => clamp(i, 0, data.length - 1);

  const goTo = (index: number) => {
    const idx = safeIndex(index);
    ref.current?.scrollTo({ index: idx, animated: true });
  };

  const onPressPagination = (index: number) => {
    goTo(index);
  };

  const handleNext = () => {
    const isLast = currentIndex >= data.length - 1;
    if (isLast) {
      router.push("/onboarding");
      return;
    }
    goTo(currentIndex + 1);
  };

  const data = [
    {
      title: "Selamat Datang di Suroboyo Bus",
      description:
        "Manfaatkan jaringan rute Suraboyo Bus yang luas untuk navigasi Surabaya yang mudah.",
      image: ASSETS.ONBOARDING_1,
    },
    {
      title: "Kini Saatnya Berangkat Bersama Suraboyo Bus",
      description:
        "Lacak lalu lintas Surabaya dan temukan halte terdekat langsung di peta.",
      image: ASSETS.ONBOARDING_2,
    },
    {
      title: "Lacak Lalu Lintas Kota Surabaya",
      description:
        "Jelajahi Surabaya mudah dengan rute Suraboyo Bus yang luas.",
      image: ASSETS.ONBOARDING_3,
    },
  ];

  return (
    <SafeAreaView className="flex h-full flex-col items-center justify-between">
      <View className="w-full items-center">
        <Carousel
          data={data}
          height={width}
          onProgressChange={(_, absoluteProgress) => {
            progress.value = absoluteProgress;
            // CLAMP di sini untuk mencegah index < 0 saat overscroll kiri
            const next = safeIndex(Math.round(absoluteProgress));
            if (next !== currentIndex) {
              setCurrentIndex(next);
            }
          }}
          ref={ref}
          // keep progress for pretty Pagination animation,
          // but derive a stable, rounded currentIndex for logic
          renderItem={({ item }) => (
            <Image
              source={assets?.[item.image].localUri}
              style={{
                height: width,
                resizeMode: "cover",
              }}
            />
          )}
          width={width}
        />
      </View>
      <View
        className="absolute right-0 left-0 p-4"
        style={{ bottom: insets.bottom }}
      >
        <View className="flex w-full flex-col gap-16 p-4">
          <View className="gap-4">
            <Text className="font-bold text-black">
              {data[currentIndex].title}
            </Text>
            <Text className="font-medium text-black text-xs">
              {data[currentIndex].description}
            </Text>
          </View>
          <View className="flex-row justify-between gap-4">
            <Pagination.Basic
              activeDotStyle={{
                overflow: "hidden",
                backgroundColor: "#E02922",
              }}
              containerStyle={{
                gap: 6,
              }}
              data={data}
              dotStyle={{
                width: 22,
                height: 12,
                borderRadius: 100,
                backgroundColor: "#D9D9D9",
              }}
              horizontal
              onPress={onPressPagination}
              progress={progress}
            />
            <Button
              className="rounded-full bg-[#E02922] shadow-none active:bg-[#E02922]/80"
              onPress={handleNext}
              size="icon"
            >
              <Icon as={ChevronRightIcon} className="text-white" size={20} />
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
