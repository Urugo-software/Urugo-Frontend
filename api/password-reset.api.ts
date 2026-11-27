import api, { AxiosErrorHandler } from "@/lib/axios";

async function postPasswordRecovery(path: string, body: Record<string, string>) {
  try {
    await api.post(path, body);
  } catch (error) {
    AxiosErrorHandler(error);
  }
}

export function requestPasswordResetCode(email: string, nationalId: string): Promise<void> {
  return postPasswordRecovery("/api/auth/send-reset-otp", { email, nationalId });
}

export function verifyPasswordResetCode(code: string): Promise<void> {
  return postPasswordRecovery("/api/auth/verify-otp", { otp: code });
}

export function resetPassword(password: string, confirmation: string): Promise<void> {
  return postPasswordRecovery("/api/auth/reset-password", {
    newPassword: password,
    confirmPassword: confirmation,
  });
}
