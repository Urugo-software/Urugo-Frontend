"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import CustomButton from "@/components/shared/CustomButton";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  submitPropertyInquiry,
  submitPublicViewingRequest,
} from "@/services/public-interactions.service";

interface PropertyLeadActionsProps {
  propertyId: string;
  propertyTitle: string;
  landlordPhone?: string;
}

interface VisitFormValues {
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  note: string;
}

interface InquiryFormValues {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export function PropertyLeadActions({
  propertyId,
  propertyTitle,
  landlordPhone,
}: PropertyLeadActionsProps) {
  const t = useTranslations("properties.details.leads");
  const tActions = useTranslations("common.actions");
  const [modal, setModal] = useState<"visit" | "inquiry" | null>(null);

  const visitForm = useForm<VisitFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      preferredDate: "",
      preferredTime: "10:00",
      note: "",
    },
  });

  const inquiryForm = useForm<InquiryFormValues>({
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  const whatsappHref = landlordPhone
    ? `https://wa.me/${landlordPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        t("whatsappMessage", { propertyTitle }),
      )}`
    : null;

  return (
    <>
      <CustomButton
        title={t("requestVisit")}
        variant="colored"
        onClick={() => setModal("visit")}
        className="mb-3 w-full rounded-none bg-brand py-6"
      />

      <CustomButton
        title={t("sendInquiry")}
        variant="light"
        onClick={() => setModal("inquiry")}
        className="mb-2 w-full rounded-none py-6"
      />

      {whatsappHref && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 block text-center text-xs font-semibold text-brand-blue hover:underline"
        >
          {t("whatsappLink")}
        </a>
      )}

      <ModalDialog
        open={modal === "visit"}
        onClose={() => setModal(null)}
        title={t("visitModal.title")}
        description={t("visitModal.description", { propertyTitle })}
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setModal(null)}
              className="cursor-pointer rounded-none"
            >
              {tActions("cancel")}
            </Button>
            <Button
              type="submit"
              form="public-visit-form"
              disabled={visitForm.formState.isSubmitting}
              className="cursor-pointer rounded-none"
            >
              {t("visitModal.submit")}
            </Button>
          </>
        }
      >
        <form
          id="public-visit-form"
          noValidate
          onSubmit={visitForm.handleSubmit(async (vals) => {
            try {
              await submitPublicViewingRequest(propertyId, vals);
              toast.success(t("visitModal.successToast"));
              visitForm.reset();
              setModal(null);
            } catch (err) {
              toast.error(
                err instanceof Error ? err.message : "Failed to submit viewing request",
              );
            }
          })}
          className="space-y-3"
        >
          <Field>
            <FieldLabel htmlFor="visit-name">
              {t("visitModal.fullName")}
            </FieldLabel>
            <Input
              id="visit-name"
              className="h-10 rounded-none"
              {...visitForm.register("name", {
                validate: (v) => !!v.trim() || t("visitModal.nameRequired"),
              })}
            />
            <FieldError>{visitForm.formState.errors.name?.message}</FieldError>
          </Field>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="visit-phone">
                {t("visitModal.phone")}
              </FieldLabel>
              <Input
                id="visit-phone"
                className="h-10 rounded-none"
                {...visitForm.register("phone", {
                  validate: (v) => !!v.trim() || t("visitModal.phoneRequired"),
                })}
              />
              <FieldError>
                {visitForm.formState.errors.phone?.message}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="visit-email">
                {t("visitModal.email")}
              </FieldLabel>
              <Input
                id="visit-email"
                type="email"
                className="h-10 rounded-none"
                {...visitForm.register("email", {
                  validate: (v) => !!v.trim() || t("visitModal.emailRequired"),
                })}
              />
              <FieldError>
                {visitForm.formState.errors.email?.message}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="visit-date">
                {t("visitModal.preferredDate")}
              </FieldLabel>
              <Input
                id="visit-date"
                type="date"
                className="h-10 rounded-none"
                {...visitForm.register("preferredDate", {
                  required: t("visitModal.dateRequired"),
                })}
              />
              <FieldError>
                {visitForm.formState.errors.preferredDate?.message}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="visit-time">
                {t("visitModal.preferredTime")}
              </FieldLabel>
              <Input
                id="visit-time"
                type="time"
                className="h-10 rounded-none"
                {...visitForm.register("preferredTime", {
                  required: t("visitModal.timeRequired"),
                })}
              />
              <FieldError>
                {visitForm.formState.errors.preferredTime?.message}
              </FieldError>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="visit-note">{t("visitModal.note")}</FieldLabel>
            <textarea
              id="visit-note"
              rows={2}
              className="w-full rounded-none border border-input p-2.5 text-sm"
              {...visitForm.register("note")}
            />
          </Field>
        </form>
      </ModalDialog>

      <ModalDialog
        open={modal === "inquiry"}
        onClose={() => setModal(null)}
        title={t("inquiryModal.title")}
        description={t("inquiryModal.description", { propertyTitle })}
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setModal(null)}
              className="cursor-pointer rounded-none"
            >
              {tActions("cancel")}
            </Button>
            <Button
              type="submit"
              form="public-inquiry-form"
              disabled={inquiryForm.formState.isSubmitting}
              className="cursor-pointer rounded-none"
            >
              {t("inquiryModal.submit")}
            </Button>
          </>
        }
      >
        <form
          id="public-inquiry-form"
          noValidate
          onSubmit={inquiryForm.handleSubmit(async (vals) => {
            try {
              await submitPropertyInquiry(propertyId, vals);
              toast.success(t("inquiryModal.successToast"));
              inquiryForm.reset();
              setModal(null);
            } catch (err) {
              toast.error(
                err instanceof Error ? err.message : "Failed to send inquiry",
              );
            }
          })}
          className="space-y-3"
        >
          <Field>
            <FieldLabel htmlFor="inq-name">
              {t("inquiryModal.fullName")}
            </FieldLabel>
            <Input
              id="inq-name"
              className="h-10 rounded-none"
              {...inquiryForm.register("name", {
                validate: (v) => !!v.trim() || t("inquiryModal.nameRequired"),
              })}
            />
            <FieldError>
              {inquiryForm.formState.errors.name?.message}
            </FieldError>
          </Field>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="inq-phone">
                {t("inquiryModal.phone")}
              </FieldLabel>
              <Input
                id="inq-phone"
                className="h-10 rounded-none"
                {...inquiryForm.register("phone", {
                  validate: (v) =>
                    !!v.trim() || t("inquiryModal.phoneRequired"),
                })}
              />
              <FieldError>
                {inquiryForm.formState.errors.phone?.message}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="inq-email">
                {t("inquiryModal.email")}
              </FieldLabel>
              <Input
                id="inq-email"
                type="email"
                className="h-10 rounded-none"
                {...inquiryForm.register("email", {
                  validate: (v) =>
                    !!v.trim() || t("inquiryModal.emailRequired"),
                })}
              />
              <FieldError>
                {inquiryForm.formState.errors.email?.message}
              </FieldError>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="inq-msg">
              {t("inquiryModal.message")}
            </FieldLabel>
            <textarea
              id="inq-msg"
              rows={3}
              className="w-full rounded-none border border-input p-2.5 text-sm"
              {...inquiryForm.register("message", {
                validate: (v) =>
                  v.trim().length >= 5 || t("inquiryModal.messageRequired"),
              })}
            />
            <FieldError>
              {inquiryForm.formState.errors.message?.message}
            </FieldError>
          </Field>
        </form>
      </ModalDialog>
    </>
  );
}
