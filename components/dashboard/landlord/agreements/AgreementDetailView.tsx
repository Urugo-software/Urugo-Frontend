"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { AgreementPreviewContainer } from "./preview/AgreementPreviewContainer";

export function AgreementDetailView({ agreementId }: { agreementId: string }) {
  const t = useTranslations("landlord.agreements.detail");
  const agreement = useLandlordWorkspace((s) =>
    s.agreements.find((a) => a.id === agreementId),
  );

  if (!agreement) {
    return (
      <EmptyStateBox
        icon={FileText}
        title={t("notFoundTitle")}
        description={t("notFoundDescription")}
        action={
          <Link
            href="/landlord/agreements"
            className="inline-flex h-9 items-center bg-ink px-4 text-xs font-semibold text-white hover:bg-black"
          >
            {t("backToList")}
          </Link>
        }
      />
    );
  }

  return <AgreementPreviewContainer initialAgreement={agreement} />;
}
