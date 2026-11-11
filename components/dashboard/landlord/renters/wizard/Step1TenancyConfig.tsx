"use client";

import { Building } from "lucide-react";
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
        <p className="text-body text-xs mt-1">
          Specify property, unit, rental rates, commencement date, and payment schedule.
        </p>
      </div>

      <div className="space-y-8 sm:space-y-9">
        {/* Section 1: Property & Pricing */}
        <div className="border border-line bg-white p-5 sm:p-6 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-line pb-3">
            <Building className="size-4 text-ink" />
            <h4 className="text-xs font-semibold text-ink uppercase tracking-wider">
              1. Property & Pricing
            </h4>
          </div>

          <FieldGroup className="space-y-5">
            {/* Property Selector */}
            <Field className="space-y-1.5">
              <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-faint">
                Select Leased Property <span className="text-red-500">*</span>
              </FieldLabel>
              <RenterPropertySelect
                properties={properties}
                selectedPropertyId={draft.propertyId}
                onSelect={onSelectProperty}
                emptyLabel="Choose a property from your portfolio..."
              />
              {errors.propertyId && (
                <FieldError className="text-[11px] text-red-600">
                  {errors.propertyId}
                </FieldError>
              )}
            </Field>

            {/* Monthly Rent */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field className="space-y-1.5">
                <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-faint">
                  Monthly Rent (RWF) <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    type="number"
                    min={0}
                    step={5000}
                    placeholder="e.g. 150000"
                    value={draft.monthlyRentRwf === "" ? "" : draft.monthlyRentRwf}
                    onChange={(e) =>
                      onUpdateDraft(
                        "monthlyRentRwf",
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="h-10 text-xs font-semibold pr-16 rounded-none border-line"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-faint">
                    RWF
                  </span>
                </div>
                {errors.monthlyRentRwf && (
                  <FieldError className="text-[11px] text-red-600">
                    {errors.monthlyRentRwf}
                  </FieldError>
                )}
              </Field>

              {/* Security Deposit */}
              <Field className="space-y-1.5">
                <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-faint">
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
                    className="h-10 text-xs font-semibold pr-16 rounded-none border-line"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-faint">
                    RWF
                  </span>
                </div>
              </Field>
            </div>
          </FieldGroup>
        </div>

        {/* Section 2: Lease Term & Schedule */}
        <div className="border border-line bg-white p-5 sm:p-6 space-y-6 shadow-2xs">
          <Field className="space-y-1.5">
            <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-faint">
              Tenancy Commencement Date <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              type="date"
              value={draft.startDate}
              onChange={(e) => onUpdateDraft("startDate", e.target.value)}
              className="h-10 text-xs font-medium rounded-none border-line max-w-xs"
            />
            {errors.startDate && (
              <FieldError className="text-[11px] text-red-600">
                {errors.startDate}
              </FieldError>
            )}
          </Field>

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
          <TenancySchedulePicker
            paymentDueDay={draft.paymentDueDay}
            initialPaymentMonths={draft.initialPaymentMonths}
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
          className="h-10 rounded-none border-line text-xs font-medium px-4"
        >
          Cancel
        </Button>

        <Button
          type="button"
          onClick={onContinue}
          className="h-10 rounded-none bg-ink text-white hover:bg-black text-xs font-semibold px-6 cursor-pointer"
        >
          Continue to Renter Details &rarr;
        </Button>
      </div>
    </div>
  );
}
