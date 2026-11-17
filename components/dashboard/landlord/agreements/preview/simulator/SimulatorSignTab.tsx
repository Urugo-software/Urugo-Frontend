"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface Props {
  referenceNumber: string;
  defaultSignerName: string;
  onClose: () => void;
  onSign: (signerName: string) => void;
}

export function SimulatorSignTab({
  referenceNumber,
  defaultSignerName,
  onClose,
  onSign,
}: Props) {
  const [signerName, setSignerName] = useState(defaultSignerName);

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName.trim()) {
      toast.error("Please enter your legal name to endorse.");
      return;
    }

    onSign(signerName.trim());
    toast.success("Agreement signed successfully as Renter!");
    onClose();
  };

  return (
    <form onSubmit={handleSign} className="space-y-4 text-[12.5px]">
      <div className="border border-line bg-surface/50 p-4 text-[13px] text-body space-y-2">
        <div className="flex items-center gap-2 font-semibold text-ink">
          <CheckCircle2 className="size-4 text-ink" />
          <span>Legal Acknowledgment</span>
        </div>
        <p className="leading-relaxed">
          By typing your legal name and confirming below, you acknowledge having read and accepted all covenants of Lease Agreement <strong>{referenceNumber}</strong>.
        </p>
      </div>

      <div>
        <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
          Full Legal Name as Signature
        </label>
        <input
          type="text"
          value={signerName}
          onChange={(e) => setSignerName(e.target.value)}
          className="w-full border border-line bg-white px-3 py-2 text-sm font-semibold text-ink focus:border-ink focus:outline-none"
        />
      </div>

      <div className="pt-2 flex justify-end gap-2 border-t border-line">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="rounded-none border-line text-[12.5px] font-medium h-8.5 px-4"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="rounded-none bg-ink text-white hover:bg-black text-[12.5px] font-semibold h-8.5 px-4 cursor-pointer"
        >
          Sign & Endorse Agreement
        </Button>
      </div>
    </form>
  );
}
