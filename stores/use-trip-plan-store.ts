import type { Route } from "@/types/route";
import { create } from "zustand";

type TripPlanStore = {
  request: {
    origin: {
      address: string;
    };
    destination: {
      address: string;
    };
    travelMode: "TRANSIT";
    computeAlternativeRoutes: boolean;
  };
  route: Route;

  setRequest: (request: TripPlanStore["request"]) => void;
  setRoute: (route: Route) => void;
};

const initialTripPlan: Omit<TripPlanStore, "setRequest" | "setRoute"> = {
  request: {
    origin: {
      address: "",
    },
    destination: {
      address: "",
    },
    travelMode: "TRANSIT",
    computeAlternativeRoutes: true,
  },
  route: {
    legs: [],
    routeLabels: [],
    distanceMeters: "0",
    staticDuration: "0s",
    polyline: { encodedPolyline: "" },
    viewport: {
      low: { latitude: 0, longitude: 0 },
      high: { latitude: 0, longitude: 0 },
    },
    travelAdvisory: {
      transitFare: {
        units: "",
      },
    },
    localizedValues: {
      distance: {
        text: "0 km",
      },
      duration: {
        text: "0 menit",
      },
      transitFare: {
        text: "",
      },
    },
  },
};
export const useTripPlanStore = create<TripPlanStore>((set) => ({
  ...initialTripPlan,
  setRequest: (request) => set({ request }),
  setRoute: (route) => set({ route }),
}));
