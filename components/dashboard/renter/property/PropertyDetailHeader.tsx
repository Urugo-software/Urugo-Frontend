"use client";

import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { PropertyCover } from "@/components/dashboard/landlord/properties/PropertyCover";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { getStatusTranslationKey } from "@/i18n/status-map";

interface PropertyDetailHeaderProps {
  name: string;
  address: string;
  image?: string;
  leaseStatus: string;
}

export function PropertyDetailHeader({
  name,
  address,
  image,
  leaseStatus,
}: PropertyDetailHeaderProps) {
  const t = useTranslations("renter.property");
  const tStatuses = useTranslations("common.statuses");
  const statusKey = getStatusTranslationKey(leaseStatus);
  const translatedStatus = statusKey ? tStatuses(statusKey) : leaseStatus;

  return (
    <section className="mb-6 overflow-hidden border border-line bg-white shadow-2xs">
      <div className="h-48 w-full border-b border-line bg-surface sm:h-56">
        <PropertyCover src={image} className="h-full w-full" />
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 p-5 sm:p-6">
        <div className="min-w-0">
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {name}
          </h2>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-body">
            <MapPin aria-hidden="true" className="size-4 shrink-0 text-faint" />
            <span>{address}</span>
          </p>
        </div>
        <StatusBadge
          label={t("leaseBadge", { status: translatedStatus })}
          tone={leaseStatus === "Active" ? "success" : "warning"}
          className="text-sm"
        />
      </div>
    </section>
  );
}
