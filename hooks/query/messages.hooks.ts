import { useQuery } from "@tanstack/react-query";
import { fetchLandlordMessages } from "@/api/messages.api";

export function useLandlordMessages() {
  return useQuery({
    queryKey: ["landlord-messages"],
    queryFn: fetchLandlordMessages,
  });
}
