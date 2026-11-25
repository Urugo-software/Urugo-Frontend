"use client";

import { useState } from "react";
import { Check, CheckCircle2, X } from "lucide-react";
import { RejectPaymentModal } from "@/components/dashboard/landlord/payments/RejectPaymentModal";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import type {
  PaymentRejectionCategory,
  TenancyPayment,
} from "@/types/landlord";
import { formatRwf } from "@/utils/format";

interface PendingPaymentsReviewProps {
  payments: TenancyPayment[];
  onApprove: (id: string) => void;
  onReject: (
    id: string,
    category: PaymentRejectionCategory,
    reason: string,
  ) => void;
}

export function PendingPaymentsReview({
  payments,
  onApprove,
  onReject,
}: PendingPaymentsReviewProps) {
  const [rejectTarget, setRejectTarget] = useState<TenancyPayment | null>(null);
  const pending = payments.filter((p) => p.status === "Pending");

  return (
    <div className="space-y-4">
      {pending.length === 0 ? (
        <div className="flex items-center gap-2.5 border border-emerald-200 bg-emerald-50/70 p-4 text-xs font-medium text-emerald-900">
          <CheckCircle2
            aria-hidden="true"
            className="size-4 shrink-0 text-emerald-600"
          />
          <span>
            No pending rent submissions awaiting review for this tenancy.
          </span>
        </div>
      ) : (
        <div className="divide-y divide-line border border-line bg-white">
          {pending.map((payment) => (
            <div
              key={payment.id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-ink">
                    {payment.period}
                  </span>
                  <span aria-hidden="true" className="text-line">&middot;</span>
                  <StatusBadge label="Pending verification" tone="warning" />
                </div>
                <p className="text-xs text-body">
                  {payment.paymentMethod ?? "Payment proof"}
                  {payment.reference ? ` · Ref: ${payment.reference}` : ""} ·
                  Due {payment.dueDate}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-2 font-ibm text-sm font-bold text-ink">
                  {formatRwf(payment.amountRwf)}
                </span>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => onApprove(payment.id)}
                  className="h-9 cursor-pointer rounded-none bg-emerald-700 px-3 text-xs text-white hover:bg-emerald-800"
                >
                  <Check aria-hidden="true" className="size-3.5" />
                  Approve
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setRejectTarget(payment)}
                  className="h-9 cursor-pointer rounded-none border-rose-200 px-3 text-xs text-rose-700 hover:bg-rose-50"
                >
                  <X aria-hidden="true" className="size-3.5" />
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {payments.length > pending.length && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-faint">
            Reviewed Payment History ({payments.length - pending.length})
          </p>
          <div className="divide-y divide-line border border-line bg-surface/30">
            {payments
              .filter((p) => p.status !== "Pending")
              .map((payment) => (
                <div
                  key={payment.id}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-xs"
                >
                  <div>
                    <span className="font-semibold text-ink">
                      {payment.period}
                    </span>
                    {payment.rejectionReason && (
                      <span className="ml-2 text-rose-700">
                        — {payment.rejectionReason}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-ibm font-semibold text-ink">
                      {formatRwf(payment.amountRwf)}
                    </span>
                    <StatusBadge
                      label={payment.status}
                      tone={payment.status === "Approved" ? "success" : "danger"}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <RejectPaymentModal
        payment={rejectTarget}
        onClose={() => setRejectTarget(null)}
        onConfirm={(id, category, reason) => onReject(id, category, reason)}
      />
    </div>
  );
}
