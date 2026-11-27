import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

import { loginWithPassword, AUTH_SESSION_QUERY_KEY } from "@/services/auth.service";
import { getPostLoginRoute } from "@/utils/auth-helpers";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations("auth.login");

  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: loginWithPassword,
    onSuccess: (user) => {
      queryClient.setQueryData(AUTH_SESSION_QUERY_KEY, user);
      toast.success(t("signInSuccess"));
      router.replace(getPostLoginRoute(user.role));
    },
    onError: (error) => {
      toast.error(error.message || t("signInErrorFallback"));
    },
  });
  return { isPending, mutate, isError, error };
}
