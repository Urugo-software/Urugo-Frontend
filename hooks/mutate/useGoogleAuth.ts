import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

import type { GoogleAuthInput } from "@/api/auth.api";
import { AUTH_SESSION_QUERY_KEY, loginWithGoogle } from "@/services/auth.service";
import { getPostLoginRoute } from "@/utils/auth-helpers";

export function useGoogleAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const tLogin = useTranslations("auth.login");
  const tSignUp = useTranslations("auth.signUp");

  const mutation = useMutation({
    mutationFn: (input: GoogleAuthInput) => loginWithGoogle(input),
    onSuccess: (user, input) => {
      queryClient.setQueryData(AUTH_SESSION_QUERY_KEY, user);
      toast.success(input.intent === "register" ? tSignUp("googleRegistrationSuccess") : tLogin("signInSuccess"));
      router.replace(getPostLoginRoute(user.role));
    },
    onError: (error, input) => {
      const fallback = input.intent === "register"
        ? tSignUp("googleRegistrationFailed")
        : tLogin("signInErrorFallback");
      toast.error(error.message || fallback);
    },
  });

  return mutation;
}
