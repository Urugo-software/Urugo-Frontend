import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ForgotPasswordFlow } from "@/components/platform/auth/forgot-password/ForgotPasswordFlow";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.meta");

  return {
    title: t("forgotPasswordTitle"),
    description: t("forgotPasswordDescription"),
  };
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex w-full justify-center">
      <ForgotPasswordFlow />
    </div>
  );
}
