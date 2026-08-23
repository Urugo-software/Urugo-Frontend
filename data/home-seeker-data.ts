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
    "Email notifications",
    "Viewing confirmations, waiting list updates, and new matches.",
    true,
  ],
  ["SMS notifications", "Coming soon  currently email only.", false],
  [
    "AI Assistant follow-ups",
    "Let the assistant proactively suggest new matches.",
    true,
  ],
] as const;
export const languages = ["English", "Kinyarwanda"];
export const privacyData = [
  "Show my activity to landlords I contact",
  "Helps landlords respond faster to viewing requests",
  true,
] as const;
export const dataExport = [
  "Download my data",
  "Export your saved properties, viewings, and messages.",
] as const;
export const deleteAccount = [
  "Delete my account",
  "Permanently removes your saved properties, viewings, and search history.",
] as const;
export const helpTopics = [
  "Finding a home",
  "Saved properties",
  "Viewings",
  "Waiting list",
  "Account & verification",
  "Using the AI Assistant",
];
export const helpQuestions = [
  [
    "How do I book a viewing?",
    "Open a property and choose a convenient viewing time. We will notify you once the landlord confirms.",
  ],
  [
    "How does the waiting list work?",
    "Join the waiting list when a property is occupied. Your position updates automatically when availability changes.",
  ],
  [
    "How do I verify my account?",
    "Start verification from your Profile page or ask the AI Assistant for help preparing your documents.",
  ],
  [
    "Can I update my home search preferences?",
    "Yes. Update them through the AI Assistant and we will use them for new property matches.",
  ],
] as const;
