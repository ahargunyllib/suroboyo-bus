import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import { computeRoutes } from ".";
import type { ComputeRoutesRequest, ComputeRoutesResponse } from "./dto";

export const computeRoutesQueryOptions = (
  req: ComputeRoutesRequest,
  options?: Omit<UseQueryOptions<ComputeRoutesResponse>, "queryKey" | "queryFn">
) =>
  queryOptions({
    queryKey: ["compute-routes", req],
    queryFn: () => computeRoutes(req),
    retry: 0,

    ...options,
  });
