"use client";

import { useMemo } from "react";
import { Agreement, AgreementLanguage } from "@/types/agreement.types";
import {
  getAgreementVariables,
  translateArticlesForDisplay,
} from "@/utils/agreement-utils";
import { DocumentLanguageToolbar } from "./document/DocumentLanguageToolbar";
import { DocumentHeader } from "./document/DocumentHeader";
import { DocumentPartiesSection } from "./document/DocumentPartiesSection";
import { DocumentPropertySection } from "./document/DocumentPropertySection";
import { DocumentFinancialSchedule } from "./document/DocumentFinancialSchedule";
import { DocumentArticlesSection } from "./document/DocumentArticlesSection";
import { DocumentSignaturesSection } from "./document/DocumentSignaturesSection";
import { DocumentFooterSeal } from "./document/DocumentFooterSeal";

interface Props {
  agreement: Agreement;
  displayLanguage: AgreementLanguage;
  onLanguageChange?: (lang: AgreementLanguage) => void;
  hideToolbar?: boolean;
}

export function AgreementDocumentView({
  agreement,
  displayLanguage,
  onLanguageChange,
  hideToolbar = false,
}: Props) {
  const isKinyarwanda = displayLanguage === "rw";
  const variables = useMemo(
    () => getAgreementVariables(agreement, displayLanguage),
    [agreement, displayLanguage],
  );
  const displayedArticles = useMemo(
    () =>
      translateArticlesForDisplay(
        agreement.articles,
        displayLanguage,
        agreement.language,
      ),
    [agreement.articles, displayLanguage, agreement.language],
  );

  return (
    <div className="space-y-4">
      {!hideToolbar && (
        <DocumentLanguageToolbar
          displayLanguage={displayLanguage}
          articlesCount={displayedArticles.length}
          onLanguageChange={onLanguageChange}
        />
      )}

      {/* Centered Realistic A4 Document Canvas */}
      <div className="agreement-printable-canvas border border-zinc-200/80 bg-zinc-100/60 p-3 sm:p-8 lg:p-10 print:block print:w-full print:border-none print:bg-white print:p-0">
        <article className="agreement-printable-document font-contract relative mx-auto max-w-[816px] border border-zinc-300/80 bg-white p-7 text-ink shadow-md sm:p-12 md:p-16 print:m-0 print:block print:w-full print:max-w-none print:border-none print:p-0 print:shadow-none">
          <DocumentHeader
            version={agreement.version}
            referenceNumber={agreement.referenceNumber}
            updatedAt={agreement.updatedAt}
            isKinyarwanda={isKinyarwanda}
          />

          <DocumentPartiesSection
            landlord={agreement.landlord}
            renter={agreement.renter}
            updatedAt={agreement.updatedAt}
            isKinyarwanda={isKinyarwanda}
          />

          <DocumentPropertySection
            property={agreement.property}
            isKinyarwanda={isKinyarwanda}
          />

          <DocumentFinancialSchedule
            financials={agreement.financials}
            tenancyStartDate={agreement.tenancyStartDate}
            tenancyEndDate={agreement.tenancyEndDate}
            tenancyDurationMonths={agreement.tenancyDurationMonths}
            commencementStatus={agreement.commencementStatus}
            firstPaymentConfirmedAt={agreement.firstPaymentConfirmedAt}
            isKinyarwanda={isKinyarwanda}
          />

          <DocumentArticlesSection
            articles={displayedArticles}
            variables={variables}
            isKinyarwanda={isKinyarwanda}
          />

          <DocumentSignaturesSection
            landlord={agreement.landlord}
            renter={agreement.renter}
            landlordSignature={agreement.landlordSignature}
            renterSignature={agreement.renterSignature}
            isKinyarwanda={isKinyarwanda}
          />

          <DocumentFooterSeal
            agreementId={agreement.id}
            referenceNumber={agreement.referenceNumber}
            version={agreement.version}
            isKinyarwanda={isKinyarwanda}
          />
        </article>
      </div>
    </div>
  );
}
