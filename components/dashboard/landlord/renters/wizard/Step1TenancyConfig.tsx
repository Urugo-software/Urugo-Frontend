"use client";

import { Building, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RenterPropertySelect } from "../RenterPropertySelect";
import { Step1TenancyConfigProps } from "@/types/renter-wizard.types";
import { TenancyDurationPicker } from "./tenancy/TenancyDurationPicker";
import { TenancyPaymentSummaryCard } from "./tenancy/TenancyPaymentSummaryCard";
import { TenancySchedulePicker } from "./tenancy/TenancySchedulePicker";

export function Step1TenancyConfig({
  properties,
  draft,
  errors,
  paymentSummary,
  onUpdateDraft,
  onSelectProperty,
  onCancel,
  onContinue,
}: Step1TenancyConfigProps) {
  return (
    <div className="space-y-8 sm:space-y-9 text-[12.5px]">
      <div>
        <h3 className="text-lg font-bold text-ink">Tenancy Configurations</h3>
        <p className="text-body text-[12.5px] mt-1">
          Specify property, unit, rental rates, commencement date, and payment
          schedule.
        </p>
      </div>

      <div className="space-y-8 sm:space-y-9">
        {/* Section 1: Property & Pricing */}
        <div className="border border-line bg-white p-5 sm:p-6 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-line pb-3">
            <Building className="size-4 text-ink" />
            <h4 className="text-[12.5px] font-semibold text-ink uppercase tracking-wider">
              1. Property & Pricing
            </h4>
          </div>

          <FieldGroup className="space-y-5">
            {/* Property Selector */}
            <Field className="space-y-1.5">
              <FieldLabel className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
                Select Leased Property <span className="text-red-500">*</span>
              </FieldLabel>
              <RenterPropertySelect
                properties={properties}
                selectedPropertyId={draft.propertyId}
                onSelect={onSelectProperty}
                emptyLabel="Choose a property from your portfolio..."
              />
              {errors.propertyId && (
                <FieldError className="text-[12.5px] text-red-600 font-medium">
                  {errors.propertyId}
                </FieldError>
              )}
            </Field>

            {/* Monthly Rent */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field className="space-y-1.5">
                <FieldLabel className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
                  Monthly Rent (RWF) <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    type="number"
                    min={0}
                    step={5000}
                    placeholder="e.g. 150000"
                    value={
                      draft.monthlyRentRwf === "" ? "" : draft.monthlyRentRwf
                    }
                    onChange={(e) =>
                      onUpdateDraft(
                        "monthlyRentRwf",
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="h-10 text-[12.5px] font-semibold pr-16 rounded-none border-line"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12.5px] font-bold text-faint">
                    RWF
                  </span>
                </div>
                {errors.monthlyRentRwf && (
                  <FieldError className="text-[12.5px] text-red-600 font-medium">
                    {errors.monthlyRentRwf}
                  </FieldError>
                )}
              </Field>

              {/* Security Deposit */}
              <Field className="space-y-1.5">
                <FieldLabel className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
                  Security Deposit (RWF)
                </FieldLabel>
                <div className="relative">
                  <Input
                    type="number"
                    min={0}
                    step={5000}
                    placeholder="e.g. 150000"
                    value={
                      draft.securityDepositRwf === ""
                        ? ""
                        : draft.securityDepositRwf
                    }
                    onChange={(e) =>
                      onUpdateDraft(
                        "securityDepositRwf",
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="h-10 text-[12.5px] font-semibold pr-16 rounded-none border-line"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12.5px] font-bold text-faint">
                    RWF
                  </span>
                </div>
              </Field>
            </div>
          </FieldGroup>
        </div>

        {/* Section 2: Lease Term & Commencement */}
        <div className="border border-line bg-white p-5 sm:p-6 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-line pb-3">
            <Calendar className="size-4 text-ink" />
            <h4 className="text-[12.5px] font-semibold text-ink uppercase tracking-wider">
              2. Lease Term & Commencement
            </h4>
          </div>

          {/* Optional First Rent Payment Commencement Toggle */}
          <div className="border border-line bg-surface/60 p-4 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={Boolean(draft.useFirstPaymentAsCommencement)}
                onChange={(e) =>
                  onUpdateDraft(
                    "useFirstPaymentAsCommencement",
                    e.target.checked,
                  )
                }
                className="mt-0.5 size-4 rounded-none border-line accent-brand-blue cursor-pointer"
              />
              <div className="space-y-1">
                <span className="text-[13px] font-semibold text-ink block">
                  Use First Rent Payment Date as Tenancy Commencement Date
                </span>
                <p className="text-[12.5px] text-body leading-relaxed">
                  When enabled, the tenancy commencement date will be based on
                  the date the first rent payment is successfully received and
                  recorded.
                </p>
              </div>
            </label>

            {draft.useFirstPaymentAsCommencement ? (
              <div className=" flex-col mt-2 border-t border-line/80 pt-3 flex items-start gap-2.5 text-[12.5px] text-body">
                <div className=" rounded-lg shrink-0 items-center px-2 py-0.5 font-semibold text-[12.5px] bg-amber-100 text-amber-900 border border-amber-300">
                  Pending First Payment
                </div>
                <div className="leading-snug">
                  The commencement date will remain in a pending state until
                  verified confirmation of the first rent payment. Once
                  confirmed, the actual confirmation date will be recorded as
                  the official commencement date.
                </div>
              </div>
            ) : null}
          </div>

          {/* Manual Tenancy Commencement Date (When first-payment commencement is disabled) */}
          {!draft.useFirstPaymentAsCommencement ? (
            <Field className="space-y-1.5">
              <FieldLabel className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
                Tenancy Commencement Date{" "}
                <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                type="date"
                value={draft.startDate}
                onChange={(e) => onUpdateDraft("startDate", e.target.value)}
                className="h-10 text-[12.5px] font-medium rounded-none border-line max-w-xs"
              />
              <p className="text-[12.5px] text-body">
                Official commencement date agreed upon with the renter.
              </p>
              {errors.startDate && (
                <FieldError className="text-[12.5px] text-red-600 font-medium">
                  {errors.startDate}
                </FieldError>
              )}
            </Field>
          ) : (
            <div className="rounded-none border border-line bg-surface p-3 text-[12.5px] text-body">
              <span className="font-semibold text-ink">
                Commencement Schedule:
              </span>{" "}
              Official lease start date will be automatically established upon
              receipt and recording of the first rent payment. The recurring
              monthly rent due date remains on the agreed day of each month.
            </div>
          )}

          <TenancyDurationPicker
            durationOption={draft.durationOption}
            customDurationMonths={draft.customDurationMonths}
            error={errors.customDurationMonths}
            onChangeDuration={(opt) => onUpdateDraft("durationOption", opt)}
            onChangeCustomMonths={(val) =>
              onUpdateDraft("customDurationMonths", val)
            }
          />
        </div>

        {/* Section 3: Schedule & Initial Settlement */}
        <div className="border border-line bg-white p-5 sm:p-6 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-line pb-3">
            <DollarSign className="size-4 text-ink" />
            <h4 className="text-[12.5px] font-semibold text-ink uppercase tracking-wider">
              3. Payment Schedule & Initial Settlement
            </h4>
          </div>

          <TenancySchedulePicker
            paymentDueDay={draft.paymentDueDay}
            initialPaymentMonths={draft.initialPaymentMonths}
            error={errors.paymentDueDay}
            onChangeDueDay={(val) => onUpdateDraft("paymentDueDay", val)}
            onChangeInitialMonths={(val) =>
              onUpdateDraft("initialPaymentMonths", val)
            }
          />
        </div>

        {/* Payment Summary */}
        <TenancyPaymentSummaryCard paymentSummary={paymentSummary} />
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-line pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="h-10 rounded-none border-line text-[12.5px] font-medium px-4"
        >
          Cancel
        </Button>

        <Button
          type="button"
          onClick={onContinue}
          className="h-10 rounded-none bg-ink text-white hover:bg-black text-[12.5px] font-semibold px-6 cursor-pointer"
        >
          Continue to Renter Details &rarr;
        </Button>
      </div>
    </div>
  );
}
