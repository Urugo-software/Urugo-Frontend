import type {
  IssueStatus,
  PaymentRejectionCategory,
  TenancyPayment,
} from "@/types/landlord";

export interface IssueStatusMeta {
  label: string;
  description: string;
  tone: "info" | "warning" | "danger" | "success" | "neutral";
  isConfirmedObligation: boolean;
}

export const PAYMENT_REJECTION_OPTIONS: Array<{
  value: PaymentRejectionCategory;
  label: string;
  createsUnpaidBalance: boolean;
  helper: string;
}> = [
  {
    value: "money_not_received",
    label: "Money not received",
    createsUnpaidBalance: true,
    helper: "Adds this rent period to the renter's unpaid balance.",
  },
  {
    value: "wrong_amount",
    label: "Incorrect amount paid",
    createsUnpaidBalance: true,
    helper: "Flags a remaining unpaid rent balance for this period.",
  },
  {
    value: "duplicate_payment",
    label: "Duplicate submission",
    createsUnpaidBalance: false,
    helper: "Dismisses duplicate proof without creating unpaid debt.",
  },
  {
    value: "invalid_receipt",
    label: "Unreadable or mismatched receipt",
    createsUnpaidBalance: false,
    helper: "Asks renter to re-upload proof without marking debt.",
  },
  {
    value: "other",
    label: "Other administrative reason",
    createsUnpaidBalance: false,
    helper: "Records rejection notes without creating unpaid debt.",
  },
];

export function doesRejectionCreateUnpaidBalance(
  category?: PaymentRejectionCategory,
): boolean {
  return category === "money_not_received" || category === "wrong_amount";
}

export function calculateUnpaidRentFromPayments(
  payments: readonly TenancyPayment[],
): number {
  return payments
    .filter((payment) => {
      if (payment.status !== "Rejected") return false;
      if (typeof payment.createsUnpaidBalance === "boolean") {
        return payment.createsUnpaidBalance;
      }
      return doesRejectionCreateUnpaidBalance(payment.rejectionCategory);
    })
    .reduce((sum, payment) => sum + payment.amountRwf, 0);
}

export function getIssueStatusMeta(status: IssueStatus): IssueStatusMeta {
  switch (status) {
    case "Reported":
      return {
        label: "Waiting for review",
        description: "Submitted by landlord; awaiting renter notice response.",
        tone: "info",
        isConfirmedObligation: false,
      };
    case "Unresolved":
      return {
        label: "Unresolved (Notice period)",
        description:
          "Active 3-day notice window. Not yet confirmed as outstanding debt.",
        tone: "warning",
        isConfirmedObligation: false,
      };
    case "Disputed":
      return {
        label: "Disputed by renter",
        description:
          "Renter submitted a response or receipt. Under review — not confirmed debt.",
        tone: "warning",
        isConfirmedObligation: false,
      };
    case "Confirmed":
      return {
        label: "Confirmed obligation",
        description: "Verified unpaid obligation recorded after review window.",
        tone: "danger",
        isConfirmedObligation: true,
      };
    case "Resolved":
      return {
        label: "Resolved",
        description: "Obligation settled or proof accepted; case closed.",
        tone: "success",
        isConfirmedObligation: false,
      };
    case "Rejected":
      return {
        label: "Dismissed / Closed",
        description: "Report was not substantiated and is closed without debt.",
        tone: "neutral",
        isConfirmedObligation: false,
      };
  }
}

export function isIssueActionable(status: IssueStatus): boolean {
  return (
    status === "Reported" || status === "Unresolved" || status === "Disputed"
  );
}
