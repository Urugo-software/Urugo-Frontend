"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";

interface RenterViewingModalProps {
  open: boolean;
  onClose: () => void;
  propertyId: string;
  propertyTitle: string;
}

interface ViewingValues {
  preferredDate: string;
  preferredTime: string;
  phone: string;
  note: string;
}

export function RenterViewingModal({
  open,
  onClose,
  propertyId,
  propertyTitle,
}: RenterViewingModalProps) {
  const profile = useRenterWorkspace((s) => s.profile);
  const addNotification = useRenterWorkspace((s) => s.addNotification);
  const addViewingRequest = useLandlordWorkspace((s) => s.addViewingRequest);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ViewingValues>({
    defaultValues: {
      preferredDate: "",
      preferredTime: "10:00",
      phone: profile.phone,
      note: "",
    },
  });

  const onSubmit = (vals: ViewingValues) => {
    addViewingRequest({
      propertyId,
      propertyName: propertyTitle,
      requesterName: profile.name,
      requesterEmail: profile.email,
      requesterPhone: vals.phone.trim(),
      preferredDate: vals.preferredDate,
      preferredTime: vals.preferredTime,
      note: vals.note.trim() || undefined,
    });
    addNotification({
      title: "Viewing Request Submitted",
      message: `Requested a viewing for ${propertyTitle} on ${vals.preferredDate} at ${vals.preferredTime}.`,
      date: "Just now",
      read: false,
      category: "inquiry",
      href: "/renter/inquiries",
      actionLabel: "Track Visit",
    });
    toast.success("Viewing request sent to the landlord.");
    reset({
      preferredDate: "",
      preferredTime: "10:00",
      phone: profile.phone,
      note: "",
    });
    onClose();
  };

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title="Request a Property Viewing"
      description={`Pick a convenient date and time to visit ${propertyTitle}.`}
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
            form="renter-viewing-form"
            className="cursor-pointer rounded-none"
          >
            Submit Request
          </Button>
        </>
      }
    >
      <form
        id="renter-viewing-form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="rv-date">Preferred date *</FieldLabel>
            <Input
              id="rv-date"
              type="date"
              className="h-10 rounded-none"
              {...register("preferredDate", { required: "Select a date." })}
            />
            <FieldError>{errors.preferredDate?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="rv-time">Preferred time *</FieldLabel>
            <Input
              id="rv-time"
              type="time"
              className="h-10 rounded-none"
              {...register("preferredTime", { required: "Select a time." })}
            />
            <FieldError>{errors.preferredTime?.message}</FieldError>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="rv-phone">Contact phone *</FieldLabel>
          <Input
            id="rv-phone"
            className="h-10 rounded-none"
            {...register("phone", {
              validate: (v) =>
                v.trim().length >= 9 || "Enter a valid phone number.",
            })}
          />
          <FieldError>{errors.phone?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="rv-note">Note for landlord (optional)</FieldLabel>
          <textarea
            id="rv-note"
            rows={3}
            placeholder="Any questions or preferred arrival instructions..."
            className="w-full rounded-none border border-input bg-white p-3 text-sm"
            {...register("note")}
          />
        </Field>
      </form>
    </ModalDialog>
  );
}
