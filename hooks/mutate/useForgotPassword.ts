import { useMutation } from "@tanstack/react-query";

import {
  requestPasswordResetCode,
  resetPassword,
  verifyPasswordResetCode,
} from "@/api/password-reset.api";

export function useForgotPassword() {
  const requestCode = useMutation({ mutationFn: requestPasswordResetCode });

  // Keep the code, new password, and reset proof out of the mutation cache.
  return {
    requestCode: (email: string) => requestCode.mutateAsync(email),
    verifyCode: verifyPasswordResetCode,
    resetPassword,
  };
}
