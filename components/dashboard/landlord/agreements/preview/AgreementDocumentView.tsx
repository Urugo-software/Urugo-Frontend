"use client";

import { useMemo } from "react";
import { Agreement, AgreementLanguage } from "@/types/agreement.types";
import { getAgreementVariables } from "@/utils/agreement-utils";
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
}

export function AgreementDocumentView({
  agreement,
  displayLanguage,
  onLanguageChange,
}: Props) {
  const isKinyarwanda = displayLanguage === "rw";
  const variables = useMemo(
    () => getAgreementVariables(agreement),
    [agreement]
  );

  return (
    <div className="space-y-4">
      {/* Top Non-Printable Language & Action Toolbar */}
      <DocumentLanguageToolbar
        displayLanguage={displayLanguage}
        articlesCount={agreement.articles.length}
        onLanguageChange={onLanguageChange}
      />

      {/* Centered Realistic A4 Document Canvas */}
      <div className="agreement-printable-canvas border border-zinc-200/80 bg-zinc-100/60 p-3 sm:p-8 lg:p-10 print:border-none print:p-0 print:bg-white print:block print:w-full">
        <article className="agreement-printable-document font-contract relative mx-auto max-w-[816px] border border-zinc-300/80 bg-white p-7 sm:p-12 md:p-16 shadow-md text-ink print:m-0 print:max-w-none print:border-none print:p-0 print:shadow-none print:block print:w-full">
          {/* A. Document Header & Branding */}
          <DocumentHeader
            version={agreement.version}
            referenceNumber={agreement.referenceNumber}
            updatedAt={agreement.updatedAt}
            isKinyarwanda={isKinyarwanda}
          />

          {/* B. Parties to the Agreement */}
          <DocumentPartiesSection
            landlord={agreement.landlord}
            renter={agreement.renter}
            updatedAt={agreement.updatedAt}
            isKinyarwanda={isKinyarwanda}
          />

          {/* C. Property Identification & Recitals */}
          <DocumentPropertySection
            property={agreement.property}
            isKinyarwanda={isKinyarwanda}
          />

          {/* D. Tenancy and Financial Schedule */}
          <DocumentFinancialSchedule
            financials={agreement.financials}
            tenancyStartDate={agreement.tenancyStartDate}
            tenancyDurationMonths={agreement.tenancyDurationMonths}
            isKinyarwanda={isKinyarwanda}
          />

          {/* E. Agreement Articles (1 to 18) */}
          <DocumentArticlesSection
            articles={agreement.articles}
            variables={variables}
            isKinyarwanda={isKinyarwanda}
          />

          {/* F. Signatures & Attestation */}
          <DocumentSignaturesSection
            landlord={agreement.landlord}
            renter={agreement.renter}
            landlordSignature={agreement.landlordSignature}
            renterSignature={agreement.renterSignature}
            isKinyarwanda={isKinyarwanda}
          />

          {/* G. Document Footer & Registry Seal */}
          <DocumentFooterSeal
            agreementId={agreement.id}
            referenceNumber={agreement.referenceNumber}
            version={agreement.version}
          />
        </article>
      </div>
    </div>
  );
}
