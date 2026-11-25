"use client";

import { Building2, User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import type { FullRenterRegistrationSubmission } from "@/types/renter-wizard.types";

interface CompletionSummaryCardProps {
  submission: FullRenterRegistrationSubmission;
}

export function CompletionSummaryCard({
  submission,
}: CompletionSummaryCardProps) {
  const t = useTranslations("landlord.renters.wizard.completion");
  const tLang = useTranslations("common.language");
  const locale = useLocale() as AppLocale;
  const isLinkMode = submission.mode === "link";
  const maskedNid =
    submission.identity.nationalId.length === 16
      ? `${submission.identity.nationalId.slice(0, 4)}********${submission.identity.nationalId.slice(-4)}`
      : submission.identity.nationalId || t("onFile");

  const commencementLabel = submission.tenancy.useFirstPaymentAsCommencement
    ? t("pendingFirstPayment")
    : submission.tenancy.startDate || t("immediate");

  return (
    <div className="border border-line bg-white shadow-2xs">
      <div className="flex flex-col gap-3 border-b border-line bg-surface/50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <h4 className="text-sm font-semibold text-ink">
            {isLinkMode
              ? t("invitationLinkHeading")
              : submission.identity.fullName || t("renterRecordFallback")}
          </h4>
          <p className="mt-0.5 text-xs text-body">
            {t("recordedAt", { time: submission.submittedAt })}
            {submission.mode === "existing" && t("existingTenantTag")}
          </p>
        </div>

        <span
          className={`self-start text-xs font-semibold sm:self-auto ${
            submission.tenancy.isConfigured ? "text-success" : "text-body"
          }`}
        >
          {submission.tenancy.isConfigured
            ? t("tenancyConfigured")
            : t("identityOnlyRecord")}
        </span>
      </div>

      <div className="grid grid-cols-1 divide-y divide-line md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="space-y-4 p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <User aria-hidden="true" className="size-4 text-ink" />
            <h5 className="text-xs font-semibold uppercase tracking-wider text-ink">
              {t("identityContactHeading")}
            </h5>
          </div>

          {!isLinkMode ? (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-body">{t("emailAddress")}</span>
                <span className="font-medium text-ink">
                  {submission.identity.email || "—"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-body">{t("phoneNumber")}</span>
                <span className="font-medium text-ink">
                  {submission.identity.phoneNumber || "—"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-line/70 pt-2.5">
                <span className="text-body">{t("nationalId")}</span>
                <span className="font-medium text-ink">{maskedNid}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5 text-xs">
              <span className="block text-body">
                {t("invitationLinkGenerated")}
              </span>
              <div className="break-all border border-line bg-surface p-2.5 text-xs text-ink">
                {submission.simulatedLink?.url || t("generatedInSession")}
              </div>
              <p className="text-xs text-faint">{t("shareLinkHint")}</p>
            </div>
          )}
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Building2 aria-hidden="true" className="size-4 text-ink" />
            <h5 className="text-xs font-semibold uppercase tracking-wider text-ink">
              {t("tenancyTermsHeading")}
            </h5>
          </div>

          {submission.tenancy.isConfigured ? (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-body">{t("assignedProperty")}</span>
                <span className="text-right font-medium text-ink">
                  {submission.propertyName || t("assignedProperty")}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-body">{t("monthlyRent")}</span>
                <span className="font-ibm font-medium text-ink">
                  {formatRwfLocalized(
                    Number(submission.tenancy.monthlyRentRwf) || 0,
                    locale,
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-body">{t("commencementDate")}</span>
                <span className="text-right font-medium text-ink">
                  {commencementLabel}
                </span>
              </div>
              {submission.paymentSummary && (
                <div className="flex items-center justify-between gap-2 border-t border-line/70 pt-2.5">
                  <span className="font-medium text-ink">
                    {t("initialMoveInDue")}
                  </span>
                  <span className="font-ibm font-semibold text-ink">
                    {formatRwfLocalized(
                      submission.paymentSummary.totalInitialAmount,
                      locale,
                    )}
                  </span>
                </div>
              )}
              {submission.agreementRef && (
                <div className="flex items-center justify-between gap-2 border-t border-line/70 pt-2.5">
                  <span className="text-body">{t("leaseAgreement")}</span>
                  <span className="font-ibm font-semibold text-ink">
                    {submission.agreementRef} (
                    {submission.selectedLanguage === "rw"
                      ? tLang("rw")
                      : tLang("en")}
                    )
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className="py-2 text-xs leading-relaxed text-body">
              {t("noUnitAssigned")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
