"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { Button } from "@/components/ui/button";
import { useRenterMaintenance } from "@/hooks/query/renter.hooks";
import { getStatusTranslationKey } from "@/i18n/status-map";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { MaintenanceStatus, RenterMaintenance } from "@/types/renter";
import { MaintenanceHeader } from "./MaintenanceHeader";
import { MaintenanceRequestList } from "./MaintenanceRequestList";
import { CreateMaintenanceModal } from "./CreateMaintenanceModal";
import { MaintenanceDetailModal } from "./MaintenanceDetailModal";

const STATUS_FILTERS: Array<"all" | MaintenanceStatus> = [
  "all",
  "Pending",
  "In Progress",
  "Resolved",
  "Rejected",
];

export function RenterMaintenanceView() {
  const t = useTranslations("renter.maintenance");
  const tStatuses = useTranslations("common.statuses");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RenterMaintenance | null>(
    null,
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | MaintenanceStatus>(
    "all",
  );
  const { isLoading, isError, refetch } = useRenterMaintenance();
  const items = useRenterWorkspace((s) => s.maintenance);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (!q) return true;
      return `${item.title} ${item.category} ${item.description}`
        .toLowerCase()
        .includes(q);
    });
  }, [items, search, statusFilter]);

  if (isLoading) {
    return <SectionLoading message={t("loading")} />;
  }
  if (isError) {
    return (
      <SectionError
        message={t("loadError")}
        onRetry={() => void refetch()}
      />
    );
  }

  const hasFilters = Boolean(search.trim()) || statusFilter !== "all";

  const getFilterLabel = (status: "all" | MaintenanceStatus) => {
    if (status === "all") return t("filterAll");
    const statusKey = getStatusTranslationKey(status);
    return statusKey ? tStatuses(statusKey) : status;
  };

  return (
    <div className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <MaintenanceHeader onOpenModal={() => setIsModalOpen(true)} />

      <div className="flex flex-wrap items-center justify-between gap-3 border border-line bg-white p-3 shadow-2xs">
        <DashboardSearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("searchPlaceholder")}
          label={t("searchLabel")}
          className="min-w-0 flex-1 basis-full sm:basis-64"
        />
        <div
          role="group"
          aria-label={t("filterAria")}
          className="flex flex-wrap items-center gap-1.5"
        >
          {STATUS_FILTERS.map((status) => (
            <Button
              key={status}
              type="button"
              size="sm"
              variant={statusFilter === status ? "default" : "outline"}
              onClick={() => setStatusFilter(status)}
              className="h-8 cursor-pointer rounded-none px-3 text-xs"
            >
              {getFilterLabel(status)}
            </Button>
          ))}
        </div>
      </div>

      <MaintenanceRequestList
        items={filtered}
        onSelect={setSelectedItem}
        onClearFilters={
          hasFilters
            ? () => {
                setSearch("");
                setStatusFilter("all");
              }
            : undefined
        }
      />

      {isModalOpen && (
        <CreateMaintenanceModal onClose={() => setIsModalOpen(false)} />
      )}
      <MaintenanceDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
