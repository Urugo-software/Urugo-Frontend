import { useMutation } from "@tanstack/react-query";

import {
  requestPasswordResetCode,
  resetPassword,
  verifyPasswordResetCode,
} from "@/api/password-reset.api";

export function useForgotPassword() {
  const requestCode = useMutation({
    mutationFn: ({ email, nationalId }: { email: string; nationalId: string }) =>
      requestPasswordResetCode(email, nationalId),
  });

  return {
    requestCode: (email: string, nationalId: string) => requestCode.mutateAsync({ email, nationalId }),
    verifyCode: verifyPasswordResetCode,
    resetPassword,
  };
}
