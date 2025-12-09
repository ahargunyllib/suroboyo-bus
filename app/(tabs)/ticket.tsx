import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Ticket() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View>
        <Text>Ticket</Text>
      </View>
    </SafeAreaView>
  );
}
