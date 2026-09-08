"use client";

import { useRenterPayments } from "@/hooks/query/renter.hooks";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { PaymentStatusOverviewCard } from "./PaymentStatusOverviewCard";
import { PaymentHistoryTable } from "./PaymentHistoryTable";

export function RenterPaymentsView() {
  const { data: payments, isLoading, isError } = useRenterPayments();

  if (isLoading) return <SectionLoading message="Loading payment details..." />;
  if (isError || !payments)
    return <SectionError message="Unable to load payments." />;

  const currentPending =
    payments.find((p) => p.status === "Pending") || payments[0];

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-ink sm:text-2xl">
          Rent & Payments
        </h2>
        <p className="text-sm text-body mt-1">
          Review your rent statements and payment history.
        </p>
      </div>

      <PaymentStatusOverviewCard payment={currentPending} />

      <PaymentHistoryTable payments={payments} />
    </div>
  );
}
