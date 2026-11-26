"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MessageSquareWarning } from "lucide-react";
import { useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import type { AdminCaseKind, AdminCaseStatus } from "@/types/admin";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import { AdminDetailGrid } from "../shared/AdminDetailGrid";
import { AdminReasonModal } from "../shared/AdminReasonModal";
import { AdminShellSection } from "../shared/AdminShellSection";

export function AdminCaseDetailView({
  caseId,
  kind,
}: {
  caseId: string;
  kind: AdminCaseKind;
}) {
  const t = useTranslations(
    kind === "complaint" ? "admin.complaints" : "admin.moderation",
  );
  const cases = useAdminWorkspace((s) => s.cases);
  const users = useAdminWorkspace((s) => s.users);
  const updateCase = useAdminWorkspace((s) => s.updateCaseRecord);
  const [nextStatus, setNextStatus] = useState<AdminCaseStatus | null>(null);

  const item = cases.find((c) => c.id === caseId);
  const admins = users.filter((u) => u.role === "ADMIN" && u.status === "Active");
  const basePath =
    kind === "complaint" ? "/admin/complaints" : "/admin/moderation";

  const { register, handleSubmit, reset } = useForm<{ note: string }>({
    defaultValues: { note: "" },
  });

  if (!item) {
    return (
      <AdminShellSection title={t("title")} description={t("description")}>
        <EmptyStateBox
          icon={MessageSquareWarning}
          title={t("notFoundTitle")}
          description={t("notFoundDesc")}
        />
      </AdminShellSection>
    );
  }

  return (
    <AdminShellSection
      title={`${item.id} · ${item.subject}`}
      description={`${item.category} · ${item.targetLabel}`}
      action={
        <StatusBadge
          label={item.status}
          tone={getAdminStatusTone(item.status)}
        />
      }
    >
      <Breadcrumbs
        items={[
          { label: t("title"), href: basePath },
          { label: item.id },
        ]}
      />

      <AdminDetailGrid
        title={t("detailsTitle")}
        rows={[
          { label: t("colId"), value: item.id },
          { label: t("colReporter"), value: item.reporterName },
          { label: t("targetLabel"), value: item.targetLabel },
          { label: t("createdLabel"), value: item.createdAt },
          {
            label: t("colAssignee"),
            value: (
              <select
                aria-label={t("colAssignee")}
                value={item.assignee}
                onChange={(e) => {
                  updateCase({ caseId: item.id, assignee: e.target.value });
                  toast.success(t("assignedToast"));
                }}
                className="h-8 rounded-none border border-line bg-white px-2 text-xs font-semibold text-ink"
              >
                <option value="Unassigned">Unassigned</option>
                {admins.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            ),
          },
          {
            label: t("colStatus"),
            value: (
              <StatusBadge
                label={item.status}
                tone={getAdminStatusTone(item.status)}
              />
            ),
          },
        ]}
      />

      <section className="space-y-4 border border-line bg-white p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-ink">{t("actionsTitle")}</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              updateCase({ caseId: item.id, status: "Under Review" });
              toast.success(t("updatedToast"));
            }}
            className="h-9 rounded-none border-line px-3.5 text-xs font-semibold"
          >
            {t("markUnderReview")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setNextStatus("Waiting for Information")}
            className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-amber-800"
          >
            {t("requestInfo")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setNextStatus("Escalated")}
            className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-rose-700"
          >
            {t("escalate")}
          </Button>
          <Button
            type="button"
            onClick={() => setNextStatus("Resolved")}
            className="h-9 rounded-none bg-ink px-3.5 text-xs font-semibold text-white"
          >
            {t("resolve")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setNextStatus("Rejected")}
            className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-rose-700"
          >
            {t("reject")}
          </Button>
        </div>

        <form
          onSubmit={handleSubmit((values) => {
            if (!values.note.trim()) return;
            updateCase({ caseId: item.id, note: values.note.trim() });
            reset({ note: "" });
            toast.success(t("noteAddedToast"));
          })}
          className="flex flex-col gap-2 border-t border-line pt-4 sm:flex-row"
        >
          <Input
            placeholder={t("addNotePlaceholder")}
            {...register("note", { required: true })}
            className="h-10 flex-1 rounded-none border-line bg-white text-sm"
          />
          <Button
            type="submit"
            className="h-10 rounded-none bg-ink px-4 text-xs font-semibold text-white"
          >
            {t("addNote")}
          </Button>
        </form>

        {item.notes.length > 0 && (
          <ul className="space-y-1.5 border-t border-line pt-3 text-xs text-body">
            {item.notes.map((n, idx) => (
              <li key={idx} className="border-l-2 border-line pl-3">
                {n}
              </li>
            ))}
          </ul>
        )}
      </section>

      <AdminReasonModal
        open={Boolean(nextStatus)}
        onClose={() => setNextStatus(null)}
        title={nextStatus ? `${nextStatus}: ${item.id}` : ""}
        description={t("decisionDesc")}
        confirmLabel={t("applyDecision")}
        isDestructive={nextStatus === "Rejected" || nextStatus === "Escalated"}
        onSubmitAction={(values) => {
          if (!nextStatus) return;
          updateCase({
            caseId: item.id,
            status: nextStatus,
            reason: values.reason,
          });
          toast.success(t("updatedToast"));
        }}
      />
    </AdminShellSection>
  );
}
