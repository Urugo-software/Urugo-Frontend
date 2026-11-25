"use client";

import Link from "next/link";
import { Building2, MapPin, ShieldCheck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { PropertyCover } from "@/components/dashboard/landlord/properties/PropertyCover";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import type { LandlordPropertyItem, LandlordRenter } from "@/types/landlord";
import { PaymentStatusBadge, TenancyStatusBadge } from "./StatusBadges";

interface TenancyHeaderProps {
  renter: LandlordRenter;
  property?: LandlordPropertyItem;
}

export function TenancyHeader({ renter, property }: TenancyHeaderProps) {
  const t = useTranslations("landlord.tenancies.detail");
  const tBadges = useTranslations("landlord.tenancies.badges");
  const tTypes = useTranslations("landlord.properties.types");
  const locale = useLocale() as AppLocale;
  const propertyTitle = property?.name ?? renter.propertyName;
  const showUnit = property ? property.hasUnits : true;
  const tenancyBadgeLabel =
    renter.tenancyStatus === "Active"
      ? tBadges("activeTenancy")
      : renter.tenancyStatus === "Ending"
        ? tBadges("endingTenancy")
        : tBadges("closedTenancy");

  return (
    <section
      aria-labelledby="tenancy-details-heading"
      className="overflow-hidden border border-line bg-white shadow-2xs"
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative h-48 w-full shrink-0 border-b border-line bg-surface md:h-auto md:w-72 md:border-b-0 md:border-r lg:w-80">
          <PropertyCover
            key={property?.image ?? renter.id}
            src={property?.image}
            className="h-full w-full"
          />
          {property?.type && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 border border-line bg-white/95 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-ink shadow-2xs">
              <Building2 aria-hidden="true" className="size-3.5 text-brand" />
              {tTypes(property.type)}
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 space-y-1.5">
              <span className="block text-xs font-semibold uppercase tracking-wider text-brand">
                {t("tenancyDetailsEyebrow")}
              </span>
              <h1
                id="tenancy-details-heading"
                className="text-xl font-bold tracking-tight text-ink sm:text-2xl"
              >
                {property ? (
                  <Link
                    href={`/landlord/tenancies?property=${encodeURIComponent(property.id)}`}
                    className="hover:text-brand hover:underline"
                  >
                    {propertyTitle}
                  </Link>
                ) : (
                  propertyTitle
                )}
                {showUnit && (
                  <>
                    {" "}
                    <span className="font-normal text-faint">&mdash;</span>{" "}
                    <span>{t("unitLabel", { unit: renter.unitNumber })}</span>
                  </>
                )}
              </h1>

              {property?.location && (
                <p className="inline-flex items-center gap-1.5 text-sm text-body">
                  <MapPin aria-hidden="true" className="size-4 shrink-0 text-faint" />
                  <span>{property.location}</span>
                </p>
              )}

              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-sm text-body">
                <span>
                  {t("tenantLabel")}{" "}
                  <strong className="font-semibold text-ink">{renter.name}</strong>
                </span>
                {renter.isIdentityVerified && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                    <ShieldCheck aria-hidden="true" className="size-3.5" />
                    {t("verified")}
                  </span>
                )}
                <span className="text-faint">&middot;</span>
                <span>{renter.phone}</span>
              </p>
            </div>

            <TenancyStatusBadge
              status={renter.tenancyStatus}
              label={tenancyBadgeLabel}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-line pt-5 sm:grid-cols-3">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-faint">
                {t("leaseStarted")}
              </span>
              <span className="mt-1.5 block text-sm font-semibold text-ink">
                {renter.startDate}
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-faint">
                {t("rentPayment")}
              </span>
              <div className="mt-1.5">
                <PaymentStatusBadge status={renter.paymentStatus} />
              </div>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-faint">
                {t("monthlyRent")}
              </span>
              <span className="mt-1.5 block font-ibm text-base font-bold text-brand">
                {formatRwfLocalized(renter.monthlyRentRwf, locale)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
