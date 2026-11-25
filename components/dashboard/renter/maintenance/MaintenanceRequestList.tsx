"use client";

import { Wrench } from "lucide-react";
import { useTranslations } from "next-intl";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import type { RenterMaintenance } from "@/types/renter";
import { MaintenanceRequestItem } from "./MaintenanceRequestItem";

interface MaintenanceRequestListProps {
  items: RenterMaintenance[];
  onSelect: (item: RenterMaintenance) => void;
  onClearFilters?: () => void;
}

export function MaintenanceRequestList({
  items,
  onSelect,
  onClearFilters,
}: MaintenanceRequestListProps) {
  const t = useTranslations("renter.maintenance");

  if (items.length === 0) {
    return (
      <EmptyStateBox
        icon={Wrench}
        title={t("emptyTitle")}
        description={onClearFilters ? t("emptyFiltered") : t("emptyDefault")}
        action={
          onClearFilters ? (
            <button
              type="button"
              onClick={onClearFilters}
              className="cursor-pointer border border-line bg-white px-4 py-2 text-xs font-semibold text-ink hover:bg-surface"
            >
              {t("clearFilters")}
            </button>
          ) : undefined
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((item) => (
        <MaintenanceRequestItem
          key={item.id}
          item={item}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
