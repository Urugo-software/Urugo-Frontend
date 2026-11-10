import Link from "next/link";
import { Plus } from "lucide-react";

interface Props {
  newAgreementHref?: string;
}

export function AgreementsPageHeader({
  newAgreementHref = "/landlord/agreements/agr-005/edit",
}: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink font-heading">
          Lease Agreements
        </h1>
        <p className="mt-1 text-sm text-body">
          Manage tenancy contracts, signatures, and lease terms.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href={newAgreementHref}
          className="inline-flex h-9.5 items-center justify-center gap-2 rounded-none bg-ink px-4 text-xs sm:text-sm font-semibold text-white hover:bg-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer"
        >
          <Plus className="size-4" />
          <span>New Agreement</span>
        </Link>
      </div>
    </div>
  );
}
