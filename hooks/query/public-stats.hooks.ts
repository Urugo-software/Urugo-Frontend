import { useQuery } from "@tanstack/react-query";
import { fetchPublicStats } from "@/services/public-stats.service";

export function usePublicStats() {
  return useQuery({
    queryKey: ["public-stats"],
    queryFn: fetchPublicStats,
    staleTime: 60_000,
  });
}
