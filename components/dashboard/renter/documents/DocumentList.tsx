import { Folder } from "lucide-react";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import type { RenterDocument } from "@/types/renter";
import { DocumentItemCard } from "./DocumentItemCard";

interface DocumentListProps {
  docs: RenterDocument[];
  onReset?: () => void;
}

export function DocumentList({ docs, onReset }: DocumentListProps) {
  if (docs.length === 0) {
    return (
      <EmptyStateBox
        icon={Folder}
        title="No documents found"
        description="No matching lease agreements, receipts, or statements were found."
        action={
          onReset ? (
            <button
              type="button"
              onClick={onReset}
              className="cursor-pointer border border-line bg-white px-4 py-2 text-xs font-semibold text-ink hover:bg-surface"
            >
              Clear filters
            </button>
          ) : undefined
        }
      />
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
