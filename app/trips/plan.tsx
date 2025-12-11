import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { decode as decodePolyline } from "@/lib/polyline";
import { useTripPlanStore } from "@/stores/use-trip-plan-store";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import {
  ArrowLeftIcon,
  BusFrontIcon,
  FootprintsIcon,
  TicketIcon,
} from "lucide-react-native";
import { Fragment, useMemo, useRef } from "react";
import { View } from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Screen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { route, request } = useTripPlanStore();
  const insets = useSafeAreaInsets();

  const region = useMemo(() => {
    const latMin = route.viewport.low.latitude;
    const latMax = route.viewport.high.latitude;
    const lngMin = route.viewport.low.longitude;
    const lngMax = route.viewport.high.longitude;

    return {
      latitude: (latMin + latMax) / 2,
      longitude: (lngMin + lngMax) / 2,
      latitudeDelta: latMax - latMin + 0.015,
      longitudeDelta: lngMax - lngMin + 0.015,
    };
  }, [route]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center gap-2 bg-white px-4 py-2">
        <Button onPress={() => router.back()} size="icon" variant="ghost">
          <Icon as={ArrowLeftIcon} className="text-black" size={24} />
        </Button>
        <Text className="font-bold text-black">Rencana Perjalanan</Text>
      </View>
      <MapView
        loadingEnabled
        provider={PROVIDER_GOOGLE}
        region={region}
        showsBuildings={false}
        showsIndoors={false}
        showsPointsOfInterest={false}
        style={{
          flexGrow: 1,
        }}
        zoomControlEnabled={true}
        zoomEnabled={true}
      >
        <Polylines />
      </MapView>

      <BottomSheet
        enableDynamicSizing={false}
        ref={bottomSheetRef}
        snapPoints={["20%", "80%"]}
      >
        <BottomSheetScrollView
          className="flex-1 gap-4 p-4"
          contentContainerClassName="gap-4"
          style={{ paddingBottom: insets.bottom + 16 }}
        >
          <View className="gap-2">
            <Text className="font-bold text-black">
              {request.origin.address} - {request.destination.address}
            </Text>
            <View className="flex-row flex-wrap items-center gap-2">
              <Badge className="rounded-full bg-[#DADADA] px-2 py-1">
                <Text className="font-medium text-black text-xs">
                  {route.localizedValues.distance.text}
                </Text>
              </Badge>
              <Badge className="rounded-full bg-[#DADADA] px-2 py-1">
                <Text className="font-medium text-black text-xs">
                  {route.localizedValues.transitFare.text ?? "Gratis"}
                </Text>
              </Badge>
            </View>
          </View>
          <View className="flex-row gap-2">
            <Button className="flex-1 bg-[#D41D07] active:bg-[#D41D07]/80">
              <Icon as={TicketIcon} className="text-white" size={20} />
              <Text className="font-medium text-white text-xs">Beli Tiket</Text>
            </Button>
            <Button className="flex-1 bg-[#D41D07] active:bg-[#D41D07]/80">
              <Icon as={BusFrontIcon} className="text-white" size={20} />
              <Text className="font-medium text-white text-xs">Detail Bus</Text>
            </Button>
          </View>
          <Plan />
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
}

function Polylines() {
  const { route } = useTripPlanStore();
  const decodedPolylines = route.legs[0].steps.map((step) =>
    decodePolyline(step.polyline.encodedPolyline)
  );

  return route.legs[0].steps.map((step, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: TODO
    <Fragment key={index}>
      {step.travelMode === "WALK" && (
        <Polyline
          coordinates={decodedPolylines[index].map((point) => ({
            latitude: point[0],
            longitude: point[1],
          }))}
          geodesic={true}
          // biome-ignore lint/suspicious/noArrayIndexKey: TODO
          key={`${index}-walk`}
          lineDashPattern={[10, 5]}
          strokeColor={"#4287f5"}
          strokeWidth={8}
        />
      )}
      {step.travelMode === "TRANSIT" && (
        <Polyline
          coordinates={decodedPolylines[index].map((point) => ({
            latitude: point[0],
            longitude: point[1],
          }))}
          // biome-ignore lint/suspicious/noArrayIndexKey: TODO
          key={`${index}-transit`}
          strokeColor={"#f54242"}
          strokeWidth={5}
        />
      )}
    </Fragment>
  ));
}

function Plan() {
  const { route } = useTripPlanStore();
  return (
    <View className="flex-1 gap-2">
      {route.legs[0].steps.map((step, index) => {
        let IconComponent = FootprintsIcon;
        if (step.travelMode === "TRANSIT") {
          IconComponent = BusFrontIcon;
        }

        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: TODO
          <View className="gap-4 rounded-lg border p-2" key={index}>
            <View className="flex-row items-center gap-2">
              <Icon as={IconComponent} className="text-black" size={20} />
              <View className="flex-1">
                <Text className="text-pretty font-medium text-black text-xs">
                  {step.navigationInstruction.instructions}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
