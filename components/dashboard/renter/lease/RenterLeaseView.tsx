"use client";

import { useRenterLease } from "@/hooks/query/renter.hooks";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { LeasePageHeader } from "./LeasePageHeader";
import { LeaseDetailsGrid } from "./LeaseDetailsGrid";
import { LeaseAgreementSection } from "./LeaseAgreementSection";
import { LeaseEmptyState } from "./LeaseEmptyState";

export function RenterLeaseView() {
  const { data: lease, isLoading, isError } = useRenterLease();

  if (isLoading) return <SectionLoading message="Loading lease details…" />;
  if (isError) return <SectionError message="Unable to load lease information." />;
  if (!lease) return <LeaseEmptyState />;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <LeasePageHeader lease={lease} />
      <LeaseDetailsGrid lease={lease} />
      <LeaseAgreementSection agreement={lease.agreement} />
    </div>
  );
}
