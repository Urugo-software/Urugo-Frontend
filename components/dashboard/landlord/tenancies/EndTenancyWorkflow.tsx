"use client";

import { useState } from "react";
import {
  LandlordRenter,
  TenancyPayment,
  FinalChargeCheck,
} from "@/types/landlord";
import { PendingPaymentsReview } from "./PendingPaymentsReview";
import { FinalPaymentsChecklist } from "./FinalPaymentsChecklist";
import { WorkflowStepIndicator, StepItem } from "./WorkflowStepIndicator";
import { FinalBalanceSummary } from "./FinalBalanceSummary";
import { TenancySubmittedCard } from "./TenancySubmittedCard";
import { Button } from "@/components/ui/button";
import CustomButton from "@/components/shared/CustomButton";

interface EndTenancyWorkflowProps {
  renter: LandlordRenter;
  initialPayments: TenancyPayment[];
}

type Step = "review" | "checklist" | "summary";

const WORKFLOW_STEPS: StepItem<Step>[] = [
  { key: "review", label: "1. Pending Payments" },
  { key: "checklist", label: "2. Utility Checklist" },
  { key: "summary", label: "3. Final Notice" },
];

export function EndTenancyWorkflow({
  initialPayments,
}: EndTenancyWorkflowProps) {
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
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Approved" } : p)),
    );

  const handleReject = (id: string) =>
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Rejected" } : p)),
    );

  const handleChargeChange = (
    type: FinalChargeCheck["chargeType"],
    status: FinalChargeCheck["status"],
    amount?: number,
  ) =>
    setCharges((prev) =>
      prev.map((c) =>
        c.chargeType === type
          ? {
              ...c,
              status,
              remainingAmountRwf: status === "Not Paid" ? amount : undefined,
            }
          : c,
      ),
    );

  if (isSubmitted) {
    return <TenancySubmittedCard totalOwed={totalOwed} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <WorkflowStepIndicator steps={WORKFLOW_STEPS} currentStep={step} />

      {step === "review" && (
        <div className="flex flex-col gap-5">
          <PendingPaymentsReview
            payments={payments}
            onApprove={handleApprove}
            onReject={handleReject}
          />
          <div className="flex justify-end">
            <CustomButton
              disabled={pendingCount > 0}
              onClick={() => setStep("checklist")}
              className="bg-brand text-white hover:bg-brand-deep"
            >
              Continue to Utility Check &rarr;
            </CustomButton>
          </div>
        </div>
      )}

      {step === "checklist" && (
        <div className="flex flex-col gap-5">
          <FinalPaymentsChecklist
            charges={charges}
            onChargeChange={handleChargeChange}
          />
          <div className="flex items-center justify-between">
            <Button
              className="rounded-none cursor-pointer"
              variant="outline"
              onClick={() => setStep("review")}
            >
              &larr; Back
            </Button>
            <Button
              onClick={() => setStep("summary")}
              className="rounded-none cursor-pointer bg-brand text-white hover:bg-brand-deep"
            >
              Review Final Balance &rarr;
            </Button>
          </div>
        </div>
      )}

      {step === "summary" && (
        <FinalBalanceSummary
          charges={charges}
          totalOwed={totalOwed}
          onBack={() => setStep("checklist")}
          onSubmit={() => setIsSubmitted(true)}
        />
      )}
    </div>
  );
}
