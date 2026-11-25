"use client";

import Link from "next/link";
import { FileText, Lock } from "lucide-react";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { AgreementEditor } from "./editor/AgreementEditor";
import { isAgreementEditable } from "./list/agreement-list.config";

export function AgreementEditView({ agreementId }: { agreementId: string }) {
  const agreement = useLandlordWorkspace((s) =>
    s.agreements.find((a) => a.id === agreementId),
  );

  if (!agreement) {
    return (
      <div className="p-6 sm:p-10">
        <EmptyStateBox
          icon={FileText}
          title="Lease agreement not found"
          description="The agreement you are trying to edit could not be found."
          action={
            <Link
              href="/landlord/agreements"
              className="inline-flex h-9 items-center bg-ink px-4 text-xs font-semibold text-white hover:bg-black"
            >
              Back to Lease Agreements
            </Link>
          }
        />
      </div>
    );
  }

  if (!isAgreementEditable(agreement.status)) {
    return (
      <div className="p-6 sm:p-10">
        <EmptyStateBox
          icon={Lock}
          title="Agreement is locked for editing"
          description={`Agreement ${agreement.referenceNumber} is currently "${agreement.status}". Clauses can only be modified while an agreement is in Draft, Ready for Review, or Changes Requested status.`}
          action={
            <Link
              href={`/landlord/agreements/${agreement.id}`}
              className="inline-flex h-9 items-center bg-ink px-4 text-xs font-semibold text-white hover:bg-black"
            >
              View Agreement Details
            </Link>
          }
        />
      </div>
    );
  }

  return <AgreementEditor initialAgreement={agreement} />;
}
