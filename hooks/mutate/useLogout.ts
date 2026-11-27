import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

import { logoutUserService } from "@/api/auth.api";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations("auth.login");

  return useMutation({
    mutationFn: logoutUserService,
    onSuccess: () => {
      queryClient.clear();
      toast.success(t("signOutSuccess"));
      router.replace("/auth/sign-in");
    },
    onError: (error: Error) => toast.error(error.message || t("signOutError")),
  });
}
