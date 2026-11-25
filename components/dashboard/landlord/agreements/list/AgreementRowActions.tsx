"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Check,
  Copy,
  FileEdit,
  MoreHorizontal,
  RefreshCw,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { Agreement } from "@/types/agreement.types";
import { createSafeId } from "@/utils/format";
import { isAgreementEditable } from "./agreement-list.config";

interface AgreementRowActionsProps {
  agreement: Agreement;
}

const CANCELLABLE_STATUSES = new Set([
  "Draft",
  "Ready for Review",
  "Sent",
  "Viewed",
  "Changes Requested",
]);

export function AgreementRowActions({ agreement }: AgreementRowActionsProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const updateAgreementStatus = useLandlordWorkspace(
    (s) => s.updateAgreementStatus,
  );
  const upsertAgreement = useLandlordWorkspace((s) => s.upsertAgreement);

  const editable = isAgreementEditable(agreement.status);
  const cancellable = CANCELLABLE_STATUSES.has(agreement.status);
  const editLabel =
    agreement.status === "Changes Requested" ? "Revise clauses" : "Edit clauses";

  async function handleCopyReference() {
    if (!navigator?.clipboard) {
      toast.error("Clipboard unavailable in this browser.");
      return;
    }
    try {
      await navigator.clipboard.writeText(agreement.referenceNumber);
      setCopied(true);
      toast.success(`Copied ${agreement.referenceNumber}`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy reference number.");
    }
  }

  function handleRenewAgreement() {
    const now = new Date().toISOString();
    const newId = createSafeId("agr");
    upsertAgreement({
      ...agreement,
      id: newId,
      referenceNumber: `${agreement.referenceNumber.replace(/-R\d+$/, "")}-R${agreement.version + 1}`,
      status: "Draft",
      version: agreement.version + 1,
      createdAt: now,
      updatedAt: now,
      renterSignature: undefined,
      landlordSignature: undefined,
      changeRequests: [],
      supersedes: agreement.id,
      tenancyStartDate: agreement.tenancyEndDate || now.slice(0, 10),
    });
    toast.success("Renewal draft created.");
    router.push(`/landlord/agreements/${newId}/edit`);
  }

  function handleCancel() {
    updateAgreementStatus(agreement.id, "Cancelled");
    toast.success(`Agreement ${agreement.referenceNumber} cancelled.`);
  }

  return (
    <div className="inline-flex items-center justify-end gap-3">
      <Link
        href={`/landlord/agreements/${agreement.id}`}
        className="text-[14.5px] font-semibold text-brand hover:underline"
      >
        View
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={`More actions for ${agreement.referenceNumber}`}
              className="size-9 cursor-pointer rounded-none border-line bg-white text-body hover:bg-surface hover:text-ink"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="w-52 rounded-none">
          {editable && (
            <DropdownMenuItem
              className="cursor-pointer py-2 text-sm font-medium"
              render={
                <Link href={`/landlord/agreements/${agreement.id}/edit`} />
              }
            >
              <FileEdit className="size-4 text-faint" />
              <span>{editLabel}</span>
            </DropdownMenuItem>
          )}
          {agreement.status === "Signed" && (
            <DropdownMenuItem
              className="cursor-pointer py-2 text-sm font-medium"
              onClick={handleRenewAgreement}
            >
              <RefreshCw className="size-4 text-faint" />
              <span>Create renewal draft</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="cursor-pointer py-2 text-sm font-medium"
            onClick={() => void handleCopyReference()}
          >
            {copied ? (
              <>
                <Check className="size-4 text-success" />
                <span>Copied reference</span>
              </>
            ) : (
              <>
                <Copy className="size-4 text-faint" />
                <span>Copy reference</span>
              </>
            )}
          </DropdownMenuItem>
          {cancellable && (
            <DropdownMenuItem
              className="cursor-pointer py-2 text-sm font-medium text-red-700"
              onClick={handleCancel}
            >
              <XCircle className="size-4 text-red-600" />
              <span>Cancel agreement</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
