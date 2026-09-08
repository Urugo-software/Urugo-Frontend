"use client";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import PropertyCard from "./PropertyCard";
import { usePublicFeaturedProperties } from "@/hooks/query/properties.hooks";
import { FeaturedProperty } from "@/types/properties";
import SectionError from "@/components/shared/SectionError";
import SectionLoading from "@/components/shared/SectionLoading";
import FeaturedPropertySkeleton from "./FeaturedPropertySkeleton";

function FeaturedPropertiesList() {
  const { data, isLoading, error, isError } = usePublicFeaturedProperties();
  console.log("Featured Properties Data:", data?.data);
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
      <CarouselContent>
        <SectionError
          message={
            error instanceof Error
              ? error.message
              : "An error occurred while loading featured properties."
          }
        />
      </CarouselContent>
    );
  }

  if (!data?.data?.length) {
    return (
      <CarouselContent>
        <SectionLoading message="No featured properties available." />
      </CarouselContent>
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
              image={prop.property_photos[0]}
              title={prop.title}
              district={prop.district.toLocaleLowerCase()}
              province={prop.province}
              monthlyRent={prop.monthlyRent.toLocaleString("en-RW", {
                style: "currency",
                currency: "RWF",
              })}
              amenities={prop.amenities}
            />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}

export default FeaturedPropertiesList;
