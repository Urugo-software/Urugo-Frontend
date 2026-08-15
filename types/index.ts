import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

export interface HomeUiRolesDataProps {
  id: number;
  Icon: LucideIcon | IconType;
  title: string;
  description: string;
  features: string[];
  onboarding: string;
}

// Authentication service types
export interface LoginProps {
  email_phone?: string;
  username?: string;
  password: string;
}
