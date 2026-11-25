import type {
  RenterDocument,
  RenterPayment,
  RenterProperty,
} from "@/types/renter";

export interface RenterPaymentSummary {
  totalPaidRwf: number;
  outstandingRwf: number;
  paidCount: number;
  pendingPayment: RenterPayment | undefined;
}

export function summarizeRenterPayments(
  payments: readonly RenterPayment[],
): RenterPaymentSummary {
  let totalPaidRwf = 0;
  let outstandingRwf = 0;
  let paidCount = 0;

  for (const payment of payments) {
    if (payment.status === "Paid") {
      totalPaidRwf += payment.amountRwf;
      paidCount += 1;
    } else {
      outstandingRwf += payment.amountRwf;
    }
  }

  const pendingPayment =
    payments.find((p) => p.status === "Overdue") ??
    payments.find((p) => p.status === "Pending");

  return { totalPaidRwf, outstandingRwf, paidCount, pendingPayment };
}

export function parseListingPrice(price: string): number {
  const digits = price.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : 0;
}

export function buildDocumentDownloadContent(
  doc: RenterDocument,
  property: RenterProperty,
  renterName: string,
): string {
  return [
    "URUGO RESIDENTIAL RECORD (FRONTEND PREVIEW)",
    "==========================================",
    `Document: ${doc.title}`,
    `Category: ${doc.category}`,
    `Date: ${doc.date}`,
    `Renter: ${renterName}`,
    `Property: ${property.name}`,
    `Address: ${property.address}`,
    `Landlord: ${property.landlordName} (${property.landlordPhone})`,
    "",
    doc.summary || `Monthly Rent: ${property.monthlyRentRwf.toLocaleString()} RWF`,
    "",
    "Note: Official signed PDF generation requires backend document service.",
  ].join("\n");
}

export function downloadTextFile(filename: string, content: string): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function getGreetingByHour(hour = new Date().getHours()): string {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function getInitials(fullName: string): string {
  return (
    fullName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "UR"
  );
}
