"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { History } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import type { IssueStatus } from "@/types/landlord";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import { getIssueStatusMeta } from "@/utils/rental-debt";
import { AdminDetailGrid } from "../shared/AdminDetailGrid";
import { AdminReasonModal } from "../shared/AdminReasonModal";
import { AdminShellSection } from "../shared/AdminShellSection";

export function AdminRenterHistoryDetailView({
  recordId,
}: {
  recordId: string;
}) {
  const t = useTranslations("admin.renterHistory");
  const locale = useLocale() as AppLocale;
  const records = useAdminWorkspace((s) => s.renterHistory);
  const mediate = useAdminWorkspace((s) => s.mediateRenterHistory);
  const [decision, setDecision] = useState<
    null | Extract<IssueStatus, "Confirmed" | "Resolved" | "Rejected">
  >(null);

  const record = records.find((r) => r.id === recordId);
  if (!record) {
    return (
      <AdminShellSection title={t("title")} description={t("description")}>
        <EmptyStateBox
          icon={History}
          title={t("notFoundTitle")}
          description={t("notFoundDesc")}
        />
      </AdminShellSection>
    );
  }

  const meta = getIssueStatusMeta(record.status);

  return (
    <AdminShellSection
      title={`${record.id} · ${record.recordTitle}`}
      description={`${record.renterName} · ${record.propertyTitle}`}
      action={
        <StatusBadge
          label={record.status}
          tone={getAdminStatusTone(record.status)}
        />
      }
    >
      <Breadcrumbs
        items={[
          { label: t("title"), href: "/admin/renter-history" },
          { label: record.id },
        ]}
      />

      <div className="border border-line bg-white p-4 text-xs text-body shadow-2xs">
        <p className="font-bold text-ink">{meta.label}</p>
        <p className="mt-1">{meta.description}</p>
      </div>

      <AdminDetailGrid
        title={t("detailsTitle")}
        rows={[
          { label: t("colId"), value: record.id },
          { label: t("colRenter"), value: record.renterName },
          { label: t("landlordLabel"), value: record.landlordName },
          { label: t("propertyLabel"), value: record.propertyTitle },
          {
            label: t("colAmount"),
            value: formatRwfLocalized(record.amountRwf, locale),
          },
          { label: t("colEvidence"), value: record.evidenceSummary },
          { label: t("createdLabel"), value: record.createdAt },
          {
            label: t("confirmedDebtLabel"),
            value: meta.isConfirmedObligation ? t("yesConfirmed") : t("noNotConfirmed"),
          },
        ]}
      />

      <section className="space-y-3 border border-line bg-white p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-ink">{t("mediationTitle")}</h3>
        <p className="text-xs text-body">{t("mediationPolicyNote")}</p>
        <div className="flex flex-wrap gap-2.5">
          <Button
            type="button"
            onClick={() => setDecision("Resolved")}
            className="h-9 rounded-none bg-ink px-3.5 text-xs font-semibold text-white"
          >
            {t("markResolved")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setDecision("Rejected")}
            className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-ink"
          >
            {t("dismissRecord")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setDecision("Confirmed")}
            className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-rose-700"
          >
            {t("confirmObligation")}
          </Button>
        </div>
      </section>

      <AdminReasonModal
        open={Boolean(decision)}
        onClose={() => setDecision(null)}
        title={t("mediationModalTitle")}
        description={t("mediationModalDesc")}
        consequenceWarning={
          decision === "Confirmed" ? t("confirmDebtWarning") : undefined
        }
        confirmLabel={t("applyMediation")}
        requireEvidence
        isDestructive={decision === "Confirmed"}
        onSubmitAction={(values) => {
          if (!decision) return;
          mediate({
            recordId: record.id,
            status: decision,
            reason: values.reason,
            evidenceRef: values.evidenceRef,
          });
          toast.success(t("mediatedToast"));
        }}
      />
    </AdminShellSection>
  );
}
