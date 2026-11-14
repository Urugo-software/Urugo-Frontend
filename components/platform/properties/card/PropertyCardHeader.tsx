import Link from "next/link";
import { MapPin } from "lucide-react";
import { PropertyCardHeaderProps } from "@/types";

function PropertyCardHeader({
  viewMode = "list",
  id,
  headline,
  ownerName,
  location,
  price,
  currency,
  period,
}: PropertyCardHeaderProps & { viewMode?: "grid" | "list" }) {
  return (
    <div>
      <div className={`flex ${viewMode === "grid" ? "flex-col" : ""} items-start justify-between gap-3`}>
        <div className="min-w-0 flex-1">
          <Link href={`/properties/${id}`}>
            <h3 className="truncate text-base sm:text-[17px] font-bold text-ink tracking-tight capitalize transition-colors group-hover:text-brand">
              {headline}
            </h3>
          </Link>

          <div className="mt-1 flex flex-col items-start gap-2 text-xs text-body">
            <span className="flex items-center gap-1 text-faint">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-brand" />
              <span className="truncate text-ink font-medium">{location}</span>
            </span>

            <span className="truncate text-faint">By {ownerName}</span>
          </div>
        </div>

        {/* Price Badge */}
        <div className={`shrink-0 ${viewMode === "grid" ? "text-left" : "text-right"}`}>
          <div className="text-base sm:text-lg font-extrabold text-brand tracking-tight">
            {price}
          </div>
          <div className="text-[12.5px] font-medium text-body">
            {currency} / {period}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCardHeader;
