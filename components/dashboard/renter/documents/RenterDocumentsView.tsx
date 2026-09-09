"use client";

import { useRenterDocuments } from "@/hooks/query/renter.hooks";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { DocumentList } from "./DocumentList";

export function RenterDocumentsView() {
  const { data: docs, isLoading, isError } = useRenterDocuments();

  if (isLoading) return <SectionLoading message="Loading documents..." />;
  if (isError || !docs)
    return <SectionError message="Unable to load documents." />;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-ink sm:text-2xl">My Documents</h2>
        <p className="text-[14px] text-body mt-1">
          Access payment receipts, utility statements, and other supporting
          documents.{" "}
          <a
            href="/renter/lease"
            className="text-brand underline-offset-2 hover:underline"
          >
            View your lease agreement →
          </a>
        </p>
      </div>

      <DocumentList docs={docs} />
    </div>
  );
}
