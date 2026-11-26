"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { CreditCard } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import { AdminDetailGrid } from "./shared/AdminDetailGrid";
import { AdminReasonModal } from "./shared/AdminReasonModal";
import { AdminShellSection } from "./shared/AdminShellSection";

export function AdminTransactionDetail({
  transactionId,
}: {
  transactionId: string;
}) {
  const t = useTranslations("admin.payments");
  const locale = useLocale() as AppLocale;
  const payments = useAdminWorkspace((s) => s.payments);
  const financialRequests = useAdminWorkspace((s) => s.financialRequests);
  const requestAdjustment = useAdminWorkspace(
    (s) => s.requestFinancialAdjustment,
  );
  const cancelFinancialRequest = useAdminWorkspace(
    (s) => s.cancelFinancialRequest,
  );
  const [reqType, setReqType] = useState<
    null | "Refund" | "Ledger Correction"
  >(null);
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);

  const payment = payments.find((p) => p.transactionId === transactionId);
  if (!payment) {
    return (
      <AdminShellSection title={t("title")} description={t("description")}>
        <EmptyStateBox
          icon={CreditCard}
          title={t("notFoundTitle")}
          description={t("notFoundDesc")}
        />
      </AdminShellSection>
    );
  }

  const relatedRequests = financialRequests.filter(
    (r) => r.transactionId === payment.transactionId,
  );

  return (
    <AdminShellSection
      title={`${t("txTitle")} ${payment.transactionId}`}
      description={t("txSubtitle")}
      action={
        <StatusBadge
          label={payment.status}
          tone={getAdminStatusTone(payment.status)}
        />
      }
    >
      <Breadcrumbs
        items={[
          { label: t("title"), href: "/admin/payments" },
          { label: payment.transactionId },
        ]}
      />

      <AdminDetailGrid
        title={t("detailsTitle")}
        rows={[
          {
            label: t("colRenter"),
            value: (
              <Link
                href={`/admin/users/${encodeURIComponent(payment.renterId)}`}
                className="text-brand-blue hover:underline"
              >
                {payment.renterName}
              </Link>
            ),
          },
          {
            label: t("landlordLabel"),
            value: (
              <Link
                href={`/admin/users/${encodeURIComponent(payment.landlordId)}`}
                className="text-brand-blue hover:underline"
              >
                {payment.landlordName}
              </Link>
            ),
          },
          { label: t("colProperty"), value: payment.propertyTitle },
          {
            label: t("colAmount"),
            value: formatRwfLocalized(payment.amountRwf, locale),
          },
          { label: t("methodLabel"), value: payment.method },
          { label: t("colProvider"), value: payment.provider },
          { label: t("referenceLabel"), value: payment.reference },
          {
            label: t("colReconciliation"),
            value: (
              <StatusBadge
                label={payment.reconciliationState}
                tone={getAdminStatusTone(payment.reconciliationState)}
              />
            ),
          },
          { label: t("createdLabel"), value: payment.createdAt },
          { label: t("updatedLabel"), value: payment.updatedAt },
        ]}
      />

      <section className="space-y-3 border border-line bg-white p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-ink">{t("restrictedTitle")}</h3>
        <p className="text-xs text-body">{t("restrictedNotice")}</p>
        <div className="flex flex-wrap gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={() => setReqType("Refund")}
            className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-rose-700"
          >
            {t("requestRefund")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setReqType("Ledger Correction")}
            className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-ink"
          >
            {t("requestLedgerCorrection")}
          </Button>
          <Link
            href="/admin/audit-logs"
            className="inline-flex h-9 items-center border border-line bg-surface px-3.5 text-xs font-semibold text-ink hover:bg-line/40"
          >
            {t("viewAuditTrail")}
          </Link>
        </div>

        {relatedRequests.length > 0 && (
          <div className="mt-3 space-y-2 border-t border-line pt-3">
            {relatedRequests.map((req) => (
              <div
                key={req.id}
                className="flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <span className="font-semibold text-ink">
                  {req.id} · {req.requestType} ({req.evidenceRef})
                </span>
                <div className="flex items-center gap-2">
                  <StatusBadge
                    label={req.status}
                    tone={getAdminStatusTone(req.status)}
                  />
                  {req.status === "Pending Backend Execution" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCancelTargetId(req.id)}
                      className="h-7 rounded-none border-line px-2.5 text-[12.5px] font-semibold text-rose-700 hover:bg-rose-50"
                    >
                      {t("cancelRequest")}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <AdminReasonModal
        open={Boolean(reqType)}
        onClose={() => setReqType(null)}
        title={
          reqType === "Refund"
            ? t("requestRefund")
            : t("requestLedgerCorrection")
        }
        description={t("restrictedNotice")}
        consequenceWarning={t("financialWarning")}
        confirmLabel={t("submitRequest")}
        requireEvidence
        isDestructive
        onSubmitAction={(values) => {
          if (!reqType) return;
          requestAdjustment({
            transactionId: payment.transactionId,
            requestType: reqType,
            amountRwf: payment.amountRwf,
            reason: values.reason,
            evidenceRef: values.evidenceRef,
          });
          toast.success(t("requestLoggedToast"));
        }}
      />

      <AdminReasonModal
        open={Boolean(cancelTargetId)}
        onClose={() => setCancelTargetId(null)}
        title={t("cancelRequest")}
        description={t("cancelRequestDesc")}
        confirmLabel={t("cancelRequest")}
        isDestructive
        onSubmitAction={(values) => {
          if (!cancelTargetId) return;
          cancelFinancialRequest(cancelTargetId, values.reason);
          toast.success(t("cancelledToast"));
        }}
      />
    </AdminShellSection>
  );
}
