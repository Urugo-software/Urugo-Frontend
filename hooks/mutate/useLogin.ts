import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

import { loginUserService } from "@/api/auth.api";
import { queryClient } from "@/components/provider/QueryClient";
import { getPostLoginRoute } from "@/utils/auth-helpers";

interface LoginResponseLike {
  role?: string;
  user?: {
    role?: string;
  };
}

export function useLogin() {
  const router = useRouter();
  const t = useTranslations("auth.login");

  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: loginUserService,
    onSuccess: (data: LoginResponseLike | undefined) => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      toast.success(t("signInSuccess"));
      const role = data?.user?.role ?? data?.role;
      router.replace(getPostLoginRoute(role));
    },
    onError: (error) => {
      toast.error(error.message || t("signInErrorFallback"));
    },
  });
  return { isPending, mutate, isError, error };
}
