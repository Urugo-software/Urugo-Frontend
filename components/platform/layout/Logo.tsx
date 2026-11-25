"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

function Logo() {
  const t = useTranslations("public.nav");

  return (
    <Link
      href="/"
      aria-label={t("logoAria")}
      className="inline-flex items-center text-xl font-extrabold tracking-tight text-brand transition-colors hover:text-brand-deep"
    >
      URUGO
    </Link>
  );
}

export default Logo;
