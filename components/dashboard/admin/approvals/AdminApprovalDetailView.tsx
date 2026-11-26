"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import { computeApprovalStatus } from "@/utils/admin-approvals";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import { ShieldCheck } from "lucide-react";
import { AdminDetailGrid } from "../shared/AdminDetailGrid";
import { AdminReasonModal } from "../shared/AdminReasonModal";
import { AdminShellSection } from "../shared/AdminShellSection";

export function AdminApprovalDetailView({ requestId }: { requestId: string }) {
  const t = useTranslations("admin.approvals");
  const approvals = useAdminWorkspace((s) => s.approvals);
  const cancelRequest = useAdminWorkspace((s) => s.cancelApprovalRequest);
  const [cancelOpen, setCancelOpen] = useState(false);

  const req = approvals.find((a) => a.id === requestId);
  if (!req) {
    return (
      <AdminShellSection title={t("title")} description={t("description")}>
        <EmptyStateBox
          icon={ShieldCheck}
          title={t("notFoundTitle")}
          description={t("notFoundDesc")}
        />
      </AdminShellSection>
    );
  }

  const liveStatus = computeApprovalStatus(req);
  const canCancel =
    liveStatus === "Pending Consent" || liveStatus === "Approved";

  return (
    <AdminShellSection
      title={`${req.id} · ${req.title}`}
      description={req.payload.summary}
      action={
        <div className="flex items-center gap-2">
          <StatusBadge
            label={liveStatus}
            tone={getAdminStatusTone(liveStatus)}
          />
          {canCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setCancelOpen(true)}
              className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-rose-700 hover:bg-rose-50"
            >
              {t("cancelRequest")}
            </Button>
          )}
        </div>
      }
    >
      <Breadcrumbs
        items={[
          { label: t("title"), href: "/admin/approvals" },
          { label: req.id },
        ]}
      />

      {liveStatus === "Expired" && (
        <div className="border border-rose-300 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-800">
          {t("expiredNotice")}
        </div>
      )}

      <AdminDetailGrid
        title={t("requestOverview")}
        rows={[
          { label: t("colId"), value: req.id },
          { label: t("initiatedBy"), value: req.initiatedBy },
          { label: t("reasonLabel"), value: req.reason },
          { label: t("evidenceLabel"), value: req.evidenceRef },
          {
            label: t("expiresAt"),
            value: new Date(req.expiresAt).toLocaleDateString("en-GB"),
          },
          {
            label: t("colStatus"),
            value: (
              <StatusBadge
                label={liveStatus}
                tone={getAdminStatusTone(liveStatus)}
              />
            ),
          },
        ]}
      />

      <AdminDetailGrid
        title={t("partyConsentMatrix")}
        subtitle={t("partyConsentSubtitle")}
        rows={[
          {
            label: t("colLandlord"),
            value: req.landlordConsent.required
              ? `${req.landlordConsent.partyName} (${req.landlordConsent.status})`
              : t("notRequired"),
          },
          {
            label: t("colRenter"),
            value: req.renterConsent.required
              ? `${req.renterConsent.partyName} (${req.renterConsent.status})`
              : t("notRequired"),
          },
        ]}
      />

      <AdminReasonModal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title={t("cancelRequest")}
        description={t("cancelDesc")}
        confirmLabel={t("cancelRequest")}
        isDestructive
        onSubmitAction={(values) => {
          cancelRequest(req.id, values.reason);
          toast.success(t("cancelledToast"));
        }}
      />
    </AdminShellSection>
  );
}
