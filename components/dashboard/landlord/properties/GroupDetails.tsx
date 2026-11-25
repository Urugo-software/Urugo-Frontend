"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/shared/Pagination";
import { useGroupDetails } from "@/hooks/useGroupDetails";
import { formatPropertyRent } from "@/utils/format";
import { paginateItems } from "@/utils/pagination";
import {
  GroupBreadcrumb,
  GroupEmptyState,
  GroupHeroHeader,
  GroupSummaryStats,
} from "./group-details";
import { GroupDialog } from "./GroupDialog";
import {
  PropertiesToolbar,
  type PropertySortOrder,
} from "./PropertiesToolbar";
import { EagerCoverContext } from "./PropertyCover";
import { PropertyList } from "./PropertyList";
import { useMembershipControls } from "./membership/useMembershipControls";

const ITEMS_PER_PAGE = 6;

export function GroupDetails({ id }: { id: string }) {
  const router = useRouter();
  const mainRef = useRef<HTMLElement>(null);
  const [sortBy, setSortBy] = useState<PropertySortOrder>("default");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    group,
    allMembers,
    filteredMembers,
    summary,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    viewMode,
    setViewMode,
    hasActiveFilters,
    clearFilters,
    dialogRequest,
    setDialogRequest,
  } = useGroupDetails(id);

  const membership = useMembershipControls();

  const sortedMembers = useMemo(() => {
    if (sortBy === "default") return filteredMembers;
    return [...filteredMembers].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      const rentA = formatPropertyRent(a) ?? 0;
      const rentB = formatPropertyRent(b) ?? 0;
      return sortBy === "rent-desc" ? rentB - rentA : rentA - rentB;
    });
  }, [filteredMembers, sortBy]);

  const {
    items: paginatedMembers,
    page,
    totalPages,
    totalItems,
  } = paginateItems(sortedMembers, currentPage, ITEMS_PER_PAGE);

  if (!group) {
    return (
      <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 md:p-10">
        <GroupBreadcrumb currentLabel="Group not found" />
        <GroupEmptyState variant="not-found" />
      </main>
    );
  }

  return (
    <main
      ref={mainRef}
      className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 md:p-10"
    >
      <GroupBreadcrumb currentLabel={group.name} />

      <GroupHeroHeader
        group={group}
        propertyCount={allMembers.length}
        addPropertiesAction={membership.addButton(group)}
        onGroupAction={(kind) => setDialogRequest({ kind, group })}
      />

      <GroupSummaryStats
        propertyCount={allMembers.length}
        totalUnits={summary.totalUnits}
        occupiedUnits={summary.occupiedUnits}
        expectedRentRwf={summary.expected}
        collectedRentRwf={summary.collected}
      />

      <section aria-labelledby="group-properties-heading" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <h2
              id="group-properties-heading"
              className="text-xl font-semibold text-ink"
            >
              Properties in this Group
            </h2>
            <span className="border border-line bg-white px-2 py-0.5 font-ibm text-xs font-semibold text-body">
              {hasActiveFilters
                ? `${filteredMembers.length} / ${allMembers.length}`
                : allMembers.length}
            </span>
          </div>
        </div>

        {allMembers.length > 0 && (
          <PropertiesToolbar
            searchTerm={searchTerm}
            onSearchChange={(val) => {
              setSearchTerm(val);
              setCurrentPage(1);
            }}
            searchLabel="Search properties in this group"
            filterStatus={filterStatus}
            onFilterChange={(val) => {
              setFilterStatus(val);
              setCurrentPage(1);
            }}
            sortBy={sortBy}
            onSortChange={(val) => {
              setSortBy(val);
              setCurrentPage(1);
            }}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            groupOrder="custom"
            onOrderChange={() => {}}
            showGroupOrder={false}
          />
        )}

        {allMembers.length === 0 ? (
          <GroupEmptyState
            variant="empty-group"
            action={membership.addButton(group)}
          />
        ) : filteredMembers.length === 0 ? (
          <GroupEmptyState
            variant="no-matches"
            onClearFilters={() => {
              clearFilters();
              setSortBy("default");
              setCurrentPage(1);
            }}
          />
        ) : (
          <EagerCoverContext.Provider value={paginatedMembers[0]?.image}>
            <PropertyList
              properties={paginatedMembers}
              mode={viewMode}
              renderMembershipActions={membership.propertyMenu}
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              itemLabel="properties"
              onPageChange={(nextPage) => {
                setCurrentPage(nextPage);
                mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </EagerCoverContext.Provider>
        )}
      </section>

      {dialogRequest && (
        <GroupDialog
          request={dialogRequest}
          returnFocusId={`group-details-menu-${group.id}`}
          onClose={() => setDialogRequest(null)}
          onDeleted={() => router.push("/landlord/properties")}
        />
      )}
      {membership.dialog}
    </main>
  );
}
