"use client";

import { AgreementParty, AgreementSignature } from "@/types/agreement.types";
import { formatDate } from "@/utils/agreement-utils";
import { Check } from "lucide-react";

interface Props {
  party: AgreementParty;
  signature?: AgreementSignature;
  roleTitleEn: string;
  roleTitleRw: string;
  isKinyarwanda: boolean;
}

export function DocumentPartySignatureBlock({
  party,
  signature,
  roleTitleEn,
  roleTitleRw,
  isKinyarwanda,
}: Props) {
  const roleTitle = isKinyarwanda ? roleTitleRw : roleTitleEn;

  return (
    <div className="space-y-3 break-inside-avoid text-[12.5px]">
      <span className="font-bold uppercase tracking-wider text-ink text-[12px] block">
        {roleTitle}
      </span>

      {signature ? (
        /* Actual Signed Record */
        <div className="space-y-2 pt-2">
          <div className="border-b border-zinc-800 pb-1 flex items-baseline justify-between">
            <span className="font-serif italic text-base sm:text-lg text-ink font-semibold">
              {signature.signedBy}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-blue-700">
              <Check className="size-3" />
              <span>Signed</span>
            </span>
          </div>

          <div className="text-[12px] text-body space-y-0.5">
            <p>
              <span className="text-faint">{isKinyarwanda ? "Amazina: " : "Name: "}</span>
              <strong className="text-ink font-medium">{party.name}</strong>
            </p>
            <p className="font-mono text-[11.5px]">
              <span className="text-faint">{isKinyarwanda ? "Indangamuntu: " : "National ID: "}</span>
              <span className="text-ink">{party.nationalId}</span>
            </p>
            <p className="font-mono text-[11.5px]">
              <span className="text-faint">{isKinyarwanda ? "Itariki: " : "Date: "}</span>
              <span className="text-ink">{formatDate(signature.signedAt)}</span>
            </p>
            {signature.ipAddress && (
              <p className="font-mono text-[11px] text-faint">
                IP: {signature.ipAddress} &middot; Electronic Record
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Pending Blank Signature Area for Execution */
        <div className="space-y-2 pt-6">
          <div className="border-b border-zinc-400 border-dashed pb-0.5">
            <span className="text-faint text-[11px] italic">
              {isKinyarwanda ? "Umukono wa " + roleTitle : "Signature of " + roleTitle}
            </span>
          </div>

          <div className="text-[12px] text-body space-y-1">
            <p>
              <span className="text-faint">{isKinyarwanda ? "Amazina: " : "Name: "}</span>
              <strong className="text-ink font-medium">{party.name}</strong>
            </p>
            <p className="font-mono text-[11.5px]">
              <span className="text-faint">{isKinyarwanda ? "Indangamuntu: " : "National ID: "}</span>
              <span className="text-ink">{party.nationalId}</span>
            </p>
            <p>
              <span className="text-faint">{isKinyarwanda ? "Itariki: " : "Date: "}</span>
              <span className="text-zinc-400">____________________</span>
            </p>
            <span className="inline-block font-mono text-[11px] text-faint italic">
              {isKinyarwanda ? "[Bitegereje umukono]" : "[Awaiting Signature]"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
