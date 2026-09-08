"use client";

import React from "react";
import { useRenterDocuments } from "@/hooks/query/renter.hooks";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { DocumentList } from "./DocumentList";

export function RenterDocumentsView() {
  const { data: docs, isLoading, isError } = useRenterDocuments();

  if (isLoading) return <SectionLoading message="Loading documents..." />;
  if (isError || !docs) return <SectionError message="Unable to load documents." />;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-ink sm:text-2xl">My Documents</h2>
        <p className="text-xs text-body mt-1">Access lease contracts, payment receipts, and utility statements.</p>
      </div>

      <DocumentList docs={docs} />
    </div>
  );
}
