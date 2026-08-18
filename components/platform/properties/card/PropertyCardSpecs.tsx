import Link from "next/link";
import { Bath, BedDouble, CarFront } from "lucide-react";
import { PropertyCardSpecsProps } from "@/types";

function PropertyCardSpecs({
  id,
  beds,
  baths,
  parking,
}: PropertyCardSpecsProps) {
  return (
    <div className="mt-4 pt-3 border-t border-line/50 flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {beds > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1 text-xs font-semibold text-ink">
            <BedDouble className="h-3.5 w-3.5 text-brand" />
            {beds} {beds > 1 ? "Beds" : "Bed"}
          </span>
        )}

        {baths > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1 text-xs font-semibold text-ink">
            <Bath className="h-3.5 w-3.5 text-brand" />
            {baths} {baths > 1 ? "Baths" : "Bath"}
          </span>
        )}

        {parking && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1 text-xs font-semibold text-ink">
            <CarFront className="h-3.5 w-3.5 text-brand" />
            Parking
          </span>
        )}
      </div>

      <Link
        href={`/properties/${id}`}
        className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:text-brand-deep hover:underline transition-colors ml-auto"
      >
        View details &rarr;
      </Link>
    </div>
  );
}

export default PropertyCardSpecs;
