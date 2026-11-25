"use client";

import { Folder } from "lucide-react";
import { useTranslations } from "next-intl";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import type { RenterDocument } from "@/types/renter";
import { DocumentItemCard } from "./DocumentItemCard";

interface DocumentListProps {
  docs: RenterDocument[];
  onReset?: () => void;
}

export function DocumentList({ docs, onReset }: DocumentListProps) {
  const t = useTranslations("renter.documents");

  if (docs.length === 0) {
    return (
      <EmptyStateBox
        icon={Folder}
        title={t("emptyTitle")}
        description={t("emptyDescription")}
        action={
          onReset ? (
            <button
              type="button"
              onClick={onReset}
              className="cursor-pointer border border-line bg-white px-4 py-2 text-xs font-semibold text-ink hover:bg-surface"
            >
              {t("clearFilters")}
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
