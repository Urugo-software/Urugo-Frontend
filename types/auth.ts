export type AuthRole =
  | "ADMIN"
  | "SUPER_ADMIN"
  | "AGENT"
  | "LANDLORD"
  | "RENTER"
  | "HOME_SEEKER";

export type LandlordPlan = "LISTING_ONLY" | "MANAGED_PLAN";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  role: AuthRole;
  roles: AuthRole[];
  emailVerified: boolean;
  selectedLandlordPlan: LandlordPlan | null;
  mustChangePassword: boolean;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: AuthUser;
  role?: AuthRole;
  data?: { user?: AuthUser };
}
