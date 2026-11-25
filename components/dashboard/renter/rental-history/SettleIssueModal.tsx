"use client";

import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { RentalIssue } from "@/types/landlord";

interface SettleIssueModalProps {
  issue: RentalIssue | null;
  onClose: () => void;
}

interface SettleValues {
  method: string;
  reference: string;
}

export function SettleIssueModal({ issue, onClose }: SettleIssueModalProps) {
  const t = useTranslations("renter.rentalHistory.settleModal");
  const tMethods = useTranslations("renter.payments.payRent.methods");
  const tWorkspace = useTranslations("renter.workspace");
  const tActions = useTranslations("common.actions");
  const locale = useLocale() as AppLocale;
  const updateIssueStatus = useLandlordWorkspace((s) => s.updateIssueStatus);
  const addNotification = useRenterWorkspace((s) => s.addNotification);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettleValues>({
    defaultValues: { method: "MTN Mobile Money", reference: "" },
  });

  if (!issue) return null;

  const formattedAmount = formatRwfLocalized(issue.amountRwf, locale);

  const onSubmit = (vals: SettleValues) => {
    const methodLabel =
      vals.method === "MTN Mobile Money"
        ? tMethods("mtnName")
        : vals.method === "AIRTEL Money"
          ? tMethods("airtelName")
          : tMethods("bankName");

    updateIssueStatus(issue.id, "Resolved");
    addNotification({
      title: t("notifTitle"),
      message: t("notifMessage", {
        amount: formattedAmount,
        method: methodLabel,
        reference: vals.reference.trim(),
      }),
      date: tWorkspace("justNow"),
      read: false,
      category: "history",
      href: "/renter/rental-history",
      actionLabel: t("notifAction"),
    });
    toast.success(t("toastSuccess"));
    reset();
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
            form="renter-settle-form"
            className="cursor-pointer rounded-none"
          >
            {t("confirmButton")}
          </Button>
        </>
      }
    >
      <form
        id="renter-settle-form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Field>
          <FieldLabel htmlFor="settle-method">{t("methodLabel")}</FieldLabel>
          <select
            id="settle-method"
            className="h-10 w-full rounded-none border border-input bg-white px-3 text-sm"
            {...register("method")}
          >
            <option value="MTN Mobile Money">{tMethods("mtnName")}</option>
            <option value="AIRTEL Money">{tMethods("airtelName")}</option>
            <option value="Bank Transfer">{tMethods("bankName")}</option>
          </select>
        </Field>

        <Field>
          <FieldLabel htmlFor="settle-ref">{t("refLabel")}</FieldLabel>
          <Input
            id="settle-ref"
            placeholder={t("refPlaceholder")}
            className="h-10 rounded-none"
            {...register("reference", {
              validate: (v) => v.trim().length >= 4 || t("refError"),
            })}
          />
          <FieldError>{errors.reference?.message}</FieldError>
        </Field>
      </form>
    </ModalDialog>
  );
}
