import React from "react";
import { Folder } from "lucide-react";
import { RenterDocument } from "@/types/renter";
import { DocumentItemCard } from "./DocumentItemCard";

export function DocumentList({ docs }: { docs: RenterDocument[] }) {
  if (docs.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-line bg-surface p-8 text-center">
        <Folder className="size-8 text-faint mb-2" />
        <p className="text-sm font-semibold text-ink">No documents available.</p>
        <p className="text-xs text-body mt-0.5">
          Payment receipts and utility statements will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {docs.map((doc) => (
        <DocumentItemCard key={doc.id} doc={doc} />
      ))}
    </div>
  );
}
