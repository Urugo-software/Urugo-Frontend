"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { partitionProperties } from "@/utils/property-groups";
import { GroupDialog, type GroupDialogRequest } from "./GroupDialog";
import { GroupList } from "./GroupList";
import type { ViewMode } from "./PortfolioCard";
import { AddPropertyLink, PropertiesHeader } from "./PropertiesHeader";
import { PropertiesToolbar } from "./PropertiesToolbar";
import { PropertyList } from "./PropertyList";
import { useMembershipControls } from "./membership/useMembershipControls";

export function LandlordPropertiesView() {
  const { properties, groups } = useLandlordProperties();
  const membership = useMembershipControls();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [groupOrder, setGroupOrder] = useState("custom");
  const [dialog, setDialog] = useState<GroupDialogRequest | null>(null);
  const { byGroup, ungrouped } = partitionProperties(groups, properties);
  const query = searchTerm.trim().toLowerCase();
  const matchesText = (item: { name: string; location?: string }) =>
    !query ||
    [item.name, item.location].some((text) =>
      text?.toLowerCase().includes(query),
    );
  const matchesStatus = (status?: string) =>
    filterStatus === "all" || status === filterStatus;
  const visibleProperties = ungrouped.filter(
    (property) => matchesText(property) && matchesStatus(property.status),
  );
  const visibleGroups = groups.filter((group) => {
    const members = byGroup.get(group.id) ?? [];
    const groupMatch = matchesText(group);
    return (
      (groupMatch && filterStatus === "all") ||
      members.some(
        (property) =>
          matchesStatus(property.status) &&
          (groupMatch || matchesText(property)),
      )
    );
  });
  if (groupOrder === "name")
    visibleGroups.sort((a, b) => a.name.localeCompare(b.name));

  function clearFilters() {
    setSearchTerm("");
    setFilterStatus("all");
  }

  return (
    <div className="min-h-0 flex-1 space-y-7 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 md:p-10">
      <PropertiesHeader
        onCreateGroup={
          properties.length > 1
            ? () => setDialog({ kind: "create" })
            : undefined
        }
      />
      {(properties.length > 0 || groups.length > 0) && (
        <PropertiesToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          groupOrder={groupOrder}
          onOrderChange={setGroupOrder}
          showGroupOrder={groups.length > 1}
        />
      )}
      {visibleGroups.length > 0 && (
        <section aria-labelledby="group-heading" className="space-y-3">
          <h2 id="group-heading" className="text-xl font-semibold text-ink">
            Property Groups
          </h2>
          <GroupList
            groups={visibleGroups}
            byGroup={byGroup}
            mode={viewMode}
            reorderable={
              groupOrder === "custom" && !query && filterStatus === "all"
            }
            onAction={(group, kind) => setDialog({ kind, group })}
            renderMembershipActions={membership.groupMenu}
          />
        </section>
      )}
      {visibleProperties.length > 0 && (
        <section
          aria-label={groups.length ? "Ungrouped Properties" : "Properties"}
          className="space-y-3"
        >
          {groups.length > 0 && (
            <h2 className="text-xl font-semibold text-ink">
              Ungrouped Properties
            </h2>
          )}
          <PropertyList
            properties={visibleProperties}
            mode={viewMode}
            renderMembershipActions={membership.propertyMenu}
          />
        </section>
      )}
      {properties.length === 0 && (
        <div className="space-y-3 border border-dashed border-line bg-white px-4 py-10 text-center">
          <Building2 aria-hidden="true" className="mx-auto size-8 text-faint" />
          <h2 className="text-lg font-semibold">No properties yet</h2>
          <p className="text-sm text-body">
            Add your first property to start managing it here.
          </p>
          <AddPropertyLink />
        </div>
      )}
      {(query || filterStatus !== "all") &&
        !visibleGroups.length &&
        !visibleProperties.length && (
          <div className="space-y-3 border border-dashed border-line py-8 text-center">
            <p>No groups or properties match your filters.</p>
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      {dialog && (
        <GroupDialog
          request={dialog}
          onClose={() => setDialog(null)}
          onCreated={clearFilters}
          returnFocusId={
            dialog.kind === "create"
              ? "create-property-group"
              : `group-menu-${dialog.group.id}`
          }
        />
      )}
      {membership.dialog}
    </div>
  );
}
