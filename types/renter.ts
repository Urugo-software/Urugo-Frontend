export type MaintenanceStatus =
  | "Pending"
  | "In Progress"
  | "Resolved"
  | "Rejected";

export type PaymentStatus = "Paid" | "Pending" | "Overdue";

export type RenterNotificationCategory =
  | "rent"
  | "maintenance"
  | "lease"
  | "history"
  | "inquiry";

export interface RenterProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  unitNumber: string;
  propertyName: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface RenterProperty {
  id: string;
  name: string;
  unitNumber: string;
  address: string;
  image?: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  wifi: boolean;
  amenities?: string[];
  landlordName: string;
  landlordPhone: string;
  email: string;
  moveInDate: string;
  leaseStatus: string;
  leaseEnd?: string;
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
  referenceNumber?: string;
  receiptName?: string;
}

export interface RenterMaintenance {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  status: MaintenanceStatus;
  createdAt: string;
  updatedNote?: string;
}

export interface RenterDocument {
  id: string;
  title: string;
  category: "Lease Agreement" | "Payment Receipt" | "Notice";
  date: string;
  size: string;
  summary?: string;
  referenceId?: string;
}

export interface RenterLeaseAgreement {
  id: string;
  agreementId?: string;
  title: string;
  date: string;
  size: string;
}

export interface RenterLease {
  status: string;
  propertyName: string;
  unitNumber: string;
  address: string;
  landlordName: string;
  landlordPhone: string;
  landlordEmail: string;
  startDate: string;
  endDate?: string;
  monthlyRentRwf: number;
  paymentDueDay: number;
  securityDepositRwf?: number;
  noticePeriodDays?: number;
  agreement?: RenterLeaseAgreement;
}

export interface RenterNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  category: RenterNotificationCategory;
  href?: string;
  actionLabel?: string;
}

export interface RenterSupportTicket {
  id: string;
  subject: string;
  category: string;
  message: string;
  createdAt: string;
  status: "Submitted" | "In Review";
}

export interface RenterFaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}
