import { queryClient } from "@/components/provider/QueryClient";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loginUserService } from "@/api/auth.api";
import { getPostLoginRoute } from "@/utils/auth-helpers";

interface LoginResponseLike {
  role?: string;
  user?: {
    role?: string;
  };
}

export function useLogin() {
  const router = useRouter();

  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: loginUserService,
    onSuccess: (data: LoginResponseLike | undefined) => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      toast.success("Signed in successfully.");
      const role = data?.user?.role ?? data?.role;
      router.replace(getPostLoginRoute(role));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, mutate, isError, error };
}
