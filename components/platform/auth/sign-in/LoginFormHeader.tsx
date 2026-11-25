"use client";

import { useTranslations } from "next-intl";

import { AuthFormHeader } from "../AuthFormHeader";

function LoginFormHeader() {
  const t = useTranslations("auth.login");

  return (
    <AuthFormHeader
      title={t("title")}
      description={t("description")}
    />
  );
}

export default LoginFormHeader;
