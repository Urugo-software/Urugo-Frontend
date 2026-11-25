"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

const AuthButtons = () => {
  const t = useTranslations("common.actions");

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Link
        href="/auth/sign-in"
        className="hidden h-10 items-center justify-center whitespace-nowrap rounded-full border border-line bg-white px-4 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white md:inline-flex"
      >
        {t("signIn")}
      </Link>
      <Link
        href="/auth/sign-up"
        className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full border border-brand bg-brand px-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-brand-deep"
      >
        {t("listYourProperty")}
      </Link>
    </div>
  );
};

export default AuthButtons;
