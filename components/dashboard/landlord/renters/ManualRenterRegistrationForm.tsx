"use client";

import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useManualRenterRegistration } from "./hooks/useManualRenterRegistration";
import { ManualRenterPreviewCard } from "./ManualRenterPreviewCard";
import { ManualRenterRegistrationFormProps } from "./types/renter-registration.types";

export function ManualRenterRegistrationForm({
  properties,
  onCancel,
}: ManualRenterRegistrationFormProps) {
  const {
    draft,
    errors,
    submittedDraft,
    updateField,
    handleSubmit,
    resetForm,
  } = useManualRenterRegistration();

  if (submittedDraft) {
    const matchedProperty = properties.find(
      (p) => p.id === submittedDraft.propertyId,
    );
    return (
      <ManualRenterPreviewCard
        draft={submittedDraft}
        propertyName={matchedProperty?.name}
        onReset={resetForm}
        onDone={onCancel}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8 sm:space-y-9">
      <div className="flex items-start gap-3 border border-line bg-surface p-4 sm:p-4.5 text-sm text-body">
        <Info className="mt-0.5 size-5 shrink-0 text-brand" />
        <span className="leading-relaxed">
          Enter the renter&apos;s legal identity details. In the full workflow,
          submitting this form will verify the National ID and check for any
          previous rental debt records.
        </span>
      </div>

      <FieldGroup className="gap-6 sm:gap-7">
        <Field data-invalid={!!errors.fullName}>
          <FieldLabel
            htmlFor="manual-renter-name"
            className="mb-1 text-xs font-semibold uppercase tracking-wider text-ink"
          >
            Full Name <span className="text-rose-600 text-xl">*</span>
          </FieldLabel>
          <Input
            id="manual-renter-name"
            type="text"
            placeholder="e.g. Jean Claude Habimana"
            value={draft.fullName}
            aria-invalid={!!errors.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            className="h-11 rounded-none border-line bg-white px-3.5 text-sm text-ink focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
          />
          {errors.fullName && (
            <FieldError className="mt-1">{errors.fullName}</FieldError>
          )}
        </Field>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field data-invalid={!!errors.email}>
            <FieldLabel
              htmlFor="manual-renter-email"
              className="mb-1 text-xs font-semibold uppercase tracking-wider text-ink"
            >
              Email Address <span className="text-rose-600 text-xl">*</span>
            </FieldLabel>
            <Input
              id="manual-renter-email"
              type="email"
              placeholder="renter@example.com"
              value={draft.email}
              aria-invalid={!!errors.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="h-11 rounded-none border-line bg-white px-3.5 text-sm text-ink focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
            />
            {errors.email && (
              <FieldError className="mt-1">{errors.email}</FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.phoneNumber}>
            <FieldLabel
              htmlFor="manual-renter-phone"
              className="mb-1 text-xs font-semibold uppercase tracking-wider text-ink"
            >
              Phone Number <span className="text-rose-600 text-xl">*</span>
            </FieldLabel>
            <Input
              id="manual-renter-phone"
              type="tel"
              placeholder="+250 788 123 456"
              value={draft.phoneNumber}
              aria-invalid={!!errors.phoneNumber}
              onChange={(e) => updateField("phoneNumber", e.target.value)}
              className="h-11 rounded-none border-line bg-white px-3.5 text-sm text-ink focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
            />
            {errors.phoneNumber && (
              <FieldError className="mt-1">{errors.phoneNumber}</FieldError>
            )}
          </Field>
        </div>

        <Field data-invalid={!!errors.nationalId}>
          <FieldLabel
            htmlFor="manual-renter-nid"
            className="mb-1 text-xs font-semibold uppercase tracking-wider text-ink"
          >
            National ID <span className="text-rose-600 text-xl">*</span>
          </FieldLabel>
          <Input
            id="manual-renter-nid"
            type="text"
            inputMode="numeric"
            maxLength={19}
            placeholder="16-digit National ID (e.g. 1199880012345678)"
            value={draft.nationalId}
            aria-invalid={!!errors.nationalId}
            onChange={(e) => updateField("nationalId", e.target.value)}
            className="h-11 rounded-none border-line bg-white px-3.5 font-mono text-sm text-ink focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
          />
          <FieldDescription className="mt-1.5 text-xs text-faint">
            Must be a 16-digit Rwandan National ID number.
          </FieldDescription>
          {errors.nationalId && (
            <FieldError className="mt-1">{errors.nationalId}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-line pt-6 sm:pt-8 mt-10">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="h-11 cursor-pointer rounded-none border-line px-5 text-sm font-semibold text-ink"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className="h-11 cursor-pointer rounded-none bg-ink px-6 text-sm font-semibold text-white hover:bg-black transition-colors"
        >
          Save Renter Details
        </Button>
      </div>
    </form>
  );
}
