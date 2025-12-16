import { getCurrentUser } from "@/api/auth";
import { queryClient } from "@/lib/query-client";
import usePoppins from "@/utils/fonts/poppins";
import useUrbanist from "@/utils/fonts/urbanist";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [poppinsLoaded, poppinsError] = usePoppins();
  const [urbanistLoaded, urbanistError] = useUrbanist();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loaded = poppinsLoaded && urbanistLoaded;
  const error = poppinsError || urbanistError;
  const ready = (loaded || error) && authChecked;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        setIsAuthenticated(!!user);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();

      if (isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)");
      }
    }
  }, [ready, isAuthenticated]);

  if (!ready) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar />
        <PortalHost />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
