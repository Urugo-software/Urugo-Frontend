"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LockKeyhole } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import type { AdminPlatformSettings } from "@/types/admin";
import { AdminReasonModal } from "./shared/AdminReasonModal";
import { AdminShellSection } from "./shared/AdminShellSection";

interface SettingsFormValues extends AdminPlatformSettings {
  reason: string;
}

export function AdminSettingsView() {
  const t = useTranslations("admin.settings");
  const tActions = useTranslations("common.actions");
  const settings = useAdminWorkspace((s) => s.settings);
  const updateSettings = useAdminWorkspace((s) => s.updatePlatformSettings);
  const [pendingDraft, setPendingDraft] =
    useState<AdminPlatformSettings | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormValues>({
    defaultValues: { ...settings, reason: "" },
  });

  const onFormSubmit = (values: SettingsFormValues) => {
    const nextSettings: AdminPlatformSettings = {
      platformName: values.platformName,
      currency: "RWF",
      defaultLocation: values.defaultLocation,
      maintenanceMode: values.maintenanceMode,
      maintenanceReason: values.maintenanceReason,
      allowNewRegistrations: values.allowNewRegistrations,
      requirePropertyVerificationBeforePublic:
        values.requirePropertyVerificationBeforePublic,
      requireLandlordIdentityVerification:
        values.requireLandlordIdentityVerification,
      disputeNoticeWindowDays: Number(values.disputeNoticeWindowDays),
    };

    if (nextSettings.maintenanceMode !== settings.maintenanceMode) {
      setPendingDraft(nextSettings);
      return;
    }

    updateSettings(nextSettings, values.reason);
    toast.success(t("savedToast"));
  };

  return (
    <AdminShellSection
      title={t("title")}
      description={t("description")}
      action={
        <span className="inline-flex items-center gap-1.5 border border-line bg-white px-3 py-1.5 text-xs font-semibold text-body">
          <LockKeyhole aria-hidden="true" className="size-3.5" />
          {t("secretsProtected")}
        </span>
      }
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <section className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-4 border border-line bg-white p-5 shadow-2xs">
            <h3 className="border-b border-line pb-3 text-sm font-bold text-ink">
              {t("platformSection")}
            </h3>
            <div>
              <label className="block text-xs font-semibold text-ink">
                {t("platformName")}
              </label>
              <Input
                {...register("platformName", { required: true })}
                className="mt-1 h-10 rounded-none border-line bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink">
                {t("defaultLocation")}
              </label>
              <Input
                {...register("defaultLocation", { required: true })}
                className="mt-1 h-10 rounded-none border-line bg-white text-sm"
              />
            </div>
            <label className="flex cursor-pointer items-start gap-2.5 border border-line bg-surface/50 p-3 text-xs text-ink">
              <input
                type="checkbox"
                {...register("maintenanceMode")}
                className="mt-0.5 size-4 accent-rose-700"
              />
              <span>
                <strong className="block">{t("maintenanceMode")}</strong>
                <span className="text-body">{t("maintenanceModeHelp")}</span>
              </span>
            </label>
          </div>

          <div className="space-y-4 border border-line bg-white p-5 shadow-2xs">
            <h3 className="border-b border-line pb-3 text-sm font-bold text-ink">
              {t("policySection")}
            </h3>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
              <input
                type="checkbox"
                {...register("allowNewRegistrations")}
                className="size-4 accent-brand-blue"
              />
              {t("allowRegistrations")}
            </label>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
              <input
                type="checkbox"
                {...register("requirePropertyVerificationBeforePublic")}
                className="size-4 accent-brand-blue"
              />
              {t("requirePropertyVerify")}
            </label>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
              <input
                type="checkbox"
                {...register("requireLandlordIdentityVerification")}
                className="size-4 accent-brand-blue"
              />
              {t("requireLandlordId")}
            </label>
            <div>
              <label className="block text-xs font-semibold text-ink">
                {t("noticeWindowDays")}
              </label>
              <Input
                type="number"
                {...register("disputeNoticeWindowDays", { min: 1, max: 14 })}
                className="mt-1 h-10 w-32 rounded-none border-line bg-white text-sm"
              />
            </div>
          </div>
        </section>

        <section className="space-y-3 border border-line bg-white p-5 shadow-2xs">
          <h3 className="text-sm font-bold text-ink">
            {t("providerStatusTitle")}
          </h3>
          <div className="grid gap-3 text-xs sm:grid-cols-3">
            <div className="border border-line bg-surface/40 p-3">
              <p className="font-semibold text-ink">{t("paymentProviders")}</p>
              <p className="mt-1 text-body">MTN MoMo · Airtel Money · Bank</p>
            </div>
            <div className="border border-line bg-surface/40 p-3">
              <p className="font-semibold text-ink">{t("aiServices")}</p>
              <p className="mt-1 text-body">{t("credentialsHidden")}</p>
            </div>
            <div className="border border-line bg-surface/40 p-3">
              <p className="font-semibold text-ink">{t("externalMessaging")}</p>
              <p className="mt-1 text-body">{t("inAppOnlyNote")}</p>
            </div>
          </div>
        </section>

        <section className="space-y-3 border border-line bg-white p-5 shadow-2xs">
          <label className="block text-xs font-semibold text-ink">
            {t("changeReasonLabel")} *
          </label>
          <Input
            placeholder={t("changeReasonPlaceholder")}
            {...register("reason", {
              required: t("reasonRequired"),
              minLength: { value: 5, message: t("reasonRequired") },
            })}
            className="h-10 rounded-none border-line bg-white text-sm"
          />
          {errors.reason && (
            <p className="text-xs text-rose-700">{errors.reason.message}</p>
          )}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="h-10 rounded-none bg-ink px-5 text-xs font-semibold text-white"
            >
              {tActions("saveChanges")}
            </Button>
          </div>
        </section>
      </form>

      <AdminReasonModal
        open={Boolean(pendingDraft)}
        onClose={() => setPendingDraft(null)}
        title={t("confirmMaintenanceTitle")}
        description={t("confirmMaintenanceDesc")}
        consequenceWarning={t("maintenanceWarning")}
        confirmLabel={t("applySettings")}
        isDestructive
        onSubmitAction={(values) => {
          if (!pendingDraft) return;
          updateSettings(
            { ...pendingDraft, maintenanceReason: values.reason },
            values.reason,
          );
          toast.success(t("savedToast"));
        }}
      />
    </AdminShellSection>
  );
}
