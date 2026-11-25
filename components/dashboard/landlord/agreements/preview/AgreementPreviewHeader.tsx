"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Agreement, AgreementLanguage } from "@/types/agreement.types";
import { AgreementStatusBadge } from "../AgreementStatusBadge";
import { PreviewActionButtons } from "./header/PreviewActionButtons";

interface Props {
  agreement: Agreement;
  activeLanguage: AgreementLanguage;
  onLanguageChange: (lang: AgreementLanguage) => void;
  onOpenLandlordSign?: () => void;
  onSendDraft?: () => void;
  onCancelAgreement?: () => void;
  onCreateRenewalDraft?: () => void;
  onOpenRenterSimulator?: () => void;
}

export function AgreementPreviewHeader({
  agreement,
  activeLanguage,
  onLanguageChange,
  onOpenLandlordSign,
  onSendDraft,
  onCancelAgreement,
  onCreateRenewalDraft,
  onOpenRenterSimulator,
}: Props) {
  const t = useTranslations("landlord.agreements.preview");

  return (
    <header className="space-y-4 print:hidden">
      <div>
        <Link
          href="/landlord/agreements"
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-faint transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3.5" />
          <span>{t("backToAgreements")}</span>
        </Link>
      </div>

      <div className="flex flex-col gap-4 border-b border-line pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h1 className="font-heading text-xl font-bold tracking-tight text-ink sm:text-2xl">
              {agreement.renter.name}
            </h1>
            <span className="text-faint">&middot;</span>
            <AgreementStatusBadge status={agreement.status} />
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-body">
            <span className="font-mono text-[12.5px] text-faint">
              {t("refLabel")}{" "}
              <strong className="font-semibold text-ink">
                {agreement.referenceNumber}
              </strong>
            </span>
            <span>&middot;</span>
            <span>
              {t("unitProperty", {
                unit: agreement.property.unitNumber,
                property: agreement.property.name,
              })}
            </span>
            <span>&middot;</span>
            <span className="font-mono text-[12.5px]">
              v{agreement.version}.0
            </span>
            <span>&middot;</span>
            <button
              type="button"
              onClick={() =>
                onLanguageChange(activeLanguage === "en" ? "rw" : "en")
              }
              className="inline-flex cursor-pointer items-center gap-1 text-[12.5px] font-medium text-ink hover:underline"
              title={t("switchDocLangTitle")}
            >
              <span>{activeLanguage === "rw" ? "Kinyarwanda" : "English"}</span>
            </button>
          </div>
        </div>

        <PreviewActionButtons
          agreementId={agreement.id}
          status={agreement.status}
          onOpenLandlordSign={onOpenLandlordSign}
          onSendDraft={onSendDraft}
          onCancelAgreement={onCancelAgreement}
          onCreateRenewalDraft={onCreateRenewalDraft}
          onOpenRenterSimulator={onOpenRenterSimulator}
        />
      </div>
    </header>
  );
}
