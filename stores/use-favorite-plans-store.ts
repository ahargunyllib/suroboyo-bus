import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FavoritePlansStore = {
  favoritePlanIds: number[];

  toggleFavorite: (planId: number) => void;
  isFavorite: (planId: number) => boolean;
};

export const useFavoritePlansStore = create<FavoritePlansStore>()(
  persist(
    (set, get) => ({
      favoritePlanIds: [],

      toggleFavorite: (planId: number) => {
        const { favoritePlanIds } = get();
        const isFav = favoritePlanIds.includes(planId);

        set({
          favoritePlanIds: isFav
            ? favoritePlanIds.filter((id) => id !== planId)
            : [...favoritePlanIds, planId],
        });
      },

      isFavorite: (planId: number) => get().favoritePlanIds.includes(planId),
    }),
    {
      name: "favorite-plans",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
