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
        <CarouselContent>
          {available_properties.map((prop) => (
            <CarouselItem
              key={prop.id}
              className="basis-1/1 sm:basis-1/2 md:basis-1/3 xl:basis-1/4 "
            >
              <div className="p-1 w-full ">
                <PropertyCard
                  image={prop.image}
                  title={prop.title}
                  location={prop.location}
                  price={prop.price}
                  amenities={prop.amenities}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default PropertyWrapper;
