import { create } from "zustand";
import type { Plan } from "../types/plan";

type TripPlanStore = {
  plan: Plan | null;

  setPlan: (plan: Plan) => void;
};

export const useTripPlanStore = create<TripPlanStore>((set) => ({
  plan: null,

  setPlan: (plan: Plan) => set({ plan }),
}));
