import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { RenterPayment } from "@/types/renter";
import { formatRwf } from "@/utils/format";

export function RenterRentSummaryCard({
  payment,
}: {
  payment?: RenterPayment;
}) {
  if (!payment) return null;

  const tone =
    payment.status === "Paid"
      ? "success"
      : payment.status === "Overdue"
        ? "danger"
        : "warning";

  return (
    <div className="flex flex-col justify-between border border-line bg-white p-5 shadow-2xs">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-faint">
          Rent Payment
        </span>
        <StatusBadge label={payment.status} tone={tone} />
      </div>

      <div className="my-3.5">
        <div className="font-ibm text-2xl font-bold text-ink">
          {formatRwf(payment.amountRwf)}
        </div>
        <p className="mt-1.5 text-xs text-body">
          {payment.status === "Paid" ? "Paid on" : "Due"}:{" "}
          <span className="font-semibold text-ink">
            {payment.paidAt ?? payment.dueDate}
          </span>{" "}
          ({payment.period})
        </p>
      </div>

      <Link
        href={
          payment.status === "Paid"
            ? "/renter/payments"
            : "/renter/payments/pay-rent"
        }
        className="flex items-center justify-between border-t border-line pt-3 text-xs font-semibold text-brand-blue hover:underline"
      >
        <span>
          {payment.status === "Paid" ? "View Payment History" : "Pay Rent Now"}
        </span>
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}
