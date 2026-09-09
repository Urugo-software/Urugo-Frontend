import { Smartphone, Building2, CreditCard, LucideIcon } from "lucide-react";

export type PaymentMethod = "MTN Mobile Money" | "AIRTEL Money" | "Bank Transfer" | "Card";

export interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: LucideIcon;
}

export const paymentMethodsData: PaymentMethodOption[] = [
  {
    id: "MTN Mobile Money",
    name: "MTN MoMo",
    description: "Instant mobile wallet payment",
    icon: Smartphone,
  },
  {
    id: "AIRTEL Money",
    name: "Airtel Money",
    description: "Instant mobile wallet payment",
    icon: Smartphone,
  },
  {
    id: "Bank Transfer",
    name: "Bank Transfer",
    description: "Direct bank transfer / wire",
    icon: Building2,
  },
  {
    id: "Card",
    name: "Debit / Credit Card",
    description: "Visa, Mastercard or local card",
    icon: CreditCard,
  },
];
