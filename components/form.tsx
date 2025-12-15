import { CircleAlertIcon } from "lucide-react-native";
import type React from "react";
import { type TextInputProps, View, type ViewProps } from "react-native";
import { cn } from "../lib/utils";
import { Icon } from "./ui/icon";
import { Input } from "./ui/input";
import { Text } from "./ui/text";

function FormError({ message }: { message: string }) {
  return (
    <View className="flex-1 flex-row items-center gap-2 rounded-full bg-[#FFE1E1]">
      <Icon
        as={CircleAlertIcon}
        className="fill-[#CC0C0C] text-[#FFE1E1]"
        size={24}
      />
      <Text className="font-medium text-[#CC0C0C] text-xs">{message}</Text>
    </View>
  );
}

function FormField({
  label,
  error,
  children,
  className,
  ...props
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
} & ViewProps) {
  return (
    <View className={cn("w-full gap-2", className)} {...props}>
      <Text className="font-semibold text-[#E02922]">{label}</Text>
      {children}
      {error ? <FormError message={error} /> : null}
    </View>
  );
}

function FormInput({ className, ...props }: TextInputProps) {
  return (
    <Input
      className={cn(
        "w-full border-[#727272] font-urbanist text-xs tracking-wide shadow-none placeholder:text-[#A8A8A8]",
        className
      )}
      {...props}
    />
  );
}

export { FormError, FormField, FormInput };
