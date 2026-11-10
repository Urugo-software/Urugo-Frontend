"use client";

import { Check, Copy, Info, Link2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  AddRenterMode,
  Step1RenterDetailsProps,
} from "../types/renter-wizard.types";

const REGISTRATION_MODES: {
  id: AddRenterMode;
  label: string;
  description: string;
  icon: typeof UserPlus;
}[] = [
  {
    id: "manual",
    label: "Manual Registration",
    description: "Enter renter identity and National ID directly",
    icon: UserPlus,
  },
  {
    id: "link",
    label: "Registration Link",
    description: "Generate a simulated invitation link to share",
    icon: Link2,
  },
];

export function Step1RenterDetails({
  mode,
  onModeChange,
  draft,
  errors,
  onFieldChange,
  onContinue,
  onSkipTenancy,
  onCancel,
  generatedLink,
  copied,
  copyStatus,
  onGenerateLink,
  onCopyLink,
}: Step1RenterDetailsProps) {
  return (
    <div className="space-y-8 sm:space-y-9">
      {/* Mode Switcher Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {REGISTRATION_MODES.map(({ id, label, description, icon: Icon }) => {
          const isActive = mode === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onModeChange(id)}
              className={`flex cursor-pointer items-start gap-4 border p-4 sm:p-5 text-left transition-all duration-200 ${
                isActive
                  ? "border-ink bg-ink text-white shadow-sm"
                  : "border-line bg-surface/50 text-body hover:bg-white hover:border-neutral-300 hover:text-ink"
              }`}
            >
              <div
                className={`mt-0.5 flex size-9 shrink-0 items-center justify-center border transition-colors ${
                  isActive
                    ? "border-neutral-700 bg-neutral-900 text-white"
                    : "border-line bg-white text-ink"
                }`}
              >
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <span
                  className={`block text-[15px] font-bold ${
                    isActive ? "text-white" : "text-ink"
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`mt-1 block text-sm leading-relaxed ${
                    isActive ? "text-neutral-300" : "text-body"
                  }`}
                >
                  {description}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {mode === "manual" ? (
        <div className="space-y-8 sm:space-y-9">
          <hr className="flex items-start gap-3 border border-line bg-surface text-sm text-body" />

          <FieldGroup className="gap-6 sm:gap-7">
            <Field data-invalid={!!errors.fullName}>
              <FieldLabel
                htmlFor="manual-renter-name"
                className="mb-1 text-xs font-bold uppercase tracking-wider text-ink"
              >
                Full Legal Name <span className="text-rose-600">*</span>
              </FieldLabel>
              <Input
                id="manual-renter-name"
                type="text"
                placeholder="e.g. Jean Claude Habimana"
                value={draft.fullName}
                aria-invalid={!!errors.fullName}
                onChange={(e) => onFieldChange("fullName", e.target.value)}
                className="h-11 rounded-none border-line bg-white px-3.5 text-sm text-ink placeholder:text-faint focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
              />
              {errors.fullName && (
                <FieldError className="mt-1">{errors.fullName}</FieldError>
              )}
            </Field>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field data-invalid={!!errors.email}>
                <FieldLabel
                  htmlFor="manual-renter-email"
                  className="mb-1 text-xs font-bold uppercase tracking-wider text-ink"
                >
                  Email Address <span className="text-rose-600">*</span>
                </FieldLabel>
                <Input
                  id="manual-renter-email"
                  type="email"
                  placeholder="renter@example.com"
                  value={draft.email}
                  aria-invalid={!!errors.email}
                  onChange={(e) => onFieldChange("email", e.target.value)}
                  className="h-11 rounded-none border-line bg-white px-3.5 text-sm text-ink placeholder:text-faint focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
                />
                {errors.email && (
                  <FieldError className="mt-1">{errors.email}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.phoneNumber}>
                <FieldLabel
                  htmlFor="manual-renter-phone"
                  className="mb-1 text-xs font-bold uppercase tracking-wider text-ink"
                >
                  Phone Number <span className="text-rose-600">*</span>
                </FieldLabel>
                <Input
                  id="manual-renter-phone"
                  type="tel"
                  placeholder="+250 788 123 456"
                  value={draft.phoneNumber}
                  aria-invalid={!!errors.phoneNumber}
                  onChange={(e) => onFieldChange("phoneNumber", e.target.value)}
                  className="h-11 rounded-none border-line bg-white px-3.5 text-sm text-ink placeholder:text-faint focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
                />
                {errors.phoneNumber && (
                  <FieldError className="mt-1">{errors.phoneNumber}</FieldError>
                )}
              </Field>
            </div>

            <Field data-invalid={!!errors.nationalId}>
              <FieldLabel
                htmlFor="manual-renter-nid"
                className="mb-1 text-xs font-bold uppercase tracking-wider text-ink"
              >
                National ID Number <span className="text-rose-600">*</span>
              </FieldLabel>
              <Input
                id="manual-renter-nid"
                type="text"
                inputMode="numeric"
                maxLength={19}
                placeholder="16-digit Rwandan ID (e.g. 1199880012345678)"
                value={draft.nationalId}
                aria-invalid={!!errors.nationalId}
                onChange={(e) => onFieldChange("nationalId", e.target.value)}
                className="h-11 rounded-none border-line bg-white px-3.5 font-mono text-sm text-ink placeholder:text-faint focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
              />
              <FieldDescription className="mt-1.5 text-xs text-faint">
                Must be an official 16-digit Rwandan National Identification
                number.
              </FieldDescription>
              {errors.nationalId && (
                <FieldError className="mt-1">{errors.nationalId}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </div>
      ) : (
        <div className="space-y-8 sm:space-y-9">
          {!generatedLink ? (
            <div className="border border-dashed border-line bg-surface/50 p-8 sm:p-12 text-center space-y-4">
              <div className="mx-auto flex size-12 items-center justify-center border border-line bg-white text-ink">
                <Link2 className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ink">
                  Generate Renter Onboarding Link
                </h3>
                <p className="mt-1.5 text-sm text-body max-w-md mx-auto leading-relaxed">
                  Creates an invitation link that allows the prospective renter
                  to submit their National ID and complete their profile
                  self-service.
                </p>
              </div>
              <Button
                type="button"
                onClick={onGenerateLink}
                className="mt-3 h-11 cursor-pointer gap-2 rounded-none bg-ink px-6 text-sm font-semibold text-white hover:bg-black transition-colors"
              >
                <Link2 className="size-4" />
                <span>Generate Invitation Link</span>
              </Button>
            </div>
          ) : (
            <div className="border border-line bg-surface/60 p-6 sm:p-7 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 border border-line bg-white px-2.5 py-1 text-xs font-semibold text-ink">
                  Simulated Link Ready
                </span>
                <span className="text-xs text-faint">
                  Created at {generatedLink.createdAt} · Expires in{" "}
                  {generatedLink.expiresInLabel}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <Input
                  type="text"
                  readOnly
                  value={generatedLink.url}
                  aria-label="Simulated registration invitation link"
                  className="h-11 flex-1 rounded-none border-line bg-white px-3.5 font-mono text-xs text-ink"
                />
                <Button
                  type="button"
                  onClick={onCopyLink}
                  className="h-11 shrink-0 cursor-pointer gap-2 rounded-none bg-ink px-5 text-sm font-semibold text-white hover:bg-black transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="size-4" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      <span>Copy Link</span>
                    </>
                  )}
                </Button>
              </div>

              {copyStatus && (
                <div
                  role="status"
                  className={`border px-3.5 py-2.5 text-xs font-medium ${
                    copyStatus.type === "success"
                      ? "border-line bg-white text-ink"
                      : "border-rose-200 bg-rose-50 text-rose-700"
                  }`}
                >
                  {copyStatus.text}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-line pt-6 sm:pt-8 mt-10">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="h-11 cursor-pointer rounded-none border-line bg-white px-5 text-sm font-semibold text-ink hover:bg-surface transition-colors"
        >
          Back to Renters
        </Button>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={onSkipTenancy}
            className="h-11 cursor-pointer rounded-none px-4 text-sm font-semibold text-body hover:bg-surface hover:text-ink transition-colors"
          >
            Skip Tenancy & Review
          </Button>

          <Button
            type="button"
            onClick={onContinue}
            className="h-11 cursor-pointer rounded-none bg-ink px-6 text-sm font-semibold text-white hover:bg-black transition-colors"
          >
            Continue to Tenancy Setup →
          </Button>
        </div>
      </div>
    </div>
  );
}
