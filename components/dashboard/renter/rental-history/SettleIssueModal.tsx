"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { RentalIssue } from "@/types/landlord";
import { formatRwf } from "@/utils/format";

interface SettleIssueModalProps {
  issue: RentalIssue | null;
  onClose: () => void;
}

interface SettleValues {
  method: string;
  reference: string;
}

export function SettleIssueModal({ issue, onClose }: SettleIssueModalProps) {
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

  const onSubmit = (vals: SettleValues) => {
    updateIssueStatus(issue.id, "Resolved");
    addNotification({
      title: "Obligation Settled",
      message: `Settlement of ${formatRwf(issue.amountRwf)} recorded via ${vals.method} (Ref: ${vals.reference.trim()}).`,
      date: "Just now",
      read: false,
      category: "history",
      href: "/renter/rental-history",
      actionLabel: "View History",
    });
    toast.success("Settlement recorded (preview). Case marked Resolved.");
    reset();
    onClose();
  };

  return (
    <ModalDialog
      open
      onClose={onClose}
      title="Record Obligation Settlement"
      description={`${issue.issueTitle} · ${formatRwf(issue.amountRwf)}`}
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
            form="renter-settle-form"
            className="cursor-pointer rounded-none"
          >
            Confirm Settlement
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
          <FieldLabel htmlFor="settle-method">Payment method</FieldLabel>
          <select
            id="settle-method"
            className="h-10 w-full rounded-none border border-input bg-white px-3 text-sm"
            {...register("method")}
          >
            <option value="MTN Mobile Money">MTN Mobile Money</option>
            <option value="AIRTEL Money">AIRTEL Money</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </Field>

        <Field>
          <FieldLabel htmlFor="settle-ref">
            Payment transaction reference *
          </FieldLabel>
          <Input
            id="settle-ref"
            placeholder="e.g. TXN-782411"
            className="h-10 rounded-none"
            {...register("reference", {
              validate: (v) =>
                v.trim().length >= 4 ||
                "Enter the payment transaction reference.",
            })}
          />
          <FieldError>{errors.reference?.message}</FieldError>
        </Field>
      </form>
    </ModalDialog>
  );
}
