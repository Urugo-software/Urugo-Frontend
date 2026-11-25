"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { AgreementPreviewContainer } from "./preview/AgreementPreviewContainer";

export function AgreementDetailView({ agreementId }: { agreementId: string }) {
  const agreement = useLandlordWorkspace((s) =>
    s.agreements.find((a) => a.id === agreementId),
  );

  if (!agreement) {
    return (
      <EmptyStateBox
        icon={FileText}
        title="Lease agreement not found"
        description="The lease agreement you requested does not exist or may have been removed."
        action={
          <Link
            href="/landlord/agreements"
            className="inline-flex h-9 items-center bg-ink px-4 text-xs font-semibold text-white hover:bg-black"
          >
            Back to Lease Agreements
          </Link>
        }
      />
    );
  }

  return <AgreementPreviewContainer initialAgreement={agreement} />;
}
