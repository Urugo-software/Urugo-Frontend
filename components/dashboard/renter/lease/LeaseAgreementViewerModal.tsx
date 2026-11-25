"use client";

import toast from "react-hot-toast";
import { CheckCircle2, Download, Printer } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { Agreement, AgreementStatus } from "@/types/agreement.types";
import { downloadTextFile } from "@/utils/renter-helpers";

const AGREEMENT_STATUS_KEYS: Record<AgreementStatus, string> = {
  Draft: "draft",
  "Ready for Review": "readyForReview",
  Sent: "sent",
  Viewed: "viewed",
  "Changes Requested": "changesRequested",
  "Awaiting Renter Signature": "awaitingRenterSignature",
  "Awaiting Landlord Signature": "awaitingLandlordSignature",
  Signed: "signed",
  Declined: "declined",
  Expired: "expired",
  Superseded: "superseded",
  Cancelled: "cancelled",
};

interface LeaseAgreementViewerModalProps {
  open: boolean;
  onClose: () => void;
  agreement: Agreement;
}

export function LeaseAgreementViewerModal({
  open,
  onClose,
  agreement,
}: LeaseAgreementViewerModalProps) {
  const t = useTranslations("renter.lease.viewerModal");
  const tStatuses = useTranslations("renter.lease.agreementStatuses");
  const locale = useLocale() as AppLocale;
  const updateAgreementStatus = useLandlordWorkspace(
    (s) => s.updateAgreementStatus,
  );

  const canRenterSign =
    agreement.status === "Sent" ||
    agreement.status === "Viewed" ||
    agreement.status === "Awaiting Renter Signature";

  const handleDownload = () => {
    const content = [
      `URUGO RESIDENTIAL LEASE AGREEMENT — ${agreement.referenceNumber}`,
      `Status: ${agreement.status}`,
      `Property: ${agreement.property.name} (Unit ${agreement.property.unitNumber})`,
      `Address: ${agreement.property.address}`,
      `Landlord: ${agreement.landlord.name} (${agreement.landlord.phone})`,
      `Renter: ${agreement.renter.name} (${agreement.renter.phone})`,
      `Monthly Rent: ${formatRwfLocalized(agreement.financials.monthlyRentRwf, locale)}`,
      `Security Deposit: ${formatRwfLocalized(agreement.financials.securityDepositRwf, locale)}`,
      "",
      ...agreement.articles.map(
        (art) => `Article ${art.number}: ${art.title}\n${art.content}\n`,
      ),
    ].join("\n");

    downloadTextFile(`${agreement.referenceNumber}.txt`, content);
    toast.success(t("downloadSuccess"));
  };

  const handleSign = () => {
    updateAgreementStatus(agreement.id, "Awaiting Landlord Signature");
    toast.success(t("signSuccess"));
  };

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title={t("title", { reference: agreement.referenceNumber })}
      description={t("description", {
        property: agreement.property.name,
        unit: agreement.property.unitNumber,
      })}
      maxWidthClassName="max-w-3xl"
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={() => window.print()}
            className="cursor-pointer rounded-none"
          >
            <Printer aria-hidden="true" className="size-4" />
            {t("print")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleDownload}
            className="cursor-pointer rounded-none"
          >
            <Download aria-hidden="true" className="size-4" />
            {t("downloadCopy")}
          </Button>
          {canRenterSign && (
            <Button
              type="button"
              onClick={handleSign}
              className="cursor-pointer rounded-none"
            >
              <CheckCircle2 aria-hidden="true" className="size-4" />
              {t("signAgreement")}
            </Button>
          )}
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border border-line bg-surface/50 p-3.5 text-xs">
          <div>
            <span className="text-faint">{t("monthlyRentLabel")}</span>{" "}
            <strong className="font-ibm text-ink">
              {formatRwfLocalized(agreement.financials.monthlyRentRwf, locale)}
            </strong>{" "}
            &middot;{" "}
            <span className="text-faint">{t("depositLabel")}</span>{" "}
            <strong className="font-ibm text-ink">
              {formatRwfLocalized(
                agreement.financials.securityDepositRwf,
                locale,
              )}
            </strong>
          </div>
          <StatusBadge
            label={tStatuses(AGREEMENT_STATUS_KEYS[agreement.status])}
            tone={agreement.status === "Signed" ? "success" : "info"}
          />
        </div>

        <div className="space-y-4 font-contract text-sm leading-relaxed text-ink">
          {agreement.articles.map((article) => (
            <div key={article.id} className="border-b border-line pb-3 last:border-b-0">
              <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-ink">
                {t("articleHeading", {
                  number: article.number,
                  title: article.title,
                })}
              </h4>
              <p className="mt-1.5 whitespace-pre-line text-body">
                {article.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ModalDialog>
  );
}
