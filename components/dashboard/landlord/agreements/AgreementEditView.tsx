"use client";

import Link from "next/link";
import { FileText, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { AGREEMENT_STATUS_KEYS } from "./AgreementStatusBadge";
import { AgreementEditor } from "./editor/AgreementEditor";
import { isAgreementEditable } from "./list/agreement-list.config";

export function AgreementEditView({ agreementId }: { agreementId: string }) {
  const t = useTranslations("landlord.agreements.detail");
  const tStatuses = useTranslations("landlord.agreements.statuses");
  const agreement = useLandlordWorkspace((s) =>
    s.agreements.find((a) => a.id === agreementId),
  );

  if (!agreement) {
    return (
      <div className="p-6 sm:p-10">
        <EmptyStateBox
          icon={FileText}
          title={t("notFoundTitle")}
          description={t("editNotFoundDescription")}
          action={
            <Link
              href="/landlord/agreements"
              className="inline-flex h-9 items-center bg-ink px-4 text-xs font-semibold text-white hover:bg-black"
            >
              {t("backToList")}
            </Link>
          }
        />
      </div>
    );
  }

  if (!isAgreementEditable(agreement.status)) {
    const statusLabel = tStatuses(AGREEMENT_STATUS_KEYS[agreement.status]);
    return (
      <div className="p-6 sm:p-10">
        <EmptyStateBox
          icon={Lock}
          title={t("lockedTitle")}
          description={t("lockedDescription", {
            ref: agreement.referenceNumber,
            status: statusLabel,
          })}
          action={
            <Link
              href={`/landlord/agreements/${agreement.id}`}
              className="inline-flex h-9 items-center bg-ink px-4 text-xs font-semibold text-white hover:bg-black"
            >
              {t("viewDetails")}
            </Link>
          }
        />
      </div>
    );
  }

  return <AgreementEditor initialAgreement={agreement} />;
}
