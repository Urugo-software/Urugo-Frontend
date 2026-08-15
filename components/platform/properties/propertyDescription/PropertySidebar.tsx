import { Property } from "@/types/properties";
import LandlordCard from "./LandlordCard";
import CustomButton from "@/components/shared/CustomButton";

interface PropertySidebarProps {
  property: Property;
}

export default function PropertySidebar({ property }: PropertySidebarProps) {
  return (
    <div>
      <div className="border border-line p-6.5 sticky top-6">
        <div className="flex items-center justify-between mb-5">
          {/* Landlord */}
          <LandlordCard landlord={property.landlord} />
          {/* Price */}
          <div className="text-[20px] flex self-start items-center gap-2 font-extrabold text-brand font-mono mb-4.5">
            {new Intl.NumberFormat("en-RW").format(parseInt(property.price))}

            <span className="text-xs text-faint font-medium font-sans">
              {property.currency} / {property.period}
            </span>
          </div>
        </div>

        {/* Actions */}
        <CustomButton
          title="Request a visit"
          variant="colored"
          className="bg-brand rounded-none w-full py-6 mb-3.5"
        />

        <CustomButton
          title="Contact landlord on WhatsApp"
          variant="light"
          className="w-full mb-1 rounded-none py-6"
        />

        {/* Property information */}
        <div className="flex justify-between text-[13.5px] py-2.5 border-b border-line mt-3">
          <span className="text-body">Bedrooms</span>
          <span className="font-semibold">{property.beds}</span>
        </div>

        <div className="flex justify-between text-[13.5px] py-2.5 border-b border-line">
          <span className="text-body">Bathrooms</span>
          <span className="font-semibold">{property.baths}</span>
        </div>

        <div className="flex justify-between text-[13.5px] py-2.5">
          <span className="text-body">Available from</span>
          <span className="font-semibold">{property.availableFrom}</span>
        </div>

        {/* AI Assistant */}
        <div className="bg-surface rounded-[14px] p-4.5 mt-4">
          <b className="text-[13.5px] block mb-1 ">Ask the AI Assistant</b>

          <p className="text-[12.5px] text-body mb-3">
            {'  "Can I afford this on 400k income?" get an instant breakdown.'}
          </p>

          <button
            type="button"
            className="w-full hover:bg-brand-deep duration-300 cursor-pointer flex justify-center text-[13.5px] font-semibold px-4 py-2.5 rounded-lg bg-brand text-white"
          >
            Ask a question
          </button>
        </div>
      </div>
    </div>
  );
}
