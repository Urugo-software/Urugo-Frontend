"use client";

import { useMemo, useState } from "react";
import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { Pagination } from "@/components/shared/Pagination";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { AgreementFilterTab } from "@/types/agreement.types";
import { paginateItems } from "@/utils/pagination";
import { AgreementsPageHeader } from "./AgreementsPageHeader";
import { CreateAgreementModal } from "./CreateAgreementModal";
import {
  AgreementListToolbar,
  AgreementMobileList,
  AgreementTable,
  filterAgreements,
} from "./list";

const AGREEMENTS_PER_PAGE = 6;

export function AgreementListContainer() {
  const t = useTranslations("landlord.agreements");
  const agreements = useLandlordWorkspace((s) => s.agreements);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<AgreementFilterTab>("all");
  const [page, setPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredAgreements = useMemo(
    () => filterAgreements(agreements, activeTab, searchQuery),
    [agreements, activeTab, searchQuery],
  );

  const paginated = useMemo(
    () => paginateItems(filteredAgreements, page, AGREEMENTS_PER_PAGE),
    [filteredAgreements, page],
  );

  const hasActiveFilters = activeTab !== "all" || searchQuery.trim() !== "";

  function handleSearchChange(val: string) {
    setSearchQuery(val);
    setPage(1);
  }

  function handleTabChange(tab: AgreementFilterTab) {
    setActiveTab(tab);
    setPage(1);
  }

  function clearFilters() {
    setActiveTab("all");
    setSearchQuery("");
    setPage(1);
  }

  return (
    <div className="space-y-6">
      <AgreementsPageHeader onNewAgreement={() => setIsCreateOpen(true)} />

      <AgreementListToolbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onNewAgreement={() => setIsCreateOpen(true)}
      />

      {filteredAgreements.length === 0 ? (
        <EmptyStateBox
          icon={FileText}
          title={t("list.empty.title")}
          description={
            hasActiveFilters
              ? t("list.empty.filteredDescription")
              : t("list.empty.defaultDescription")
          }
          action={
            hasActiveFilters ? (
              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
                className="cursor-pointer rounded-none"
              >
                {t("list.empty.clearFilters")}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="cursor-pointer rounded-none bg-ink text-white hover:bg-black"
              >
                {t("header.newAgreement")}
              </Button>
            )
          }
        />
      ) : (
        <>
          <AgreementTable agreements={paginated.items} />
          <AgreementMobileList agreements={paginated.items} />
          <Pagination
            currentPage={paginated.page}
            totalPages={paginated.totalPages}
            totalItems={paginated.totalItems}
            itemsPerPage={AGREEMENTS_PER_PAGE}
            itemLabel={t("list.paginationItemLabel")}
            onPageChange={setPage}
          />
        </>
      )}

      <CreateAgreementModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}
