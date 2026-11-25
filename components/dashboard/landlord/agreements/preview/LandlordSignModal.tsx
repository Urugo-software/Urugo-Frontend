"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Agreement } from "@/types/agreement.types";
import { SignModalLegalNotice } from "./modal/SignModalLegalNotice";

interface Props {
  agreement: Agreement;
  isOpen: boolean;
  onClose: () => void;
  onSign: (signerName: string) => void;
}

interface SignFormValues {
  signerName: string;
  hasAgreed: boolean;
}

export function LandlordSignModal({
  agreement,
  isOpen,
  onClose,
  onSign,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SignFormValues>({
    defaultValues: {
      signerName: agreement.landlord.name,
      hasAgreed: false,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({ signerName: agreement.landlord.name, hasAgreed: false });
    }
  }, [isOpen, agreement.landlord.name, reset]);

  const signerNameValue = useWatch({ control, name: "signerName" });
  const hasAgreedValue = useWatch({ control, name: "hasAgreed" });
  const canSubmit = Boolean(signerNameValue?.trim() && hasAgreedValue);

  function onSubmit(values: SignFormValues) {
    onSign(values.signerName.trim());
    toast.success("Agreement digitally signed as Landlord.");
    onClose();
  }

  return (
    <ModalDialog
      open={isOpen}
      onClose={onClose}
      title="Sign Lease Agreement"
      description={`Ref: ${agreement.referenceNumber}`}
      maxWidthClassName="max-w-lg"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 text-[12.5px]"
      >
        <SignModalLegalNotice
          referenceNumber={agreement.referenceNumber}
          renterName={agreement.renter.name}
          propertyName={agreement.property.name}
          unitNumber={agreement.property.unitNumber}
        />

        <div>
          <label
            htmlFor="landlord-signer-name"
            className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wider text-faint"
          >
            Full Legal Name
          </label>
          <input
            id="landlord-signer-name"
            type="text"
            {...register("signerName", {
              required: "Please enter your legal name to endorse.",
              validate: (v) =>
                v.trim().length > 0 || "Please enter your legal name.",
            })}
            className="h-10 w-full border border-line bg-white px-3 text-sm font-semibold text-ink focus:border-ink focus:outline-none"
          />
          {errors.signerName && (
            <p className="mt-1 text-xs text-red-600">
              {errors.signerName.message}
            </p>
          )}
          <p className="mt-1 font-mono text-[12.5px] text-faint">
            National ID: {agreement.landlord.nationalId}
          </p>
        </div>

        <label className="flex cursor-pointer select-none items-start gap-2.5">
          <input
            type="checkbox"
            {...register("hasAgreed", {
              required: "Confirm your acknowledgment to sign.",
            })}
            className="mt-1 rounded-none border-line text-ink focus:ring-ink"
          />
          <span className="text-[12.5px] leading-relaxed text-body">
            I attest that the terms and covenants contained in this lease
            agreement accurately represent the agreed terms under Rwandan
            residential tenancy law.
          </span>
        </label>

        <div className="flex justify-end gap-2 border-t border-line pt-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-9 cursor-pointer rounded-none border-line px-4 text-[12.5px] font-medium"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!canSubmit}
            className="h-9 cursor-pointer rounded-none bg-ink px-5 text-[12.5px] font-semibold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            Sign &amp; Finalize Agreement
          </Button>
        </div>
      </form>
    </ModalDialog>
  );
}
