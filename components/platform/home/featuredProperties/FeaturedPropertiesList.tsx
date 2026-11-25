"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Building2 } from "lucide-react";

import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import SectionError from "@/components/shared/SectionError";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { usePublicFeaturedProperties } from "@/hooks/query/properties.hooks";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import type { FeaturedProperty } from "@/types/properties";
import FeaturedPropertySkeleton from "./FeaturedPropertySkeleton";
import PropertyCard from "./PropertyCard";

function FeaturedPropertiesList() {
  const t = useTranslations("public.home.featured");
  const locale = useLocale() as AppLocale;
  const { data, isLoading, error, isError, refetch } =
    usePublicFeaturedProperties();

  if (isLoading) {
    return (
      <CarouselContent>
        {[...Array(4)].map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-1/1 sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
          >
            <div className="w-full p-1">
              <FeaturedPropertySkeleton />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    );
  }

  if (isError) {
    return (
      <SectionError
        message={
          error instanceof Error ? error.message : t("errorFallback")
        }
        onRetry={() => void refetch()}
      />
    );
  }

  if (!data?.data?.length) {
    return (
      <EmptyStateBox
        icon={Building2}
        title={t("emptyTitle")}
        description={t("emptyDescription")}
        action={
          <Link
            href="/properties"
            className="inline-flex h-9 items-center justify-center border border-brand bg-brand px-4 text-xs font-semibold text-white transition-colors hover:bg-brand-deep"
          >
            {t("browseAll")}
          </Link>
        }
      />
    );
  }

  return (
    <CarouselContent>
      {data.data.map((prop: FeaturedProperty) => (
        <CarouselItem
          key={prop.id}
          className="basis-1/1 sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
        >
          <div className="w-full p-1">
            <PropertyCard
              id={prop.id}
              image={prop.property_photos[0]}
              title={prop.title}
              district={prop.district.toLowerCase()}
              province={prop.province}
              monthlyRent={formatRwfLocalized(prop.monthlyRent, locale)}
              amenities={prop.amenities}
            />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}

export default FeaturedPropertiesList;
