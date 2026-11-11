"use client";

import { useState } from "react";
import { X, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Agreement } from "@/types/agreement.types";
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
              <h3 className="text-sm font-bold text-ink">
                Sign Lease Agreement
              </h3>
              <p className="text-xs text-body">
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
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="border border-line bg-surface/40 p-4 text-xs text-body space-y-2">
            <div className="flex items-center gap-2 font-semibold text-ink">
              <CheckCircle2 className="size-4 text-ink" />
              <span>Landlord Electronic Endorsement</span>
            </div>
            <p className="leading-relaxed">
              By confirming below, you legally execute Residential Tenancy Agreement{" "}
              <strong className="text-ink">{agreement.referenceNumber}</strong> with{" "}
              <strong className="text-ink">{agreement.renter.name}</strong> for{" "}
              <strong className="text-ink">{agreement.property.name} (Unit {agreement.property.unitNumber})</strong>.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-faint mb-1.5">
              Full Legal Name
            </label>
            <input
              type="text"
              required
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              className="w-full border border-line bg-white px-3 py-2 text-sm font-semibold text-ink focus:border-ink focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-faint font-mono">
              National ID: {agreement.landlord.nationalId}
            </p>
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-body">
            <input
              type="checkbox"
              checked={hasAgreed}
              onChange={(e) => setHasAgreed(e.target.checked)}
              className="mt-0.5 size-4 rounded-none border-line text-ink focus:ring-ink"
            />
            <span>
              I confirm that I have reviewed the agreement articles, terms, and
              payment schedule and agree to digitally endorse this document.
            </span>
          </label>

          <div className="pt-3 border-t border-line flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-none border-line text-xs font-medium h-9 px-4 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!hasAgreed || !signerName.trim()}
              className="rounded-none bg-ink text-white hover:bg-black text-xs font-semibold h-9 px-5 cursor-pointer disabled:opacity-50"
            >
              Confirm & Endorse Agreement
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
