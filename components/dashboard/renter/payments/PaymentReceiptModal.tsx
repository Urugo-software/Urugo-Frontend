"use client";

import toast from "react-hot-toast";
import { Download, Printer } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { RenterPayment } from "@/types/renter";
import {
  buildDocumentDownloadContent,
  downloadTextFile,
} from "@/utils/renter-helpers";

const METHOD_KEYS: Record<string, string> = {
  "MTN Mobile Money": "mtnName",
  "AIRTEL Money": "airtelName",
  "Airtel Money": "airtelName",
  "Bank Transfer": "bankName",
  Card: "cardName",
};

interface PaymentReceiptModalProps {
  payment: RenterPayment | null;
  onClose: () => void;
}

export function PaymentReceiptModal({
  payment,
  onClose,
}: PaymentReceiptModalProps) {
  const t = useTranslations("renter.payments.receiptModal");
  const tMethods = useTranslations("renter.payments.payRent.methods");
  const locale = useLocale() as AppLocale;
  const profile = useRenterWorkspace((s) => s.profile);
  const property = useRenterWorkspace((s) => s.property);

  if (!payment) return null;

  const methodKey = payment.paymentType ? METHOD_KEYS[payment.paymentType] : undefined;
  const formattedMethod = methodKey
    ? tMethods(methodKey)
    : payment.paymentType ?? null;

  const handleDownload = () => {
    const content = buildDocumentDownloadContent(
      {
        id: payment.id,
        title: t("title", { period: payment.period }),
        category: "Payment Receipt",
        date: payment.paidAt ?? payment.dueDate,
        size: "240 KB",
        summary: [
          `${t("amountPaid")}: ${formatRwfLocalized(payment.amountRwf, locale)}`,
          `${t("paymentMethod")}: ${formattedMethod ?? t("notSpecified")}`,
          `${t("reference")}: ${payment.referenceNumber ?? t("na")}`,
          `${t("status")}: ${payment.status}`,
        ].join("\n"),
      },
      property,
      profile.name,
    );
    downloadTextFile(`rent-receipt-${payment.id}.txt`, content);
    toast.success(t("downloadSuccess"));
  };

  return (
    <ModalDialog
      open
      onClose={onClose}
      title={t("title", { period: payment.period })}
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
            {t("print")}
          </Button>
          <Button
            type="button"
            onClick={handleDownload}
            className="cursor-pointer rounded-none"
          >
            <Download aria-hidden="true" className="size-4" />
            {t("downloadReceipt")}
          </Button>
        </>
      }
    >
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between border-b border-line pb-2.5">
          <span className="text-body">{t("status")}</span>
          <StatusBadge
            label={payment.status}
            tone={payment.status === "Paid" ? "success" : "warning"}
          />
        </div>
        <div className="flex items-center justify-between border-b border-line pb-2.5">
          <span className="text-body">{t("amountPaid")}</span>
          <span className="font-ibm font-bold text-ink">
            {formatRwfLocalized(payment.amountRwf, locale)}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-line pb-2.5">
          <span className="text-body">{t("paymentMethod")}</span>
          <span className="font-semibold text-ink">
            {formattedMethod ?? "—"}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-line pb-2.5">
          <span className="text-body">{t("date")}</span>
          <span className="font-semibold text-ink">
            {payment.paidAt ?? payment.dueDate}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-line pb-2.5">
          <span className="text-body">{t("reference")}</span>
          <span className="font-ibm font-semibold text-ink">
            {payment.referenceNumber ?? "—"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-body">{t("tenant")}</span>
          <span className="font-semibold text-ink">{profile.name}</span>
        </div>
      </div>
    </ModalDialog>
  );
}
