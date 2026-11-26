"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ScrollText } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import { AdminDetailGrid } from "../shared/AdminDetailGrid";
import { AdminReasonModal } from "../shared/AdminReasonModal";
import { AdminShellSection } from "../shared/AdminShellSection";

interface MaterialLeaseEditValues {
  rentRwf: number;
  endDate: string;
  reason: string;
  evidenceRef: string;
}

export function AdminLeaseDetailView({ leaseId }: { leaseId: string }) {
  const t = useTranslations("admin.leases");
  const tActions = useTranslations("common.actions");
  const locale = useLocale() as AppLocale;
  const leases = useAdminWorkspace((s) => s.leases);
  const initiateApproval = useAdminWorkspace((s) => s.initiateApprovalRequest);
  const correctNote = useAdminWorkspace((s) => s.correctLeaseNonMaterialNote);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);

  const lease = leases.find((l) => l.id === leaseId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MaterialLeaseEditValues>({
    values: lease
      ? {
          rentRwf: lease.rentRwf,
          endDate: lease.endDate,
          reason: "",
          evidenceRef: "",
        }
      : undefined,
  });

  if (!lease) {
    return (
      <AdminShellSection title={t("title")} description={t("description")}>
        <EmptyStateBox
          icon={ScrollText}
          title={t("notFoundTitle")}
          description={t("notFoundDesc")}
        />
      </AdminShellSection>
    );
  }

  return (
    <AdminShellSection
      title={`${lease.id} · ${lease.propertyTitle}`}
      description={`${lease.renterName} ↔ ${lease.landlordName}`}
      action={
        <StatusBadge
          label={lease.status}
          tone={getAdminStatusTone(lease.status)}
        />
      }
    >
      <Breadcrumbs
        items={[
          { label: t("title"), href: "/admin/leases" },
          { label: lease.id },
        ]}
      />

      <AdminDetailGrid
        title={t("leaseOverview")}
        rows={[
          { label: t("colId"), value: lease.id },
          { label: t("colRenter"), value: lease.renterName },
          { label: t("colLandlord"), value: lease.landlordName },
          {
            label: t("colProperty"),
            value: `${lease.propertyTitle} · ${lease.unitLabel}`,
          },
          {
            label: t("colRent"),
            value: formatRwfLocalized(lease.rentRwf, locale),
          },
          {
            label: t("depositLabel"),
            value: formatRwfLocalized(lease.depositRwf, locale),
          },
          { label: t("startDateLabel"), value: lease.startDate },
          { label: t("endDateLabel"), value: lease.endDate },
        ]}
      />

      <section className="space-y-3 border border-line bg-white p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-ink">{t("actionsTitle")}</h3>
        <p className="text-xs text-body">{t("materialConsentNotice")}</p>
        <div className="flex flex-wrap gap-2.5">
          <Button
            type="button"
            onClick={() => setEditModalOpen(true)}
            className="h-9 rounded-none bg-brand-blue px-4 text-xs font-semibold text-white"
          >
            {t("proposeMaterialEdit")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setNoteModalOpen(true)}
            className="h-9 rounded-none border-line px-4 text-xs font-semibold text-ink"
          >
            {t("addNonMaterialNote")}
          </Button>
        </div>
        {lease.notes && (
          <p className="border border-line bg-surface p-3 text-xs text-body">
            {t("adminNoteLabel")}: {lease.notes}
          </p>
        )}
      </section>

      <ModalDialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={t("proposeMaterialEdit")}
        description={t("materialConsentNotice")}
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditModalOpen(false)}
              className="h-9 rounded-none border-line text-xs font-semibold"
            >
              {tActions("cancel")}
            </Button>
            <Button
              type="submit"
              form="lease-consent-edit-form"
              className="h-9 rounded-none bg-brand-blue px-4 text-xs font-semibold text-white"
            >
              {t("sendForBothConsents")}
            </Button>
          </>
        }
      >
        <form
          id="lease-consent-edit-form"
          onSubmit={handleSubmit((values) => {
            initiateApproval({
              actionType: "lease_material_edit",
              title: `Amend lease ${lease.id}`,
              targetType: "lease",
              targetId: lease.id,
              reason: values.reason,
              evidenceRef: values.evidenceRef,
              requiresLandlord: true,
              requiresRenter: true,
              payload: {
                leaseId: lease.id,
                landlordId: lease.landlordId,
                landlordName: lease.landlordName,
                renterId: lease.renterId,
                renterName: lease.renterName,
                rentRwf: Number(values.rentRwf),
                endDate: values.endDate,
                summary: `Update monthly rent to ${Number(values.rentRwf).toLocaleString()} RWF and end date to ${values.endDate}.`,
              },
            });
            toast.success(t("consentSentToast"));
            setEditModalOpen(false);
          })}
          className="space-y-3.5"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-ink">
                {t("colRent")} *
              </label>
              <Input
                type="number"
                {...register("rentRwf", { required: true, min: 1000 })}
                className="mt-1 h-10 rounded-none border-line bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink">
                {t("endDateLabel")} *
              </label>
              <Input
                type="date"
                {...register("endDate", { required: true })}
                className="mt-1 h-10 rounded-none border-line bg-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("evidenceLabel")} *
            </label>
            <Input
              placeholder="Signed addendum / support ticket"
              {...register("evidenceRef", {
                required: "Evidence reference is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
              className="mt-1 h-10 rounded-none border-line bg-white text-sm"
            />
            {errors.evidenceRef && (
              <p className="mt-1 text-xs text-rose-700">
                {errors.evidenceRef.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("reasonLabel")} *
            </label>
            <textarea
              rows={2}
              {...register("reason", {
                required: "Reason is required",
                minLength: { value: 5, message: "Minimum 5 characters" },
              })}
              className="mt-1 w-full rounded-none border border-line bg-white p-2.5 text-sm text-ink"
            />
            {errors.reason && (
              <p className="mt-1 text-xs text-rose-700">
                {errors.reason.message}
              </p>
            )}
          </div>
        </form>
      </ModalDialog>

      <AdminReasonModal
        open={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
        title={t("addNonMaterialNote")}
        description={t("nonMaterialNoteDesc")}
        confirmLabel={tActions("save")}
        onSubmitAction={(values) => {
          correctNote(lease.id, values.reason, values.reason);
          toast.success(t("noteSavedToast"));
        }}
      />
    </AdminShellSection>
  );
}
