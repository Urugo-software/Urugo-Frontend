import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, MapPin } from "lucide-react";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import type { RelatedPublicProperty } from "@/mappers/public-property.mapper";
import type { Property } from "@/types/properties";
import { buildPropertyBreadcrumbs } from "@/utils/public-properties";
import PaymentCostBreakdown from "./PaymentCostBreakdowns";
import PropertyAmenities from "./PropertyAmenities";
import PropertyGallery from "./PropertyGallery";
import PropertyHeader from "./PropertyHeader";
import PropertySidebar from "./PropertySidebar";

interface PropertyDetailsProps {
  property: Property;
  relatedProperties?: RelatedPublicProperty[];
}

export default async function PropertyDetails({
  property,
  relatedProperties = [],
}: PropertyDetailsProps) {
  const t = await getTranslations("properties");

  const breadcrumbs = buildPropertyBreadcrumbs({
    district: property.district,
    sector: property.sector,
    headline: property.headline,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 pb-20 sm:px-6 sm:py-7 sm:pb-24">
      <Breadcrumbs
        items={breadcrumbs}
        mobileBackHref="/properties"
        mobileBackLabel={t("details.backToProperties")}
      />

      <PropertyGallery images={property.images} />

      <div className="mt-8 grid grid-cols-1 items-start gap-10 md:mt-10 md:grid-cols-[1.6fr_1fr] md:gap-12">
        <div>
          <PropertyHeader
            title={property.headline}
            address={property.location}
            status={property.availabilityStatus}
            isVerified={property.isVerified}
            beds={property.beds}
            baths={property.baths}
            parking={property.parking}
          />

          <div className="my-7 h-px bg-line" />

          <section>
            <h2 className="mb-3.5 text-lg font-extrabold text-ink">
              {t("details.aboutHeading")}
            </h2>
            <p className="text-[15px] leading-relaxed text-body">
              {property.description}
            </p>
          </section>

          <div className="my-7 h-px bg-line" />

          <PropertyAmenities amenities={property.amenities} />

          <div className="my-7 h-px bg-line" />

          <PaymentCostBreakdown
            moveInCosts={property.moveInCosts}
            recurringCosts={property.recurringCosts}
          />
        </div>

        <PropertySidebar property={property} />
      </div>

      {relatedProperties.length > 0 && (
        <section className="mt-14 border-t border-line pt-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-ink sm:text-xl">
              {t("details.moreHomes")}
            </h2>
            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-deep hover:underline"
            >
              <span>{t("details.viewAllProperties")}</span>
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProperties.map((item) => {
              const displayPeriod =
                item.period.toLowerCase() === "month"
                  ? t("periods.month")
                  : item.period;
              return (
                <Link
                  key={item.id}
                  href={`/properties/${item.id}`}
                  className="group overflow-hidden rounded-xl border border-line bg-white transition-all hover:border-brand/40 hover:shadow-md"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-surface">
                    <Image
                      src={item.image}
                      alt={item.headline}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="truncate text-base font-bold text-ink transition-colors group-hover:text-brand">
                      {item.headline}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-body">
                      <MapPin
                        aria-hidden="true"
                        className="size-3.5 shrink-0 text-faint"
                      />
                      <span className="truncate">{item.location}</span>
                    </p>
                    <p className="mt-2.5 font-mono text-sm font-bold text-brand">
                      {item.price} {item.currency}{" "}
                      <span className="font-sans text-xs font-normal text-faint">
                        / {displayPeriod}
                      </span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
