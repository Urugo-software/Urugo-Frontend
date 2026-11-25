"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";

export interface FinalChargeItem {
  key: "water" | "electricity" | "other";
  label: string;
  status: "paid" | "unpaid" | "na";
  amountRwf: number;
}

interface FinalBalanceSummaryProps {
  approvedCount: number;
  unpaidRentRwf: number;
  charges: FinalChargeItem[];
  onBack: () => void;
  onSubmit: () => void;
}

export function FinalBalanceSummary({
  approvedCount,
  unpaidRentRwf,
  charges,
  onBack,
  onSubmit,
}: FinalBalanceSummaryProps) {
  const t = useTranslations("landlord.tenancies.endWorkflow");
  const locale = useLocale() as AppLocale;
  const [confirmOpen, setConfirmOpen] = useState(false);

  const unpaidCharges = charges.filter(
    (c) => c.status === "unpaid" && c.amountRwf > 0,
  );
  const unpaidChargesRwf = unpaidCharges.reduce(
    (sum, item) => sum + item.amountRwf,
    0,
  );
  const totalOwed = unpaidRentRwf + unpaidChargesRwf;

  return (
    <div className="space-y-5">
      <div className="border border-line bg-surface/40 p-5 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
          {t("breakdownHeading")}
        </h3>

        <dl className="divide-y divide-line text-sm">
          <div className="flex justify-between gap-4 py-2">
            <dt className="text-body">{t("approvedRentPayments")}</dt>
            <dd className="font-semibold text-ink">{approvedCount}</dd>
          </div>
          <div className="flex justify-between gap-4 py-2">
            <dt className="text-body">{t("unpaidRentBalance")}</dt>
            <dd className="font-ibm font-semibold text-ink">
              {formatRwfLocalized(unpaidRentRwf, locale)}
            </dd>
          </div>
          {unpaidCharges.map((charge) => (
            <div key={charge.key} className="flex justify-between gap-4 py-2">
              <dt className="text-body">
                {t("unpaidChargeRow", { label: charge.label })}
              </dt>
              <dd className="font-ibm font-semibold text-ink">
                {formatRwfLocalized(charge.amountRwf, locale)}
              </dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 pt-3 text-base font-bold text-ink">
            <dt>{t("totalRemainingBalance")}</dt>
            <dd className="font-ibm">{formatRwfLocalized(totalOwed, locale)}</dd>
          </div>
        </dl>
      </div>

      <p className="border border-blue-200 bg-brand-tint/60 p-4 text-xs leading-relaxed text-brand-deep">
        {totalOwed > 0 ? t("noticeWithBalance") : t("noticeZeroBalance")}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="cursor-pointer rounded-none"
        >
          &larr; {t("backToCharges")}
        </Button>
        <Button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="cursor-pointer rounded-none"
        >
          {totalOwed > 0 ? t("issueFinalNoticeBtn") : t("closeTenancyBtn")}
        </Button>
      </div>

      <ModalDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        variant="alert"
        title={t("confirmTitle")}
        description={
          totalOwed > 0
            ? t("confirmDescWithBalance", {
                amount: formatRwfLocalized(totalOwed, locale),
              })
            : t("confirmDescZero")
        }
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              className="cursor-pointer rounded-none"
            >
              {t("cancel")}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setConfirmOpen(false);
                onSubmit();
              }}
              className="cursor-pointer rounded-none"
            >
              {t("confirmClosureBtn")}
            </Button>
          </>
        }
      >
        <p className="text-xs text-body">{t("confirmBodyNote")}</p>
      </ModalDialog>
    </div>
  );
}
