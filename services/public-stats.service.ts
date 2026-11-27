import { getPublicStats } from "@/api/public.api";
import { mapPublicStatsToHeroValues } from "@/mappers/public-stats.mapper";

export async function fetchPublicStats() {
  const response = await getPublicStats();
  if (!response.success) {
    throw new Error(response.message || "Could not load platform statistics");
  }
  return mapPublicStatsToHeroValues(response.data);
}
