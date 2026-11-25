import {
  CarFront,
  CheckCircle2,
  Droplets,
  ShieldCheck,
  Sofa,
  WashingMachine,
  Wifi,
} from "lucide-react";
import type { PropertyAmenity } from "@/types/properties";

interface PropertyAmenitiesProps {
  amenities: PropertyAmenity[];
}

function AmenityIcon({ type }: { type: string }) {
  const iconClass = "size-4 text-brand";

  switch (type) {
    case "wifi":
      return <Wifi aria-hidden="true" className={iconClass} />;
    case "parking":
      return <CarFront aria-hidden="true" className={iconClass} />;
    case "water":
      return <Droplets aria-hidden="true" className={iconClass} />;
    case "security":
      return <ShieldCheck aria-hidden="true" className={iconClass} />;
    case "laundry":
      return <WashingMachine aria-hidden="true" className={iconClass} />;
    case "living-room":
      return <Sofa aria-hidden="true" className={iconClass} />;
    default:
      return <CheckCircle2 aria-hidden="true" className={iconClass} />;
  }
}

export default function PropertyAmenities({
  amenities,
}: PropertyAmenitiesProps) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-extrabold text-ink">
        What&apos;s included
      </h2>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {amenities.map((amenity) => (
          <div
            key={amenity.id}
            className="flex items-center gap-2.5 text-sm text-ink"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface">
              <AmenityIcon type={amenity.icon} />
            </div>
            <span>{amenity.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
