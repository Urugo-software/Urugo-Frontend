import { useQuery } from "@tanstack/react-query";

import { loadAuthSession, AUTH_SESSION_QUERY_KEY } from "@/services/auth.service";

export function useAuthSession() {
  return useQuery({
    queryKey: AUTH_SESSION_QUERY_KEY,
    queryFn: loadAuthSession,
    staleTime: 30_000,
    retry: false,
    refetchOnWindowFocus: true,
  });
}
