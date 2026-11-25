import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";

import SectionTitle from "@/components/shared/SectionTitle";
import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FeaturedPropertiesList from "./FeaturedPropertiesList";

async function PropertyWrapper() {
  const t = await getTranslations("public.home.featured");

  return (
    <div className="my-6 max-md:my-4">
      <Carousel opts={{ align: "start" }} className="w-full">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <SectionTitle
            title={t("title")}
            className="lg:text-3xl"
            descriptionClassName="mt-1"
            description={t("description")}
          />
          <div className="flex items-center gap-3">
            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-deep hover:underline"
            >
              <span>{t("viewAll")}</span>
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <div className="flex gap-2">
              <CarouselPrevious className="static my-0 translate-y-0" />
              <CarouselNext className="static my-0 translate-y-0" />
            </div>
          </div>
        </div>
        <FeaturedPropertiesList />
      </Carousel>
    </div>
  );
}

export default PropertyWrapper;
