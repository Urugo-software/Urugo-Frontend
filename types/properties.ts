import { StaticImageData } from "next/dist/shared/lib/image-external";

export interface PropertyImage {
  id: string;
  image: string | StaticImageData;
  alt: string;
}

export interface PropertyAmenity {
  id: string;
  name: string;
  icon: string;
}

export interface Landlord {
  id: string;
  name: string;
  initials: string;
  phone: string;
  whatsapp: string;
  isVerified: boolean;
}
export interface MoveInCost {
  label: string;
  amount: number;
}

export type CostPayer = "TENANT" | "LANDLORD";

export interface RecurringCost {
  label: string;
  amount: number;
  payer: CostPayer;
  isEstimated: boolean;
}

export interface Property {
  id: string;

  headline: string;
  ownerName: string;

  price: string;
  currency: string;
  period: string;

  location: string;
  district: string;
  sector: string;

  beds: number;
  baths: number;
  parking: boolean;

  isVerified: boolean;
  availabilityStatus: "available" | "unavailable";

  description: string;

  images: PropertyImage[];
  amenities: PropertyAmenity[];

  moveInCosts: MoveInCost[];
  recurringCosts: RecurringCost[];

  landlord: Landlord;

  availableFrom: string;
}
