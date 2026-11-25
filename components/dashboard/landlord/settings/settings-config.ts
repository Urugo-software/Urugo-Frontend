import { Bell, CreditCard, Layers, Lock, User } from "lucide-react";
import { NotificationsTab } from "./tabs/NotificationsTab";
import { PayoutsTab } from "./tabs/PayoutsTab";
import { ProfileTab } from "./tabs/ProfileTab";
import { SecurityTab } from "./tabs/SecurityTab";
import { ServiceTab } from "./tabs/ServiceTab";

export const SETTINGS_TABS = [
  {
    id: "service",
    label: "Service Plan",
    icon: Layers,
    component: ServiceTab,
    managedOnly: false,
  },
  {
    id: "profile",
    label: "Profile & Contact",
    icon: User,
    component: ProfileTab,
    managedOnly: false,
  },
  {
    id: "payouts",
    label: "Payout Accounts",
    icon: CreditCard,
    component: PayoutsTab,
    managedOnly: true,
  },
  {
    id: "notifications",
    label: "Preferences",
    icon: Bell,
    component: NotificationsTab,
    managedOnly: false,
  },
  {
    id: "security",
    label: "Security & Passwords",
    icon: Lock,
    component: SecurityTab,
    managedOnly: false,
  },
] as const;
