"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Agreement, AgreementLanguage } from "@/types/agreement.types";
import { AgreementStatusBadge } from "../AgreementStatusBadge";
import { PreviewActionButtons } from "./header/PreviewActionButtons";

interface Props {
  agreement: Agreement;
  activeLanguage: AgreementLanguage;
  onLanguageChange: (lang: AgreementLanguage) => void;
  onOpenLandlordSign?: () => void;
  onOpenRenterSimulator?: () => void;
}

export function AgreementPreviewHeader({
  agreement,
  activeLanguage,
  onLanguageChange,
  onOpenLandlordSign,
  onOpenRenterSimulator,
}: Props) {
  return (
    <header className="space-y-4 print:hidden">
      {/* Top back navigation */}
      <div>
        <Link
          href="/landlord/agreements"
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-faint hover:text-ink transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Agreements</span>
        </Link>
      </div>

      {/* Main Title, Status & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-line">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink font-heading">
              {agreement.renter.name}
            </h1>
            <span className="text-faint">&middot;</span>
            <AgreementStatusBadge status={agreement.status} />
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-body">
            <span className="font-mono text-faint text-[12.5px]">
              Ref: <strong className="text-ink font-semibold">{agreement.referenceNumber}</strong>
            </span>
            <span>&middot;</span>
            <span>Unit {agreement.property.unitNumber}, {agreement.property.name}</span>
            <span>&middot;</span>
            <span className="font-mono text-[12.5px]">v{agreement.version}.0</span>
            <span>&middot;</span>
            <button
              type="button"
              onClick={() => onLanguageChange(activeLanguage === "en" ? "rw" : "en")}
              className="inline-flex items-center gap-1 font-medium text-ink hover:underline cursor-pointer text-[12.5px]"
              title="Click to switch document language"
            >
              <span>{activeLanguage === "rw" ? "Kinyarwanda" : "English"}</span>
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <PreviewActionButtons
          agreementId={agreement.id}
          status={agreement.status}
          onOpenLandlordSign={onOpenLandlordSign}
          onOpenRenterSimulator={onOpenRenterSimulator}
        />
      </div>
    </header>
  );
}
