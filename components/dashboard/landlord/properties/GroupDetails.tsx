"use client";

import { useGroupDetails } from "@/hooks/useGroupDetails";
import {
  GroupBreadcrumb,
  GroupEmptyState,
  GroupHeroHeader,
  GroupSummaryStats,
} from "./group-details";
import { GroupDialog } from "./GroupDialog";
import { PropertiesToolbar } from "./PropertiesToolbar";
import { EagerCoverContext } from "./PropertyCover";
import { PropertyList } from "./PropertyList";
import { useMembershipControls } from "./membership/useMembershipControls";

export function GroupDetails({ id }: { id: string }) {
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

  if (!group) {
    return (
      <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 md:p-10">
        <GroupBreadcrumb currentLabel="Group not found" />
        <GroupEmptyState variant="not-found" />
      </main>
    );
  }

  return (
    <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 md:p-10">
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
            onSearchChange={setSearchTerm}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
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
            onClearFilters={clearFilters}
          />
        ) : (
          <EagerCoverContext.Provider
            value={filteredMembers.find((property) => property.image)?.image}
          >
            <PropertyList
              properties={filteredMembers}
              mode={viewMode}
              renderMembershipActions={membership.propertyMenu}
            />
          </EagerCoverContext.Provider>
        )}
      </section>

      {membership.dialog}

      {dialogRequest && (
        <GroupDialog
          request={dialogRequest}
          onClose={() => setDialogRequest(null)}
          returnFocusId={`group-details-menu-${group.id}`}
        />
      )}
    </main>
  );
}
