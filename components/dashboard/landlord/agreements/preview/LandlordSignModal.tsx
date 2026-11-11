"use client";

import { useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Agreement } from "@/types/agreement.types";
import { SignModalLegalNotice } from "./modal/SignModalLegalNotice";
import toast from "react-hot-toast";

interface Props {
  agreement: Agreement;
  isOpen: boolean;
  onClose: () => void;
  onSign: (signerName: string) => void;
}

export function LandlordSignModal({
  agreement,
  isOpen,
  onClose,
  onSign,
}: Props) {
  const [signerName, setSignerName] = useState(agreement.landlord.name);
  const [hasAgreed, setHasAgreed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName.trim()) {
      toast.error("Please enter your legal name to endorse.");
      return;
    }
    if (!hasAgreed) {
      toast.error("Please confirm your acknowledgment of the agreement terms.");
      return;
    }

    onSign(signerName.trim());
    toast.success("Agreement digitally signed as Landlord!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg border border-line bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-6 py-4 bg-surface/40">
          <div className="flex items-center gap-2">
            <div className="grid size-7 place-items-center bg-ink text-white">
              <ShieldCheck className="size-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-[15px] font-bold text-ink">
                Sign Lease Agreement
              </h3>
              <p className="text-[12.5px] text-body">
                Ref: {agreement.referenceNumber}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-faint hover:text-ink cursor-pointer p-1"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-[12.5px]">
          <SignModalLegalNotice
            referenceNumber={agreement.referenceNumber}
            renterName={agreement.renter.name}
            propertyName={agreement.property.name}
            unitNumber={agreement.property.unitNumber}
          />

          <div>
            <label className="block text-[12.5px] font-semibold uppercase tracking-wider text-faint mb-1.5">
              Full Legal Name
            </label>
            <input
              type="text"
              required
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              className="w-full border border-line bg-white px-3 py-2 text-sm font-semibold text-ink focus:border-ink focus:outline-none"
            />
            <p className="mt-1 text-[12.5px] text-faint font-mono">
              National ID: {agreement.landlord.nationalId}
            </p>
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasAgreed}
              onChange={(e) => setHasAgreed(e.target.checked)}
              className="mt-1 rounded-none border-line text-ink focus:ring-ink"
            />
            <span className="text-[12.5px] text-body leading-relaxed">
              I attest that the terms and covenants contained in this lease agreement accurately represent the agreed terms under Rwandan residential tenancy law.
            </span>
          </label>

          <div className="pt-2 flex justify-end gap-2 border-t border-line">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-none border-line text-[12.5px] font-medium h-9 px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-none bg-ink text-white hover:bg-black text-[12.5px] font-semibold h-9 px-5"
            >
              Sign & Finalize Agreement
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
