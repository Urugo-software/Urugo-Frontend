import { LandlordPropertyItem } from "@/types/landlord";
import type { AddRenterMode } from "./renter-wizard.types";

export interface RenterPropertySelectProps {
  properties: LandlordPropertyItem[];
  selectedPropertyId: string;
  emptyLabel: string;
  onSelect: (propertyId: string) => void;
}

export interface AddRenterPageViewProps {
  initialMode?: AddRenterMode;
}

export type { LandlordPropertyItem };
export * from "./renter-wizard.types";
