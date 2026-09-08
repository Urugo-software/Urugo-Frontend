import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { available_properties } from "@/data/home-data";
import PropertyCard from "./PropertyCard";
import SectionTitle from "@/components/shared/SectionTitle";
import FeaturedPropertiesList from "./FeaturedPropertiesList";

function PropertyWrapper() {
  return (
    <div className="max-md:my-4 my-6">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <div className="flex items-end justify-between mb-6">
          <SectionTitle
            title="Featured Properties"
            className="lg:text-3xl"
            descriptionClassName="mt-1"
            description="Check out our verified properties available for rent "
          />
          <div className="flex gap-2">
            <CarouselPrevious className="static my-0 translate-y-0" />
            <CarouselNext className="static my-0 translate-y-0" />
          </div>
        </div>
        <FeaturedPropertiesList />
      </Carousel>
    </div>
  );
}

export default PropertyWrapper;
