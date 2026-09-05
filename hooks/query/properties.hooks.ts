import { useQuery } from "@tanstack/react-query";

export function usePublicFeaturedProperties() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["featured-properties"],
    queryFn:
  });
}
