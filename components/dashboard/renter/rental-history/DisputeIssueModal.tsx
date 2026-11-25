"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { RentalIssue } from "@/types/landlord";

interface DisputeIssueModalProps {
  issue: RentalIssue | null;
  onClose: () => void;
}

interface DisputeValues {
  explanation: string;
}

export function DisputeIssueModal({ issue, onClose }: DisputeIssueModalProps) {
  const t = useTranslations("renter.rentalHistory.disputeModal");
  const tWorkspace = useTranslations("renter.workspace");
  const tActions = useTranslations("common.actions");
  const locale = useLocale() as AppLocale;
  const submitIssueDispute = useLandlordWorkspace((s) => s.submitIssueDispute);
  const addNotification = useRenterWorkspace((s) => s.addNotification);
  const [evidenceName, setEvidenceName] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DisputeValues>({
    defaultValues: { explanation: issue?.renterResponse ?? "" },
  });

  if (!issue) return null;

  const formattedAmount = formatRwfLocalized(issue.amountRwf, locale);

  const onSubmit = (vals: DisputeValues) => {
    submitIssueDispute(issue.id, vals.explanation, evidenceName || undefined);
    addNotification({
      title: t("notifTitle"),
      message: t("notifMessage", {
        title: issue.issueTitle,
        amount: formattedAmount,
      }),
      date: tWorkspace("justNow"),
      read: false,
      category: "history",
      href: "/renter/rental-history",
      actionLabel: t("notifAction"),
    });
    toast.success(t("toastSuccess"));
    reset();
    setEvidenceName("");
    onClose();
  };

  return (
    <ModalDialog
      open
      onClose={onClose}
      title={t("title")}
      description={`${issue.issueTitle} · ${formattedAmount}`}
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="cursor-pointer rounded-none"
          >
            {tActions("cancel")}
          </Button>
          <Button
            type="submit"
            form="renter-dispute-form"
            className="cursor-pointer rounded-none"
          >
            {t("submitButton")}
          </Button>
        </>
      }
    >
      <form
        id="renter-dispute-form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <p className="border-l-2 border-amber-500 bg-amber-50/60 px-3 py-2 text-xs text-body">
          {t("infoNotice")}
        </p>

        <Field>
          <FieldLabel htmlFor="dispute-explanation">
            {t("explanationLabel")}
          </FieldLabel>
          <textarea
            id="dispute-explanation"
            rows={4}
            placeholder={t("explanationPlaceholder")}
            className="w-full rounded-none border border-input bg-white p-3 text-sm"
            {...register("explanation", {
              validate: (v) =>
                v.trim().length >= 12 || t("explanationError"),
            })}
          />
          <FieldError>{errors.explanation?.message}</FieldError>
        </Field>

        <div className="space-y-2">
          <span className="block text-xs font-semibold text-ink">
            {t("proofLabel")}
          </span>
          <label className="flex cursor-pointer items-center justify-between border border-dashed border-line bg-surface/50 px-3.5 py-3 text-xs text-body hover:bg-surface">
            <span className="inline-flex items-center gap-2 truncate">
              <Upload aria-hidden="true" className="size-4 text-brand-blue" />
              {evidenceName || t("attachPrompt")}
            </span>
            <input
              type="file"
              accept="image/*,.pdf"
              className="sr-only"
              onChange={(e) => setEvidenceName(e.target.files?.[0]?.name ?? "")}
            />
          </label>
        </div>
      </form>
    </ModalDialog>
  );
}
