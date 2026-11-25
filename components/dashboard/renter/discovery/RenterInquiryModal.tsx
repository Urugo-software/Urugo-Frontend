"use client";

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
      title: "Property Inquiry Sent",
      message: `Your inquiry for ${propertyTitle} was delivered to the landlord.`,
      date: "Just now",
      read: false,
      category: "inquiry",
      href: "/renter/inquiries",
      actionLabel: "View Inquiries",
    });
    toast.success("Inquiry sent to the landlord.");
    reset({ phone: profile.phone, message: "" });
    onClose();
  };

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title="Send Property Inquiry"
      description={`Ask the landlord about ${propertyTitle}.`}
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="cursor-pointer rounded-none"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="renter-inquiry-form"
            className="cursor-pointer rounded-none"
          >
            Send Inquiry
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
          <FieldLabel htmlFor="renter-inq-phone">Contact phone *</FieldLabel>
          <Input
            id="renter-inq-phone"
            className="h-10 rounded-none"
            {...register("phone", {
              validate: (v) =>
                v.trim().length >= 9 || "Enter a valid phone number.",
            })}
          />
          <FieldError>{errors.phone?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="renter-inq-msg">Your question *</FieldLabel>
          <textarea
            id="renter-inq-msg"
            rows={4}
            placeholder="Ask about availability, utilities, lease terms, or move-in date..."
            className="w-full rounded-none border border-input bg-white p-3 text-sm"
            {...register("message", {
              validate: (v) =>
                v.trim().length >= 8 || "Enter at least 8 characters.",
            })}
          />
          <FieldError>{errors.message?.message}</FieldError>
        </Field>
      </form>
    </ModalDialog>
  );
}
