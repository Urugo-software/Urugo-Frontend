import PropertyFilter from "./PropertyFilter";
import PropertyListing from "./PropertyListing";

function RightSide() {
  return (
    <div className="flex-1  max-xl:flex-col flex gap-4 md:gap-6 ">
      <div className="basis-2/3 ">
        {/* property listing */}
        <PropertyListing />
      </div>
      {/* property filter */}
      <div className="basis-1/3 ">
        <PropertyFilter />
      </div>
    </div>
  );
}

export default RightSide;
