import { getFeaturedProperties } from "@/api/property.api";
import { useQuery } from "@tanstack/react-query";

export function usePublicFeaturedProperties() {
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["featured-properties"],
    queryFn: getFeaturedProperties,
  });
  return { data, isLoading, error, isError, refetch };
}
