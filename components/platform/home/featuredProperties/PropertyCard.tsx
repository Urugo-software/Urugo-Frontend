"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { House, MapPin } from "lucide-react";

import OnLoadSkeleton from "@/components/shared/OnLoadSkeleton";

interface PropertyCardProps {
  id: string;
  image: StaticImageData | string;
  title: string;
  district: string;
  province: string;
  monthlyRent: string;
  amenities: string[];
}

const AMENITY_LABEL_KEYS = {
  "water included": "waterIncluded",
  "wifi included": "wifiIncluded",
  "24/7 security": "security247",
  "laundry area": "laundryArea",
  "private parking": "privateParking",
  "spacious living room": "spaciousLivingRoom",
  "furnished living room": "furnishedLivingRoom",
} as const;

function PropertyCard({
  id,
  image,
  title,
  district,
  province,
  monthlyRent,
  amenities,
}: PropertyCardProps) {
  const t = useTranslations("public.home.featured");
  const tStatuses = useTranslations("common.statuses");
  const tAmenities = useTranslations("properties.amenityLabels");
  const [isImageLoaded, setImageLoaded] = useState(false);

  const translatedAmenities = amenities.map((name) => {
    const key =
      AMENITY_LABEL_KEYS[
        name.trim().toLowerCase() as keyof typeof AMENITY_LABEL_KEYS
      ];
    return key ? tAmenities(key) : name;
  });

  return (
    <article className="flex h-[420px] w-full flex-none flex-col overflow-hidden rounded-sm border border-brand/20 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_18px_40px_-18px_rgba(14,17,22,.22)] md:max-w-[400px]">
      <Link
        href={`/properties/${id}`}
        className="relative block h-full overflow-hidden"
      >
        {!isImageLoaded && <OnLoadSkeleton />}

        <Image
          fill
          src={image}
          alt={title}
          sizes="(max-width:768px) 100vw, 400px"
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[12.5px] font-semibold text-brand shadow-sm">
          <span className="h-2 w-2 rounded-full bg-brand" />
          {tStatuses("available")}
        </span>
      </Link>

      <div className="p-4 pb-6 pt-5">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/properties/${id}`} className="group min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold tracking-tight text-ink transition-colors group-hover:text-brand">
              {title}
            </h3>
          </Link>

          <div className="shrink-0 text-right">
            <div className="font-ibm text-sm font-bold text-brand">
              {monthlyRent}
            </div>
            <div className="text-[12.5px] text-faint">{t("perMonth")}</div>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm tracking-tight text-body">
          <MapPin
            aria-hidden="true"
            size={15}
            className="shrink-0 text-faint"
          />
          <span className="truncate capitalize">
            {district}, {province}
          </span>
        </div>

        <div className="my-4 border-t border-line" />

        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 text-sm text-ink">
            <House
              aria-hidden="true"
              size={14}
              className="shrink-0 text-faint"
            />
            <span className="truncate text-[13px]">
              {translatedAmenities.join(", ") || t("standardAmenities")}
            </span>
          </div>

          <span className="shrink-0 text-xs text-faint">
            {t("amenityCount", { count: amenities.length })}
          </span>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;
