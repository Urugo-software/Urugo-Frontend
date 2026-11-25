"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  UserPlus,
  Users,
  Link as LinkIcon,
  CheckCircle2,
  Link2,
  Copy,
  Check,
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
  generatedLink,
  copied,
  onGenerateLink,
  onCopyLink,
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
            mode === "manual" || mode === "link"
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
              {t("manualFormTab")}
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
              <span>{t("invitationLinkTab")}</span>
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
                      {t("generateTitle")}
                    </h4>
                    <p className="mt-1 text-xs text-body max-w-sm mx-auto leading-relaxed">
                      {t("generateDesc")}
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={onGenerateLink}
                    className="mt-2 h-9 cursor-pointer gap-2 rounded-none bg-ink px-5 text-xs font-semibold text-white hover:bg-black transition-colors"
                  >
                    <Link2 className="size-3.5" />
                    <span>{t("generateBtn")}</span>
                  </Button>
                </div>
              ) : (
                <div className="border border-line bg-surface/60 p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 border border-line bg-white px-2 py-0.5 text-[12.5px] font-semibold text-ink">
                      {t("linkReadyBadge")}
                    </span>
                    <span className="text-[12.5px] text-faint">
                      {t("linkMeta", {
                        createdAt: generatedLink.createdAt,
                        expiresIn: generatedLink.expiresInLabel,
                      })}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="text"
                      readOnly
                      value={generatedLink.url}
                      aria-label={t("linkInputAria")}
                      className="h-9 flex-1 rounded-none border-line bg-white px-3 font-mono text-[12.5px] text-ink"
                    />
                    <Button
                      type="button"
                      onClick={onCopyLink}
                      className="h-9 shrink-0 cursor-pointer gap-1.5 rounded-none bg-ink px-4 text-[12.5px] font-semibold text-white hover:bg-black transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="size-3.5" />
                          <span>{t("copied")}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" />
                          <span>{t("copyLink")}</span>
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
