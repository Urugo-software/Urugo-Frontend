"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { RentalIssue } from "@/types/landlord";
import { formatRwf } from "@/utils/format";

interface DisputeIssueModalProps {
  issue: RentalIssue | null;
  onClose: () => void;
}

interface DisputeValues {
  explanation: string;
}

export function DisputeIssueModal({ issue, onClose }: DisputeIssueModalProps) {
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

  const onSubmit = (vals: DisputeValues) => {
    submitIssueDispute(issue.id, vals.explanation, evidenceName || undefined);
    addNotification({
      title: "Dispute Submitted for Review",
      message: `Your response for "${issue.issueTitle}" (${formatRwf(issue.amountRwf)}) was logged.`,
      date: "Just now",
      read: false,
      category: "history",
      href: "/renter/rental-history",
      actionLabel: "View Case",
    });
    toast.success("Dispute response submitted. Status updated to Disputed.");
    reset();
    setEvidenceName("");
    onClose();
  };

  return (
    <ModalDialog
      open
      onClose={onClose}
      title="Submit Dispute & Payment Proof"
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
            form="renter-dispute-form"
            className="cursor-pointer rounded-none"
          >
            Submit Dispute
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
          Submitting a dispute places this notice under review. Disputed records
          are never marked as confirmed unpaid obligations while review is
          pending.
        </p>

        <Field>
          <FieldLabel htmlFor="dispute-explanation">
            Your explanation *
          </FieldLabel>
          <textarea
            id="dispute-explanation"
            rows={4}
            placeholder="Explain why this charge is incorrect or share payment date and Mobile Money reference..."
            className="w-full rounded-none border border-input bg-white p-3 text-sm"
            {...register("explanation", {
              validate: (v) =>
                v.trim().length >= 12 ||
                "Please provide at least 12 characters of explanation.",
            })}
          />
          <FieldError>{errors.explanation?.message}</FieldError>
        </Field>

        <div className="space-y-2">
          <span className="block text-xs font-semibold text-ink">
            Supporting proof / receipt (optional)
          </span>
          <label className="flex cursor-pointer items-center justify-between border border-dashed border-line bg-surface/50 px-3.5 py-3 text-xs text-body hover:bg-surface">
            <span className="inline-flex items-center gap-2 truncate">
              <Upload aria-hidden="true" className="size-4 text-brand-blue" />
              {evidenceName || "Attach payment receipt image or PDF"}
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
