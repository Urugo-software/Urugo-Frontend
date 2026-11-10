import Link from "next/link";
import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AgreementsPageHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-6 pt-2">
      <div>
        <div className="flex items-center gap-2">
          <div className="grid size-7 place-items-center bg-surface border border-line text-ink">
            <FileText className="size-4" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink font-heading">
            Lease Agreements
          </h1>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-faint max-w-2xl">
          Prepare, customize, review, and manage legally grounded residential tenancy contracts in English and Kinyarwanda.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/landlord/renters/add"
          className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-none bg-ink px-4 text-xs font-semibold text-white hover:bg-black transition-colors"
        >
          <Plus className="size-3.5" />
          <span>New Agreement</span>
        </Link>
      </div>
    </div>
  );
}
