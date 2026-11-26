"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface AdminReasonFormValues {
  reason: string;
  evidenceRef: string;
  confirmedImpact: boolean;
}

interface AdminReasonModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  consequenceWarning?: string;
  confirmLabel: string;
  requireEvidence?: boolean;
  isDestructive?: boolean;
  onSubmitAction: (values: AdminReasonFormValues) => void;
}

export function AdminReasonModal({
  open,
  onClose,
  title,
  description,
  consequenceWarning,
  confirmLabel,
  requireEvidence = false,
  isDestructive = false,
  onSubmitAction,
}: AdminReasonModalProps) {
  const tActions = useTranslations("common.actions");
  const tCommon = useTranslations("admin.common");
  const tModal = useTranslations("admin.reasonModal");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdminReasonFormValues>({
    defaultValues: { reason: "", evidenceRef: "", confirmedImpact: false },
  });

  useEffect(() => {
    if (open) {
      reset({ reason: "", evidenceRef: "", confirmedImpact: false });
    }
  }, [open, reset]);

  const onValid = (values: AdminReasonFormValues) => {
    try {
      onSubmitAction(values);
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : tCommon("actionFailed"),
      );
    }
  };

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      variant="alert"
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-9 rounded-none border-line text-xs font-semibold"
          >
            {tActions("cancel")}
          </Button>
          <Button
            type="submit"
            form="admin-reason-form"
            disabled={isSubmitting}
            className={`h-9 rounded-none px-4 text-xs font-semibold text-white ${
              isDestructive
                ? "bg-rose-700 hover:bg-rose-800"
                : "bg-ink hover:bg-ink/90"
            }`}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <form
        id="admin-reason-form"
        onSubmit={handleSubmit(onValid)}
        className="space-y-4"
      >
        {consequenceWarning && (
          <div className="flex items-start gap-2.5 border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
            <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <p className="leading-relaxed">{consequenceWarning}</p>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-ink">
            {tModal("reasonLabel")} *
          </label>
          <textarea
            rows={3}
            placeholder={tModal("reasonPlaceholder")}
            {...register("reason", {
              required: tModal("reasonRequired"),
              minLength: { value: 5, message: tModal("reasonMinLength") },
            })}
            className="mt-1.5 w-full rounded-none border border-line bg-white p-2.5 text-sm text-ink outline-none focus:border-ink"
          />
          {errors.reason && (
            <p className="mt-1 text-xs text-rose-700">{errors.reason.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink">
            {tModal("evidenceLabel")}
            {requireEvidence ? " *" : ""}
          </label>
          <Input
            placeholder={tModal("evidencePlaceholder")}
            {...register("evidenceRef", {
              validate: (value) =>
                !requireEvidence || value.trim().length >= 3
                  ? true
                  : tModal("evidenceRequired"),
            })}
            className="mt-1.5 h-10 rounded-none border-line bg-white text-sm"
          />
          {errors.evidenceRef && (
            <p className="mt-1 text-xs text-rose-700">
              {errors.evidenceRef.message}
            </p>
          )}
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 border border-line bg-surface/60 p-3 text-xs text-body">
          <input
            type="checkbox"
            {...register("confirmedImpact", {
              required: tModal("confirmAuditRequired"),
            })}
            className="mt-0.5 size-4 accent-ink"
          />
          <span>{tModal("confirmAuditText")}</span>
        </label>
        {errors.confirmedImpact && (
          <p className="text-xs text-rose-700">
            {errors.confirmedImpact.message}
          </p>
        )}
      </form>
    </ModalDialog>
  );
}
