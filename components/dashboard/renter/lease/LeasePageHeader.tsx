"use client";

import { useTranslations } from "next-intl";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { getStatusTranslationKey } from "@/i18n/status-map";
import type { RenterLease } from "@/types/renter";

interface Props {
  lease: RenterLease;
}

export function LeasePageHeader({ lease }: Props) {
  const t = useTranslations("renter.lease");
  const tStatuses = useTranslations("common.statuses");
  const statusKey = getStatusTranslationKey(lease.status);
  const translatedStatus = statusKey ? tStatuses(statusKey) : lease.status;

  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-line pb-5">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          {t("title")}
        </h2>
        <p className="mt-1 text-sm text-body">
          {t("subtitle", {
            property: lease.propertyName,
            unit: lease.unitNumber,
          })}
        </p>
      </div>
      <StatusBadge
        label={t("leaseBadge", { status: translatedStatus })}
        tone={lease.status === "Active" ? "success" : "warning"}
        className="text-sm"
      />
    </div>
  );
}
