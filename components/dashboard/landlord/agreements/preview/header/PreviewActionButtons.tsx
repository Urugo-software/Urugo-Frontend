"use client";

import Link from "next/link";
import { Printer, FileEdit, PenTool, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgreementStatus } from "@/types/agreement.types";

interface Props {
  agreementId: string;
  status: AgreementStatus;
  onOpenLandlordSign?: () => void;
  onOpenRenterSimulator?: () => void;
}

export function PreviewActionButtons({
  agreementId,
  status,
  onOpenLandlordSign,
  onOpenRenterSimulator,
}: Props) {
  const isEditable =
    status === "Draft" ||
    status === "Ready for Review" ||
    status === "Changes Requested";

  const isAwaitingLandlord = status === "Awaiting Landlord Signature";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Print Action */}
      <Button
        type="button"
        variant="outline"
        onClick={() => window.print()}
        className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none border-line bg-white px-3 text-[12.5px] font-medium text-ink hover:bg-surface transition-colors"
      >
        <Printer className="size-3.5 text-faint" />
        <span>Print / PDF</span>
      </Button>

      {/* Landlord Sign Action */}
      {isAwaitingLandlord && onOpenLandlordSign && (
        <Button
          type="button"
          onClick={onOpenLandlordSign}
          className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none bg-ink px-4 text-[12.5px] font-semibold text-white hover:bg-black transition-colors"
        >
          <PenTool className="size-3.5" />
          <span>Sign Agreement</span>
        </Button>
      )}

      {/* Edit Clauses Action */}
      {isEditable && (
        <Link
          href={`/landlord/agreements/${agreementId}/edit`}
          className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none bg-ink px-4 text-[12.5px] font-semibold text-white hover:bg-black transition-colors"
        >
          <FileEdit className="size-3.5" />
          <span>
            {status === "Changes Requested"
              ? "Revise Clauses"
              : "Edit Clauses"}
          </span>
        </Link>
      )}

      {/* Renter Simulation Trigger */}
      {onOpenRenterSimulator && (
        <Button
          type="button"
          variant="outline"
          onClick={onOpenRenterSimulator}
          className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none border-dashed border-line bg-surface/50 px-3 text-[12.5px] font-medium text-faint hover:text-ink hover:bg-surface transition-colors"
          title="Test renter actions (review, request changes, or sign)"
        >
          <UserCheck className="size-3.5" />
          <span>Simulate Renter</span>
        </Button>
      )}
    </div>
  );
}
