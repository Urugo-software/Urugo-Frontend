"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRenterWorkspace } from "@/store/renter-workspace.store";

interface RenterSupportModalProps {
  open: boolean;
  onClose: () => void;
}

interface SupportFormValues {
  category: string;
  subject: string;
  message: string;
}

export function RenterSupportModal({
  open,
  onClose,
}: RenterSupportModalProps) {
  const t = useTranslations("renter.helpCenter.supportModal");
  const tActions = useTranslations("common.actions");
  const addSupportTicket = useRenterWorkspace((s) => s.addSupportTicket);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupportFormValues>({
    defaultValues: { category: "Payments", subject: "", message: "" },
  });

  const onSubmit = (vals: SupportFormValues) => {
    addSupportTicket(vals);
    toast.success(t("toastSuccess"));
    reset();
    onClose();
  };

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title={t("title")}
      description={t("description")}
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
            form="renter-support-form"
            className="cursor-pointer rounded-none"
          >
            {t("sendRequest")}
          </Button>
        </>
      }
    >
      <form
        id="renter-support-form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Field>
          <FieldLabel htmlFor="rs-cat">{t("topicLabel")}</FieldLabel>
          <select
            id="rs-cat"
            className="h-10 w-full rounded-none border border-input bg-white px-3 text-sm"
            {...register("category")}
          >
            <option value="Payments">{t("topics.payments")}</option>
            <option value="Lease & Documents">
              {t("topics.leaseDocuments")}
            </option>
            <option value="Maintenance">{t("topics.maintenance")}</option>
            <option value="Rental History">{t("topics.rentalHistory")}</option>
            <option value="Account">{t("topics.account")}</option>
          </select>
        </Field>

        <Field>
          <FieldLabel htmlFor="rs-subject">{t("subjectLabel")}</FieldLabel>
          <Input
            id="rs-subject"
            placeholder={t("subjectPlaceholder")}
            className="h-10 rounded-none"
            {...register("subject", {
              validate: (v) => v.trim().length >= 4 || t("subjectError"),
            })}
          />
          <FieldError>{errors.subject?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="rs-message">{t("messageLabel")}</FieldLabel>
          <textarea
            id="rs-message"
            rows={4}
            placeholder={t("messagePlaceholder")}
            className="w-full rounded-none border border-input bg-white p-3 text-sm"
            {...register("message", {
              validate: (v) => v.trim().length >= 10 || t("messageError"),
            })}
          />
          <FieldError>{errors.message?.message}</FieldError>
        </Field>
      </form>
    </ModalDialog>
  );
}
