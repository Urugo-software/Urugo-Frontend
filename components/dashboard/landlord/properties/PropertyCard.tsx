"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Layers, Pencil } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { StatusBadge, type StatusTone } from "@/components/shared/StatusBadge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { LandlordPropertyItem, ListingStatus } from "@/types/landlord";
import { formatPropertyRent } from "@/utils/format";
import { PortfolioCard, type ViewMode } from "./PortfolioCard";

const LISTING_TONE: Record<ListingStatus, StatusTone> = {
  Published: "success",
  Draft: "neutral",
  Paused: "warning",
  Rented: "info",
  Archived: "neutral",
};

const OCCUPANCY_TONE: Record<
  NonNullable<LandlordPropertyItem["status"]>,
  StatusTone
> = {
  Occupied: "success",
  Partial: "info",
  Vacant: "warning",
};

export function PropertyCard({
  property,
  viewMode = "grid",
  membershipActions,
}: {
  property: LandlordPropertyItem;
  viewMode?: ViewMode;
  membershipActions?: ReactNode;
}) {
  const t = useTranslations("landlord.properties");
  const locale = useLocale() as AppLocale;
  const serviceMode = useLandlordWorkspace((s) => s.serviceMode);
  const { id, name, type, location, image, status, hasUnits, totalUnits, occupiedUnits } =
    property;
  const listingStatus: ListingStatus =
    property.listingStatus ?? (status === "Occupied" ? "Rented" : "Published");
  const monthlyRent = formatPropertyRent(property);

  const listingStatusLabel =
    listingStatus === "Rented" ? t("statuses.rentedBadge") : listingStatus;
  const occupancyStatusLabel =
    status === "Partial" ? t("statuses.partialBadge") : status;

  return (
    <PortfolioCard
      name={name}
      location={location}
      cover={image}
      mode={viewMode}
      menuId={`property-menu-${id}`}
      action={
        <Link
          href={`/landlord/properties/${encodeURIComponent(id)}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand-blue hover:underline"
        >
          <span>{t("card.viewProperty")}</span>
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      }
      menu={
        <>
          <DropdownMenuItem
            render={
              <Link
                href={`/landlord/properties/${encodeURIComponent(id)}/edit`}
              />
            }
          >
            <Pencil aria-hidden="true" /> {t("card.editProperty")}
          </DropdownMenuItem>
          {serviceMode === "managed" && (
            <DropdownMenuItem
              render={
                <Link
                  href={`/landlord/tenancies?property=${encodeURIComponent(id)}`}
                />
              }
            >
              <Layers aria-hidden="true" />{" "}
              {hasUnits ? t("card.unitsAndLeases") : t("card.manageLease")}
            </DropdownMenuItem>
          )}
          {membershipActions}
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
        <span className="tracking-wide text-body">{t(`types.${type}`)}</span>
        <span aria-hidden="true" className="text-line">&middot;</span>
        <StatusBadge
          label={listingStatusLabel}
          tone={LISTING_TONE[listingStatus]}
        />
        {serviceMode === "managed" && status && occupancyStatusLabel && (
          <>
            <span aria-hidden="true" className="text-line">&middot;</span>
            <StatusBadge
              label={occupancyStatusLabel}
              tone={OCCUPANCY_TONE[status]}
            />
          </>
        )}
      </div>

      <dl className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {monthlyRent !== undefined && (
          <div>
            <dt className="text-xs text-faint">
              {hasUnits ? t("card.expectedMonthlyRent") : t("card.monthlyRent")}
            </dt>
            <dd className="font-ibm font-semibold text-ink">
              {formatRwfLocalized(monthlyRent, locale)}
            </dd>
          </div>
        )}
        {hasUnits && totalUnits !== undefined && (
          <div>
            <dt className="text-xs text-faint">{t("card.unitsLabel")}</dt>
            <dd className="font-ibm font-semibold text-ink">
              {t("card.unitsOccupiedValue", {
                occupied: occupiedUnits ?? 0,
                total: totalUnits,
              })}
            </dd>
          </div>
        )}
      </dl>
    </PortfolioCard>
  );
}
