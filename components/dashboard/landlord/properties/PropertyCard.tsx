import type { ReactNode } from "react";
import Link from "next/link";
import { FolderInput, Layers, Pencil } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { LandlordPropertyItem } from "@/types/landlord";
import { formatCurrencyRwf } from "@/utils/agreement-utils";
import { PortfolioCard, type ViewMode } from "./PortfolioCard";

const statusStyles = {
  Occupied: "bg-emerald-50 text-emerald-700",
  Partial: "bg-blue-50 text-blue-700",
  Vacant: "bg-amber-50 text-amber-700",
};

export function PropertyCard({ property, viewMode = "grid", membershipActions }: {
  property: LandlordPropertyItem;
  viewMode?: ViewMode;
  membershipActions?: ReactNode;
}) {
  const { id, name, type, location, image, status, hasUnits, occupiedUnits, totalUnits, monthlyRevenueRwf } = property;
  const editHref = `/landlord/properties/${encodeURIComponent(id)}/edit`;
  const showOccupancy = hasUnits && occupiedUnits !== undefined && totalUnits !== undefined && totalUnits > 0;
  return (
    <PortfolioCard name={name} location={location} cover={image} mode={viewMode} menuId={`property-menu-${id}`}
      action={
        <Link href={`/landlord/tenancies?property=${encodeURIComponent(id)}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
          <Layers className="size-4" /> {hasUnits ? "View Units & Leases" : "View Lease"}
        </Link>
      }
      menu={<>
        <DropdownMenuItem render={<Link href={editHref} />}><Pencil /> Edit Property</DropdownMenuItem>
        {membershipActions ?? (!property.groupId && (
          <DropdownMenuItem render={<Link href={`${editHref}#property-group`} />}>
            <FolderInput /> Add to Group
          </DropdownMenuItem>
        ))}
      </>}
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="tracking-wide text-body">{type}</span>
        {status && <span className={`rounded px-2 py-1 ${statusStyles[status]}`}>{status}</span>}
      </div>
      <dl className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {showOccupancy && <div><dt className="text-body">Units occupied</dt><dd className="font-semibold">{occupiedUnits} / {totalUnits} ({Math.round(occupiedUnits / totalUnits * 100)}%)</dd></div>}
        {monthlyRevenueRwf !== undefined && <div><dt className="text-body">Monthly revenue</dt><dd className="font-semibold">{formatCurrencyRwf(monthlyRevenueRwf)}</dd></div>}
        {property.expectedMonthlyRentRwf !== undefined && <div><dt className="text-body">Expected monthly rent</dt><dd className="font-semibold">{formatCurrencyRwf(property.expectedMonthlyRentRwf)}</dd></div>}
        {property.collectedRentThisMonthRwf !== undefined && <div><dt className="text-body">Rent collected this month</dt><dd className="font-semibold">{formatCurrencyRwf(property.collectedRentThisMonthRwf)}</dd></div>}
      </dl>
    </PortfolioCard>
  );
}
