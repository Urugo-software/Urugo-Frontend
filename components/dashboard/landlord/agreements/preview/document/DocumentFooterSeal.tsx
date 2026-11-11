"use client";

import { ShieldCheck } from "lucide-react";

interface Props {
  agreementId: string;
}

export function DocumentFooterSeal({ agreementId }: Props) {
  return (
    <div className="mt-12 pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between text-[12.5px] text-faint font-mono">
      <div className="flex items-center gap-1.5">
        <ShieldCheck className="size-3.5 text-faint" />
        <span>Urugo Tenancy Registry &middot; Cryptographic Verification Seal</span>
      </div>
      <p className="mt-1 sm:mt-0 text-[12.5px]">Doc ID: {agreementId}</p>
    </div>
  );
}
