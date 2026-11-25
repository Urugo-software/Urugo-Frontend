"use client";

import Link from "next/link";
import { FileEdit, PenTool, RefreshCw, Send } from "lucide-react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("landlord.agreements.preview.sidebar");
  const tActions = useTranslations("landlord.agreements.preview.actions");
  const tEditor = useTranslations("landlord.agreements.editor");
  const { status } = agreement;

  return (
    <div className="space-y-3.5 border border-line bg-white p-5 text-[12.5px]">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <span className="font-semibold uppercase tracking-wider text-faint">
          {t("agreementStatus")}
        </span>
        <AgreementStatusBadge status={status} />
      </div>

      <div className="space-y-2">
        <span className="block font-semibold uppercase tracking-wider text-faint">
          {t("nextAction")}
        </span>

        {status === "Awaiting Landlord Signature" && (
          <div className="space-y-2.5">
            <p className="text-[13px] leading-relaxed text-body">
              {t("awaitingLandlordDesc")}
            </p>
            {onOpenLandlordSign && (
              <Button
                type="button"
                onClick={onOpenLandlordSign}
                className="flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-none bg-ink text-[12.5px] font-semibold text-white hover:bg-black"
              >
                <PenTool className="size-3.5" />
                <span>{t("signAgreementNow")}</span>
              </Button>
            )}
          </div>
        )}

        {status === "Changes Requested" && (
          <div className="space-y-2.5">
            <p className="text-[13px] leading-relaxed text-body">
              {t.rich("changesRequestedDesc", {
                count: agreement.changeRequests?.length ?? 1,
                strong: (chunks) => (
                  <strong className="text-ink">{chunks}</strong>
                ),
              })}
            </p>
            <Link
              href={`/landlord/agreements/${agreement.id}/edit`}
              className="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-none bg-ink text-[12.5px] font-semibold text-white transition-colors hover:bg-black"
            >
              <FileEdit className="size-3.5" />
              <span>{t("openClauseEditor")}</span>
            </Link>
          </div>
        )}

        {(status === "Draft" || status === "Ready for Review") && (
          <div className="space-y-2.5">
            <p className="text-[13px] leading-relaxed text-body">
              {t("draftDesc")}
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href={`/landlord/agreements/${agreement.id}/edit`}
                className="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-none bg-ink text-[12.5px] font-semibold text-white transition-colors hover:bg-black"
              >
                <FileEdit className="size-3.5" />
                <span>{tActions("editClauses")}</span>
              </Link>
              {onSendDraft && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onSendDraft}
                  className="flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-none border-line text-[12.5px] font-semibold text-ink hover:bg-surface"
                >
                  <Send className="size-3.5 text-faint" />
                  <span>{tEditor("sendToRenter")}</span>
                </Button>
              )}
            </div>
          </div>
        )}

        {(status === "Sent" || status === "Viewed") && (
          <p className="text-[13px] leading-relaxed text-body">
            {status === "Viewed"
              ? t.rich("viewedDesc", {
                  renter: agreement.renter.name,
                  strong: (chunks) => (
                    <strong className="text-ink">{chunks}</strong>
                  ),
                })
              : t.rich("sentDesc", {
                  renter: agreement.renter.name,
                  strong: (chunks) => (
                    <strong className="text-ink">{chunks}</strong>
                  ),
                })}
          </p>
        )}

        {status === "Awaiting Renter Signature" && (
          <p className="text-[13px] leading-relaxed text-body">
            {t.rich("awaitingRenterDesc", {
              renter: agreement.renter.name,
              strong: (chunks) => (
                <strong className="text-ink">{chunks}</strong>
              ),
            })}
          </p>
        )}

        {status === "Signed" && (
          <div className="space-y-2.5">
            <p className="text-[13px] leading-relaxed text-body">
              {t("signedDesc")}
            </p>
            <span className="block font-mono text-faint">
              {t("refVersion", {
                ref: agreement.referenceNumber,
                version: agreement.version,
              })}
            </span>
            {onCreateRenewalDraft && (
              <Button
                type="button"
                variant="outline"
                onClick={onCreateRenewalDraft}
                className="flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-none border-line text-[12.5px] font-semibold text-ink hover:bg-surface"
              >
                <RefreshCw className="size-3.5 text-faint" />
                <span>{t("createRenewalDraft")}</span>
              </Button>
            )}
          </div>
        )}

        {status === "Declined" && (
          <p className="text-[13px] leading-relaxed text-body">
            {t("declinedDesc")}
          </p>
        )}

        {status === "Expired" && (
          <p className="text-[13px] leading-relaxed text-body">
            {t("expiredDesc")}
          </p>
        )}

        {status === "Superseded" && (
          <p className="text-[13px] leading-relaxed text-body">
            {t("supersededDesc")}
          </p>
        )}

        {status === "Cancelled" && (
          <p className="text-[13px] leading-relaxed text-body">
            {t("cancelledDesc")}
          </p>
        )}
      </div>
    </div>
  );
}
