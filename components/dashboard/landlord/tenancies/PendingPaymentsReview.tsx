"use client";

import { TenancyPayment } from "@/types/landlord";
import { Button } from "@/components/ui/button";

interface PendingPaymentsReviewProps {
  payments: TenancyPayment[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function PendingPaymentsReview({
  payments,
  onApprove,
  onReject,
}: PendingPaymentsReviewProps) {
  const pending = payments.filter((p) => p.status === "Pending");

  if (pending.length === 0) {
    return (
      <div className="border border-blue-200 bg-brand-tint/60 p-5 shadow-2xs">
        <div>
          <p className="text-sm sm:text-[15px] font-semibold text-ink">All payments cleared</p>
          <p className="mt-1 text-sm text-body">
            There are no pending unverified payments for this tenancy. You may proceed to the next step.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line bg-white shadow-2xs">
      <div className="border-b border-line bg-amber-50 px-5 py-4">
        <p className="text-sm sm:text-[15px] font-semibold text-ink">
          Pending Payments Waiting for Review ({pending.length})
        </p>
        <p className="mt-1 text-sm text-body">
          A tenancy cannot be closed while unverified payments exist. Review each payment before continuing.
        </p>
      </div>

      <div className="divide-y divide-line">
        {pending.map((pay) => (
          <div key={pay.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-5">
            <div>
              <p className="text-sm font-bold text-ink">{pay.period} Rent</p>
              <p className="mt-1 text-sm text-body">
                {pay.amountRwf.toLocaleString()} RWF &middot;{" "}
                {pay.paymentMethod || "Direct Payment"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-rose-200 text-rose-600 hover:bg-rose-50"
                onClick={() => onReject(pay.id)}
              >
                Reject
              </Button>
              <Button
                size="sm"
                className="bg-brand hover:bg-brand-deep text-white"
                onClick={() => onApprove(pay.id)}
              >
                Approve Payment
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
