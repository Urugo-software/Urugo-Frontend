"use client";

import { useForgotPassword } from "@/hooks/mutations/useForgotPassword";

import { ForgotPasswordForm } from "./ForgotPasswordForm";

export function ForgotPasswordFlow() {
  const recovery = useForgotPassword();

  return <ForgotPasswordForm {...recovery} />;
}
