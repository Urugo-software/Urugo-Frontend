import { LandlordPropertyItem } from "@/types/landlord";

export type AddRenterMode = "manual" | "link";

export interface ManualRenterRegistrationDraft {
  fullName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  propertyId: string;
}

export interface ManualRenterFormErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  nationalId?: string;
}

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

export interface ManualRenterRegistrationFormProps {
  properties: LandlordPropertyItem[];
  onCancel?: () => void;
}

export interface ManualRenterPreviewCardProps {
  draft: ManualRenterRegistrationDraft;
  propertyName?: string;
  onReset: () => void;
  onDone?: () => void;
}

export interface CopyStatusMessage {
  type: "success" | "error";
  text: string;
}

export interface RenterRegistrationLinkPanelProps {
  properties: LandlordPropertyItem[];
  onCancel?: () => void;
}

export interface AddRenterPageViewProps {
  initialMode?: AddRenterMode;
}

export type { LandlordPropertyItem };
export * from "./renter-wizard.types";
