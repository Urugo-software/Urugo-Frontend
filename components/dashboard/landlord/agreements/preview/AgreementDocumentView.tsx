"use client";

import { useMemo } from "react";
import { Agreement, AgreementLanguage } from "@/types/agreement.types";
import { getAgreementVariables } from "@/utils/agreement-utils";
import { DocumentLanguageToolbar } from "./document/DocumentLanguageToolbar";
import { DocumentHeader } from "./document/DocumentHeader";
import { DocumentRecitals } from "./document/DocumentRecitals";
import { DocumentPartiesSection } from "./document/DocumentPartiesSection";
import { DocumentFinancialsTable } from "./document/DocumentFinancialsTable";
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
      {/* Minimal Document Toolbar */}
      <DocumentLanguageToolbar
        displayLanguage={displayLanguage}
        articlesCount={agreement.articles.length}
        onLanguageChange={onLanguageChange}
      />

      {/* Realistic A4 Document Canvas */}
      <div className="border border-line bg-surface/50 p-3 sm:p-8 lg:p-10 print:border-none print:p-0 print:bg-transparent">
        <article className="relative mx-auto max-w-[820px] border border-line/90 bg-white p-6 sm:p-12 md:p-16 shadow-xs text-ink font-sans print:m-0 print:max-w-none print:border-none print:p-0 print:shadow-none">
          {/* Header Bar */}
          <DocumentHeader
            version={agreement.version}
            referenceNumber={agreement.referenceNumber}
            updatedAt={agreement.updatedAt}
            isKinyarwanda={isKinyarwanda}
          />

          {/* Recitals / Preamble */}
          <DocumentRecitals isKinyarwanda={isKinyarwanda} />

          {/* SECTION 1: PARTIES IDENTIFICATION */}
          <DocumentPartiesSection
            landlord={agreement.landlord}
            renter={agreement.renter}
            isKinyarwanda={isKinyarwanda}
          />

          {/* SECTION 2: PREMISES & FINANCIAL SUMMARY */}
          <DocumentFinancialsTable
            property={agreement.property}
            financials={agreement.financials}
            tenancyStartDate={agreement.tenancyStartDate}
            tenancyDurationMonths={agreement.tenancyDurationMonths}
            isKinyarwanda={isKinyarwanda}
          />

          {/* SECTION 3: ARTICLES OF AGREEMENT */}
          <DocumentArticlesSection
            articles={agreement.articles}
            variables={variables}
            isKinyarwanda={isKinyarwanda}
          />

          {/* SECTION 4: SIGNATURES & ATTESTATION */}
          <DocumentSignaturesSection
            landlord={agreement.landlord}
            renter={agreement.renter}
            landlordSignature={agreement.landlordSignature}
            renterSignature={agreement.renterSignature}
            isKinyarwanda={isKinyarwanda}
          />

          {/* Footer watermark & security seal */}
          <DocumentFooterSeal agreementId={agreement.id} />
        </article>
      </div>
    </div>
  );
}
