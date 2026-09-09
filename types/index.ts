import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { StaticImageData } from "next/image";

// Central Export for Property Domain Types
export * from "./properties";
export * from "./landlord";


// Home & Auth UI Types
export interface HomeUiRolesDataProps {
  id: number;
  Icon: LucideIcon | IconType;
  title: string;
  description: string;
  features: string[];
  onboarding: string;
}

export interface LoginProps {
  identifier?: string;
  password: string;
}

// How It Works & Roles Types
export type RoleType = "home_seeker" | "landlord" | "renter";

export interface Step {
  stepNumber: number;
  title: string;
  description: string;
}

export interface RoleFlow {
  roleId: RoleType;
  roleName: string;
  steps: Step[];
  banner: {
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
  };
}

// Features Types
export interface Feature {
  id: number;
  title: string;
  description: string;
  Icon: LucideIcon;
}

export interface FeatureServiceItem {
  id: number;
  title: string;
}

// Property Platform Component Props Types
export interface PropertyListingCardProps {
  id: string;
  image: string | StaticImageData;
  headline: string;
  ownerName: string;
  price: string;
  currency: string;
  period: string;
  location: string;
  beds: number;
  baths: number;
  parking?: boolean;
  isVerified: boolean;
  availabilityStatus: string;
  index?: number;
}

export interface PropertyListingProps {
  showFilter?: boolean;
  onToggleFilter?: () => void;
}

export interface PropertyFilterProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export interface FilterPillsProps {
  options: string[];
  defaultSelected?: string;
  onSelect?: (option: string) => void;
}

export interface SearchInputProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface NavItemsProps {
  isMobileMenu?: boolean;
  onClose?: () => void;
}

export interface NavItemProps {
  href: string;
  name: string;
}

export interface PropertyCardImageProps {
  image: string | StaticImageData;
  headline: string;
  isVerified: boolean;
  availabilityStatus: string;
}

export interface PropertyCardHeaderProps {
  id: string;
  headline: string;
  ownerName: string;
  location: string;
  price: string;
  currency: string;
  period: string;
}

export interface PropertyCardSpecsProps {
  id: string;
  beds: number;
  baths: number;
  parking?: boolean;
}