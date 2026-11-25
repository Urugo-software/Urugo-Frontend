import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LoginForm } from "@/components/platform/auth/sign-in/LoginForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.meta");

  return {
    title: t("signInTitle"),
    description: t("signInDescription"),
  };
}

function SignInPage() {
  return (
    <div className="flex w-full justify-center">
      <LoginForm className="w-full" />
    </div>
  );
}

export default SignInPage;
