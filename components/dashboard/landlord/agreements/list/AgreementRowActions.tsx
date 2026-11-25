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
import { useTranslations } from "next-intl";
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
  const t = useTranslations("landlord.agreements.list");
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const updateAgreementStatus = useLandlordWorkspace(
    (s) => s.updateAgreementStatus,
  );
  const upsertAgreement = useLandlordWorkspace((s) => s.upsertAgreement);

  const editable = isAgreementEditable(agreement.status);
  const cancellable = CANCELLABLE_STATUSES.has(agreement.status);
  const editLabel =
    agreement.status === "Changes Requested"
      ? t("actions.reviseClauses")
      : t("actions.editClauses");

  async function handleCopyReference() {
    if (!navigator?.clipboard) {
      toast.error(t("toasts.clipboardUnavailable"));
      return;
    }
    try {
      await navigator.clipboard.writeText(agreement.referenceNumber);
      setCopied(true);
      toast.success(t("toasts.copiedRef", { ref: agreement.referenceNumber }));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t("toasts.copyFailed"));
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
    toast.success(t("toasts.renewalCreated"));
    router.push(`/landlord/agreements/${newId}/edit`);
  }

  function handleCancel() {
    updateAgreementStatus(agreement.id, "Cancelled");
    toast.success(t("toasts.cancelled", { ref: agreement.referenceNumber }));
  }

  return (
    <div className="inline-flex items-center justify-end gap-3">
      <Link
        href={`/landlord/agreements/${agreement.id}`}
        className="text-[14.5px] font-semibold text-brand hover:underline"
      >
        {t("actions.view")}
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={t("actions.moreActionsAria", {
                ref: agreement.referenceNumber,
              })}
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
              <span>{t("actions.createRenewalDraft")}</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="cursor-pointer py-2 text-sm font-medium"
            onClick={() => void handleCopyReference()}
          >
            {copied ? (
              <>
                <Check className="size-4 text-success" />
                <span>{t("actions.copiedReference")}</span>
              </>
            ) : (
              <>
                <Copy className="size-4 text-faint" />
                <span>{t("actions.copyReference")}</span>
              </>
            )}
          </DropdownMenuItem>
          {cancellable && (
            <DropdownMenuItem
              className="cursor-pointer py-2 text-sm font-medium text-red-700"
              onClick={handleCancel}
            >
              <XCircle className="size-4 text-red-600" />
              <span>{t("actions.cancelAgreement")}</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
