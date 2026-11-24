"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Copy, FileEdit, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Agreement } from "@/types/agreement.types";
import { isAgreementEditable } from "./agreement-list.config";

interface AgreementRowActionsProps {
  agreement: Agreement;
}

export function AgreementRowActions({ agreement }: AgreementRowActionsProps) {
  const [copied, setCopied] = useState(false);
  const editable = isAgreementEditable(agreement.status);
  const editLabel =
    agreement.status === "Changes Requested" ? "Revise clauses" : "Edit clauses";

  function handleCopyReference() {
    if (!navigator?.clipboard) return;
    void navigator.clipboard.writeText(agreement.referenceNumber);
    setCopied(true);
    toast.success(`Copied ${agreement.referenceNumber}`);
    setTimeout(() => setCopied(false), 2000);
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
        <DropdownMenuContent align="end" className="w-48 rounded-none">
          {editable && (
            <DropdownMenuItem
              className="cursor-pointer py-2 text-sm font-medium"
              render={<Link href={`/landlord/agreements/${agreement.id}/edit`} />}
            >
              <FileEdit className="size-4 text-faint" />
              <span>{editLabel}</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="cursor-pointer py-2 text-sm font-medium"
            onClick={handleCopyReference}
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
