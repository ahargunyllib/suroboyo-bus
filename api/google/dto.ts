import type { Route } from "@/types/route";

export type ComputeRoutesRequest = {
  origin: {
    address: string;
  };
  destination: {
    address: string;
  };
  travelMode: "TRANSIT";
  computeAlternativeRoutes: boolean;
};

/**
 * Response type for ComputeRoutes API
 * See: https://developers.google.com/maps/documentation/routes/reference/rest/v2/TopLevel/computeRoutes#response-body
 * Unused fields are omitted for brevity
 */
export type ComputeRoutesResponse = {
  routes: Route[];
};
