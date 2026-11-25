import { LandlordPropertyItem } from "@/types/landlord";
import type { AddRenterMode } from "./renter-wizard.types";

export interface SimulatedRenterInvitationLink {
  id: string;
  url: string;
  propertyId?: string;
  propertyName?: string;
  createdAt: string;
  expiresInLabel: string;
  isSimulated: true;
}

export interface RenterPropertySelectProps {
  properties: LandlordPropertyItem[];
  selectedPropertyId: string;
  emptyLabel: string;
  onSelect: (propertyId: string) => void;
}

export interface CopyStatusMessage {
  type: "success" | "error";
  text: string;
}

export interface AddRenterPageViewProps {
  initialMode?: AddRenterMode;
}

export type { LandlordPropertyItem };
export * from "./renter-wizard.types";
