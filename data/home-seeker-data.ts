import { Bot, CalendarDays, Check, Clock, LucideIcon } from "lucide-react";

export interface NotificationData {
  icon: LucideIcon;
  title: string;
  detail: string;
  time: string;
  unread?: boolean;
}

export const notificationsData: NotificationData[] = [
  {
    icon: CalendarDays,
    title: "Viewing confirmed",
    detail:
      "Jean Claude M. confirmed your viewing for 2 Bedroom Apartment  Kimironko on Saturday, 22 March at 2:00 PM.",
    time: "2 hours ago",
    unread: true,
  },
  {
    icon: Clock,
    title: "You've moved up the waiting list",
    detail:
      "You're now #1 in queue for Studio Apartment  Remera. We'll notify you the moment it's available.",
    time: "Yesterday, 4:12 PM",
  },
  {
    icon: Bot,
    title: "New matches from the AI Assistant",
    detail:
      "Two new properties in Remera and Kimironko now match your saved budget and preferences.",
    time: "Yesterday, 9:30 AM",
  },
  {
    icon: CalendarDays,
    title: "Viewing reminder",
    detail:
      "Your viewing for Studio Apartment  Kacyiru starts in 1 hour. Landlord: Marie U., 0788 000 111.",
    time: "March 10, 2026",
  },
  {
    icon: Check,
    title: "Welcome to Urugo",
    detail:
      "Your guest account was created successfully. Chat with the AI Assistant anytime to find your next home.",
    time: "March 1, 2026",
  },
];

export const profilePreferences = [
  "Remera, Kimironko",
  "Up to 200,000 RWF",
  "2 bedrooms",
  "Parking required",
];
export const securityOptions = [
  ["Password", "Last changed: never", "Change"],
  ["Google account", "Not connected", "Connect"],
] as const;
export const settingsData = [
  [
    "Viewing updates",
    "Get notified when a viewing is confirmed, changed, or coming up.",
    true,
  ],
  [
    "Waiting list updates",
    "Know when your queue position or property availability changes.",
    true,
  ],
  [
    "AI property matches",
    "Receive matches based on your saved search preferences.",
    true,
  ],
  ["Marketing emails", "Occasional product news and tips from Urugo.", false],
] as const;
