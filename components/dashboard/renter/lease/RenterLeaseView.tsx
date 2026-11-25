"use client";

import { useTranslations } from "next-intl";
import { useRenterLease } from "@/hooks/query/renter.hooks";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import { LeasePageHeader } from "./LeasePageHeader";
import { LeaseDetailsGrid } from "./LeaseDetailsGrid";
import { LeaseAgreementSection } from "./LeaseAgreementSection";
import { LeaseEmptyState } from "./LeaseEmptyState";

export function RenterLeaseView() {
  const t = useTranslations("renter.lease");
  const { isLoading, isError, refetch } = useRenterLease();
  const lease = useRenterWorkspace((s) => s.lease);

  if (isLoading) return <SectionLoading message={t("loading")} />;
  if (isError) {
    return (
      <SectionError
        message={t("loadError")}
        onRetry={() => void refetch()}
      />
    );
  }
  if (!lease) return <LeaseEmptyState />;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <LeasePageHeader lease={lease} />
      <LeaseDetailsGrid lease={lease} />
      <LeaseAgreementSection agreement={lease.agreement} />
    </div>
  );
}
