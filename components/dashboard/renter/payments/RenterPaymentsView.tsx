"use client";

import { useRenterPayments } from "@/hooks/query/renter.hooks";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import { formatRwf } from "@/utils/format";
import { summarizeRenterPayments } from "@/utils/renter-helpers";
import { PaymentStatusOverviewCard } from "./PaymentStatusOverviewCard";
import { PaymentHistoryTable } from "./PaymentHistoryTable";

export function RenterPaymentsView() {
  const { isLoading, isError, refetch } = useRenterPayments();
  const payments = useRenterWorkspace((s) => s.payments);

  if (isLoading) return <SectionLoading message="Loading payment details..." />;
  if (isError) {
    return (
      <SectionError
        message="Unable to load payments."
        onRetry={() => void refetch()}
      />
    );
  }

  const summary = summarizeRenterPayments(payments);
  const featured = summary.pendingPayment ?? payments[0];

  return (
    <div className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          Rent &amp; Payments
        </h2>
        <p className="mt-1 text-sm text-body">
          Track monthly rent obligations, submit payments, and access receipts.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border border-line bg-white p-4 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            Current Balance Due
          </span>
          <p className="mt-2 font-ibm text-xl font-bold text-ink">
            {formatRwf(summary.outstandingRwf)}
          </p>
        </div>
        <div className="border border-line bg-white p-4 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            Total Paid Recorded
          </span>
          <p className="mt-2 font-ibm text-xl font-bold text-success">
            {formatRwf(summary.totalPaidRwf)}
          </p>
        </div>
        <div className="border border-line bg-white p-4 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            Receipts Available
          </span>
          <p className="mt-2 font-ibm text-xl font-bold text-ink">
            {summary.paidCount}
          </p>
        </div>
      </div>

      <PaymentStatusOverviewCard payment={featured} />
      <PaymentHistoryTable payments={payments} />
    </div>
  );
}
