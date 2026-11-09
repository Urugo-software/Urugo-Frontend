"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Building2, CreditCard, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RenterPropertySelect } from "../RenterPropertySelect";
import {
  formatRwf,
  Step2TenancyConfigProps,
  TenancyDurationOption,
} from "../types/renter-wizard.types";

const DURATION_OPTIONS: { id: TenancyDurationOption; label: string }[] = [
  { id: "6", label: "6 Months" },
  { id: "12", label: "12 Months (1 Year)" },
  { id: "24", label: "24 Months (2 Years)" },
  { id: "open", label: "Open-ended (Flexible)" },
  { id: "custom", label: "Custom" },
];

const DUE_DAY_OPTIONS = [1, 5, 10, 15, 25, 28];
const INITIAL_MONTH_OPTIONS = [1, 2, 3, 6];

export function Step2TenancyConfig({
  properties,
  draft,
  errors,
  paymentSummary,
  onUpdateDraft,
  onSelectProperty,
  onBack,
  onSkip,
  onContinue,
}: Step2TenancyConfigProps) {
  const shouldReduceMotion = useReducedMotion();
  const selectedProperty = properties.find((p) => p.id === draft.propertyId);

  return (
    <div className="space-y-8 sm:space-y-9">
      {/* Configuration Toggle / Notice */}
      <div className="border border-line bg-surface/50 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <Building2 className="mt-0.5 size-5 shrink-0 text-ink" />
            <div>
              <h3 className="text-sm font-bold text-ink">
                Tenancy & Lease Terms (Optional)
              </h3>
              <p className="mt-0.5 text-xs text-body leading-relaxed">
                Connect this renter to a specific property and configure their
                monthly rent obligation and initial move-in terms.
              </p>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer self-start sm:self-auto select-none border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-surface transition-colors">
            <input
              type="checkbox"
              checked={draft.isConfigured}
              onChange={(e) => onUpdateDraft("isConfigured", e.target.checked)}
              className="size-4 accent-black rounded-none cursor-pointer"
            />
            <span>Configure Tenancy Terms</span>
          </label>
        </div>
      </div>

      {!draft.isConfigured ? (
        <div className="border border-dashed border-line bg-surface/40 p-8 text-center space-y-4">
          <div className="mx-auto flex size-12 items-center justify-center border border-line bg-white text-faint">
            <Building2 className="size-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-ink">
              Tenancy Setup Skipped
            </h3>
            <p className="mt-1 text-sm text-body max-w-md mx-auto leading-relaxed">
              This renter will be registered to your directory without an active
              assigned unit or rental payment obligation. You can assign them to a
              property anytime.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => onUpdateDraft("isConfigured", true)}
            className="h-10 cursor-pointer rounded-none border-line bg-white px-5 text-sm font-semibold text-ink hover:bg-surface transition-colors"
          >
            Enable Tenancy Setup
          </Button>
        </div>
      ) : (
        <div className="space-y-8 sm:space-y-9">
          <FieldGroup className="gap-6 sm:gap-7">
            {/* Property Selector */}
            <Field data-invalid={!!errors.propertyId}>
              <FieldLabel className="mb-1 text-xs font-bold uppercase tracking-wider text-ink">
                Assigned Property <span className="text-rose-600">*</span>
              </FieldLabel>
              <RenterPropertySelect
                properties={properties}
                selectedPropertyId={draft.propertyId}
                emptyLabel="Select an active property or building"
                onSelect={onSelectProperty}
              />
              {selectedProperty && (
                <div className="mt-1.5 flex items-center gap-2 text-xs text-body">
                  <Sparkles className="size-3.5 text-ink" />
                  <span>
                    Auto-populated rent estimate: {selectedProperty.location}
                  </span>
                </div>
              )}
              {errors.propertyId && (
                <FieldError className="mt-1">{errors.propertyId}</FieldError>
              )}
            </Field>

            {/* Monthly Rent & Start Date */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field data-invalid={!!errors.monthlyRentRwf}>
                <FieldLabel
                  htmlFor="tenancy-rent"
                  className="mb-1 text-xs font-bold uppercase tracking-wider text-ink"
                >
                  Monthly Rent (RWF) <span className="text-rose-600">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="tenancy-rent"
                    type="number"
                    min={0}
                    step={5000}
                    placeholder="e.g. 150000"
                    value={draft.monthlyRentRwf}
                    aria-invalid={!!errors.monthlyRentRwf}
                    onChange={(e) =>
                      onUpdateDraft(
                        "monthlyRentRwf",
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="h-11 rounded-none border-line bg-white px-3.5 font-mono text-sm text-ink focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
                  />
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-faint">
                    RWF / mo
                  </span>
                </div>
                <FieldDescription className="mt-1 text-xs text-faint">
                  You can customize the agreed rent for this specific tenancy.
                </FieldDescription>
                {errors.monthlyRentRwf && (
                  <FieldError className="mt-1">{errors.monthlyRentRwf}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.startDate}>
                <FieldLabel
                  htmlFor="tenancy-start-date"
                  className="mb-1 text-xs font-bold uppercase tracking-wider text-ink"
                >
                  Tenancy Start Date <span className="text-rose-600">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="tenancy-start-date"
                    type="date"
                    value={draft.startDate}
                    aria-invalid={!!errors.startDate}
                    onChange={(e) => onUpdateDraft("startDate", e.target.value)}
                    className="h-11 rounded-none border-line bg-white px-3.5 text-sm text-ink focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
                  />
                </div>
                <FieldDescription className="mt-1 text-xs text-faint">
                  Official commencement date for lease and billing.
                </FieldDescription>
                {errors.startDate && (
                  <FieldError className="mt-1">{errors.startDate}</FieldError>
                )}
              </Field>
            </div>

            {/* Tenancy Duration */}
            <Field>
              <FieldLabel className="mb-1 text-xs font-bold uppercase tracking-wider text-ink">
                Tenancy Duration{" "}
                <span className="font-normal normal-case text-faint">
                  (Optional)
                </span>
              </FieldLabel>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {DURATION_OPTIONS.map((opt) => {
                  const isSelected = draft.durationOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onUpdateDraft("durationOption", opt.id)}
                      className={`h-11 cursor-pointer border px-3 text-xs font-semibold transition-all duration-150 ${
                        isSelected
                          ? "border-ink bg-ink text-white shadow-xs"
                          : "border-line bg-white text-body hover:border-neutral-400 hover:text-ink"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {draft.durationOption === "custom" && (
                <div className="mt-3">
                  <Input
                    type="number"
                    min={1}
                    max={120}
                    placeholder="Enter custom duration in months (e.g. 18)"
                    value={draft.customDurationMonths}
                    onChange={(e) =>
                      onUpdateDraft(
                        "customDurationMonths",
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="h-11 w-full sm:w-72 rounded-none border-line bg-white px-3.5 text-sm text-ink focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
                  />
                  {errors.customDurationMonths && (
                    <FieldError className="mt-1">
                      {errors.customDurationMonths}
                    </FieldError>
                  )}
                </div>
              )}
            </Field>

            {/* Payment Due Day & Initial Advance Months */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel className="mb-1 text-xs font-bold uppercase tracking-wider text-ink">
                  Monthly Rent Due Day
                </FieldLabel>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {DUE_DAY_OPTIONS.map((day) => {
                    const isSelected = draft.paymentDueDay === day;
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => onUpdateDraft("paymentDueDay", day)}
                        className={`h-11 cursor-pointer border px-2 text-xs font-semibold transition-all duration-150 ${
                          isSelected
                            ? "border-ink bg-ink text-white shadow-xs"
                            : "border-line bg-white text-body hover:border-neutral-400 hover:text-ink"
                        }`}
                      >
                        {day}
                        {day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th"}
                      </button>
                    );
                  })}
                </div>
                <FieldDescription className="mt-1.5 text-xs text-faint">
                  Calendar day each month when recurring rent becomes due.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel className="mb-1 text-xs font-bold uppercase tracking-wider text-ink">
                  Initial Rent Advance (Months)
                </FieldLabel>
                <div className="grid grid-cols-4 gap-2">
                  {INITIAL_MONTH_OPTIONS.map((months) => {
                    const isSelected = draft.initialPaymentMonths === months;
                    return (
                      <button
                        key={months}
                        type="button"
                        onClick={() =>
                          onUpdateDraft("initialPaymentMonths", months)
                        }
                        className={`h-11 cursor-pointer border px-2 text-xs font-semibold transition-all duration-150 ${
                          isSelected
                            ? "border-ink bg-ink text-white shadow-xs"
                            : "border-line bg-white text-body hover:border-neutral-400 hover:text-ink"
                        }`}
                      >
                        {months} {months === 1 ? "Mo" : "Mos"}
                      </button>
                    );
                  })}
                </div>
                <FieldDescription className="mt-1.5 text-xs text-faint">
                  Number of months rent collected in advance before move-in.
                </FieldDescription>
              </Field>
            </div>

            {/* Security Deposit */}
            <Field>
              <FieldLabel
                htmlFor="tenancy-deposit"
                className="mb-1 text-xs font-bold uppercase tracking-wider text-ink"
              >
                Security Deposit{" "}
                <span className="font-normal normal-case text-faint">
                  (Optional)
                </span>
              </FieldLabel>
              <div className="relative">
                <Input
                  id="tenancy-deposit"
                  type="number"
                  min={0}
                  step={5000}
                  placeholder="e.g. 150000"
                  value={draft.securityDepositRwf}
                  onChange={(e) =>
                    onUpdateDraft(
                      "securityDepositRwf",
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  className="h-11 rounded-none border-line bg-white px-3.5 font-mono text-sm text-ink focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
                />
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-faint">
                  RWF
                </span>
              </div>
              <FieldDescription className="mt-1.5 text-xs text-faint">
                Refundable damage or utility deposit held during tenancy.
              </FieldDescription>
            </Field>
          </FieldGroup>

          {/* Initial Payment Summary Card */}
          <AnimatePresence>
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, height: 0, y: 10 }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, height: "auto", y: 0 }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, height: 0, y: 10 }
              }
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border border-line bg-surface/50"
            >
              <div className="border-b border-line bg-white p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="size-5 text-ink" />
                  <div>
                    <h4 className="text-sm font-bold text-ink">
                      Initial Move-in Payment Summary
                    </h4>
                    <p className="text-xs text-body">
                      Expected payment schedule due before tenancy commencement.
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center border border-line bg-surface px-2.5 py-1 text-xs font-bold text-ink">
                  Schedule Estimate
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-3.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                    Monthly Rent
                  </span>
                  <span className="font-mono text-xs font-semibold text-ink">
                    {formatRwf(paymentSummary.monthlyRent)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                    Initial Advance Period
                  </span>
                  <span className="font-medium text-ink">
                    {paymentSummary.initialMonths}{" "}
                    {paymentSummary.initialMonths === 1 ? "Month" : "Months"}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-line pb-3.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                    Initial Rent Subtotal
                  </span>
                  <span className="font-mono text-xs font-semibold text-ink">
                    {formatRwf(paymentSummary.initialRentAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-line pb-3.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                    Refundable Security Deposit
                  </span>
                  <span className="font-mono text-xs font-semibold text-ink">
                    {paymentSummary.securityDeposit > 0
                      ? formatRwf(paymentSummary.securityDeposit)
                      : "None (0 RWF)"}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-bold uppercase tracking-wider text-ink">
                    Total Initial Amount Due
                  </span>
                  <span className="font-mono text-lg font-bold text-ink">
                    {formatRwf(paymentSummary.totalInitialAmount)}
                  </span>
                </div>

                <div className="mt-4 flex items-start gap-2.5 border border-line bg-white p-3.5 text-xs text-body">
                  <Info className="mt-0.5 size-4 shrink-0 text-ink" />
                  <span className="leading-relaxed">
                    <strong className="text-ink">Accounting Notice:</strong> This represents the
                    expected move-in charge obligation. Urugo does not treat or
                    display this as a received payment until cleared by verified receipt or
                    digital payment transaction.
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-line pt-6 sm:pt-8 mt-10">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-11 cursor-pointer rounded-none border-line bg-white px-5 text-sm font-semibold text-ink hover:bg-surface transition-colors"
        >
          ← Back to Renter Details
        </Button>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3">
          {draft.isConfigured && (
            <Button
              type="button"
              variant="ghost"
              onClick={onSkip}
              className="h-11 cursor-pointer rounded-none px-4 text-sm font-semibold text-body hover:bg-surface hover:text-ink transition-colors"
            >
              Skip Tenancy Configuration
            </Button>
          )}

          <Button
            type="button"
            onClick={onContinue}
            className="h-11 cursor-pointer rounded-none bg-ink px-6 text-sm font-semibold text-white hover:bg-black transition-colors"
          >
            Review Registration →
          </Button>
        </div>
      </div>
    </div>
  );
}
