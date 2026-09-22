import { User, CreditCard, Bell, Lock } from "lucide-react";
import { ProfileTab } from "./tabs/ProfileTab";
import { PayoutsTab } from "./tabs/PayoutsTab";
import { NotificationsTab } from "./tabs/NotificationsTab";
import { SecurityTab } from "./tabs/SecurityTab";

export const SETTINGS_TABS = [
  { id: "profile", label: "Landlord Profile", icon: User, component: ProfileTab },
  { id: "payouts", label: "Payout Accounts", icon: CreditCard, component: PayoutsTab },
  { id: "notifications", label: "Preferences", icon: Bell, component: NotificationsTab },
  { id: "security", label: "Security & Passwords", icon: Lock, component: SecurityTab },
];
