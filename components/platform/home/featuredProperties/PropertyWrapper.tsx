import { CarouselItem } from "@/components/ui/carousel";
import { available_properties } from "@/data/home-data";
import PropertyCard from "./PropertyCard";
import CarouselWrapper from "./CarouselWrapper";

function PropertyWrapper() {
  return (
    <CarouselWrapper>
      {available_properties.map((prop) => (
        <CarouselItem
          key={prop.id}
          className="basis-1/1 md:basis-1/3 lg:basis-1/4"
        >
          <div className="p-1">
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
    </CarouselWrapper>
  );
}

export default PropertyWrapper;
