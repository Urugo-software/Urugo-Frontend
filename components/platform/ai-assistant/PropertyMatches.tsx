"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowUpRight, MapPin, ShieldCheck } from "lucide-react";

import { listed_properties } from "@/data/properties";

export interface PropertyMatchItem {
  id?: string;
  image: string | StaticImageData;
  name: string;
  location?: string;
  details: string;
  price: string;
  badge?: string;
  isVerified?: boolean;
}

interface PropertyMatchesProps {
  items?: PropertyMatchItem[];
  compact?: boolean;
  onNavigate?: () => void;
  onSelectProperty?: (name: string) => void;
}

export function PropertyMatches({
  items,
  compact = true,
  onNavigate,
  onSelectProperty,
}: PropertyMatchesProps) {
  const t = useTranslations("public.zoe.matches");
  const tStatuses = useTranslations("common.statuses");

  const resolvedItems: PropertyMatchItem[] =
    items ??
    listed_properties.slice(0, 3).map((item) => ({
      id: item.id,
      image: item.image,
      name: item.headline,
      location: item.location,
      details: `${t("beds", { count: item.beds })} · ${t("baths", { count: item.baths })}${item.parking ? ` · ${t("parking")}` : ""}`,
      price: `${item.price} ${item.currency}`,
      isVerified: item.isVerified,
    }));

  return (
    <div className="mt-2 flex w-full flex-col gap-3">
      <div
        className={
          compact
            ? "grid grid-cols-1 gap-3"
            : "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {resolvedItems.map((prop) => {
          const href = prop.id ? `/properties/${prop.id}` : "/properties";
          const handleClick = () => {
            onSelectProperty?.(prop.name);
            onNavigate?.();
          };

          return (
            <div
              key={prop.id ?? prop.name}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-white p-3 shadow-2xs transition-all duration-200 hover:border-brand/40 hover:shadow-sm"
            >
              <Link
                href={href}
                onClick={handleClick}
                className="relative block h-28 w-full overflow-hidden rounded-lg bg-surface"
              >
                <Image
                  src={prop.image}
                  alt={prop.name}
                  fill
                  sizes={
                    compact ? "360px" : "(min-width: 1024px) 280px, 100vw"
                  }
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {(prop.isVerified || prop.badge) && (
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[12.5px] font-semibold text-brand shadow-xs">
                    <ShieldCheck
                      aria-hidden="true"
                      className="size-3 text-brand"
                    />
                    {prop.badge ?? tStatuses("verified")}
                  </span>
                )}
              </Link>

              <div className="mt-2.5 flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={href}
                    onClick={handleClick}
                    className="line-clamp-1 text-sm font-bold text-ink transition-colors group-hover:text-brand"
                  >
                    {prop.name}
                  </Link>
                  {prop.location && (
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-body">
                      <MapPin
                        aria-hidden="true"
                        className="size-3 shrink-0 text-faint"
                      />
                      <span className="truncate">{prop.location}</span>
                    </p>
                  )}
                  <p className="mt-1 text-xs text-faint">{prop.details}</p>
                </div>

                <div className="mt-2.5 flex items-center justify-between border-t border-line/60 pt-2">
                  <div>
                    <span className="block text-[12.5px] text-faint">
                      {t("monthlyRent")}
                    </span>
                    <span className="font-mono text-sm font-bold text-brand">
                      {prop.price}
                    </span>
                  </div>

                  <Link
                    href={href}
                    onClick={handleClick}
                    className="inline-flex items-center gap-1 rounded-lg bg-brand-tint px-3 py-1.5 text-xs font-bold text-brand transition-colors hover:bg-brand hover:text-white"
                  >
                    <span>{t("view")}</span>
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
