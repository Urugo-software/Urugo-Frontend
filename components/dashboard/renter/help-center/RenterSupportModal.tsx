"use client";

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
    toast.success("Support request submitted. Our team will respond shortly.");
    reset();
    onClose();
  };

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title="Contact Renter Support"
      description="Tell us how we can assist with your tenancy, rent payment, or account."
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
            form="renter-support-form"
            className="cursor-pointer rounded-none"
          >
            Send Request
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
          <FieldLabel htmlFor="rs-cat">Topic</FieldLabel>
          <select
            id="rs-cat"
            className="h-10 w-full rounded-none border border-input bg-white px-3 text-sm"
            {...register("category")}
          >
            <option value="Payments">Payments &amp; Receipts</option>
            <option value="Lease & Documents">Lease &amp; Documents</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Rental History">Rental History &amp; Disputes</option>
            <option value="Account">Account &amp; Settings</option>
          </select>
        </Field>

        <Field>
          <FieldLabel htmlFor="rs-subject">Subject *</FieldLabel>
          <Input
            id="rs-subject"
            placeholder="e.g. Question about September rent confirmation"
            className="h-10 rounded-none"
            {...register("subject", {
              validate: (v) =>
                v.trim().length >= 4 || "Enter a short subject.",
            })}
          />
          <FieldError>{errors.subject?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="rs-message">Message *</FieldLabel>
          <textarea
            id="rs-message"
            rows={4}
            placeholder="Describe how we can help..."
            className="w-full rounded-none border border-input bg-white p-3 text-sm"
            {...register("message", {
              validate: (v) =>
                v.trim().length >= 10 || "Please describe your issue.",
            })}
          />
          <FieldError>{errors.message?.message}</FieldError>
        </Field>
      </form>
    </ModalDialog>
  );
}
