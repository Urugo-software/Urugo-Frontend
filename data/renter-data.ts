import {
  RenterProfile,
  RenterProperty,
  RenterPayment,
  RenterElectricity,
  RenterMaintenance,
  RenterDocument,
  RenterNotification,
} from "@/types/renter";

export const mockRenterProfile: RenterProfile = {
  id: "r-101",
  name: "Jean Claude",
  avatar: "/assets/avatars/renter.png",
  unitNumber: "A-03",
  propertyName: "Kimironko Heights",
};

export const mockRenterProperty: RenterProperty = {
  id: "p-201",
  name: "Kimironko Heights — Apartment A-03",
  unitNumber: "A-03",
  address: "KN 14 Ave, Kimironko, Kigali",
  bedrooms: 2,
  bathrooms: 1,
  parking: true,
  wifi: true,
  landlordName: "Emmanuel Ntaganda",
  landlordPhone: "+250 788 123 456",
  email: "irakaramale@gmail.com",
  moveInDate: "15 Jan 2024",
  leaseStatus: "Active",
  leaseEnd: "14 Jan 2025",
  monthlyRentRwf: 150000,
};

export const mockRenterPayments: RenterPayment[] = [
  {
    id: "pay-01",
    amountRwf: 150000,
    dueDate: "10 Sep 2026",
    status: "Pending",
    period: "September 2026",
  },
  {
    id: "pay-02",
    amountRwf: 150000,
    dueDate: "10 Aug 2026",
    status: "Paid",
    paymentType: "MTN Mobile Money",
    paidAt: "08 Aug 2026",
    period: "August 2026",
  },
  {
    id: "pay-03",
    amountRwf: 150000,
    dueDate: "10 Jul 2026",
    status: "Paid",
    paymentType: "AIRTEL Money",
    paidAt: "09 Jul 2026",
    period: "July 2026",
  },
];

export const mockRenterElectricity: RenterElectricity = {
  isConfigured: true,
  currentKwh: 42.6,
  monthlyLimitKwh: 62.5,
  percentUsed: 68,
  status: "Normal",
  statusMessage: "You are within your electricity limit.",
  currentBillRwf: 12500,
  usageHistory: [
    { period: "Week 1", kwh: 12.4 },
    { period: "Week 2", kwh: 21.8 },
    { period: "Week 3", kwh: 34.2 },
    { period: "Week 4", kwh: 42.6 },
  ],
  monthlyBills: [
    {
      id: "el-bill-01",
      period: "August 2026",
      previousReading: 1024,
      currentReading: 1062,
      kwh: 38.2,
      amountRwf: 11460,
      status: "Paid",
    },
    {
      id: "el-bill-02",
      period: "July 2026",
      previousReading: 982,
      currentReading: 1024,
      kwh: 41.7,
      amountRwf: 12510,
      status: "Paid",
    },
  ],
};
