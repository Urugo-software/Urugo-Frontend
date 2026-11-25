"use client";

import { Sparkles } from "lucide-react";
import { useUiStore } from "@/store/ui.store";
import type { Property } from "@/types/properties";
import { formatRwf } from "@/utils/format";
import { parseNumericPrice } from "@/utils/public-properties";
import LandlordCard from "./LandlordCard";
import { PropertyLeadActions } from "./PropertyLeadActions";

interface PropertySidebarProps {
  property: Property;
}

export default function PropertySidebar({ property }: PropertySidebarProps) {
  const openAssistant = useUiStore((s) => s.openAssistant);
  const monthlyPrice = parseNumericPrice(property.price);

  const handleAskAboutProperty = () => {
    openAssistant(
      `Explain move-in costs for ${property.headline} in ${property.location} (${formatRwf(monthlyPrice)}/month).`,
    );
  };

  return (
    <aside aria-label="Property pricing and contact">
      <div className="sticky top-24 border border-line bg-white p-5.5 sm:p-6.5">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
          <LandlordCard landlord={property.landlord} />

          <div className="text-right">
            <div className="font-mono text-xl font-extrabold text-brand">
              {formatRwf(monthlyPrice)}
            </div>
            <div className="text-xs font-medium text-faint">
              per {property.period}
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
            <dt className="text-body">Bedrooms</dt>
            <dd className="font-semibold text-ink">{property.beds}</dd>
          </div>
          <div className="flex justify-between py-2.5">
            <dt className="text-body">Bathrooms</dt>
            <dd className="font-semibold text-ink">{property.baths}</dd>
          </div>
          <div className="flex justify-between py-2.5">
            <dt className="text-body">Parking</dt>
            <dd className="font-semibold text-ink">
              {property.parking ? "Included" : "Not included"}
            </dd>
          </div>
          <div className="flex justify-between py-2.5">
            <dt className="text-body">Available from</dt>
            <dd className="font-semibold text-ink">{property.availableFrom}</dd>
          </div>
        </dl>

        <div className="mt-5 rounded-[14px] border border-line bg-surface p-4.5">
          <div className="mb-1 flex items-center gap-1.5 text-[13.5px] font-bold text-ink">
            <Sparkles aria-hidden="true" className="size-4 text-brand" />
            <span>Ask Zoe</span>
          </div>

          <p className="mb-3 text-[12.5px] leading-relaxed text-body">
            Need help estimating upfront costs or comparing neighborhoods?
          </p>

          <button
            type="button"
            onClick={handleAskAboutProperty}
            className="flex w-full cursor-pointer justify-center rounded-lg bg-brand px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-deep"
          >
            Ask about this home
          </button>
        </div>
      </div>
    </aside>
  );
}
