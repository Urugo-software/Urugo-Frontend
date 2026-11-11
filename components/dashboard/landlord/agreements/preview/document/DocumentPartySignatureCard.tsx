"use client";

import { AgreementParty, AgreementSignature } from "@/types/agreement.types";
import { formatDate } from "@/utils/agreement-utils";
import { CheckCircle2 } from "lucide-react";

interface Props {
  party: AgreementParty;
  signature?: AgreementSignature;
  roleLabel: string;
  pendingText: string;
  signedText: string;
}

export function DocumentPartySignatureCard({
  party,
  signature,
  roleLabel,
  pendingText,
  signedText,
}: Props) {
  return (
    <div className="border border-line p-4 min-h-36 flex flex-col justify-between bg-surface/20">
      <div>
        <span className="text-[12.5px] font-bold uppercase tracking-wider text-faint block">
          {roleLabel}
        </span>
        <p className="font-bold text-[15px] text-ink mt-1">{party.name}</p>
      </div>

      <div className="pt-4 border-t border-line mt-4">
        {signature ? (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
              <CheckCircle2 className="size-3.5 text-emerald-600" />
              <span>{signedText}</span>
            </div>
            <p className="text-[12.5px] text-faint font-mono">
              Signed: {formatDate(signature.signedAt)}
            </p>
            {signature.ipAddress && (
              <p className="text-[12.5px] text-faint font-mono">
                IP: {signature.ipAddress} &middot; Verified
              </p>
            )}
          </div>
        ) : (
          <div className="text-[12.5px] text-faint italic">{pendingText}</div>
        )}
      </div>
    </div>
  );
}
