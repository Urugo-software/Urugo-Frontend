"use client";

import Link from "next/link";
import { FileEdit, PenTool } from "lucide-react";
import { Agreement } from "@/types/agreement.types";
import { AgreementStatusBadge } from "../../AgreementStatusBadge";
import { Button } from "@/components/ui/button";

interface Props {
  agreement: Agreement;
  onOpenLandlordSign?: () => void;
}

export function SidebarStatusCard({
  agreement,
  onOpenLandlordSign,
}: Props) {
  const isAwaitingLandlord = agreement.status === "Awaiting Landlord Signature";
  const isChangesRequested = agreement.status === "Changes Requested";
  const isDraft =
    agreement.status === "Draft" || agreement.status === "Ready for Review";
  const isSigned = agreement.status === "Signed";

  return (
    <div className="border border-line bg-white p-5 space-y-3.5 text-[12.5px]">
      <div className="flex items-center justify-between pb-3 border-b border-line">
        <span className="font-semibold uppercase tracking-wider text-faint">
          Agreement Status
        </span>
        <AgreementStatusBadge status={agreement.status} />
      </div>

      <div className="space-y-2">
        <span className="font-semibold uppercase tracking-wider text-faint block">
          Next Action
        </span>

        {isAwaitingLandlord && (
          <div className="space-y-2.5">
            <p className="text-[13px] text-body leading-relaxed">
              The renter has signed. Your digital endorsement is required to
              finalize and execute this contract.
            </p>
            {onOpenLandlordSign && (
              <Button
                type="button"
                onClick={onOpenLandlordSign}
                className="w-full rounded-none bg-ink text-white hover:bg-black text-[12.5px] font-semibold h-9 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PenTool className="size-3.5" />
                <span>Sign Agreement Now</span>
              </Button>
            )}
          </div>
        )}

        {isChangesRequested && (
          <div className="space-y-2.5">
            <p className="text-[13px] text-body leading-relaxed">
              The renter proposed changes to{" "}
              <strong className="text-ink">
                {agreement.changeRequests?.length ?? 1} clause(s)
              </strong>
              . Review their notes and update the clauses.
            </p>
            <Link
              href={`/landlord/agreements/${agreement.id}/edit`}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-none bg-ink text-white hover:bg-black text-[12.5px] font-semibold h-9 cursor-pointer transition-colors"
            >
              <FileEdit className="size-3.5" />
              <span>Open Clause Editor</span>
            </Link>
          </div>
        )}

        {isDraft && (
          <div className="space-y-2.5">
            <p className="text-[13px] text-body leading-relaxed">
              This agreement is currently in draft. You can customize the 18
              statutory clauses before sending to the renter.
            </p>
            <Link
              href={`/landlord/agreements/${agreement.id}/edit`}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-none bg-ink text-white hover:bg-black text-[12.5px] font-semibold h-9 cursor-pointer transition-colors"
            >
              <FileEdit className="size-3.5" />
              <span>Edit Clauses</span>
            </Link>
          </div>
        )}

        {agreement.status === "Sent" && (
          <p className="text-[13px] text-body leading-relaxed">
            Agreement sent to{" "}
            <strong className="text-ink">{agreement.renter.name}</strong>.
            Awaiting their review.
          </p>
        )}

        {agreement.status === "Awaiting Renter Signature" && (
          <p className="text-[13px] text-body leading-relaxed">
            Waiting for{" "}
            <strong className="text-ink">{agreement.renter.name}</strong> to
            sign.
          </p>
        )}

        {isSigned && (
          <div className="space-y-1">
            <p className="text-[13px] text-body leading-relaxed">
              Both parties have signed. This agreement is legally active and
              recorded.
            </p>
            <span className="font-mono text-faint block">
              Ref: {agreement.referenceNumber} &middot; v{agreement.version}.0
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
