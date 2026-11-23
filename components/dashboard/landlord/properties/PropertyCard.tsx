import type { ReactNode } from "react";
import Link from "next/link";
import { Layers, Pencil } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { LandlordPropertyItem } from "@/types/landlord";
import { PortfolioCard, type ViewMode } from "./PortfolioCard";

const statusStyles = {
  Occupied: " text-success",
  Partial: " text-blue-700",
  Vacant: " text-amber-700",
};

export function PropertyCard({
  property,
  viewMode = "grid",
  membershipActions,
}: {
  property: LandlordPropertyItem;
  viewMode?: ViewMode;
  membershipActions?: ReactNode;
}) {
  const {
    id,
    name,
    type,
    location,
    image,
    status,
    hasUnits,
    
    monthlyRevenueRwf,
  } = property;
  
  return (
    <PortfolioCard
      name={name}
      location={location}
      cover={image}
      mode={viewMode}
      action={
        <Link
          href={`/landlord/tenancies?property=${encodeURIComponent(id)}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
        >
          <Layers className="size-4" />{" "}
          {hasUnits ? "View Units & Leases" : "View Lease"}
        </Link>
      }
      menu={
        <>
          <DropdownMenuItem
            render={
              <Link
                href={`/landlord/properties/${encodeURIComponent(id)}/edit`}
              />
            }
          >
            <Pencil /> Edit Property
          </DropdownMenuItem>
          {membershipActions}
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="tracking-wide text-body">{type}</span>
        {status && (
          <span className={`rounded px-2 py-1 ${statusStyles[status]}`}>
            {status}
          </span>
        )}
      </div>
      <dl className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {monthlyRevenueRwf !== undefined && (
          <div>
            <dt className="text-body">Monthly revenue</dt>
            <dd className="font-semibold">
              {monthlyRevenueRwf.toLocaleString("en-US")} RWF
            </dd>
          </div>
        )}
      </dl>
    </PortfolioCard>
  );
}
