import { listed_properties } from "@/data/properties";
import PropertyListingCard from "./PropertyListingCard";
import SearchInput from "./SearchInput";
import TotalAvailableProperties from "./TotalAvailableProperties";

function PropertyListing() {
  return (
    <div className="w-full ">
      {/* search field */}
      <SearchInput className="p-3 w-full outline-none border-none focus:outline-none focus:border-none focus:ring-0" />

      {/* stats & filter */}
      <div className=" my-4 ">
        <TotalAvailableProperties total={126} />
      </div>
      {/* list properties */}
      <div className="mt-8 flex flex-col gap-4">
        {listed_properties.map((prop) => (
          <PropertyListingCard
            key={prop.id}
            image={prop.image}
            headline={prop.headline}
            ownerName={prop.ownerName}
            price={prop.price}
            currency={prop.currency}
            period={prop.period}
            location={prop.location}
            beds={prop.beds}
            baths={prop.baths}
            parking={prop.parking}
            isVerified={prop.isVerified}
            availabilityStatus={prop.availabilityStatus}
          />
        ))}
      </div>
    </div>
  );
}

export default PropertyListing;
