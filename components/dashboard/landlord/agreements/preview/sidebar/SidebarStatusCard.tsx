"use client";

import Link from "next/link";
import { FileEdit, PenTool, RefreshCw, Send } from "lucide-react";
import { Agreement } from "@/types/agreement.types";
import { AgreementStatusBadge } from "../../AgreementStatusBadge";
import { Button } from "@/components/ui/button";

interface Props {
  agreement: Agreement;
  onOpenLandlordSign?: () => void;
  onSendDraft?: () => void;
  onCreateRenewalDraft?: () => void;
}

export function SidebarStatusCard({
  agreement,
  onOpenLandlordSign,
  onSendDraft,
  onCreateRenewalDraft,
}: Props) {
  const { status } = agreement;

  return (
    <div className="space-y-3.5 border border-line bg-white p-5 text-[12.5px]">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <span className="font-semibold uppercase tracking-wider text-faint">
          Agreement Status
        </span>
        <AgreementStatusBadge status={status} />
      </div>

      <div className="space-y-2">
        <span className="block font-semibold uppercase tracking-wider text-faint">
          Next Action
        </span>

        {status === "Awaiting Landlord Signature" && (
          <div className="space-y-2.5">
            <p className="text-[13px] leading-relaxed text-body">
              The renter has signed. Your digital endorsement is required to
              finalize and execute this contract.
            </p>
            {onOpenLandlordSign && (
              <Button
                type="button"
                onClick={onOpenLandlordSign}
                className="flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-none bg-ink text-[12.5px] font-semibold text-white hover:bg-black"
              >
                <PenTool className="size-3.5" />
                <span>Sign Agreement Now</span>
              </Button>
            )}
          </div>
        )}

        {status === "Changes Requested" && (
          <div className="space-y-2.5">
            <p className="text-[13px] leading-relaxed text-body">
              The renter proposed changes to{" "}
              <strong className="text-ink">
                {agreement.changeRequests?.length ?? 1} clause(s)
              </strong>
              . Review their notes and update the clauses.
            </p>
            <Link
              href={`/landlord/agreements/${agreement.id}/edit`}
              className="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-none bg-ink text-[12.5px] font-semibold text-white transition-colors hover:bg-black"
            >
              <FileEdit className="size-3.5" />
              <span>Open Clause Editor</span>
            </Link>
          </div>
        )}

        {(status === "Draft" || status === "Ready for Review") && (
          <div className="space-y-2.5">
            <p className="text-[13px] leading-relaxed text-body">
              This agreement is currently in draft. Customize the statutory
              clauses or send it directly to the renter for review.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href={`/landlord/agreements/${agreement.id}/edit`}
                className="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-none bg-ink text-[12.5px] font-semibold text-white transition-colors hover:bg-black"
              >
                <FileEdit className="size-3.5" />
                <span>Edit Clauses</span>
              </Link>
              {onSendDraft && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onSendDraft}
                  className="flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-none border-line text-[12.5px] font-semibold text-ink hover:bg-surface"
                >
                  <Send className="size-3.5 text-faint" />
                  <span>Send to Renter</span>
                </Button>
              )}
            </div>
          </div>
        )}

        {(status === "Sent" || status === "Viewed") && (
          <p className="text-[13px] leading-relaxed text-body">
            {status === "Viewed" ? (
              <>
                <strong className="text-ink">{agreement.renter.name}</strong>{" "}
                has opened this agreement. Awaiting their approval or requested
                revisions.
              </>
            ) : (
              <>
                Agreement sent to{" "}
                <strong className="text-ink">{agreement.renter.name}</strong>.
                Awaiting their review.
              </>
            )}
          </p>
        )}

        {status === "Awaiting Renter Signature" && (
          <p className="text-[13px] leading-relaxed text-body">
            Waiting for{" "}
            <strong className="text-ink">{agreement.renter.name}</strong> to
            add their electronic signature.
          </p>
        )}

        {status === "Signed" && (
          <div className="space-y-2.5">
            <p className="text-[13px] leading-relaxed text-body">
              Both parties have signed. This agreement is active and recorded.
            </p>
            <span className="block font-mono text-faint">
              Ref: {agreement.referenceNumber} &middot; v{agreement.version}.0
            </span>
            {onCreateRenewalDraft && (
              <Button
                type="button"
                variant="outline"
                onClick={onCreateRenewalDraft}
                className="flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-none border-line text-[12.5px] font-semibold text-ink hover:bg-surface"
              >
                <RefreshCw className="size-3.5 text-faint" />
                <span>Create Renewal Draft</span>
              </Button>
            )}
          </div>
        )}

        {status === "Declined" && (
          <p className="text-[13px] leading-relaxed text-body">
            The renter declined this agreement. Prepare a revised draft if you
            renegotiate terms.
          </p>
        )}

        {status === "Expired" && (
          <p className="text-[13px] leading-relaxed text-body">
            This lease agreement has reached its expiration date. Create a new
            agreement if the tenancy continues.
          </p>
        )}

        {status === "Superseded" && (
          <p className="text-[13px] leading-relaxed text-body">
            This version has been replaced by a newer lease agreement version.
          </p>
        )}

        {status === "Cancelled" && (
          <p className="text-[13px] leading-relaxed text-body">
            This agreement was cancelled and is archived for record keeping.
          </p>
        )}
      </div>
    </div>
  );
}
