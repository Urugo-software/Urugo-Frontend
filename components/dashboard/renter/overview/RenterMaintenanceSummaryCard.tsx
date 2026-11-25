"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function RenterMaintenanceSummaryCard({ count }: { count: number }) {
  const t = useTranslations("renter.overview.maintenanceCard");

  return (
    <div className="flex flex-col justify-between border border-line bg-white p-5 shadow-2xs">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-faint">
          {t("title")}
        </span>
        <StatusBadge
          label={count > 0 ? "Active" : t("allClear")}
          tone={count > 0 ? "info" : "success"}
        />
      </div>

      <div className="my-3.5">
        <div className="font-ibm text-2xl font-bold text-ink">
          {count === 1
            ? t("openRequestsSingle", { count })
            : t("openRequestsPlural", { count })}
        </div>
        <p className="mt-1.5 text-xs text-body">
          {count > 0 ? t("activeDescription") : t("clearDescription")}
        </p>
      </div>

      <Link
        href="/renter/maintenance"
        className="flex items-center justify-between border-t border-line pt-3 text-xs font-semibold text-brand-blue hover:underline"
      >
        <span>{t("manageRequests")}</span>
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}
