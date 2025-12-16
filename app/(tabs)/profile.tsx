import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLogout } from "../../api/auth/query";
import { Button } from "../../components/ui/button";

export default function Profile() {
  const logoutMutation = useLogout();

  const onLogout = () => {
    logoutMutation.mutate();
    router.dismissTo("/(auth)");
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View>
        <Text>Profile</Text>
        <Button disabled={logoutMutation.isPending} onPress={onLogout}>
          <Text>{logoutMutation.isPending ? "Logging out..." : "Logout"}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
