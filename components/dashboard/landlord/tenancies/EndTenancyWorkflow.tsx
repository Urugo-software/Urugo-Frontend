"use client";

import { useState } from "react";
import { LandlordRenter, TenancyPayment, FinalChargeCheck } from "@/types/landlord";
import { PendingPaymentsReview } from "./PendingPaymentsReview";
import { FinalPaymentsChecklist } from "./FinalPaymentsChecklist";
import { Button } from "@/components/ui/button";

interface EndTenancyWorkflowProps {
  renter: LandlordRenter;
  initialPayments: TenancyPayment[];
}

type Step = "review" | "checklist" | "summary";

export function EndTenancyWorkflow({ initialPayments }: EndTenancyWorkflowProps) {
  const [payments, setPayments] = useState<TenancyPayment[]>(initialPayments);
  const [step, setStep] = useState<Step>("review");
  const [charges, setCharges] = useState<FinalChargeCheck[]>([
    { chargeType: "Water", status: "Not Paid", remainingAmountRwf: 50000 },
    { chargeType: "Electricity", status: "Paid" },
    { chargeType: "Other", status: "Not Applicable" },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const pendingCount = payments.filter((p) => p.status === "Pending").length;
  const totalOwed = charges
    .filter((c) => c.status === "Not Paid")
    .reduce((acc, c) => acc + (c.remainingAmountRwf || 0), 0);

  const handleApprove = (id: string) =>
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status: "Approved" } : p)));

  const handleReject = (id: string) =>
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status: "Rejected" } : p)));

  const handleChargeChange = (
    type: FinalChargeCheck["chargeType"],
    status: FinalChargeCheck["status"],
    amount?: number
  ) =>
    setCharges((prev) =>
      prev.map((c) =>
        c.chargeType === type
          ? { ...c, status, remainingAmountRwf: status === "Not Paid" ? amount : undefined }
          : c
      )
    );

  const steps: { key: Step; label: string }[] = [
    { key: "review", label: "1. Pending Payments" },
    { key: "checklist", label: "2. Utility Checklist" },
    { key: "summary", label: "3. Final Notice" },
  ];

  if (isSubmitted) {
    return (
      <div className="border border-line bg-brand-tint/60 p-8 text-center shadow-2xs">
        <h3 className="text-xl font-bold text-ink">Tenancy Processing Submitted</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-body">
          {totalOwed > 0
            ? `The renter will be notified about the remaining ${totalOwed.toLocaleString()} RWF obligation and given 3 days to pay or dispute.`
            : "The tenancy has been successfully closed with zero remaining balance."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Step Progress */}
      <div className="flex items-center gap-4 border-b border-line pb-4 text-xs font-semibold uppercase tracking-wider">
        {steps.map(({ key, label }, i) => (
          <span key={key} className="flex items-center gap-2">
            {i > 0 && <span className="text-faint">&rarr;</span>}
            <span className={step === key ? "text-brand font-bold" : "text-faint"}>{label}</span>
          </span>
        ))}
      </div>

      {step === "review" && (
        <div className="flex flex-col gap-5">
          <PendingPaymentsReview
            payments={payments}
            onApprove={handleApprove}
            onReject={handleReject}
          />
          <div className="flex justify-end">
            <Button
              disabled={pendingCount > 0}
              onClick={() => setStep("checklist")}
              className="bg-brand text-white hover:bg-brand-deep"
            >
              Continue to Utility Check &rarr;
            </Button>
          </div>
        </div>
      )}

      {step === "checklist" && (
        <div className="flex flex-col gap-5">
          <FinalPaymentsChecklist charges={charges} onChargeChange={handleChargeChange} />
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setStep("review")}>
              &larr; Back
            </Button>
            <Button onClick={() => setStep("summary")} className="bg-brand text-white hover:bg-brand-deep">
              Review Final Balance &rarr;
            </Button>
          </div>
        </div>
      )}

      {step === "summary" && (
        <div className="flex flex-col gap-5">
          <div className="border border-line bg-white shadow-2xs">
            <div className="border-b border-line px-5 py-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                Final Tenancy Balance Summary
              </h3>
            </div>
            <div className="divide-y divide-line">
              <div className="flex justify-between px-5 py-4 text-sm">
                <span className="text-body font-medium">Rent Payments</span>
                <span className="font-semibold text-brand">Cleared</span>
              </div>
              {charges.map((c) => (
                <div key={c.chargeType} className="flex justify-between px-5 py-4 text-sm">
                  <span className="text-body font-medium">{c.chargeType} Utility</span>
                  <span className="font-semibold text-ink">
                    {c.status === "Paid"
                      ? "Paid"
                      : c.status === "Not Paid"
                        ? `${c.remainingAmountRwf?.toLocaleString()} RWF`
                        : "Not Applicable"}
                  </span>
                </div>
              ))}
              <div className="flex justify-between px-5 py-4 text-sm font-bold">
                <span className="text-ink">Total Remaining Obligation</span>
                <span className={totalOwed > 0 ? "text-amber-700" : "text-brand"}>
                  {totalOwed.toLocaleString()} RWF
                </span>
              </div>
            </div>
          </div>

          <div className="border border-line bg-surface p-4 shadow-2xs">
            <p className="text-sm text-body">
              <strong className="font-semibold text-ink">Renter Notice Policy:</strong> The renter
              will receive a notification regarding this final accounting and is granted 3 days to
              pay or dispute before any record is officially logged.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setStep("checklist")}>
              &larr; Back
            </Button>
            <Button onClick={() => setIsSubmitted(true)} className="bg-brand text-white hover:bg-brand-deep">
              Submit Tenancy Record
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
