"use client";

import toast from "react-hot-toast";
import { CheckCircle2, Download, Printer } from "lucide-react";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { Agreement } from "@/types/agreement.types";
import { formatRwf } from "@/utils/format";
import { downloadTextFile } from "@/utils/renter-helpers";

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
      `Monthly Rent: ${formatRwf(agreement.financials.monthlyRentRwf)}`,
      `Security Deposit: ${formatRwf(agreement.financials.securityDepositRwf)}`,
      "",
      ...agreement.articles.map(
        (art) => `Article ${art.number}: ${art.title}\n${art.content}\n`,
      ),
    ].join("\n");

    downloadTextFile(`${agreement.referenceNumber}.txt`, content);
    toast.success("Agreement text copy downloaded (preview).");
  };

  const handleSign = () => {
    updateAgreementStatus(agreement.id, "Awaiting Landlord Signature");
    toast.success("Agreement signed electronically (preview).");
  };

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title={`Lease Agreement · ${agreement.referenceNumber}`}
      description={`${agreement.property.name} — Unit ${agreement.property.unitNumber}`}
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
            Print
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleDownload}
            className="cursor-pointer rounded-none"
          >
            <Download aria-hidden="true" className="size-4" />
            Download Copy
          </Button>
          {canRenterSign && (
            <Button
              type="button"
              onClick={handleSign}
              className="cursor-pointer rounded-none"
            >
              <CheckCircle2 aria-hidden="true" className="size-4" />
              Sign Agreement
            </Button>
          )}
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border border-line bg-surface/50 p-3.5 text-xs">
          <div>
            <span className="text-faint">Monthly Rent:</span>{" "}
            <strong className="font-ibm text-ink">
              {formatRwf(agreement.financials.monthlyRentRwf)}
            </strong>{" "}
            &middot;{" "}
            <span className="text-faint">Deposit:</span>{" "}
            <strong className="font-ibm text-ink">
              {formatRwf(agreement.financials.securityDepositRwf)}
            </strong>
          </div>
          <StatusBadge
            label={agreement.status}
            tone={agreement.status === "Signed" ? "success" : "info"}
          />
        </div>

        <div className="space-y-4 font-contract text-sm leading-relaxed text-ink">
          {agreement.articles.map((article) => (
            <div key={article.id} className="border-b border-line pb-3 last:border-b-0">
              <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-ink">
                Article {article.number}. {article.title}
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
