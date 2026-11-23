import type { ReactNode } from "react";
import type { LandlordPropertyItem } from "@/types/landlord";
import { cardLayout, type ViewMode } from "./PortfolioCard";
import { PropertyCard } from "./PropertyCard";

export function PropertyList({ properties, mode = "grid", renderMembershipActions }: {
  properties: LandlordPropertyItem[];
  mode?: ViewMode;
  renderMembershipActions?: (property: LandlordPropertyItem) => ReactNode;
}) {
  return (
    <ul className={cardLayout(mode)}>
      {properties.map((property) => (
        <li key={property.id} className="min-w-0">
          <PropertyCard property={property} viewMode={mode} membershipActions={renderMembershipActions?.(property)} />
        </li>
      ))}
    </ul>
  );
}
