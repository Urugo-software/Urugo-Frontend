import { Bath, BedDouble, Car, Check, Wifi } from "lucide-react";
import type { RenterProperty } from "@/types/renter";
import CardHeader from "./CardHeader";

export function PropertySpecsCard({ property }: { property: RenterProperty }) {
  const specs = [
    { label: "Bedrooms", value: String(property.bedrooms), icon: BedDouble },
    { label: "Bathrooms", value: String(property.bathrooms), icon: Bath },
    { label: "Parking", value: property.parking ? "Included" : "None", icon: Car },
    { label: "Wi-Fi", value: property.wifi ? "Available" : "Not included", icon: Wifi },
  ];

  return (
    <div className="border border-line bg-white p-5 shadow-2xs md:col-span-2">
      <CardHeader title="Unit Specifications & Amenities" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {specs.map(({ label, value, icon: Icon }) => (
          <div key={label} className="border border-line bg-surface/40 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-faint">
              <Icon aria-hidden="true" className="size-3.5" />
              <span>{label}</span>
            </div>
            <div className="mt-1.5 text-sm font-bold text-ink">{value}</div>
          </div>
        ))}
      </div>

      {property.amenities && property.amenities.length > 0 && (
        <div className="mt-4 border-t border-line pt-4">
          <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-faint">
            Included Amenities
          </h4>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {property.amenities.map((amenity) => (
              <li
                key={amenity}
                className="flex items-center gap-2 text-sm text-body"
              >
                <Check aria-hidden="true" className="size-4 shrink-0 text-success" />
                <span>{amenity}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
