import usePoppins from "@/utils/fonts/poppins";
import useUrbanist from "@/utils/fonts/urbanist";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [poppinsLoaded, poppinsError] = usePoppins();
  const [urbanistLoaded, urbanistError] = useUrbanist();
  const loaded = poppinsLoaded && urbanistLoaded;
  const error = poppinsError || urbanistError;

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!(loaded || error)) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar />
      <PortalHost />
    </GestureHandlerRootView>
  );
}
