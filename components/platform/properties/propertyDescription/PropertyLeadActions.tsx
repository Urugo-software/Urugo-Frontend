"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CustomButton from "@/components/shared/CustomButton";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";

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
  const { contactVisibility, addInquiry, addViewingRequest } =
    useLandlordWorkspace();
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

  const whatsappHref =
    contactVisibility.showWhatsApp && landlordPhone
      ? `https://wa.me/${landlordPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello, I am interested in ${propertyTitle} on Urugo.`)}`
      : null;

  return (
    <>
      <CustomButton
        title="Request a visit"
        variant="colored"
        onClick={() => setModal("visit")}
        className="mb-3 w-full rounded-none bg-brand py-6"
      />

      <CustomButton
        title="Send an inquiry"
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
          Or message landlord on WhatsApp
        </a>
      )}

      <ModalDialog
        open={modal === "visit"}
        onClose={() => setModal(null)}
        title="Request a Property Visit"
        description={`Schedule an inspection for ${propertyTitle}.`}
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setModal(null)}
              className="cursor-pointer rounded-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="public-visit-form"
              className="cursor-pointer rounded-none"
            >
              Submit Request
            </Button>
          </>
        }
      >
        <form
          id="public-visit-form"
          noValidate
          onSubmit={visitForm.handleSubmit((vals) => {
            addViewingRequest({
              propertyId,
              propertyName: propertyTitle,
              requesterName: vals.name.trim(),
              requesterPhone: vals.phone.trim(),
              requesterEmail: vals.email.trim(),
              preferredDate: vals.preferredDate,
              preferredTime: vals.preferredTime,
              note: vals.note.trim() || undefined,
            });
            toast.success("Viewing request sent to the landlord.");
            visitForm.reset();
            setModal(null);
          })}
          className="space-y-3"
        >
          <Field>
            <FieldLabel htmlFor="visit-name">Full name *</FieldLabel>
            <Input
              id="visit-name"
              className="h-10 rounded-none"
              {...visitForm.register("name", {
                validate: (v) => !!v.trim() || "Enter your name.",
              })}
            />
            <FieldError>{visitForm.formState.errors.name?.message}</FieldError>
          </Field>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="visit-phone">Phone *</FieldLabel>
              <Input
                id="visit-phone"
                className="h-10 rounded-none"
                {...visitForm.register("phone", {
                  validate: (v) => !!v.trim() || "Enter your phone.",
                })}
              />
              <FieldError>{visitForm.formState.errors.phone?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="visit-email">Email *</FieldLabel>
              <Input
                id="visit-email"
                type="email"
                className="h-10 rounded-none"
                {...visitForm.register("email", {
                  validate: (v) => !!v.trim() || "Enter your email.",
                })}
              />
              <FieldError>{visitForm.formState.errors.email?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="visit-date">Preferred date *</FieldLabel>
              <Input
                id="visit-date"
                type="date"
                className="h-10 rounded-none"
                {...visitForm.register("preferredDate", {
                  required: "Pick a date.",
                })}
              />
              <FieldError>
                {visitForm.formState.errors.preferredDate?.message}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="visit-time">Preferred time *</FieldLabel>
              <Input
                id="visit-time"
                type="time"
                className="h-10 rounded-none"
                {...visitForm.register("preferredTime", {
                  required: "Pick a time.",
                })}
              />
              <FieldError>
                {visitForm.formState.errors.preferredTime?.message}
              </FieldError>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="visit-note">Note (optional)</FieldLabel>
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
        title="Send Property Inquiry"
        description={`Ask the landlord a question about ${propertyTitle}.`}
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setModal(null)}
              className="cursor-pointer rounded-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="public-inquiry-form"
              className="cursor-pointer rounded-none"
            >
              Send Inquiry
            </Button>
          </>
        }
      >
        <form
          id="public-inquiry-form"
          noValidate
          onSubmit={inquiryForm.handleSubmit((vals) => {
            addInquiry({
              propertyId,
              propertyName: propertyTitle,
              senderName: vals.name.trim(),
              senderPhone: vals.phone.trim(),
              senderEmail: vals.email.trim(),
              message: vals.message.trim(),
            });
            toast.success("Inquiry delivered to the landlord.");
            inquiryForm.reset();
            setModal(null);
          })}
          className="space-y-3"
        >
          <Field>
            <FieldLabel htmlFor="inq-name">Full name *</FieldLabel>
            <Input
              id="inq-name"
              className="h-10 rounded-none"
              {...inquiryForm.register("name", {
                validate: (v) => !!v.trim() || "Enter your name.",
              })}
            />
            <FieldError>{inquiryForm.formState.errors.name?.message}</FieldError>
          </Field>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="inq-phone">Phone *</FieldLabel>
              <Input
                id="inq-phone"
                className="h-10 rounded-none"
                {...inquiryForm.register("phone", {
                  validate: (v) => !!v.trim() || "Enter your phone.",
                })}
              />
              <FieldError>{inquiryForm.formState.errors.phone?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="inq-email">Email *</FieldLabel>
              <Input
                id="inq-email"
                type="email"
                className="h-10 rounded-none"
                {...inquiryForm.register("email", {
                  validate: (v) => !!v.trim() || "Enter your email.",
                })}
              />
              <FieldError>{inquiryForm.formState.errors.email?.message}</FieldError>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="inq-msg">Message *</FieldLabel>
            <textarea
              id="inq-msg"
              rows={3}
              className="w-full rounded-none border border-input p-2.5 text-sm"
              {...inquiryForm.register("message", {
                validate: (v) =>
                  v.trim().length >= 5 || "Enter your question.",
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
