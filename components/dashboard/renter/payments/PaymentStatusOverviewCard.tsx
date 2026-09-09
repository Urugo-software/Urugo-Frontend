import React from "react";
import Link from "next/link";
import CustomButton from "@/components/shared/CustomButton";
import { RenterPayment } from "@/types/renter";

interface Props {
  payment?: RenterPayment;
}

export function PaymentStatusOverviewCard({ payment }: Props) {
  if (!payment) return null;

  const isPending =
    payment.status === "Pending" || payment.status === "Overdue";

  return (
    <div className="mb-6 rounded-sm flex flex-wrap items-center justify-between gap-4 border border-line bg-surface p-6">
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-faint">
          Current Rent Status ({payment.period})
        </span>
        <div className="mt-1 flex items-baseline gap-3">
          <span className="text-3xl font-extrabold text-ink">
            RWF {payment.amountRwf.toLocaleString()}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isPending
                ? "bg-amber-100 text-amber-700"
                : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {payment.status}
          </span>
        </div>
        <p className="mt-1 text-xs text-body flex items-center gap-1">
          Due Date:{" "}
          <span className="font-semibold text-ink">{payment.dueDate}</span>
        </p>
      </div>

      {isPending && (
        <Link href="/renter/payments/pay-rent">
          <CustomButton
            variant="light"
            className="px-6 py-2.5 font-bold rounded-none"
          >
            <span className="-translate-x-4 group-hover:text-white">
              Pay Rent Now
            </span>
          </CustomButton>
        </Link>
      )}
    </div>
  );
}
