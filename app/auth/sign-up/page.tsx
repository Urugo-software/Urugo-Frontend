import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { SignUpWizard } from "@/components/platform/auth/sign-up/SignUpWizard";
import SectionLoading from "@/components/shared/SectionLoading";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.meta");

  return {
    title: t("signUpTitle"),
    description: t("signUpDescription"),
  };
}

async function SignUpPage() {
  const t = await getTranslations("auth.signUp");

  return (
    <div className="flex w-full items-center justify-center self-stretch">
      <Suspense fallback={<SectionLoading message={t("loading")} />}>
        <SignUpWizard />
      </Suspense>
    </div>
  );
}

export default SignUpPage;
