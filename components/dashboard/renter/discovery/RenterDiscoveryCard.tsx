"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  Bath,
  BedDouble,
  Calendar,
  Car,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { ViewMode } from "@/components/dashboard/landlord/properties/PortfolioCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { cn } from "@/lib/utils";
import { parseListingPrice } from "@/utils/renter-helpers";

export interface DiscoveryListingItem {
  id: string;
  image: string | StaticImageData;
  headline: string;
  ownerName: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  parking: boolean;
  isVerified: boolean;
  availabilityStatus: string;
}

interface RenterDiscoveryCardProps {
  item: DiscoveryListingItem;
  viewMode?: ViewMode;
  onInquire: (item: DiscoveryListingItem) => void;
  onRequestViewing: (item: DiscoveryListingItem) => void;
}

export function RenterDiscoveryCard({
  item,
  viewMode = "grid",
  onInquire,
  onRequestViewing,
}: RenterDiscoveryCardProps) {
  const t = useTranslations("renter.discovery.card");
  const locale = useLocale() as AppLocale;
  const isList = viewMode === "list";
  const isAvailable = item.availabilityStatus.toLowerCase() === "available";
  const numericPrice = parseListingPrice(item.price);

  return (
    <article
      className={cn(
        "flex overflow-hidden border border-line bg-white shadow-2xs",
        isList ? "flex-col md:flex-row" : "flex-col justify-between",
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-surface",
          isList
            ? "h-44 w-full border-b border-line md:h-auto md:w-56 md:border-b-0 md:border-r"
            : "h-44 w-full border-b border-line",
        )}
      >
        <Image
          src={item.image}
          alt={item.headline}
          fill
          sizes={
            isList
              ? "(min-width: 768px) 224px, 100vw"
              : "(min-width: 1280px) 33vw, 100vw"
          }
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="space-y-2.5 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <StatusBadge
              label={isAvailable ? "Available" : "Occupied"}
              tone={isAvailable ? "success" : "warning"}
            />
            {item.isVerified && (
              <StatusBadge label="Verified" tone="info" />
            )}
          </div>

          <div>
            <Link
              href={`/properties/${item.id}`}
              className="block truncate text-base font-bold text-ink hover:text-brand-blue hover:underline"
            >
              {item.headline}
            </Link>
            <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-body">
              <MapPin
                aria-hidden="true"
                className="size-3.5 shrink-0 text-faint"
              />
              <span className="truncate">{item.location}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-body">
            <span className="inline-flex items-center gap-1">
              <BedDouble aria-hidden="true" className="size-3.5 text-faint" />
              {t("bed", { count: item.beds })}
            </span>
            <span className="inline-flex items-center gap-1">
              <Bath aria-hidden="true" className="size-3.5 text-faint" />
              {t("bath", { count: item.baths })}
            </span>
            {item.parking && (
              <span className="inline-flex items-center gap-1">
                <Car aria-hidden="true" className="size-3.5 text-faint" />
                {t("parking")}
              </span>
            )}
          </div>

          <div className="pt-1 font-ibm text-base font-bold text-ink">
            {formatRwfLocalized(numericPrice, locale)}{" "}
            <span className="font-sans text-xs font-normal text-faint">
              {t("perMonth")}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-line bg-surface/40 px-4 py-3">
          <Button
            type="button"
            size="sm"
            onClick={() => onRequestViewing(item)}
            className="h-8 flex-1 cursor-pointer rounded-none text-xs"
          >
            <Calendar aria-hidden="true" className="size-3.5" />
            {t("requestVisit")}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => onInquire(item)}
            className="h-8 flex-1 cursor-pointer rounded-none text-xs"
          >
            <MessageSquare aria-hidden="true" className="size-3.5" />
            {t("inquire")}
          </Button>
        </div>
      </div>
    </article>
  );
}
