"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { AlertTriangle, UserX } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
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
  const tCommon = useTranslations("admin.common");
  const locale = useLocale() as AppLocale;
  const users = useAdminWorkspace((s) => s.users);
  const properties = useAdminWorkspace((s) => s.properties);
  const leases = useAdminWorkspace((s) => s.leases);
  const payments = useAdminWorkspace((s) => s.payments);
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

  const linkedProperties = properties.filter((p) => p.landlordId === user.id);
  const linkedLeases = leases.filter(
    (l) => l.landlordId === user.id || l.renterId === user.id,
  );
  const linkedPayments = payments.filter(
    (p) => p.landlordId === user.id || p.renterId === user.id,
  );

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

      {(user.restrictionReason || user.pendingPostReview) && (
        <div className="space-y-1.5 border border-rose-300 bg-rose-50 p-4 text-xs text-rose-900">
          <div className="flex items-center gap-2 font-bold">
            <AlertTriangle aria-hidden="true" className="size-4 shrink-0" />
            <span>{t("restrictionBannerTitle")}</span>
          </div>
          {user.restrictionReason && <p>{user.restrictionReason}</p>}
          {user.pendingPostReview && (
            <p className="font-semibold">{t("emergencyPostReviewBanner")}</p>
          )}
        </div>
      )}

      <AdminDetailGrid
        title={t("accountProfile")}
        rows={[
          { label: t("colName"), value: user.name },
          {
            label: t("colRole"),
            value: user.serviceMode
              ? `${user.role} · ${user.serviceMode}`
              : user.role,
          },
          { label: t("colEmail"), value: user.email },
          { label: t("colPhone"), value: user.phone },
          { label: t("registeredAt"), value: user.registeredAt },
          { label: t("colLastActivity"), value: user.lastActivity },
          {
            label: t("propertiesCount"),
            value: String(linkedProperties.length || user.propertiesCount),
          },
          {
            label: t("activeLeasesCount"),
            value: String(linkedLeases.length || user.activeLeasesCount),
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

      <div className="grid gap-5 lg:grid-cols-2">
        {user.role === "LANDLORD" && (
          <section className="border border-line bg-white shadow-2xs">
            <div className="border-b border-line px-5 py-3.5">
              <h3 className="text-sm font-bold text-ink">
                {t("linkedPropertiesTitle")} ({linkedProperties.length})
              </h3>
            </div>
            <div className="divide-y divide-line px-5">
              {linkedProperties.length === 0 ? (
                <p className="py-4 text-xs text-faint">
                  {tCommon("noRecordsYet")}
                </p>
              ) : (
                linkedProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="flex items-center justify-between gap-3 py-3 text-sm"
                  >
                    <div>
                      <Link
                        href={`/admin/properties/${encodeURIComponent(prop.id)}`}
                        className="font-semibold text-brand-blue hover:underline"
                      >
                        {prop.title} ({prop.id})
                      </Link>
                      <p className="text-xs text-body">{prop.location}</p>
                    </div>
                    <StatusBadge
                      label={prop.isSuspended ? "Suspended" : prop.verification}
                      tone={getAdminStatusTone(
                        prop.isSuspended ? "Suspended" : prop.verification,
                      )}
                    />
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        <section className="border border-line bg-white shadow-2xs">
          <div className="border-b border-line px-5 py-3.5">
            <h3 className="text-sm font-bold text-ink">
              {t("linkedLeasesTitle")} ({linkedLeases.length})
            </h3>
          </div>
          <div className="divide-y divide-line px-5">
            {linkedLeases.length === 0 ? (
              <p className="py-4 text-xs text-faint">
                {tCommon("noRecordsYet")}
              </p>
            ) : (
              linkedLeases.map((lease) => (
                <div
                  key={lease.id}
                  className="flex items-center justify-between gap-3 py-3 text-sm"
                >
                  <div>
                    <Link
                      href={`/admin/leases/${encodeURIComponent(lease.id)}`}
                      className="font-semibold text-brand-blue hover:underline"
                    >
                      {lease.id} · {lease.propertyTitle} ({lease.unitLabel})
                    </Link>
                    <p className="text-xs text-body">
                      {formatRwfLocalized(lease.rentRwf, locale)} ·{" "}
                      {lease.startDate} → {lease.endDate}
                    </p>
                  </div>
                  <StatusBadge
                    label={lease.status}
                    tone={getAdminStatusTone(lease.status)}
                  />
                </div>
              ))
            )}
          </div>
        </section>

        <section className="border border-line bg-white shadow-2xs lg:col-span-2">
          <div className="border-b border-line px-5 py-3.5">
            <h3 className="text-sm font-bold text-ink">
              {t("recentPaymentsTitle")} ({linkedPayments.length})
            </h3>
          </div>
          <div className="divide-y divide-line px-5">
            {linkedPayments.length === 0 ? (
              <p className="py-4 text-xs text-faint">
                {tCommon("noRecordsYet")}
              </p>
            ) : (
              linkedPayments.map((payment) => (
                <div
                  key={payment.transactionId}
                  className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
                >
                  <div>
                    <Link
                      href={`/admin/payments/${encodeURIComponent(payment.transactionId)}`}
                      className="font-semibold text-brand-blue hover:underline"
                    >
                      {payment.transactionId} · {payment.propertyTitle}
                    </Link>
                    <p className="text-xs text-body">
                      {formatRwfLocalized(payment.amountRwf, locale)} ·{" "}
                      {payment.provider} · {payment.createdAt}
                    </p>
                  </div>
                  <StatusBadge
                    label={payment.status}
                    tone={getAdminStatusTone(payment.status)}
                  />
                </div>
              ))
            )}
          </div>
        </section>
      </div>

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
