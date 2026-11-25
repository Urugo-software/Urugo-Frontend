"use client";

import { useTranslations } from "next-intl";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";

interface RenterSearchFilterProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

export function RenterSearchFilter({
  searchQuery,
  onSearchChange,
}: RenterSearchFilterProps) {
  const t = useTranslations("landlord.renters.list");

  return (
    <DashboardSearchInput
      value={searchQuery}
      onChange={onSearchChange}
      placeholder={t("searchPlaceholder")}
      label={t("searchAria")}
      className="w-full"
    />
  );
}
