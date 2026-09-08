export type MaintenanceStatus =
  | "Pending"
  | "In Progress"
  | "Resolved"
  | "Rejected";
export type ElectricityStatus =
  | "Normal"
  | "Approaching limit"
  | "Limit reached"
  | "Exceeded";
export type PaymentStatus = "Paid" | "Pending" | "Overdue";

export interface RenterProfile {
  id: string;
  name: string;
  avatar: string;
  unitNumber: string;
  propertyName: string;
}

export interface RenterProperty {
  id: string;
  name: string;
  unitNumber: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  wifi: boolean;
  landlordName: string;
  landlordPhone: string;
  email: string;
  moveInDate: string;
  leaseStatus: string;
  leaseEnd: string;
  monthlyRentRwf: number;
}

export interface RenterPayment {
  id: string;
  amountRwf: number;
  dueDate: string;
  status: PaymentStatus;
  paymentType?: string;
  paidAt?: string;
  period: string;
}

export interface ElectricityUsagePoint {
  period: string;
  kwh: number;
}

export interface ElectricityBill {
  id: string;
  period: string;
  previousReading: number;
  currentReading: number;
  kwh: number;
  amountRwf: number;
  status: "Paid" | "Unpaid";
}

export interface RenterElectricity {
  isConfigured: boolean;
  currentKwh: number;
  monthlyLimitKwh: number;
  percentUsed: number;
  status: ElectricityStatus;
  statusMessage: string;
  currentBillRwf: number;
  usageHistory: ElectricityUsagePoint[];
  monthlyBills: ElectricityBill[];
}

export interface RenterMaintenance {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  status: MaintenanceStatus;
  createdAt: string;
}

export interface RenterDocument {
  id: string;
  title: string;
  category: string;
  date: string;
  size: string;
}

export interface RenterNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  category: "rent" | "electricity" | "maintenance" | "lease";
}
