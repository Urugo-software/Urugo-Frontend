import PropertyGallery from "./PropertyGallery";
import PropertyHeader from "./PropertyHeader";
import PropertyAmenities from "./PropertyAmenities";
import PropertySidebar from "./PropertySidebar";
import { Property } from "@/types/properties";
import Link from "next/link";
import PaymentCostBreakdown from "./PaymentCostBreakdowns";

interface PropertyDetailsProps {
  property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-7 pb-24">
      {/* Breadcrumb */}
      <div className="text-[13px] text-faint mb-5">
        <Link href="#" className="hover:text-brand">
          Properties
        </Link>
        &nbsp;/&nbsp;
        <Link href="#" className="hover:text-brand">
          {property.district}
        </Link>
        &nbsp;/&nbsp;
        {property.sector}
      </div>

      {/* Gallery */}
      <PropertyGallery images={property.images} />

      {/* Main content */}
      <div className=" mt-10 grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-12 items-start">
        {/* Left */}
        <div>
          <PropertyHeader
            title={property.headline}
            address={property.location}
            status={property.availabilityStatus}
            verified={property.isVerified}
          />

          <div className="h-px bg-line my-7" />

          {/* About */}
          <section>
            <h2 className="text-lg font-extrabold mb-4">About this property</h2>

            <p className="text-[14.5px] text-body leading-relaxed mb-2">
              {property.description}
            </p>
          </section>

          <div className="h-px bg-line my-7" />

          {/* Amenities */}
          <PropertyAmenities amenities={property.amenities} />

          <div className="h-px bg-line my-7" />

          <PaymentCostBreakdown
            moveInCosts={property.moveInCosts}
            recurringCosts={property.recurringCosts}
          />
        </div>

        {/* Right */}
        <PropertySidebar property={property} />
      </div>
    </main>
  );
}
