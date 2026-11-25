"use client";

import { useLocale, useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";

import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useUiStore } from "@/store/ui.store";
import type { Property } from "@/types/properties";
import { parseNumericPrice } from "@/utils/public-properties";
import LandlordCard from "./LandlordCard";
import { PropertyLeadActions } from "./PropertyLeadActions";

interface PropertySidebarProps {
  property: Property;
}

export default function PropertySidebar({ property }: PropertySidebarProps) {
  const t = useTranslations("properties");
  const locale = useLocale() as AppLocale;
  const openAssistant = useUiStore((s) => s.openAssistant);
  const monthlyPrice = parseNumericPrice(property.price);
  const formattedPrice = formatRwfLocalized(monthlyPrice, locale);

  const perPeriodLabel =
    property.period.toLowerCase() === "month"
      ? t("periods.perMonth")
      : t("details.sidebar.perPeriod", { period: property.period });

  const resolveAvailableFrom = (value: string) => {
    const normalized = value.trim().toLowerCase();
    if (normalized === "immediately") return t("availability.immediately");
    if (normalized === "next month") return t("availability.nextMonth");
    return value;
  };

  const handleAskAboutProperty = () => {
    openAssistant(
      t("details.sidebar.askAboutPrompt", {
        headline: property.headline,
        location: property.location,
        price: formattedPrice,
      }),
    );
  };

  return (
    <aside aria-label={t("details.sidebar.asideAria")}>
      <div className="sticky top-24 border border-line bg-white p-5.5 sm:p-6.5">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
          <LandlordCard landlord={property.landlord} />

          <div className="text-right">
            <div className="font-mono text-xl font-extrabold text-brand">
              {formattedPrice}
            </div>
            <div className="text-xs font-medium text-faint">
              {perPeriodLabel}
            </div>
          </div>
        </div>

        <PropertyLeadActions
          propertyId={property.id}
          propertyTitle={property.headline}
          landlordPhone={property.landlord?.phone}
        />

        <dl className="mt-4 divide-y divide-line border-t border-line text-[13.5px]">
          <div className="flex justify-between py-2.5">
            <dt className="text-body">{t("details.sidebar.bedrooms")}</dt>
            <dd className="font-semibold text-ink">{property.beds}</dd>
          </div>
          <div className="flex justify-between py-2.5">
            <dt className="text-body">{t("details.sidebar.bathrooms")}</dt>
            <dd className="font-semibold text-ink">{property.baths}</dd>
          </div>
          <div className="flex justify-between py-2.5">
            <dt className="text-body">{t("details.sidebar.parking")}</dt>
            <dd className="font-semibold text-ink">
              {property.parking
                ? t("details.sidebar.included")
                : t("details.sidebar.notIncluded")}
            </dd>
          </div>
          <div className="flex justify-between py-2.5">
            <dt className="text-body">{t("details.sidebar.availableFrom")}</dt>
            <dd className="font-semibold text-ink">
              {resolveAvailableFrom(property.availableFrom)}
            </dd>
          </div>
        </dl>

        <div className="mt-5 rounded-[14px] border border-line bg-surface p-4.5">
          <div className="mb-1 flex items-center gap-1.5 text-[13.5px] font-bold text-ink">
            <Sparkles aria-hidden="true" className="size-4 text-brand" />
            <span>{t("details.sidebar.askZoeTitle")}</span>
          </div>

          <p className="mb-3 text-[12.5px] leading-relaxed text-body">
            {t("details.sidebar.askZoeDescription")}
          </p>

          <button
            type="button"
            onClick={handleAskAboutProperty}
            className="flex w-full cursor-pointer justify-center rounded-lg bg-brand px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-deep"
          >
            {t("details.sidebar.askAboutHome")}
          </button>
        </div>
      </div>
    </aside>
  );
}
