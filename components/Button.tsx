import type { RefObject } from "react";
import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  type View,
} from "react-native";

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

export const Button = ({
  title,
  ref,
  ...touchableProps
}: ButtonProps & { ref?: RefObject<View | null> }) => (
  <TouchableOpacity
    ref={ref}
    {...touchableProps}
    className={`${styles.button} ${touchableProps.className}`}
  >
    <Text className={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

Button.displayName = "Button";

const styles = {
  button: "items-center bg-indigo-500 rounded-[28px] shadow-md p-4",
  buttonText: "text-white text-lg font-semibold text-center",
};
