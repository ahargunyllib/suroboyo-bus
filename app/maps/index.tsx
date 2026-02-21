import Header from "@/components/header";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header backgroundColor="white" title="Peta Tematik" />
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
