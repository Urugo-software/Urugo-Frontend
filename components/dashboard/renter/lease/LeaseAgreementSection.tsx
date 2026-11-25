"use client";

import { useState } from "react";
import { Download, Eye, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { AgreementStatus } from "@/types/agreement.types";
import type { RenterLeaseAgreement } from "@/types/renter";
import {
  buildDocumentDownloadContent,
  downloadTextFile,
} from "@/utils/renter-helpers";
import { LeaseAgreementViewerModal } from "./LeaseAgreementViewerModal";

const AGREEMENT_STATUS_KEYS: Record<AgreementStatus, string> = {
  Draft: "draft",
  "Ready for Review": "readyForReview",
  Sent: "sent",
  Viewed: "viewed",
  "Changes Requested": "changesRequested",
  "Awaiting Renter Signature": "awaitingRenterSignature",
  "Awaiting Landlord Signature": "awaitingLandlordSignature",
  Signed: "signed",
  Declined: "declined",
  Expired: "expired",
  Superseded: "superseded",
  Cancelled: "cancelled",
};

interface Props {
  agreement?: RenterLeaseAgreement;
}

export function LeaseAgreementSection({ agreement }: Props) {
  const t = useTranslations("renter.lease.agreementSection");
  const tStatuses = useTranslations("renter.lease.agreementStatuses");
  const [viewerOpen, setViewerOpen] = useState(false);
  const agreements = useLandlordWorkspace((s) => s.agreements);
  const profile = useRenterWorkspace((s) => s.profile);
  const property = useRenterWorkspace((s) => s.property);

  const matchedContract = agreement?.agreementId
    ? agreements.find((a) => a.id === agreement.agreementId)
    : agreements.find(
        (a) =>
          a.renter.name.toLowerCase() === profile.name.toLowerCase() ||
          a.property.unitNumber === property.unitNumber,
      );

  const handleDownload = () => {
    if (!agreement) return;
    const text = buildDocumentDownloadContent(
      {
        id: agreement.id,
        title: agreement.title,
        category: "Lease Agreement",
        date: agreement.date,
        size: agreement.size,
      },
      property,
      profile.name,
    );
    downloadTextFile(`${agreement.id}-lease-summary.txt`, text);
    toast.success(t("downloadSuccess"));
  };

  return (
    <section className="mt-5 border border-line bg-white p-5 shadow-2xs">
      <h3 className="mb-4 text-base font-bold text-ink">{t("title")}</h3>

      {agreement ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border border-line bg-surface/30 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center border border-line bg-white text-brand-blue">
              <FileText aria-hidden="true" className="size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="truncate text-sm font-bold text-ink">
                  {agreement.title}
                </h4>
                {matchedContract && (
                  <StatusBadge
                    label={tStatuses(
                      AGREEMENT_STATUS_KEYS[matchedContract.status],
                    )}
                    tone={
                      matchedContract.status === "Signed" ? "success" : "info"
                    }
                  />
                )}
              </div>
              <span className="text-xs text-faint">
                {matchedContract?.referenceNumber ?? t("contractFallback")}{" "}
                &middot; {agreement.size} &middot; {agreement.date}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {matchedContract && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setViewerOpen(true)}
                className="h-9 cursor-pointer rounded-none text-xs font-semibold"
              >
                <Eye aria-hidden="true" className="size-4" />
                {t("viewAgreement")}
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={handleDownload}
              className="h-9 cursor-pointer rounded-none text-xs font-semibold"
            >
              <Download aria-hidden="true" className="size-4" />
              {t("download")}
            </Button>
          </div>
        </div>
      ) : (
        <EmptyStateBox
          icon={FileText}
          title={t("emptyTitle")}
          description={t("emptyDescription")}
        />
      )}

      {matchedContract && (
        <LeaseAgreementViewerModal
          open={viewerOpen}
          onClose={() => setViewerOpen(false)}
          agreement={matchedContract}
        />
      )}
    </section>
  );
}
