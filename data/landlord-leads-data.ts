import type {
  ContactVisibilitySettings,
  LandlordInquiry,
  ViewingRequest,
} from "@/types/landlord";

export const mockContactVisibility: ContactVisibilitySettings = {
  showPhone: true,
  showWhatsApp: true,
  showEmail: false,
};

export const mockLandlordInquiries: LandlordInquiry[] = [
  {
    id: "inq-101",
    propertyId: "prop-101",
    propertyName: "Kimironko Heights — Unit A-06",
    senderName: "Nadine Mukeshimana",
    senderPhone: "+250 788 412 908",
    senderEmail: "nadine.m@example.rw",
    message:
      "Hello, is the vacant 2-bedroom unit on the 2nd floor still available? Does the monthly rent include water and parking?",
    createdAt: "Today, 09:15",
    status: "New",
    replies: [],
  },
  {
    id: "inq-102",
    propertyId: "prop-103",
    propertyName: "Kabeza Modern Estate",
    senderName: "Olivier Nshimiyimana",
    senderPhone: "+250 789 305 112",
    senderEmail: "olivier.n@example.rw",
    message:
      "Good afternoon, could you share the security deposit terms and whether pets are allowed at Kabeza Modern Estate?",
    createdAt: "Yesterday, 16:40",
    status: "Replied",
    replies: [
      {
        id: "rep-1",
        sender: "landlord",
        text: "Security deposit is equal to one month's rent. Small pets are allowed with prior written approval.",
        timestamp: "Yesterday, 17:10",
      },
    ],
  },
  {
    id: "inq-103",
    propertyId: "prop-102",
    propertyName: "Kacyiru View Residency",
    senderName: "Chantal Uwimana",
    senderPhone: "+250 783 911 402",
    senderEmail: "chantal.u@example.rw",
    message:
      "I saw Studio B may become available soon. Please let me know when it opens up for move-in.",
    createdAt: "2 days ago",
    status: "New",
    replies: [],
  },
];

export const mockViewingRequests: ViewingRequest[] = [
  {
    id: "view-201",
    propertyId: "prop-101",
    propertyName: "Kimironko Heights — Unit A-06",
    requesterName: "Nadine Mukeshimana",
    requesterPhone: "+250 788 412 908",
    requesterEmail: "nadine.m@example.rw",
    preferredDate: "2026-09-14",
    preferredTime: "10:30",
    note: "Looking to move in on October 1st if the apartment fits our family.",
    status: "Pending",
    createdAt: "Today, 09:20",
  },
  {
    id: "view-202",
    propertyId: "prop-102",
    propertyName: "Kacyiru View Residency — Studio B",
    requesterName: "Jean Bosco Habimana",
    requesterPhone: "+250 788 765 210",
    requesterEmail: "jbosco@example.rw",
    preferredDate: "2026-09-15",
    preferredTime: "14:00",
    note: "Can also come Saturday morning if weekday afternoon is tight.",
    status: "Pending",
    createdAt: "Yesterday, 14:05",
  },
  {
    id: "view-203",
    propertyId: "prop-101",
    propertyName: "Kimironko Heights — Unit A-06",
    requesterName: "Clarisse Umutoni",
    requesterPhone: "+250 789 441 820",
    requesterEmail: "clarisse.u@example.rw",
    preferredDate: "2026-09-13",
    preferredTime: "11:00",
    status: "Confirmed",
    createdAt: "3 days ago",
  },
];
