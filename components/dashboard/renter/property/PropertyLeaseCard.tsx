"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import type { RenterProperty } from "@/types/renter";
import CardHeader from "./CardHeader";

export function PropertyLeaseCard({ property }: { property: RenterProperty }) {
  const t = useTranslations("renter.property.leaseCard");
  const locale = useLocale() as AppLocale;

  return (
    <div className="flex flex-col justify-between border border-line bg-white p-5 shadow-2xs">
      <div>
        <div className="mb-4 flex items-center justify-between gap-2">
          <CardHeader title={t("title")} />
          <StatusBadge
            label={property.leaseStatus}
            tone={property.leaseStatus === "Active" ? "success" : "warning"}
          />
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <span className="text-body">{t("monthlyRent")}</span>
            <span className="font-ibm font-bold text-ink">
              {formatRwfLocalized(property.monthlyRentRwf, locale)}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <span className="text-body">{t("moveInDate")}</span>
            <span className="font-semibold text-ink">{property.moveInDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body">{t("leaseTerm")}</span>
            <span className="font-semibold text-ink">
              {property.leaseEnd ?? t("openEnded")}
            </span>
          </div>
        </div>
      </div>

      <Link
        href="/renter/lease"
        className="mt-5 flex items-center justify-between border-t border-line pt-3 text-xs font-semibold text-brand-blue hover:underline"
      >
        <span>{t("viewFullLease")}</span>
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}
