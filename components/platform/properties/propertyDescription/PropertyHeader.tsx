import { Bath, BedDouble, CarFront, MapPin, ShieldCheck } from "lucide-react";

interface PropertyHeaderProps {
  title: string;
  address: string;
  status: "available" | "unavailable";
  isVerified?: boolean;
  beds?: number;
  baths?: number;
  parking?: boolean;
}

export default function PropertyHeader({
  title,
  address,
  status,
  isVerified = false,
  beds,
  baths,
  parking,
}: PropertyHeaderProps) {
  const isAvailable = status === "available";

  return (
    <header>
      <h1 className="mb-1.5 text-2xl font-extrabold tracking-tight text-ink sm:text-[28px]">
        {title}
      </h1>

      <div className="mb-4 flex items-center gap-1.5 text-sm text-body">
        <MapPin aria-hidden="true" className="size-4 shrink-0 text-brand" />
        <span>{address}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold ${
            isAvailable
              ? "bg-green-100/90 text-green-700"
              : "bg-surface text-body"
          }`}
        >
          <span
            aria-hidden="true"
            className={`size-2 rounded-full ${isAvailable ? "bg-green-600" : "bg-faint"}`}
          />
          {isAvailable ? "Available now" : "Currently occupied"}
        </span>

        {isVerified && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-3.5 py-1.5 text-xs font-semibold text-brand">
            <ShieldCheck aria-hidden="true" className="size-3.5" />
            Verified listing
          </span>
        )}
      </div>

      {(beds !== undefined || baths !== undefined) && (
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-body md:hidden">
          {beds !== undefined && (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble aria-hidden="true" className="size-4 text-brand" />
              {beds} {beds === 1 ? "Bedroom" : "Bedrooms"}
            </span>
          )}
          {baths !== undefined && (
            <span className="inline-flex items-center gap-1.5">
              <Bath aria-hidden="true" className="size-4 text-brand" />
              {baths} {baths === 1 ? "Bathroom" : "Bathrooms"}
            </span>
          )}
          {parking && (
            <span className="inline-flex items-center gap-1.5">
              <CarFront aria-hidden="true" className="size-4 text-brand" />
              Parking
            </span>
          )}
        </div>
      )}
    </header>
  );
}
