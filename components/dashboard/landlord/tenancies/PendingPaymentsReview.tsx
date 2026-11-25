"use client";

import { useState } from "react";
import { Check, CheckCircle2, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { RejectPaymentModal } from "@/components/dashboard/landlord/payments/RejectPaymentModal";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/config";
import {
  localizeDisplayDate,
  localizePaymentMethod,
} from "@/i18n/display-format";
import { formatRwfLocalized } from "@/i18n/formatting";
import type {
  PaymentRejectionCategory,
  TenancyPayment,
} from "@/types/landlord";

interface PendingPaymentsReviewProps {
  payments: TenancyPayment[];
  onApprove: (id: string) => void;
  onReject: (
    id: string,
    category: PaymentRejectionCategory,
    reason: string,
  ) => void;
}

export function PendingPaymentsReview({
  payments,
  onApprove,
  onReject,
}: PendingPaymentsReviewProps) {
  const t = useTranslations("landlord.tenancies.endWorkflow");
  const locale = useLocale() as AppLocale;
  const [rejectTarget, setRejectTarget] = useState<TenancyPayment | null>(null);
  const pending = payments.filter((p) => p.status === "Pending");

  return (
    <div className="space-y-4">
      {pending.length === 0 ? (
        <div className="flex items-center gap-2.5 border border-emerald-200 bg-emerald-50/70 p-4 text-xs font-medium text-emerald-900">
          <CheckCircle2
            aria-hidden="true"
            className="size-4 shrink-0 text-emerald-600"
          />
          <span>{t("noPendingSubmissions")}</span>
        </div>
      ) : (
        <div className="divide-y divide-line border border-line bg-white">
          {pending.map((payment) => (
            <div
              key={payment.id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-ink">
                    {localizeDisplayDate(payment.period, locale)}
                  </span>
                  <span aria-hidden="true" className="text-line">&middot;</span>
                  <StatusBadge label="Pending verification" tone="warning" />
                </div>
                <p className="text-xs text-body">
                  {payment.paymentMethod
                    ? localizePaymentMethod(payment.paymentMethod, locale)
                    : t("paymentProofFallback")}
                  {payment.reference
                    ? ` · ${t("refPrefix", { reference: payment.reference })}`
                    : ""}{" "}
                  ·{" "}
                  {t("duePrefix", {
                    date: localizeDisplayDate(payment.dueDate, locale),
                  })}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-2 font-ibm text-sm font-bold text-ink">
                  {formatRwfLocalized(payment.amountRwf, locale)}
                </span>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => onApprove(payment.id)}
                  className="h-9 cursor-pointer rounded-none bg-emerald-700 px-3 text-xs text-white hover:bg-emerald-800"
                >
                  <Check aria-hidden="true" className="size-3.5" />
                  {t("approve")}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setRejectTarget(payment)}
                  className="h-9 cursor-pointer rounded-none border-rose-200 px-3 text-xs text-rose-700 hover:bg-rose-50"
                >
                  <X aria-hidden="true" className="size-3.5" />
                  {t("reject")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {payments.length > pending.length && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("reviewedHistoryHeading", {
              count: payments.length - pending.length,
            })}
          </p>
          <div className="divide-y divide-line border border-line bg-surface/30">
            {payments
              .filter((p) => p.status !== "Pending")
              .map((payment) => (
                <div
                  key={payment.id}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-xs"
                >
                  <div>
                    <span className="font-semibold text-ink">
                      {localizeDisplayDate(payment.period, locale)}
                    </span>
                    {payment.rejectionReason && (
                      <span className="ml-2 text-rose-700">
                        — {payment.rejectionReason}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-ibm font-semibold text-ink">
                      {formatRwfLocalized(payment.amountRwf, locale)}
                    </span>
                    <StatusBadge
                      label={payment.status}
                      tone={payment.status === "Approved" ? "success" : "danger"}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <RejectPaymentModal
        payment={rejectTarget}
        onClose={() => setRejectTarget(null)}
        onConfirm={(id, category, reason) => onReject(id, category, reason)}
      />
    </div>
  );
}
