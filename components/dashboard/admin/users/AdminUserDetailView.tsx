"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { UserX } from "lucide-react";
import { useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import { AdminConsentRequestModal } from "../shared/AdminConsentRequestModal";
import { AdminDetailGrid } from "../shared/AdminDetailGrid";
import { AdminReasonModal } from "../shared/AdminReasonModal";
import { AdminShellSection } from "../shared/AdminShellSection";

type ModalMode =
  | null
  | "verify"
  | "reject_kyc"
  | "restrict"
  | "suspend"
  | "reinstate"
  | "emergency"
  | "service_mode";

export function AdminUserDetailView({ userId }: { userId: string }) {
  const t = useTranslations("admin.users");
  const users = useAdminWorkspace((s) => s.users);
  const verifyIdentity = useAdminWorkspace((s) => s.verifyUserIdentity);
  const updateAccountStatus = useAdminWorkspace(
    (s) => s.updateUserAccountStatus,
  );
  const initiateApproval = useAdminWorkspace((s) => s.initiateApprovalRequest);
  const [modalMode, setModalMode] = useState<ModalMode>(null);

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return (
      <AdminShellSection title={t("title")} description={t("description")}>
        <EmptyStateBox
          icon={UserX}
          title={t("notFoundTitle")}
          description={t("notFoundDesc")}
        />
      </AdminShellSection>
    );
  }

  const targetServiceMode =
    user.serviceMode === "listing_only" ? "managed" : "listing_only";

  return (
    <AdminShellSection
      title={user.name}
      description={`${user.role} · ${user.email} · ${user.phone}`}
      action={
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge
            label={user.status}
            tone={getAdminStatusTone(user.status)}
          />
          <StatusBadge
            label={user.verification}
            tone={getAdminStatusTone(user.verification)}
          />
        </div>
      }
    >
      <Breadcrumbs
        items={[
          { label: t("title"), href: "/admin/users" },
          { label: user.name },
        ]}
      />

      <AdminDetailGrid
        title={t("accountProfile")}
        rows={[
          { label: t("colName"), value: user.name },
          { label: t("colRole"), value: user.role },
          { label: t("colEmail"), value: user.email },
          { label: t("colPhone"), value: user.phone },
          { label: t("registeredAt"), value: user.registeredAt },
          { label: t("colLastActivity"), value: user.lastActivity },
          {
            label: t("propertiesCount"),
            value: String(user.propertiesCount),
          },
          {
            label: t("activeLeasesCount"),
            value: String(user.activeLeasesCount),
          },
        ]}
      />

      <section className="space-y-3 border border-line bg-white p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-ink">{t("actionsTitle")}</h3>
        <div className="flex flex-wrap gap-2.5">
          {user.verification !== "Verified" && (
            <Button
              type="button"
              onClick={() => setModalMode("verify")}
              className="h-9 rounded-none bg-ink px-3.5 text-xs font-semibold text-white"
            >
              {t("verifyIdentity")}
            </Button>
          )}
          {user.verification === "Pending" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalMode("reject_kyc")}
              className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-rose-700"
            >
              {t("rejectIdentity")}
            </Button>
          )}
          {user.status === "Active" && (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalMode("restrict")}
                className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-amber-800"
              >
                {t("restrictAccount")}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalMode("suspend")}
                className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-rose-700"
              >
                {t("suspendAccount")}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalMode("emergency")}
                className="h-9 rounded-none border-rose-300 bg-rose-50 px-3.5 text-xs font-semibold text-rose-800"
              >
                {t("emergencyLockout")}
              </Button>
            </>
          )}
          {user.status !== "Active" && (
            <Button
              type="button"
              onClick={() => setModalMode("reinstate")}
              className="h-9 rounded-none bg-brand-blue px-3.5 text-xs font-semibold text-white"
            >
              {t("reinstateAccount")}
            </Button>
          )}
          {user.role === "LANDLORD" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalMode("service_mode")}
              className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-brand-blue"
            >
              {t("proposeServiceMode")}
            </Button>
          )}
        </div>
      </section>

      <AdminReasonModal
        open={modalMode === "verify" || modalMode === "reject_kyc"}
        onClose={() => setModalMode(null)}
        title={
          modalMode === "verify" ? t("verifyIdentity") : t("rejectIdentity")
        }
        description={t("identityDecisionDesc")}
        confirmLabel={
          modalMode === "verify" ? t("verifyIdentity") : t("rejectIdentity")
        }
        isDestructive={modalMode === "reject_kyc"}
        onSubmitAction={(values) => {
          verifyIdentity(
            user.id,
            modalMode === "verify" ? "Verified" : "Rejected",
            values.reason,
          );
          toast.success(t("updatedToast"));
        }}
      />

      <AdminReasonModal
        open={
          modalMode === "restrict" ||
          modalMode === "suspend" ||
          modalMode === "reinstate" ||
          modalMode === "emergency"
        }
        onClose={() => setModalMode(null)}
        title={t("accountStatusActionTitle")}
        description={t("accountStatusActionDesc")}
        consequenceWarning={
          user.activeLeasesCount > 0 && modalMode === "suspend"
            ? t("activeLeaseWarning", { count: user.activeLeasesCount })
            : modalMode === "emergency"
              ? t("emergencyWarning")
              : undefined
        }
        confirmLabel={t("confirmStatusChange")}
        requireEvidence={
          modalMode === "emergency" ||
          (modalMode === "suspend" && user.activeLeasesCount > 0)
        }
        isDestructive={modalMode === "suspend" || modalMode === "emergency"}
        onSubmitAction={(values) => {
          const nextStatus =
            modalMode === "reinstate"
              ? "Active"
              : modalMode === "restrict"
                ? "Restricted"
                : "Suspended";
          updateAccountStatus({
            userId: user.id,
            status: nextStatus,
            reason: values.reason,
            evidenceRef: values.evidenceRef,
            emergencyLockout: modalMode === "emergency",
          });
          toast.success(t("updatedToast"));
        }}
      />

      <AdminConsentRequestModal
        open={modalMode === "service_mode"}
        onClose={() => setModalMode(null)}
        title={t("proposeServiceMode")}
        description={t("serviceModeConsentDesc")}
        partiesRequired={t("requiresLandlordConsent", { name: user.name })}
        defaultSummary={`Change ${user.name}'s service mode to ${targetServiceMode}.`}
        requireEvidence={false}
        onSubmitRequest={(values) => {
          initiateApproval({
            actionType: "landlord_service_mode_change",
            title: `Switch ${user.name} to ${targetServiceMode}`,
            targetType: "user",
            targetId: user.id,
            reason: values.reason,
            evidenceRef: values.evidenceRef || "Landlord request",
            requiresLandlord: true,
            requiresRenter: false,
            payload: {
              landlordId: user.id,
              landlordName: user.name,
              newServiceMode: targetServiceMode,
              summary: values.summary,
            },
          });
          toast.success(t("consentSentToast"));
        }}
      />
    </AdminShellSection>
  );
}
