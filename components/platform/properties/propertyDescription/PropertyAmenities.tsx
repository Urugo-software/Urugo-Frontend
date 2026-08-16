import { PropertyAmenity } from "@/types/properties";

interface PropertyAmenitiesProps {
  amenities: PropertyAmenity[];
}

function AmenityIcon({ type }: { type: string }) {
  if (type === "wifi") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path
          d="M2 8.5C7 3 17 3 22 8.5M5.5 12C9 8.5 15 8.5 18.5 12M9 15.5C10.5 14 13.5 14 15 15.5M12 19H12.01"
          stroke="#1D4ED8"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "parking") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="9"
          width="18"
          height="9"
          rx="1.5"
          stroke="#1D4ED8"
          strokeWidth="1.6"
        />
        <path
          d="M6 9V7a2 2 0 012-2h8a2 2 0 012 2v2"
          stroke="#1D4ED8"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  return <div className="w-[15px] h-[15px] rounded-full border border-brand" />;
}

export default function PropertyAmenities({
  amenities,
}: PropertyAmenitiesProps) {
  return (
    <section>
      <h2 className="text-lg font-extrabold mb-4">{"What's included"}</h2>

      <div className="grid grid-cols-2 gap-3.5">
        {amenities.map((amenity) => (
          <div key={amenity.id} className="flex items-center gap-2.5 text-sm">
            <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center">
              <AmenityIcon type={amenity.icon} />
            </div>

            {amenity.name}
          </div>
        ))}
      </div>
    </section>
  );
}
