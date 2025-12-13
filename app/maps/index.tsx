import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center gap-2 bg-white px-4 py-2">
        <Button onPress={() => router.back()} size="icon" variant="ghost">
          <Icon as={ArrowLeftIcon} className="text-black" size={24} />
        </Button>
        <Text className="font-bold text-black">Peta Tematik</Text>
      </View>
      <MapView
        followsUserLocation
        loadingEnabled
        provider={PROVIDER_GOOGLE}
        showsBuildings={false}
        showsIndoors={false}
        showsMyLocationButton
        showsPointsOfInterest={false}
        showsUserLocation
        style={{
          flexGrow: 1,
        }}
        zoomControlEnabled={true}
        zoomEnabled={true}
      />
    </SafeAreaView>
  );
}
