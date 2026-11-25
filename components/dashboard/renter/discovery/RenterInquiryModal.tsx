"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";

interface RenterInquiryModalProps {
  open: boolean;
  onClose: () => void;
  propertyId: string;
  propertyTitle: string;
}

interface InquiryValues {
  message: string;
  phone: string;
}

export function RenterInquiryModal({
  open,
  onClose,
  propertyId,
  propertyTitle,
}: RenterInquiryModalProps) {
  const t = useTranslations("renter.discovery.inquiryModal");
  const tWorkspace = useTranslations("renter.workspace");
  const tActions = useTranslations("common.actions");
  const profile = useRenterWorkspace((s) => s.profile);
  const addNotification = useRenterWorkspace((s) => s.addNotification);
  const addInquiry = useLandlordWorkspace((s) => s.addInquiry);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryValues>({
    defaultValues: { phone: profile.phone, message: "" },
  });

  const onSubmit = (vals: InquiryValues) => {
    addInquiry({
      propertyId,
      propertyName: propertyTitle,
      senderName: profile.name,
      senderEmail: profile.email,
      senderPhone: vals.phone.trim(),
      message: vals.message.trim(),
    });
    addNotification({
      title: t("notifTitle"),
      message: t("notifMessage", { property: propertyTitle }),
      date: tWorkspace("justNow"),
      read: false,
      category: "inquiry",
      href: "/renter/inquiries",
      actionLabel: t("notifAction"),
    });
    toast.success(t("toastSuccess"));
    reset({ phone: profile.phone, message: "" });
    onClose();
  };

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title={t("title")}
      description={t("description", { property: propertyTitle })}
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
            form="renter-inquiry-form"
            className="cursor-pointer rounded-none"
          >
            {t("submitButton")}
          </Button>
        </>
      }
    >
      <form
        id="renter-inquiry-form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Field>
          <FieldLabel htmlFor="renter-inq-phone">{t("phoneLabel")}</FieldLabel>
          <Input
            id="renter-inq-phone"
            className="h-10 rounded-none"
            {...register("phone", {
              validate: (v) => v.trim().length >= 9 || t("phoneError"),
            })}
          />
          <FieldError>{errors.phone?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="renter-inq-msg">{t("questionLabel")}</FieldLabel>
          <textarea
            id="renter-inq-msg"
            rows={4}
            placeholder={t("questionPlaceholder")}
            className="w-full rounded-none border border-input bg-white p-3 text-sm"
            {...register("message", {
              validate: (v) => v.trim().length >= 8 || t("questionError"),
            })}
          />
          <FieldError>{errors.message?.message}</FieldError>
        </Field>
      </form>
    </ModalDialog>
  );
}
