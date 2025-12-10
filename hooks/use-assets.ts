import { useAssets as useExpoAssets } from "expo-asset";

export const ASSETS = {
  SUROBOYO_BUS_ILLUSTRATION: 0,
};

export const useAssets = () =>
  useExpoAssets([
    require("../assets/suroboyo-bus-illustration.png"),
  ]);
