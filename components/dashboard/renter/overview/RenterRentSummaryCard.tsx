import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RenterPayment } from "@/types/renter";

export function RenterRentSummaryCard({
  payment,
}: {
  payment?: RenterPayment;
}) {
  if (!payment) return null;

  return (
    <div className="flex flex-col justify-between  border border-line bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-faint uppercase tracking-wider">
          Rent Payment
        </span>
      </div>
      <div className="my-3">
        <div className="text-2xl font-bold text-ink">
          RWF {payment.amountRwf.toLocaleString()}
        </div>
        <p className="text-[12.5px] mt-2 font-semibold text-body">
          Due: <span className="font-semibold text-ink">{payment.dueDate}</span>{" "}
          ({payment.period})
        </p>
      </div>
      <Link
        href="/renter/payments"
        className="flex items-center duration-300 justify-between pt-2 text-[12px] hover:font-semibold text-gray-400 hover:text-brand hover:underline"
      >
        <span>View & Pay Rent</span>
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
