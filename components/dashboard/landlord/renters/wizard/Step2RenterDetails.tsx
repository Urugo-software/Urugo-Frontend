"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  UserPlus,
  Users,
  CheckCircle2,
  MailCheck,
} from "lucide-react";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";
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
  onStartInvitation,
  isStartingInvitation,
  queuedInvitation,
}: Step2RenterDetailsProps) {
  const t = useTranslations("landlord.renters.wizard.step2");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRenters = existingRenters.filter((r) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    return (
      r.name.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      r.propertyName.toLowerCase().includes(q) ||
      r.unitNumber.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 sm:space-y-9 text-[12.5px]">
      <div>
        <h3 className="text-lg font-bold text-ink">{t("title")}</h3>
        <p className="text-body text-xs mt-1">{t("subtitle")}</p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-b border-line pb-6">
        <button
          type="button"
          onClick={() => onModeChange("manual")}
          className={`flex items-center gap-3 p-4 border text-left cursor-pointer transition-colors ${
            mode === "manual"
              ? "border-ink bg-surface/50 text-ink"
              : "border-line bg-white text-body hover:bg-surface/30"
          }`}
        >
          <div className="p-2 bg-ink text-white">
            <UserPlus className="size-4" />
          </div>
          <div>
            <strong className="block text-[12.5px] font-bold uppercase tracking-wider text-ink">
              {t("optionATitle")}
            </strong>
            <span className="text-[12.5px] text-faint">{t("optionADesc")}</span>
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
            <strong className="block text-[12.5px] font-bold uppercase tracking-wider text-ink">
              {t("optionBTitle")}
            </strong>
            <span className="text-[12.5px] text-faint">{t("optionBDesc")}</span>
          </div>
        </button>
      </div>

      {/* Mode Content */}
      {mode === "existing" ? (
        /* OPTION B: Existing Renter Selection */
        <div className="space-y-5">
          <DashboardSearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={t("searchExistingPlaceholder")}
            label={t("searchExistingAria")}
            preventFormEnter
          />

          {filteredRenters.length === 0 ? (
            <p className="border border-line bg-surface/40 p-6 text-center text-xs text-body">
              {t("noSearchMatch", { query: searchTerm })}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredRenters.map((renter) => {
                const isSelected = draft.existingRenterId === renter.id;

                return (
                  <button
                    key={renter.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onSelectExistingRenter(renter)}
                    className={`border p-4 text-left cursor-pointer transition-all ${
                      isSelected
                        ? "border-ink bg-surface shadow-xs"
                        : "border-line bg-white hover:border-zinc-400"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-[13px] sm:text-sm text-ink flex items-center gap-1.5">
                          <span>{renter.name}</span>
                          {renter.isIdentityVerified && (
                            <CheckCircle2 className="size-3.5 text-blue-700" />
                          )}
                        </h4>
                        <p className="text-[12.5px] text-faint font-mono mt-0.5">
                          {renter.phone}
                        </p>
                        <p className="text-[12.5px] text-body mt-1">
                          {t("currentAssignment", {
                            property: renter.propertyName,
                            unit: renter.unitNumber,
                          })}
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
                  </button>
                );
              })}
            </div>
          )}

          {draft.isExistingRenter && (
            <div className="p-4 border border-zinc-300 bg-surface/40 flex items-center justify-between">
              <div>
                <span className="text-[12.5px] font-bold uppercase tracking-wider text-faint block">
                  {t("selectedTenantHeading")}
                </span>
                <p className="font-bold text-ink text-[13px] mt-0.5">
                  {draft.fullName} &middot;{" "}
                  {t("nationalIdInline", { nid: draft.nationalId })}
                </p>
              </div>
              <span className="text-[12.5px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="size-3.5" /> {t("reusingRecord")}
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
          <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Legal Name */}
              <Field className="space-y-1.5 sm:col-span-2">
                <FieldLabel className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
                  {t("fullLegalNameLabel")}{" "}
                  <span className="text-red-500 text-xl">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  placeholder={t("fullLegalNamePlaceholder")}
                  value={draft.fullName}
                  onChange={(e) => onFieldChange("fullName", e.target.value)}
                  className="h-10 text-[12.5px] rounded-none border-line"
                />
                {errors.fullName && (
                  <FieldError className="text-[12.5px] text-red-600">
                    {errors.fullName}
                  </FieldError>
                )}
              </Field>

              {/* Email Address */}
              <Field className="space-y-1.5">
                <FieldLabel className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
                  {t("emailLabel")}{" "}
                  <span className="text-red-500 text-xl">*</span>
                </FieldLabel>
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={draft.email}
                  onChange={(e) => onFieldChange("email", e.target.value)}
                  className="h-10 text-[12.5px] rounded-none border-line"
                />
                {errors.email && (
                  <FieldError className="text-[12.5px] text-red-600">
                    {errors.email}
                  </FieldError>
                )}
              </Field>

              {/* Phone Number */}
              <Field className="space-y-1.5">
                <FieldLabel className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
                  {t("phoneLabel")}{" "}
                  <span className="text-red-500 text-xl">*</span>
                </FieldLabel>
                <Input
                  type="tel"
                  placeholder={t("phonePlaceholder")}
                  value={draft.phoneNumber}
                  onChange={(e) => onFieldChange("phoneNumber", e.target.value)}
                  className="h-10 text-[12.5px] rounded-none border-line"
                />
                {errors.phoneNumber && (
                  <FieldError className="text-[12.5px] text-red-600">
                    {errors.phoneNumber}
                  </FieldError>
                )}
              </Field>

              {/* National ID */}
              <Field className="space-y-1.5 sm:col-span-2">
                <FieldLabel className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
                  {t("nationalIdLabel")}{" "}
                  <span className="text-red-500 text-xl">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  maxLength={16}
                  placeholder={t("nationalIdPlaceholder")}
                  value={draft.nationalId}
                  onChange={(e) => onFieldChange("nationalId", e.target.value)}
                  className="h-10 text-[12.5px] font-mono rounded-none border-line"
                />
                {errors.nationalId && (
                  <FieldError className="text-[12.5px] text-red-600">
                    {errors.nationalId}
                  </FieldError>
                )}
              </Field>
          </FieldGroup>

          <div className="space-y-3 border border-line bg-surface/40 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <MailCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-blue" />
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-ink">{t("invitationTitle")}</h4>
                <p className="text-xs leading-relaxed text-body">{t("invitationDescription")}</p>
              </div>
            </div>
            {queuedInvitation ? (
              <p role="status" aria-live="polite" className="text-xs text-emerald-800">
                {t("invitationQueued", { requestId: queuedInvitation.requestId })}
              </p>
            ) : (
              <Button
                type="button"
                onClick={onStartInvitation}
                disabled={isStartingInvitation || mode !== "manual"}
                className="h-9 cursor-pointer gap-2 rounded-none bg-ink px-4 text-xs font-semibold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                <MailCheck aria-hidden="true" className="size-3.5" />
                {isStartingInvitation ? t("invitationSubmitting") : t("sendInvitation")}
              </Button>
            )}
          </div>
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
          &larr; {t("backBtn")}
        </Button>

        <Button
          type="button"
          onClick={onContinue}
          className="h-10 rounded-none bg-ink text-white hover:bg-black text-xs font-semibold px-6 cursor-pointer"
        >
          {t("continueBtn")} &rarr;
        </Button>
      </div>
    </div>
  );
}
