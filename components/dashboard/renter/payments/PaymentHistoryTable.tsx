"use client";

import { useMemo, useState } from "react";
import { CreditCard, ReceiptText } from "lucide-react";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { Pagination } from "@/components/shared/Pagination";
import { StatusBadge, type StatusTone } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import type { PaymentStatus, RenterPayment } from "@/types/renter";
import { formatRwf } from "@/utils/format";
import { paginateItems } from "@/utils/pagination";
import { PaymentReceiptModal } from "./PaymentReceiptModal";

const STATUS_TONE: Record<PaymentStatus, StatusTone> = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
};

const FILTERS: Array<{ id: "all" | PaymentStatus; label: string }> = [
  { id: "all", label: "All" },
  { id: "Paid", label: "Paid" },
  { id: "Pending", label: "Pending" },
  { id: "Overdue", label: "Overdue" },
];

const PER_PAGE = 6;

export function PaymentHistoryTable({
  payments,
}: {
  payments: RenterPayment[];
}) {
  const [statusFilter, setStatusFilter] = useState<"all" | PaymentStatus>("all");
  const [page, setPage] = useState(1);
  const [receiptPayment, setReceiptPayment] = useState<RenterPayment | null>(
    null,
  );

  const filtered = useMemo(
    () =>
      payments.filter(
        (item) => statusFilter === "all" || item.status === statusFilter,
      ),
    [payments, statusFilter],
  );

  const paginated = paginateItems(filtered, page, PER_PAGE);

  return (
    <section className="border border-line bg-white shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <h3 className="text-base font-bold text-ink">Payment History</h3>
        <div
          role="group"
          aria-label="Filter payments by status"
          className="flex flex-wrap items-center gap-1.5"
        >
          {FILTERS.map((f) => (
            <Button
              key={f.id}
              type="button"
              size="sm"
              variant={statusFilter === f.id ? "default" : "outline"}
              onClick={() => {
                setStatusFilter(f.id);
                setPage(1);
              }}
              className="h-8 cursor-pointer rounded-none px-3 text-xs"
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {paginated.items.length === 0 ? (
        <div className="p-5">
          <EmptyStateBox
            icon={CreditCard}
            title="No payment records found"
            description="No payments match the selected status filter."
          />
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="border-b border-line bg-surface">
                <tr>
                  {["Period", "Amount", "Method", "Date", "Status", "Receipt"].map(
                    (col, idx) => (
                      <th
                        key={col}
                        className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-faint ${
                          idx === 5 ? "text-right" : ""
                        }`}
                      >
                        {col}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-sm">
                {paginated.items.map((item) => (
                  <tr key={item.id} className="hover:bg-surface/50">
                    <td className="px-5 py-4 font-semibold text-ink">
                      {item.period}
                    </td>
                    <td className="px-5 py-4 font-ibm font-bold text-ink">
                      {formatRwf(item.amountRwf)}
                    </td>
                    <td className="px-5 py-4 text-body">
                      {item.paymentType || "—"}
                    </td>
                    <td className="px-5 py-4 text-body">
                      {item.paidAt || item.dueDate}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge
                        label={item.status}
                        tone={STATUS_TONE[item.status]}
                        className="text-sm"
                      />
                    </td>
                    <td className="px-5 py-4 text-right">
                      {item.status === "Paid" ? (
                        <button
                          type="button"
                          onClick={() => setReceiptPayment(item)}
                          className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-brand-blue hover:underline"
                        >
                          <ReceiptText aria-hidden="true" className="size-3.5" />
                          View Receipt
                        </button>
                      ) : (
                        <span className="text-xs text-faint">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-line md:hidden">
            {paginated.items.map((item) => (
              <div key={item.id} className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-ink">
                    {item.period}
                  </span>
                  <StatusBadge
                    label={item.status}
                    tone={STATUS_TONE[item.status]}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-body">
                  <span className="font-ibm text-sm font-bold text-ink">
                    {formatRwf(item.amountRwf)}
                  </span>
                  <span>{item.paidAt || item.dueDate}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-faint">
                  <span>{item.paymentType || "Awaiting payment"}</span>
                  {item.status === "Paid" && (
                    <button
                      type="button"
                      onClick={() => setReceiptPayment(item)}
                      className="cursor-pointer font-semibold text-brand-blue hover:underline"
                    >
                      View Receipt
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 pb-5">
            <Pagination
              currentPage={paginated.page}
              totalPages={paginated.totalPages}
              onPageChange={setPage}
              totalItems={paginated.totalItems}
              itemsPerPage={PER_PAGE}
              itemLabel="payments"
              className="mt-4 pt-4"
            />
          </div>
        </>
      )}

      <PaymentReceiptModal
        payment={receiptPayment}
        onClose={() => setReceiptPayment(null)}
      />
    </section>
  );
}
