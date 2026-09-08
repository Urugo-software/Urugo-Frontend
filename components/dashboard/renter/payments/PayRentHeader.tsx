import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function PayRentHeader() {
  return (
    <div>
      <Link
        href="/renter/payments"
        className="inline-flex items-center gap-2 text-xs font-semibold text-body hover:text-brand transition-colors mb-3"
      >
        <ArrowLeft className="size-4" />
        Back to Payments
      </Link>
      <h2 className="text-xl font-bold text-ink sm:text-2xl">Pay Rent</h2>
      <p className="text-sm text-body mt-1">
        Complete your monthly rent payment and upload payment confirmation.
      </p>
    </div>
  );
}
