"use client";

import Link from "next/link";
import { Phone, ShieldCheck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { UserAvatar } from "@/components/shared/UserAvatar";
import {
  PaymentStatusBadge,
  TenancyStatusBadge,
} from "@/components/dashboard/landlord/tenancies/StatusBadges";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import type { LandlordRenter } from "@/types/landlord";

interface RenterDetailHeaderProps {
  renter: LandlordRenter;
}

export function RenterDetailHeader({ renter }: RenterDetailHeaderProps) {
  const t = useTranslations("landlord.renters.detail");
  const locale = useLocale() as AppLocale;

  return (
    <section className="space-y-5 border border-line bg-white p-6 shadow-2xs">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="flex min-w-0 items-center gap-4">
          <UserAvatar
            src={renter.avatar}
            name={renter.name}
            className="size-16 sm:size-20"
          />

          <div className="min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h1 className="text-xl font-bold text-ink sm:text-2xl">
                {renter.name}
              </h1>
              {renter.isIdentityVerified && (
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-success">
                  <ShieldCheck aria-hidden="true" className="size-4" />
                  {t("verified")}
                </span>
              )}
            </div>

            <p className="inline-flex items-center gap-1.5 text-sm text-body">
              <Phone aria-hidden="true" className="size-4 text-faint" />
              <span>{renter.phone}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div>
            <span className="block text-[12.5px] font-semibold uppercase tracking-wider text-faint">
              {t("tenancyStatusLabel")}
            </span>
            <div className="mt-1">
              <TenancyStatusBadge status={renter.tenancyStatus} />
            </div>
          </div>
          <div>
            <span className="block text-[12.5px] font-semibold uppercase tracking-wider text-faint">
              {t("monthlyRentLabel")}
            </span>
            <span className="mt-1 block font-ibm text-base font-bold text-brand">
              {formatRwfLocalized(renter.monthlyRentRwf, locale)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-4 text-sm text-body">
        <div>
          {t("propertyLabel")}{" "}
          {renter.propertyId ? (
            <Link
              href={`/landlord/tenancies?property=${encodeURIComponent(renter.propertyId)}`}
              className="font-semibold text-ink hover:text-brand hover:underline"
            >
              {renter.propertyName} · {t("unitLabel", { unit: renter.unitNumber })}
            </Link>
          ) : (
            <strong className="font-semibold text-ink">
              {renter.propertyName} · {t("unitLabel", { unit: renter.unitNumber })}
            </strong>
          )}
        </div>
        <div>
          {t("startedLabel")}{" "}
          <strong className="font-semibold text-ink">{renter.startDate}</strong>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <span>{t("paymentLabel")}</span>
          <PaymentStatusBadge status={renter.paymentStatus} />
        </div>
      </div>
    </section>
  );
}
