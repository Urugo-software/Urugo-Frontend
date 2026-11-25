"use client";

import { useState } from "react";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { formatRwf } from "@/utils/format";

export interface FinalChargeItem {
  key: "water" | "electricity" | "other";
  label: string;
  status: "paid" | "unpaid" | "na";
  amountRwf: number;
}

interface FinalBalanceSummaryProps {
  approvedCount: number;
  unpaidRentRwf: number;
  charges: FinalChargeItem[];
  onBack: () => void;
  onSubmit: () => void;
}

export function FinalBalanceSummary({
  approvedCount,
  unpaidRentRwf,
  charges,
  onBack,
  onSubmit,
}: FinalBalanceSummaryProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const unpaidCharges = charges.filter(
    (c) => c.status === "unpaid" && c.amountRwf > 0,
  );
  const unpaidChargesRwf = unpaidCharges.reduce(
    (sum, item) => sum + item.amountRwf,
    0,
  );
  const totalOwed = unpaidRentRwf + unpaidChargesRwf;

  return (
    <div className="space-y-5">
      <div className="border border-line bg-surface/40 p-5 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
          Final Balance Breakdown
        </h3>

        <dl className="divide-y divide-line text-sm">
          <div className="flex justify-between gap-4 py-2">
            <dt className="text-body">Approved Rent Payments</dt>
            <dd className="font-semibold text-ink">{approvedCount}</dd>
          </div>
          <div className="flex justify-between gap-4 py-2">
            <dt className="text-body">Unpaid Rent Balance</dt>
            <dd className="font-ibm font-semibold text-ink">
              {formatRwf(unpaidRentRwf)}
            </dd>
          </div>
          {unpaidCharges.map((charge) => (
            <div key={charge.key} className="flex justify-between gap-4 py-2">
              <dt className="text-body">Unpaid {charge.label}</dt>
              <dd className="font-ibm font-semibold text-ink">
                {formatRwf(charge.amountRwf)}
              </dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 pt-3 text-base font-bold text-ink">
            <dt>Total Remaining Balance</dt>
            <dd className="font-ibm">{formatRwf(totalOwed)}</dd>
          </div>
        </dl>
      </div>

      <p className="border border-blue-200 bg-brand-tint/60 p-4 text-xs leading-relaxed text-brand-deep">
        {totalOwed > 0
          ? "Submitting this notice opens a 3-day resolution and dispute window. The balance is recorded as Unresolved (not Confirmed debt) until the renter pays, provides proof, or the 3-day review period concludes."
          : "No unpaid rent or utility obligations remain. Submitting closes this tenancy cleanly."}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="cursor-pointer rounded-none"
        >
          &larr; Back to Final Charges
        </Button>
        <Button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="cursor-pointer rounded-none"
        >
          {totalOwed > 0 ? "Issue Final Notice & Close" : "Close Tenancy"}
        </Button>
      </div>

      <ModalDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        variant="alert"
        title="Confirm tenancy closure"
        description={
          totalOwed > 0
            ? `Close this tenancy and notify the renter of ${formatRwf(totalOwed)} remaining balance (3-day review window)?`
            : "Close this tenancy with zero remaining balance and mark the unit vacant?"
        }
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              className="cursor-pointer rounded-none"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                setConfirmOpen(false);
                onSubmit();
              }}
              className="cursor-pointer rounded-none"
            >
              Confirm Closure
            </Button>
          </>
        }
      >
        <p className="text-xs text-body">
          The tenancy status will change to Closed and the assigned unit will be
          marked Vacant.
        </p>
      </ModalDialog>
    </div>
  );
}
