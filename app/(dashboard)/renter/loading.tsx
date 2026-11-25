"use client";

import { useTranslations } from "next-intl";
import SectionLoading from "@/components/shared/SectionLoading";

export default function RenterLoading() {
  const t = useTranslations("renter.workspace");

  return (
    <div className="flex min-h-0 flex-1 items-center justify-center bg-surface/30 p-8">
      <SectionLoading message={t("loadingWorkspace")} />
    </div>
  );
}
