"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("landlord.agreements.preview.simulator");
  const tSign = useTranslations("landlord.agreements.preview.signModal");
  const tCommon = useTranslations("common");
  const [signerName, setSignerName] = useState(defaultSignerName);

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName.trim()) {
      toast.error(tSign("nameRequired"));
      return;
    }

    onSign(signerName.trim());
    toast.success(t("renterSignedSuccess"));
    onClose();
  };

  return (
    <form onSubmit={handleSign} className="space-y-4 text-[12.5px]">
      <div className="space-y-2 border border-line bg-surface/50 p-4 text-[13px] text-body">
        <div className="flex items-center gap-2 font-semibold text-ink">
          <CheckCircle2 className="size-4 text-ink" />
          <span>{t("legalAckTitle")}</span>
        </div>
        <p className="leading-relaxed">
          {t.rich("legalAckBody", {
            ref: referenceNumber,
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      </div>

      <div>
        <label className="mb-1.5 block text-[12.5px] font-semibold text-ink">
          {t("fullNameSignature")}
        </label>
        <input
          type="text"
          value={signerName}
          onChange={(e) => setSignerName(e.target.value)}
          className="w-full border border-line bg-white px-3 py-2 text-sm font-semibold text-ink focus:border-ink focus:outline-none"
        />
      </div>

      <div className="flex justify-end gap-2 border-t border-line pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="h-8.5 rounded-none border-line px-4 text-[12.5px] font-medium"
        >
          {tCommon("actions.cancel")}
        </Button>
        <Button
          type="submit"
          className="h-8.5 cursor-pointer rounded-none bg-ink px-4 text-[12.5px] font-semibold text-white hover:bg-black"
        >
          {t("signSubmit")}
        </Button>
      </div>
    </form>
  );
}
