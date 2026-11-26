"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import type { AdminPropertyRecord, VerificationStatus } from "@/types/admin";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import { AdminFilterBar } from "../shared/AdminFilterBar";
import { AdminReasonModal } from "../shared/AdminReasonModal";
import { AdminShellSection } from "../shared/AdminShellSection";

export function AdminPropertyVerificationView() {
  const t = useTranslations("admin.verification");
  const properties = useAdminWorkspace((s) => s.properties);
  const reviewProperty = useAdminWorkspace(
    (s) => s.reviewPropertyVerification,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [pendingAction, setPendingAction] = useState<{
    property: AdminPropertyRecord;
    decision: VerificationStatus;
  } | null>(null);

  const queue = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return properties.filter((p) => {
      const inQueue =
        p.verification === "Pending" ||
        p.verification === "Needs Information";
      const matchStatus = !statusFilter || p.verification === statusFilter;
      const matchQuery =
        !q ||
        p.id.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.landlordName.toLowerCase().includes(q);
      return (statusFilter ? matchStatus : inQueue) && matchQuery;
    });
  }, [properties, searchQuery, statusFilter]);

  return (
    <AdminShellSection title={t("title")} description={t("description")}>
      <AdminFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={t("searchPlaceholder")}
        searchLabel={t("searchPlaceholder")}
        filters={[
          {
            key: "status",
            label: t("queueFilter"),
            options: [
              { value: "Pending", label: "Pending" },
              { value: "Needs Information", label: "Needs Information" },
              { value: "Verified", label: "Verified" },
              { value: "Rejected", label: "Rejected" },
            ],
          },
        ]}
        selectedFilters={{ status: statusFilter }}
        onFilterChange={(_, val) => setStatusFilter(val)}
        onReset={() => {
          setSearchQuery("");
          setStatusFilter("");
        }}
      />

      {queue.length === 0 ? (
        <EmptyStateBox
          icon={ShieldCheck}
          title={t("emptyTitle")}
          description={t("emptyDesc")}
        />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {queue.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between border border-line bg-white p-5 shadow-2xs"
            >
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/admin/properties/${encodeURIComponent(item.id)}`}
                      className="text-xs font-bold text-brand-blue hover:underline"
                    >
                      {item.id}
                    </Link>
                    <h3 className="mt-1 text-base font-bold text-ink">
                      {item.title}
                    </h3>
                  </div>
                  <StatusBadge
                    label={item.verification}
                    tone={getAdminStatusTone(item.verification)}
                  />
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4 text-xs">
                  <div>
                    <dt className="text-faint">{t("landlord")}</dt>
                    <dd className="mt-0.5 font-semibold text-ink">
                      {item.landlordName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-faint">{t("location")}</dt>
                    <dd className="mt-0.5 font-semibold text-ink">
                      {item.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-faint">{t("submitted")}</dt>
                    <dd className="mt-0.5 font-semibold text-ink">
                      {item.submittedAt}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-faint">{t("documents")}</dt>
                    <dd className="mt-0.5 font-semibold text-ink">
                      {item.documentsCount}
                    </dd>
                  </div>
                </dl>

                {item.reviewNotes && (
                  <p className="mt-3 border border-line bg-surface p-2.5 text-xs text-body">
                    {item.reviewNotes}
                  </p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
                <Button
                  type="button"
                  onClick={() =>
                    setPendingAction({ property: item, decision: "Verified" })
                  }
                  className="h-9 rounded-none bg-ink px-3.5 text-xs font-semibold text-white"
                >
                  {t("approve")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setPendingAction({
                      property: item,
                      decision: "Needs Information",
                    })
                  }
                  className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-amber-800"
                >
                  {t("requestInfo")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setPendingAction({ property: item, decision: "Rejected" })
                  }
                  className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-rose-700"
                >
                  {t("reject")}
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      <AdminReasonModal
        open={Boolean(pendingAction)}
        onClose={() => setPendingAction(null)}
        title={
          pendingAction
            ? `${pendingAction.decision}: ${pendingAction.property.title}`
            : ""
        }
        description={t("decisionModalDesc")}
        confirmLabel={t("confirmDecision")}
        isDestructive={pendingAction?.decision === "Rejected"}
        onSubmitAction={(values) => {
          if (!pendingAction) return;
          reviewProperty({
            propertyId: pendingAction.property.id,
            decision: pendingAction.decision,
            reason: values.reason,
          });
          toast.success(t("decisionToast"));
        }}
      />
    </AdminShellSection>
  );
}
