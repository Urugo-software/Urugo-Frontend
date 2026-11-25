"use client";

import { Plus } from "lucide-react";

interface Props {
  onNewAgreement: () => void;
}

export function AgreementsPageHeader({ onNewAgreement }: Props) {
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

      <button
        type="button"
        onClick={onNewAgreement}
        className="hidden h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-none bg-ink px-4 text-sm font-semibold text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:inline-flex"
      >
        <Plus className="size-4" />
        <span>New Agreement</span>
      </button>
    </div>
  );
}
