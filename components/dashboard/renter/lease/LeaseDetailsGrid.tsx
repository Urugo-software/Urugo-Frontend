"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { UserAvatar } from "@/components/shared/UserAvatar";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import type { RenterLease } from "@/types/renter";
import { getOrdinalSuffix } from "@/utils/rent-schedule-utils";

interface Props {
  lease: RenterLease;
}

export function LeaseDetailsGrid({ lease }: Props) {
  const t = useTranslations("renter.lease");
  const locale = useLocale() as AppLocale;

  const dueDayDisplay =
    locale === "en"
      ? `${lease.paymentDueDay}${getOrdinalSuffix(lease.paymentDueDay)}`
      : String(lease.paymentDueDay);

  const termRows = [
    { key: "startDate", label: t("startDate"), value: lease.startDate },
    {
      key: "endDate",
      label: t("endDate"),
      value: lease.endDate ?? t("openEndedTenancy"),
    },
    {
      key: "monthlyRent",
      label: t("monthlyRent"),
      value: formatRwfLocalized(lease.monthlyRentRwf, locale),
    },
    {
      key: "paymentDue",
      label: t("paymentDue"),
      value: t("paymentDueValue", { day: dueDayDisplay }),
    },
    ...(lease.securityDepositRwf !== undefined
      ? [
          {
            key: "securityDeposit",
            label: t("securityDeposit"),
            value: formatRwfLocalized(lease.securityDepositRwf, locale),
          },
        ]
      : []),
    ...(lease.noticePeriodDays !== undefined
      ? [
          {
            key: "noticePeriod",
            label: t("noticePeriod"),
            value: t("noticeDays", { days: lease.noticePeriodDays }),
          },
        ]
      : []),
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="border border-line bg-white p-5 shadow-2xs">
        <h3 className="mb-4 text-base font-bold text-ink">{t("termsTitle")}</h3>
        <div className="space-y-3 text-sm">
          {termRows.map((row, idx) => (
            <div
              key={row.key}
              className={`flex items-center justify-between gap-4${
                idx < termRows.length - 1 ? " border-b border-line pb-2.5" : ""
              }`}
            >
              <span className="text-body">{row.label}</span>
              <span className="text-right font-semibold text-ink">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-line bg-white p-5 shadow-2xs">
        <h3 className="mb-4 text-base font-bold text-ink">
          {t("propertyAndLandlord")}
        </h3>

        <div className="mb-4 flex items-start gap-2 text-sm text-body">
          <MapPin className="mt-0.5 size-4 shrink-0 text-faint" />
          <span>{lease.address}</span>
        </div>

        <div className="flex items-start gap-4 border-t border-line pt-4">
          <UserAvatar name={lease.landlordName} className="size-12 text-sm" />
          <div className="min-w-0 space-y-2">
            <div className="text-sm font-bold text-ink">
              {lease.landlordName}
            </div>
            <a
              href={`tel:${lease.landlordPhone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 text-sm text-body hover:text-ink hover:underline"
            >
              <Phone className="size-3.5 text-faint" />
              <span>{lease.landlordPhone}</span>
            </a>
            <a
              href={`mailto:${lease.landlordEmail}`}
              className="flex items-center gap-1.5 text-sm text-body hover:text-ink hover:underline"
            >
              <Mail className="size-3.5 text-faint" />
              <span className="truncate">{lease.landlordEmail}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
