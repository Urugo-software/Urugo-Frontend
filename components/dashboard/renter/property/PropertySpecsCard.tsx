"use client";

import { Bath, BedDouble, Car, Check, Wifi } from "lucide-react";
import { useTranslations } from "next-intl";
import type { RenterProperty } from "@/types/renter";
import CardHeader from "./CardHeader";

const AMENITY_KEYS: Record<string, string> = {
  "Dedicated parking bay": "dedicatedParking",
  "High-speed Wi-Fi": "highSpeedWifi",
  "24/7 gated security": "gatedSecurity",
  "Backup water tank": "backupWaterTank",
  "Balcony view": "balconyView",
};

export function PropertySpecsCard({ property }: { property: RenterProperty }) {
  const t = useTranslations("renter.property.specsCard");

  const specs = [
    { key: "bedrooms", label: t("bedrooms"), value: String(property.bedrooms), icon: BedDouble },
    { key: "bathrooms", label: t("bathrooms"), value: String(property.bathrooms), icon: Bath },
    {
      key: "parking",
      label: t("parking"),
      value: property.parking ? t("parkingIncluded") : t("parkingNone"),
      icon: Car,
    },
    {
      key: "wifi",
      label: t("wifi"),
      value: property.wifi ? t("wifiAvailable") : t("wifiNotIncluded"),
      icon: Wifi,
    },
  ];

  return (
    <div className="border border-line bg-white p-5 shadow-2xs md:col-span-2">
      <CardHeader title={t("title")} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {specs.map(({ key, label, value, icon: Icon }) => (
          <div key={key} className="border border-line bg-surface/40 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-faint">
              <Icon aria-hidden="true" className="size-3.5" />
              <span>{label}</span>
            </div>
            <div className="mt-1.5 text-sm font-bold text-ink">{value}</div>
          </div>
        ))}
      </div>

      {property.amenities && property.amenities.length > 0 && (
        <div className="mt-4 border-t border-line pt-4">
          <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-faint">
            {t("includedAmenities")}
          </h4>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {property.amenities.map((amenity) => {
              const amenityKey = AMENITY_KEYS[amenity];
              const label = amenityKey
                ? t(`amenities.${amenityKey}`)
                : amenity;
              return (
                <li
                  key={amenity}
                  className="flex items-center gap-2 text-sm text-body"
                >
                  <Check aria-hidden="true" className="size-4 shrink-0 text-success" />
                  <span>{label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
