import type { Metadata } from "next";
import { ForgotPasswordFlow } from "@/components/platform/auth/forgot-password/ForgotPasswordFlow";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your Urugo account password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex w-full justify-center">
      <ForgotPasswordFlow />
    </div>
  );
}
