import { Tabs } from "expo-router";
import { HomeIcon, TicketIcon, UserIcon } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../../components/ui/icon";
import { Text } from "../../components/ui/text";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabel({ children }) {
          return (
            <Text className="font-medium text-[#E02922] text-xs">
              {children}
            </Text>
          );
        },
        tabBarBackground() {
          return (
            <View
              className="rounded-t-2xl border-gray-200 border-t bg-white shadow"
              style={StyleSheet.absoluteFill}
            />
          );
        },
        tabBarStyle: {
          position: "absolute",
          height: 64 + insets.bottom,
        },
        tabBarItemStyle: {
          paddingHorizontal: 20,
          paddingVertical: 16,
        },
      }}
    >
      <Tabs.Screen
        name="ticket"
        options={{
          title: "Tiket",
          tabBarIcon({ size }) {
            return (
              <Icon as={TicketIcon} className="text-[#E02922]" size={size} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon({ size }) {
            return (
              <Icon as={HomeIcon} className="text-[#E02922]" size={size} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon({ size }) {
            return (
              <Icon as={UserIcon} className="text-[#E02922]" size={size} />
            );
          },
        }}
      />
    </Tabs>
  );
}
