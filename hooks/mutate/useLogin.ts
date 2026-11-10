import { queryClient } from "@/components/provider/QueryClient";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loginUserService } from "@/api/auth.api";

export function useLogin() {
  const router = useRouter();

  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: loginUserService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      toast.success("Login successful!");
      router.replace("/guest");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, mutate, isError, error };
}
