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
