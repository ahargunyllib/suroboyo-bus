import { api } from "../../lib/api";
import type { ComputeRoutesRequest, ComputeRoutesResponse } from "./dto";

export const computeRoutes = async (req: ComputeRoutesRequest) => {
  const response = await api.post<ComputeRoutesResponse>(
    "https://routes.googleapis.com/directions/v2:computeRoutes",
    req,
    {
      headers: {
        "X-Goog-Api-Key": process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        "X-Goog-FieldMask": "routes.*",
      },
    }
  );

  return response.data;
};
