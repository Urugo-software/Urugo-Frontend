"use client";

import { useMemo, useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyStateBox } from "@/components/dashboard/landlord/tenancies/EmptyStateBox";
import type { Agreement, AgreementFilterTab } from "@/types/agreement.types";
import {
  AgreementListToolbar,
  AgreementMobileList,
  AgreementTable,
  filterAgreements,
} from "./list";

interface Props {
  initialAgreements: Agreement[];
  newAgreementHref: string;
}

export function AgreementListContainer({
  initialAgreements,
  newAgreementHref,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<AgreementFilterTab>("all");

  const filteredAgreements = useMemo(
    () => filterAgreements(initialAgreements, activeTab, searchQuery),
    [initialAgreements, activeTab, searchQuery],
  );

  const hasActiveFilters = activeTab !== "all" || searchQuery.trim() !== "";

  function clearFilters() {
    setActiveTab("all");
    setSearchQuery("");
  }

  return (
    <div className="space-y-6">
      <AgreementListToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        newAgreementHref={newAgreementHref}
      />

      {filteredAgreements.length === 0 ? (
        <EmptyStateBox
          icon={FileText}
          title="No agreements found"
          description={
            hasActiveFilters
              ? "No agreements match your search or filter criteria."
              : "No lease agreements have been created yet."
          }
          action={
            hasActiveFilters ? (
              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
                className="cursor-pointer rounded-none"
              >
                Clear filters
              </Button>
            ) : undefined
          }
        />
      ) : (
        <>
          <AgreementTable agreements={filteredAgreements} />
          <AgreementMobileList agreements={filteredAgreements} />
        </>
      )}
    </div>
  );
}
