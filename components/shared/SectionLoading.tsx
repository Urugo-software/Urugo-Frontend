"use client";

import { useTranslations } from "next-intl";

import { Swirling } from "@/components/swirling";

interface SectionLoadingProps {
  message?: string;
}

function SectionLoading({ message }: SectionLoadingProps) {
  const t = useTranslations("common.states");
  const displayMessage = message ?? t("loading");

  return (
    <div className="flex min-h-64 w-full items-center justify-center text-sm text-body">
      <div
        className="flex items-center gap-2.5"
        role="status"
        aria-live="polite"
      >
        <Swirling aria-hidden="true" className="size-9 shrink-0 text-brand" />
        <span>{displayMessage}</span>
      </div>
    </div>
  );
}

export default SectionLoading;
