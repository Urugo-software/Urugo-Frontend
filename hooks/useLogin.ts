import { queryClient } from "@/components/provider/QueryClient";
import { loginUserService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: loginUserService,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["me"],
      }),
  });
  return { isPending, mutate, isError, error };
}
