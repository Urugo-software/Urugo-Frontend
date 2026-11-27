import type { PublicStats } from "@/api/public.api";

export function mapPublicStatsToHeroValues(stats: PublicStats) {
  return {
    availableProperties: stats.availableProperties.toLocaleString(),
    registeredLandlords: stats.registeredLandlords.toLocaleString(),
  };
}
