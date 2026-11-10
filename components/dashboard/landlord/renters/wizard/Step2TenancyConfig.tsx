"use client";

import { AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building,
  Calendar,
  Sparkles,
} from "lucide-react";
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
import { Step2TenancyConfigProps } from "@/types/renter-wizard.types";
import { TenancyConfigToggleBanner } from "./tenancy/TenancyConfigToggleBanner";
import { TenancyDurationPicker } from "./tenancy/TenancyDurationPicker";
import { TenancyPaymentSummaryCard } from "./tenancy/TenancyPaymentSummaryCard";
import { TenancySchedulePicker } from "./tenancy/TenancySchedulePicker";
import { TenancySkippedNotice } from "./tenancy/TenancySkippedNotice";

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
  const selectedProperty = properties.find((p) => p.id === draft.propertyId);

  return (
    <div className="space-y-8 sm:space-y-9">
      {/* Top Banner / Configuration Toggle */}
      <TenancyConfigToggleBanner
        isConfigured={draft.isConfigured}
        onToggle={(checked) => onUpdateDraft("isConfigured", checked)}
      />

      {!draft.isConfigured ? (
        <TenancySkippedNotice
          onEnable={() => onUpdateDraft("isConfigured", true)}
        />
      ) : (
        <div className="space-y-8 sm:space-y-9">
          {/* Section 1: Property & Pricing */}
          <div className="border border-line bg-white p-5 sm:p-6 space-y-6 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Building className="size-4 text-ink" />
              <h4 className="text-xs font-semibold text-ink uppercase tracking-wider">
                Property & Pricing
              </h4>
            </div>

            <FieldGroup className="gap-5">
              {/* Property Selector */}
              <Field data-invalid={!!errors.propertyId}>
                <div className="flex items-center justify-between mb-1.5">
                  <FieldLabel className="text-xs font-medium text-ink">
                    Assigned Property Unit{" "}
                    <span className="text-rose-500 font-normal text-xl">*</span>
                  </FieldLabel>
                  <span className="text-[11px] text-faint">Required</span>
                </div>
                <RenterPropertySelect
                  properties={properties}
                  selectedPropertyId={draft.propertyId}
                  emptyLabel="Select an active property or building"
                  onSelect={onSelectProperty}
                />
                {selectedProperty && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-body">
                    <Sparkles className="size-3.5 text-blue-500" />
                    <span>
                      Standard rent estimate: {selectedProperty.location}
                    </span>
                  </div>
                )}
                {errors.propertyId && (
                  <FieldError className="mt-1">{errors.propertyId}</FieldError>
                )}
              </Field>

              {/* Monthly Rent & Security Deposit */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field data-invalid={!!errors.monthlyRentRwf}>
                  <div className="flex items-center justify-between mb-1.5">
                    <FieldLabel
                      htmlFor="tenancy-rent"
                      className="text-xs font-medium text-ink"
                    >
                      Monthly Rent (RWF){" "}
                      <span className="text-rose-500 font-normal text-xl">
                        *
                      </span>
                    </FieldLabel>
                    <span className="text-[11px] text-faint">Per month</span>
                  </div>
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
                      className="h-10 rounded-none border-line bg-white px-3.5 pr-20 font-mono text-sm text-ink focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-faint">
                      RWF / mo
                    </span>
                  </div>
                  <FieldDescription className="mt-1 text-xs text-body/80">
                    Custom agreed recurring rent for this lease.
                  </FieldDescription>
                  {errors.monthlyRentRwf && (
                    <FieldError className="mt-1">
                      {errors.monthlyRentRwf}
                    </FieldError>
                  )}
                </Field>

                <Field>
                  <div className="flex items-center justify-between mb-1.5">
                    <FieldLabel
                      htmlFor="tenancy-deposit"
                      className="text-xs font-medium text-ink"
                    >
                      Refundable Security Deposit
                    </FieldLabel>
                    <span className="text-[11px] text-faint">Optional</span>
                  </div>
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
                      className="h-10 rounded-none border-line bg-white px-3.5 pr-14 font-mono text-sm text-ink focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-faint">
                      RWF
                    </span>
                  </div>
                  <FieldDescription className="mt-1 text-xs text-body/80">
                    Refundable deposit held during the tenancy term.
                  </FieldDescription>
                </Field>
              </div>
            </FieldGroup>
          </div>

          {/* Section 2: Lease Schedule & Duration */}
          <div className="border border-line bg-white p-5 sm:p-6 space-y-6 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Calendar className="size-4 text-ink" />
              <h4 className="text-xs font-semibold text-ink uppercase tracking-wider">
                Lease Schedule & Duration
              </h4>
            </div>

            <FieldGroup className="gap-6">
              {/* Start Date */}
              <Field data-invalid={!!errors.startDate}>
                <div className="flex items-center justify-between mb-1.5">
                  <FieldLabel
                    htmlFor="tenancy-start-date"
                    className="text-xs font-medium text-ink"
                  >
                    Tenancy Commencement Date{" "}
                    <span className="text-rose-500 font-normal text-xl">*</span>
                  </FieldLabel>
                  <span className="text-[11px] text-faint">Start date</span>
                </div>
                <div className="relative w-full sm:w-72">
                  <Input
                    id="tenancy-start-date"
                    type="date"
                    value={draft.startDate}
                    aria-invalid={!!errors.startDate}
                    onChange={(e) => onUpdateDraft("startDate", e.target.value)}
                    className="h-10 rounded-none border-line bg-white px-3.5 text-sm text-ink focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
                  />
                </div>
                <FieldDescription className="mt-1 text-xs text-body/80">
                  Official commencement date for lease and billing cycles.
                </FieldDescription>
                {errors.startDate && (
                  <FieldError className="mt-1">{errors.startDate}</FieldError>
                )}
              </Field>

              {/* Tenancy Duration */}
              <TenancyDurationPicker
                durationOption={draft.durationOption}
                customDurationMonths={draft.customDurationMonths}
                error={errors.customDurationMonths}
                onChangeDuration={(option) =>
                  onUpdateDraft("durationOption", option)
                }
                onChangeCustomMonths={(val) =>
                  onUpdateDraft("customDurationMonths", val)
                }
              />

              {/* Payment Schedule (Due Day & Advance Months) */}
              <TenancySchedulePicker
                paymentDueDay={draft.paymentDueDay}
                initialPaymentMonths={draft.initialPaymentMonths}
                onChangeDueDay={(day) => onUpdateDraft("paymentDueDay", day)}
                onChangeInitialMonths={(months) =>
                  onUpdateDraft("initialPaymentMonths", months)
                }
              />
            </FieldGroup>
          </div>

          {/* Section 3: Initial Move-in Payment Summary */}
          <AnimatePresence>
            <TenancyPaymentSummaryCard paymentSummary={paymentSummary} />
          </AnimatePresence>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-line pt-6 sm:pt-8 mt-10">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="inline-flex h-10.5 cursor-pointer items-center gap-2 rounded-none border-line bg-white px-5 text-xs font-medium text-ink hover:bg-surface transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Renter Details</span>
        </Button>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3">
          {draft.isConfigured && (
            <Button
              type="button"
              variant="ghost"
              onClick={onSkip}
              className="h-10.5 cursor-pointer rounded-none px-4 text-xs font-medium text-body hover:bg-surface hover:text-ink transition-colors"
            >
              Skip Tenancy Configuration
            </Button>
          )}

          <Button
            type="button"
            onClick={onContinue}
            className="inline-flex h-10.5 cursor-pointer items-center gap-2 rounded-none bg-ink px-6 text-xs font-medium text-white hover:bg-black transition-colors"
          >
            <span>Review Registration</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
