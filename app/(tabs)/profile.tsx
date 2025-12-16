import { currentUserQueryOptions, useLogout } from "@/api/auth/query";
import { AvatarFallback } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  LanguagesIcon,
  LockKeyholeIcon,
  MessageSquareTextIcon,
  UserIcon,
} from "lucide-react-native";
import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "../../components/ui/avatar";
import { Icon } from "../../components/ui/icon";

const width = Dimensions.get("window").width;

export default function Profile() {
  const logoutMutation = useLogout();
  const { data } = useQuery(currentUserQueryOptions());

  const onLogout = () => {
    logoutMutation.mutate();
    router.dismissTo("/(auth)");
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-[#F3F5F9]">
      <ScrollView
        className="w-full py-8"
        contentContainerClassName="gap-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center gap-4 px-4">
          <Avatar alt="User Avatar" className="size-20 rounded-full bg-white">
            <AvatarFallback className="bg-white">
              <Text className="font-bold text-black">
                {data?.fullName?.at(0)?.toUpperCase()}
              </Text>
            </AvatarFallback>
          </Avatar>
          <Text className="font-medium text-black">{data?.fullName}</Text>
        </View>
        <View className="h-px w-full bg-[#9B9B9B80]/50" />
        <View className="gap-4 px-4">
          <TouchableOpacity className="flex-row items-center gap-4">
            <Icon as={UserIcon} className="text-black" size={24} />
            <Text className="font-medium text-black">Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-4">
            <Icon as={LockKeyholeIcon} className="text-black" size={24} />
            <Text className="font-medium text-black">Ubah Kata Sandi</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-4">
            <Icon as={LanguagesIcon} className="text-black" size={24} />
            <Text className="font-medium text-black">Ubah Bahasa</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-4">
            <Icon as={MessageSquareTextIcon} className="text-black" size={24} />
            <Text className="font-medium text-black">Riwayat Laporan</Text>
          </TouchableOpacity>
        </View>
        <View className="h-px w-full bg-[#9B9B9B80]/50" />
        <View className="gap-4 px-4">
          <TouchableOpacity onPress={onLogout}>
            <Text className="font-medium text-red-600">Keluar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
