import {
  getFeaturedProperties,
  getPublicProperties,
  getPublicPropertyById,
  type PublicPropertyListParams,
} from "@/api/property.api";
import { useQuery } from "@tanstack/react-query";

export function usePublicFeaturedProperties() {
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["featured-properties"],
    queryFn: getFeaturedProperties,
  });
  return { data, isLoading, error, isError, refetch };
}

export function usePublicProperties(params: PublicPropertyListParams) {
  return useQuery({
    queryKey: ["public-properties", params],
    queryFn: () => getPublicProperties(params),
  });
}

export function usePublicPropertyDetail(id: string) {
  return useQuery({
    queryKey: ["public-property", id],
    queryFn: () => getPublicPropertyById(id),
    enabled: Boolean(id),
  });
}
