import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { View } from "react-native";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";
import { Text } from "./ui/text";

type Props = {
  title: string;
  backgroundColor?: string;
  onBack?: () => void;
};

export default function Header({
  title,
  backgroundColor = "white",
  onBack,
}: Props) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View
      className="relative flex-row items-center px-4 py-2"
      style={{ backgroundColor }}
    >
      <Button onPress={handleBack} size="icon" variant="ghost">
        <Icon as={ArrowLeftIcon} className="text-black" size={24} />
      </Button>
      <View className="absolute right-0 left-0 items-center">
        <Text className="font-bold text-black">{title}</Text>
      </View>
    </View>
  );
}
