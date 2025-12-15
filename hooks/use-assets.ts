import { useAssets as useExpoAssets } from "expo-asset";

export const ASSETS = {
  SUROBOYO_BUS_ILLUSTRATION: 0,

  ONBOARDING: 1,
  ONBOARDING_1: 2,
  ONBOARDING_2: 3,
  ONBOARDING_3: 4,

  ICON: 5,
};

export const useAssets = () =>
  useExpoAssets([
    require("../assets/suroboyo-bus-illustration.png"),
    require("../assets/onboarding.png"),
    require("../assets/onboarding-1.png"),
    require("../assets/onboarding-2.png"),
    require("../assets/onboarding-3.png"),
    require("../assets/icon.png"),
  ]);
