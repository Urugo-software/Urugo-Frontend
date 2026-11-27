import api from "@/lib/axios";

export interface PublicStats {
  availableProperties: number;
  registeredLandlords: number;
}

interface PublicStatsResponse {
  success: boolean;
  message: string;
  data: PublicStats;
}

export async function getPublicStats(): Promise<PublicStatsResponse> {
  const { data } = await api.get<PublicStatsResponse>("/api/public/stats");
  return data;
}
