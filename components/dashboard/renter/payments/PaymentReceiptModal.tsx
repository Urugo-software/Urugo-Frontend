"use client";

import toast from "react-hot-toast";
import { Download, Printer } from "lucide-react";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { RenterPayment } from "@/types/renter";
import { formatRwf } from "@/utils/format";
import {
  buildDocumentDownloadContent,
  downloadTextFile,
} from "@/utils/renter-helpers";

interface PaymentReceiptModalProps {
  payment: RenterPayment | null;
  onClose: () => void;
}

export function PaymentReceiptModal({
  payment,
  onClose,
}: PaymentReceiptModalProps) {
  const profile = useRenterWorkspace((s) => s.profile);
  const property = useRenterWorkspace((s) => s.property);

  if (!payment) return null;

  const handleDownload = () => {
    const content = buildDocumentDownloadContent(
      {
        id: payment.id,
        title: `Rent Receipt — ${payment.period}`,
        category: "Payment Receipt",
        date: payment.paidAt ?? payment.dueDate,
        size: "240 KB",
        summary: [
          `Amount: ${formatRwf(payment.amountRwf)}`,
          `Payment Method: ${payment.paymentType ?? "Not specified"}`,
          `Reference: ${payment.referenceNumber ?? "N/A"}`,
          `Status: ${payment.status}`,
        ].join("\n"),
      },
      property,
      profile.name,
    );
    downloadTextFile(`rent-receipt-${payment.id}.txt`, content);
    toast.success("Receipt copy downloaded (preview).");
  };

  return (
    <ModalDialog
      open
      onClose={onClose}
      title={`Rent Receipt — ${payment.period}`}
      description={`${property.name}`}
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
            onClick={handleDownload}
            className="cursor-pointer rounded-none"
          >
            <Download aria-hidden="true" className="size-4" />
            Download Receipt
          </Button>
        </>
      }
    >
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between border-b border-line pb-2.5">
          <span className="text-body">Status</span>
          <StatusBadge
            label={payment.status}
            tone={payment.status === "Paid" ? "success" : "warning"}
          />
        </div>
        <div className="flex items-center justify-between border-b border-line pb-2.5">
          <span className="text-body">Amount Paid</span>
          <span className="font-ibm font-bold text-ink">
            {formatRwf(payment.amountRwf)}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-line pb-2.5">
          <span className="text-body">Payment Method</span>
          <span className="font-semibold text-ink">
            {payment.paymentType ?? "—"}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-line pb-2.5">
          <span className="text-body">Date</span>
          <span className="font-semibold text-ink">
            {payment.paidAt ?? payment.dueDate}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-line pb-2.5">
          <span className="text-body">Reference</span>
          <span className="font-ibm font-semibold text-ink">
            {payment.referenceNumber ?? "—"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-body">Tenant</span>
          <span className="font-semibold text-ink">{profile.name}</span>
        </div>
      </div>
    </ModalDialog>
  );
}
