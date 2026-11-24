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
        <h1 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Lease Agreements
        </h1>
        <p className="mt-1.5 text-[15px] text-body">
          Manage tenancy contracts, signatures, and lease terms.
        </p>
      </div>

      <Link
        href={newAgreementHref}
        className="hidden h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-none bg-ink px-4 text-sm font-semibold text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:inline-flex"
      >
        <Plus className="size-4" />
        <span>New Agreement</span>
      </Link>
    </div>
  );
}
