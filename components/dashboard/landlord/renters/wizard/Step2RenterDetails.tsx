"use client";

import { useState } from "react";
import { UserPlus, Users, Link as LinkIcon, CheckCircle2, Search, Link2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Step2RenterDetailsProps } from "@/types/renter-wizard.types";

export function Step2RenterDetails({
  mode,
  onModeChange,
  draft,
  errors,
  onFieldChange,
  onSelectExistingRenter,
  existingRenters,
  onBack,
  onContinue,
  generatedLink,
  copied,
  onGenerateLink,
  onCopyLink,
}: Step2RenterDetailsProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRenters = existingRenters.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.phone.includes(searchTerm) ||
    r.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 sm:space-y-9 text-[12.5px]">
      <div>
        <h3 className="text-lg font-bold text-ink">Renter Details</h3>
        <p className="text-body text-xs mt-1">
          Register a new tenant or select an already verified tenant in your Urugo portfolio.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-b border-line pb-6">
        <button
          type="button"
          onClick={() => onModeChange("manual")}
          className={`flex items-center gap-3 p-4 border text-left cursor-pointer transition-colors ${
            mode === "manual" || mode === "link"
              ? "border-ink bg-surface/50 text-ink"
              : "border-line bg-white text-body hover:bg-surface/30"
          }`}
        >
          <div className="p-2 bg-ink text-white">
            <UserPlus className="size-4" />
          </div>
          <div>
            <strong className="block text-xs font-bold uppercase tracking-wider text-ink">
              Option A: Register New Renter
            </strong>
            <span className="text-[11.5px] text-faint">
              Create a new tenant record manually or via invitation link
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onModeChange("existing")}
          className={`flex items-center gap-3 p-4 border text-left cursor-pointer transition-colors ${
            mode === "existing"
              ? "border-ink bg-surface/50 text-ink"
              : "border-line bg-white text-body hover:bg-surface/30"
          }`}
        >
          <div className="p-2 bg-ink text-white">
            <Users className="size-4" />
          </div>
          <div>
            <strong className="block text-xs font-bold uppercase tracking-wider text-ink">
              Option B: Select Existing Renter
            </strong>
            <span className="text-[11.5px] text-faint">
              Assign a verified tenant already recorded in your account
            </span>
          </div>
        </button>
      </div>

      {/* Mode Content */}
      {mode === "existing" ? (
        /* OPTION B: Existing Renter Selection */
        <div className="space-y-5">
          <div className="flex items-center gap-2 border border-line bg-white px-3 py-2">
            <Search className="size-4 text-faint shrink-0" />
            <input
              type="text"
              placeholder="Search existing renters by name, phone, or unit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs text-ink placeholder:text-faint focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredRenters.map((renter) => {
              const isSelected = draft.existingRenterId === renter.id;

              return (
                <div
                  key={renter.id}
                  onClick={() => onSelectExistingRenter(renter)}
                  className={`border p-4 cursor-pointer transition-all ${
                    isSelected
                      ? "border-ink bg-surface shadow-xs"
                      : "border-line bg-white hover:border-zinc-400"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-ink flex items-center gap-1.5">
                        <span>{renter.name}</span>
                        {renter.isIdentityVerified && (
                          <CheckCircle2 className="size-3.5 text-blue-700" />
                        )}
                      </h4>
                      <p className="text-[11.5px] text-faint font-mono mt-0.5">
                        {renter.phone}
                      </p>
                      <p className="text-[11.5px] text-body mt-1">
                        Current: {renter.propertyName} &middot; {renter.unitNumber}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <span
                        className={`inline-block size-4 rounded-full border ${
                          isSelected
                            ? "border-ink bg-ink"
                            : "border-line bg-white"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {draft.isExistingRenter && (
            <div className="p-4 border border-zinc-300 bg-surface/40 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-faint block">
                  Selected Registered Tenant
                </span>
                <p className="font-bold text-ink text-xs mt-0.5">
                  {draft.fullName} &middot; National ID: {draft.nationalId}
                </p>
              </div>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="size-3.5" /> Reusing existing record
              </span>
            </div>
          )}

          {errors.fullName && (
            <p className="text-xs text-red-600">{errors.fullName}</p>
          )}
        </div>
      ) : (
        /* OPTION A: Register New Renter */
        <div className="space-y-6">
          {/* Sub-toggle: Manual entry vs Link */}
          <div className="flex items-center gap-2 border-b border-line pb-4">
            <button
              type="button"
              onClick={() => onModeChange("manual")}
              className={`px-3 py-1.5 text-xs font-semibold cursor-pointer border ${
                mode === "manual"
                  ? "bg-ink text-white border-ink"
                  : "bg-white text-body border-line hover:text-ink"
              }`}
            >
              Manual Registration Form
            </button>
            <button
              type="button"
              onClick={() => onModeChange("link")}
              className={`px-3 py-1.5 text-xs font-semibold cursor-pointer border flex items-center gap-1.5 ${
                mode === "link"
                  ? "bg-ink text-white border-ink"
                  : "bg-white text-body border-line hover:text-ink"
              }`}
            >
              <LinkIcon className="size-3" />
              <span>Simulated Invitation Link</span>
            </button>
          </div>

          {mode === "link" ? (
            <div className="space-y-6">
              {!generatedLink ? (
                <div className="border border-dashed border-line bg-surface/50 p-8 sm:p-10 text-center space-y-3">
                  <div className="mx-auto flex size-10 items-center justify-center border border-line bg-white text-ink">
                    <Link2 className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink">
                      Generate Renter Onboarding Link
                    </h4>
                    <p className="mt-1 text-xs text-body max-w-sm mx-auto leading-relaxed">
                      Creates an invitation link that allows the prospective renter to submit their National ID and complete their profile self-service.
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={onGenerateLink}
                    className="mt-2 h-9 cursor-pointer gap-2 rounded-none bg-ink px-5 text-xs font-semibold text-white hover:bg-black transition-colors"
                  >
                    <Link2 className="size-3.5" />
                    <span>Generate Invitation Link</span>
                  </Button>
                </div>
              ) : (
                <div className="border border-line bg-surface/60 p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 border border-line bg-white px-2 py-0.5 text-[11px] font-semibold text-ink">
                      Simulated Link Ready
                    </span>
                    <span className="text-[11px] text-faint">
                      Created at {generatedLink.createdAt} &middot; Expires in {generatedLink.expiresInLabel}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="text"
                      readOnly
                      value={generatedLink.url}
                      aria-label="Simulated registration invitation link"
                      className="h-9 flex-1 rounded-none border-line bg-white px-3 font-mono text-xs text-ink"
                    />
                    <Button
                      type="button"
                      onClick={onCopyLink}
                      className="h-9 shrink-0 cursor-pointer gap-1.5 rounded-none bg-ink px-4 text-xs font-semibold text-white hover:bg-black transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="size-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Legal Name */}
              <Field className="space-y-1.5 sm:col-span-2">
                <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-faint">
                  Full Legal Name <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  placeholder="e.g. Divine Uwase"
                  value={draft.fullName}
                  onChange={(e) => onFieldChange("fullName", e.target.value)}
                  className="h-10 text-xs rounded-none border-line"
                />
                {errors.fullName && (
                  <FieldError className="text-[11px] text-red-600">
                    {errors.fullName}
                  </FieldError>
                )}
              </Field>

              {/* Email Address */}
              <Field className="space-y-1.5">
                <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-faint">
                  Email Address <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="email"
                  placeholder="e.g. divine.uwase@example.rw"
                  value={draft.email}
                  onChange={(e) => onFieldChange("email", e.target.value)}
                  className="h-10 text-xs rounded-none border-line"
                />
                {errors.email && (
                  <FieldError className="text-[11px] text-red-600">
                    {errors.email}
                  </FieldError>
                )}
              </Field>

              {/* Phone Number */}
              <Field className="space-y-1.5">
                <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-faint">
                  Phone Number <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="tel"
                  placeholder="e.g. +250 788 123 456"
                  value={draft.phoneNumber}
                  onChange={(e) => onFieldChange("phoneNumber", e.target.value)}
                  className="h-10 text-xs rounded-none border-line"
                />
                {errors.phoneNumber && (
                  <FieldError className="text-[11px] text-red-600">
                    {errors.phoneNumber}
                  </FieldError>
                )}
              </Field>

              {/* National ID */}
              <Field className="space-y-1.5 sm:col-span-2">
                <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-faint">
                  National ID (16 Digits) <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  maxLength={16}
                  placeholder="e.g. 1199670054321098"
                  value={draft.nationalId}
                  onChange={(e) => onFieldChange("nationalId", e.target.value)}
                  className="h-10 text-xs font-mono rounded-none border-line"
                />
                {errors.nationalId && (
                  <FieldError className="text-[11px] text-red-600">
                    {errors.nationalId}
                  </FieldError>
                )}
              </Field>
            </FieldGroup>
          )}
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-line pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-10 rounded-none border-line text-xs font-medium px-4"
        >
          &larr; Back to Tenancy Config
        </Button>

        <Button
          type="button"
          onClick={onContinue}
          className="h-10 rounded-none bg-ink text-white hover:bg-black text-xs font-semibold px-6 cursor-pointer"
        >
          Continue to Agreement Language &rarr;
        </Button>
      </div>
    </div>
  );
}
