import React, { Fragment } from "react";
import PropertyCard from "./PropertyCard";
import { available_properties } from "@/data/data";

function PropertyWrapper() {
  return (
    <div className="my-8 flex gap-4 overflow-x-auto  snap-x snap-mandatory">
      {available_properties.map((prop) => (
        <Fragment key={prop.id}>
          <PropertyCard
            image={prop.image}
            title={prop.title}
            location={prop.location}
            price={prop.price}
            amenities={prop.amenities}
          />
        </Fragment>
      ))}
    </div>
  );
}

export default PropertyWrapper;
