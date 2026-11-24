"use client";

import { useState } from "react";
import type { LandlordRenter, TenancyPayment } from "@/types/landlord";
import CustomButton from "@/components/shared/CustomButton";
import { PendingPaymentsReview } from "./PendingPaymentsReview";
import { WorkflowStepIndicator, type StepItem } from "./WorkflowStepIndicator";
import { FinalBalanceSummary } from "./FinalBalanceSummary";
import { TenancySubmittedCard } from "./TenancySubmittedCard";

interface EndTenancyWorkflowProps {
  renter: LandlordRenter;
  initialPayments: TenancyPayment[];
}

type Step = "review" | "summary";

const WORKFLOW_STEPS: StepItem<Step>[] = [
  { key: "review", label: "1. Rent Payments" },
  { key: "summary", label: "2. Final Notice" },
];

export function EndTenancyWorkflow({
  initialPayments,
}: EndTenancyWorkflowProps) {
  const [payments, setPayments] = useState<TenancyPayment[]>(initialPayments);
  const [step, setStep] = useState<Step>("review");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const pendingCount = payments.filter((p) => p.status === "Pending").length;
  const approvedCount = payments.filter((p) => p.status === "Approved").length;
  const unpaidRentRwf = payments
    .filter((p) => p.status === "Rejected")
    .reduce((sum, payment) => sum + payment.amountRwf, 0);

  const updatePaymentStatus = (id: string, status: "Approved" | "Rejected") =>
    setPayments((prev) =>
      prev.map((payment) => (payment.id === id ? { ...payment, status } : payment)),
    );

  if (isSubmitted) {
    return <TenancySubmittedCard totalOwed={unpaidRentRwf} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <WorkflowStepIndicator steps={WORKFLOW_STEPS} currentStep={step} />

      {step === "review" && (
        <div className="flex flex-col gap-5">
          <PendingPaymentsReview
            payments={payments}
            onApprove={(id) => updatePaymentStatus(id, "Approved")}
            onReject={(id) => updatePaymentStatus(id, "Rejected")}
          />
          <div className="flex justify-end">
            <CustomButton
              disabled={pendingCount > 0}
              onClick={() => setStep("summary")}
              className="bg-brand text-white hover:bg-brand-deep"
            >
              Continue to Final Notice &rarr;
            </CustomButton>
          </div>
        </div>
      )}

      {step === "summary" && (
        <FinalBalanceSummary
          approvedCount={approvedCount}
          unpaidRentRwf={unpaidRentRwf}
          onBack={() => setStep("review")}
          onSubmit={() => setIsSubmitted(true)}
        />
      )}
    </div>
  );
}
