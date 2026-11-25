"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AppLocale } from "@/i18n/config";
import { formatDateLocalized } from "@/i18n/formatting";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type {
  LandlordRenter,
  PaymentRejectionCategory,
  TenancyPayment,
} from "@/types/landlord";
import { calculateUnpaidRentFromPayments } from "@/utils/rental-debt";
import {
  FinalBalanceSummary,
  type FinalChargeItem,
} from "./FinalBalanceSummary";
import { PendingPaymentsReview } from "./PendingPaymentsReview";
import { TenancySubmittedCard } from "./TenancySubmittedCard";
import { WorkflowStepIndicator, type StepItem } from "./WorkflowStepIndicator";

interface EndTenancyWorkflowProps {
  renter: LandlordRenter;
  initialPayments: TenancyPayment[];
}

type Step = "review" | "charges" | "summary";

export function EndTenancyWorkflow({
  renter,
  initialPayments,
}: EndTenancyWorkflowProps) {
  const t = useTranslations("landlord.tenancies.endWorkflow");
  const locale = useLocale() as AppLocale;
  const {
    profile,
    approvePayment,
    rejectPayment,
    closeTenancy,
    createIssue,
  } = useLandlordWorkspace();
  const vacateUnitByRenter = useLandlordProperties((s) => s.vacateUnitByRenter);

  const workflowSteps: StepItem<Step>[] = [
    { key: "review", label: t("stepReview") },
    { key: "charges", label: t("stepCharges") },
    { key: "summary", label: t("stepSummary") },
  ];

  const chargeLabel = (key: FinalChargeItem["key"]) =>
    key === "water"
      ? t("chargeWater")
      : key === "electricity"
        ? t("chargeElectricity")
        : t("chargeOther");

  const [step, setStep] = useState<Step>("review");
  const [charges, setCharges] = useState<FinalChargeItem[]>([
    { key: "water", label: "Water bill (WASAC)", status: "paid", amountRwf: 0 },
    { key: "electricity", label: "Electricity (EUCL)", status: "paid", amountRwf: 0 },
    { key: "other", label: "Other agreed charges", status: "na", amountRwf: 0 },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdIssueId, setCreatedIssueId] = useState<string | undefined>();

  const localizedCharges = charges.map((c) => ({
    ...c,
    label: chargeLabel(c.key),
  }));

  const pendingCount = initialPayments.filter(
    (p) => p.status === "Pending",
  ).length;
  const approvedCount = initialPayments.filter(
    (p) => p.status === "Approved",
  ).length;
  const unpaidRentRwf = calculateUnpaidRentFromPayments(initialPayments);
  const unpaidChargesRwf = charges
    .filter((c) => c.status === "unpaid" && c.amountRwf > 0)
    .reduce((sum, c) => sum + c.amountRwf, 0);
  const totalOwed = unpaidRentRwf + unpaidChargesRwf;

  const updateCharge = (
    key: FinalChargeItem["key"],
    patch: Partial<FinalChargeItem>,
  ) => {
    setCharges((prev) =>
      prev.map((item) => (item.key === key ? { ...item, ...patch } : item)),
    );
  };

  const handleApprove = (id: string) => {
    approvePayment(id);
    toast.success(t("toastApproved"));
  };

  const handleReject = (
    id: string,
    category: PaymentRejectionCategory,
    reason: string,
  ) => {
    rejectPayment(id, category, reason);
    toast.success(t("toastRejected"));
  };

  const handleFinalize = () => {
    closeTenancy(renter.id);
    vacateUnitByRenter(renter.id);

    if (totalOwed > 0) {
      const today = new Date();
      const deadline = new Date(today);
      deadline.setDate(deadline.getDate() + 3);
      const unpaidLabels = [
        ...(unpaidRentRwf > 0 ? [t("unpaidRentLabel")] : []),
        ...localizedCharges
          .filter((c) => c.status === "unpaid" && c.amountRwf > 0)
          .map((c) => c.label.toLowerCase()),
      ].join(", ");

      const created = createIssue({
        renterId: renter.id,
        propertyId: renter.propertyId,
        issueTitle: t("finalBalanceIssueTitle", { labels: unpaidLabels }),
        obligationType: unpaidRentRwf > 0 ? "rent" : "other",
        amountRwf: totalOwed,
        propertyName: `${renter.propertyName} — ${renter.unitNumber}`,
        tenancyPeriod: `${renter.startDate} - ${renter.endDate ?? "Closed"}`,
        landlordName: profile.fullName,
        renterName: renter.name,
        createdDate: formatDateLocalized(today, locale),
        noticeDeadlineDate: formatDateLocalized(deadline, locale),
        daysRemaining: 3,
        status: "Unresolved",
        landlordReport: t("finalBalanceLandlordReport", {
          labels: unpaidLabels,
        }),
      });
      setCreatedIssueId(created.id);
    }

    toast.success(t("toastClosed"));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <TenancySubmittedCard
        totalOwed={totalOwed}
        createdIssueId={createdIssueId}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <WorkflowStepIndicator steps={workflowSteps} currentStep={step} />

      {step === "review" && (
        <div className="flex flex-col gap-5">
          <PendingPaymentsReview
            payments={initialPayments}
            onApprove={handleApprove}
            onReject={handleReject}
          />
          <div className="flex justify-end">
            <Button
              type="button"
              disabled={pendingCount > 0}
              onClick={() => setStep("charges")}
              className="cursor-pointer rounded-none"
            >
              {t("continueToCharges")} &rarr;
            </Button>
          </div>
        </div>
      )}

      {step === "charges" && (
        <div className="space-y-4">
          <p className="text-xs text-body">{t("chargesInstruction")}</p>
          <div className="divide-y divide-line border border-line bg-white">
            {localizedCharges.map((charge) => (
              <div
                key={charge.key}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm font-semibold text-ink">
                  {charge.label}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {(
                    [
                      { val: "paid", label: t("chargePaid") },
                      { val: "unpaid", label: t("chargeNotPaid") },
                      { val: "na", label: t("chargeNa") },
                    ] as const
                  ).map(({ val, label }) => (
                    <Button
                      key={val}
                      type="button"
                      size="sm"
                      variant={charge.status === val ? "default" : "outline"}
                      onClick={() =>
                        updateCharge(charge.key, {
                          status: val,
                          amountRwf: val === "unpaid" ? charge.amountRwf : 0,
                        })
                      }
                      className="h-8 cursor-pointer rounded-none px-3 text-xs"
                    >
                      {label}
                    </Button>
                  ))}
                  {charge.status === "unpaid" && (
                    <Input
                      type="number"
                      min={0}
                      step={500}
                      aria-label={t("unpaidAmountAria", { label: charge.label })}
                      placeholder={t("amountPlaceholder")}
                      value={charge.amountRwf || ""}
                      onChange={(e) =>
                        updateCharge(charge.key, {
                          amountRwf: Math.max(0, Number(e.target.value) || 0),
                        })
                      }
                      className="h-8 w-36 rounded-none text-xs"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("review")}
              className="cursor-pointer rounded-none"
            >
              &larr; {t("backToPayments")}
            </Button>
            <Button
              type="button"
              onClick={() => setStep("summary")}
              className="cursor-pointer rounded-none"
            >
              {t("continueToNotice")} &rarr;
            </Button>
          </div>
        </div>
      )}

      {step === "summary" && (
        <FinalBalanceSummary
          approvedCount={approvedCount}
          unpaidRentRwf={unpaidRentRwf}
          charges={localizedCharges}
          onBack={() => setStep("charges")}
          onSubmit={handleFinalize}
        />
      )}
    </div>
  );
}
