"use client";

import Link from "next/link";
import {
  FileEdit,
  PenTool,
  Printer,
  RefreshCw,
  Send,
  UserCheck,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgreementStatus } from "@/types/agreement.types";

interface Props {
  agreementId: string;
  status: AgreementStatus;
  onOpenLandlordSign?: () => void;
  onSendDraft?: () => void;
  onCancelAgreement?: () => void;
  onCreateRenewalDraft?: () => void;
  onOpenRenterSimulator?: () => void;
}

export function PreviewActionButtons({
  agreementId,
  status,
  onOpenLandlordSign,
  onSendDraft,
  onCancelAgreement,
  onCreateRenewalDraft,
  onOpenRenterSimulator,
}: Props) {
  const isDraft = status === "Draft" || status === "Ready for Review";
  const isEditable = isDraft || status === "Changes Requested";
  const isAwaitingLandlord = status === "Awaiting Landlord Signature";
  const isCancellable =
    isEditable || status === "Sent" || status === "Viewed";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => window.print()}
        className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none border-line bg-white px-3 text-[12.5px] font-medium text-ink transition-colors hover:bg-surface"
      >
        <Printer className="size-3.5 text-faint" />
        <span>Print / PDF</span>
      </Button>

      {isAwaitingLandlord && onOpenLandlordSign && (
        <Button
          type="button"
          onClick={onOpenLandlordSign}
          className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none bg-ink px-4 text-[12.5px] font-semibold text-white transition-colors hover:bg-black"
        >
          <PenTool className="size-3.5" />
          <span>Sign Agreement</span>
        </Button>
      )}

      {isDraft && onSendDraft && (
        <Button
          type="button"
          variant="outline"
          onClick={onSendDraft}
          className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none border-line bg-white px-3 text-[12.5px] font-semibold text-ink transition-colors hover:bg-surface"
        >
          <Send className="size-3.5 text-faint" />
          <span>Send to Renter</span>
        </Button>
      )}

      {isEditable && (
        <Link
          href={`/landlord/agreements/${agreementId}/edit`}
          className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none bg-ink px-4 text-[12.5px] font-semibold text-white transition-colors hover:bg-black"
        >
          <FileEdit className="size-3.5" />
          <span>
            {status === "Changes Requested" ? "Revise Clauses" : "Edit Clauses"}
          </span>
        </Link>
      )}

      {status === "Signed" && onCreateRenewalDraft && (
        <Button
          type="button"
          variant="outline"
          onClick={onCreateRenewalDraft}
          className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none border-line bg-white px-3 text-[12.5px] font-semibold text-ink transition-colors hover:bg-surface"
        >
          <RefreshCw className="size-3.5 text-faint" />
          <span>Renew Agreement</span>
        </Button>
      )}

      {isCancellable && onCancelAgreement && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancelAgreement}
          className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none border-line bg-white px-3 text-[12.5px] font-medium text-red-700 transition-colors hover:border-red-300 hover:bg-red-50"
        >
          <XCircle className="size-3.5" />
          <span>Cancel</span>
        </Button>
      )}

      {onOpenRenterSimulator && (
        <Button
          type="button"
          variant="outline"
          onClick={onOpenRenterSimulator}
          className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none border-dashed border-line bg-surface/50 px-3 text-[12.5px] font-medium text-faint transition-colors hover:bg-surface hover:text-ink"
          title="Development only: test renter review or signing"
        >
          <UserCheck className="size-3.5" />
          <span>Simulate Renter</span>
        </Button>
      )}
    </div>
  );
}
