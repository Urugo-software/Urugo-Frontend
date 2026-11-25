"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { useRenterDocuments } from "@/hooks/query/renter.hooks";
import { cn } from "@/lib/utils";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import { DocumentList } from "./DocumentList";

const CATEGORIES = [
  { value: "All", key: "all" },
  { value: "Lease Agreement", key: "leaseAgreement" },
  { value: "Payment Receipt", key: "paymentReceipt" },
  { value: "Notice", key: "notice" },
] as const;

export function RenterDocumentsView() {
  const t = useTranslations("renter.documents");
  const { isLoading, isError, refetch } = useRenterDocuments();
  const docs = useRenterWorkspace((s) => s.documents);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");

  const visibleDocs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return docs.filter((doc) => {
      if (category !== "All" && doc.category !== category) return false;
      if (!q) return true;
      return `${doc.title} ${doc.category} ${doc.summary ?? ""}`
        .toLowerCase()
        .includes(q);
    });
  }, [category, docs, search]);

  if (isLoading) return <SectionLoading message={t("loading")} />;
  if (isError) {
    return (
      <SectionError
        message={t("loadError")}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <div className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-body">{t("subtitle")}</p>
        </div>
        <Link
          href="/renter/lease"
          className="text-xs font-semibold text-brand-blue hover:underline"
        >
          {t("openLeaseDetails")} &rarr;
        </Link>
      </div>

      <div className="space-y-4">
        <DashboardSearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("searchPlaceholder")}
          label={t("searchLabel")}
          className="max-w-md"
        />

        <div
          role="tablist"
          aria-label={t("categoriesAria")}
          className="flex items-center gap-6 overflow-x-auto border-b border-line"
        >
          {CATEGORIES.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={category === tab.value}
              onClick={() => setCategory(tab.value)}
              className={cn(
                "-mb-px cursor-pointer whitespace-nowrap border-b-2 pb-3 pt-1 text-sm transition-colors",
                category === tab.value
                  ? "border-ink font-semibold text-ink"
                  : "border-transparent font-medium text-body hover:text-ink",
              )}
            >
              {t(`categories.${tab.key}`)}
            </button>
          ))}
        </div>
      </div>

      <DocumentList
        docs={visibleDocs}
        onReset={
          search || category !== "All"
            ? () => {
                setSearch("");
                setCategory("All");
              }
            : undefined
        }
      />
    </div>
  );
}
