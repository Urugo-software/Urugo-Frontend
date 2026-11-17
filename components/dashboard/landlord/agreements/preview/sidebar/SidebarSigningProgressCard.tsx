"use client";

import { CheckCircle2, Clock, PenTool } from "lucide-react";
import { AgreementParty, AgreementSignature } from "@/types/agreement.types";
import { formatDate } from "@/utils/agreement-utils";

interface Props {
  renter: AgreementParty;
  landlord: AgreementParty;
  renterSignature?: AgreementSignature;
  landlordSignature?: AgreementSignature;
  isAwaitingLandlord: boolean;
  onOpenLandlordSign?: () => void;
}

export function SidebarSigningProgressCard({
  renter,
  landlord,
  renterSignature,
  landlordSignature,
  isAwaitingLandlord,
  onOpenLandlordSign,
}: Props) {
  return (
    <div className="border border-line bg-white p-5 space-y-3.5 text-[12.5px]">
      <h3 className="font-semibold uppercase tracking-wider text-faint border-b border-line pb-2.5">
        Signing Progress
      </h3>

      <div className="space-y-3 text-[13px]">
        {/* Renter Signature Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5">
            <span className="font-semibold text-ink block text-[13px]">
              {renter.name}
            </span>
            <span className="text-[12.5px] text-faint">Renter (Lessee)</span>
          </div>
          <div className="text-right">
            {renterSignature ? (
              <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-emerald-700">
                <CheckCircle2 className="size-3.5 shrink-0" />
                <span>Signed {formatDate(renterSignature.signedAt)}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-amber-700">
                <Clock className="size-3.5 shrink-0" />
                <span>Pending</span>
              </span>
            )}
          </div>
        </div>

        {/* Landlord Signature Row */}
        <div className="flex items-start justify-between gap-3 pt-2.5 border-t border-line/60">
          <div className="space-y-0.5">
            <span className="font-semibold text-ink block text-[13px]">
              {landlord.name}
            </span>
            <span className="text-[12.5px] text-faint">Landlord (Lessor)</span>
          </div>
          <div className="text-right">
            {landlordSignature ? (
              <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-emerald-700">
                <CheckCircle2 className="size-3.5 shrink-0" />
                <span>Signed {formatDate(landlordSignature.signedAt)}</span>
              </span>
            ) : isAwaitingLandlord ? (
              <button
                type="button"
                onClick={onOpenLandlordSign}
                className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-amber-800 underline hover:text-black cursor-pointer"
              >
                <PenTool className="size-3.5 shrink-0" />
                <span>Sign Now</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-faint">
                <Clock className="size-3.5 shrink-0" />
                <span>Pending</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
