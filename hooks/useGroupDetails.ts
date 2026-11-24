"use client";

import { useMemo, useState } from "react";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { partitionProperties, summarizeGroup } from "@/utils/property-groups";
import type { GroupDialogRequest } from "@/components/dashboard/landlord/properties/GroupDialog";
import type { ViewMode } from "@/components/dashboard/landlord/properties/PortfolioCard";

export function useGroupDetails(id: string) {
  const { groups, properties } = useLandlordProperties();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [dialogRequest, setDialogRequest] = useState<GroupDialogRequest | null>(
    null,
  );

  const group = useMemo(
    () => groups.find((item) => item.id === id),
    [groups, id],
  );

  const allMembers = useMemo(
    () =>
      group
        ? (partitionProperties(groups, properties).byGroup.get(group.id) ?? [])
        : [],
    [group, groups, properties],
  );

  const summary = useMemo(() => summarizeGroup(allMembers), [allMembers]);

  const query = searchTerm.trim().toLowerCase();

  const filteredMembers = useMemo(
    () =>
      allMembers.filter((property) => {
        const matchesSearch =
          !query ||
          property.name.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query);
        const matchesStatus =
          filterStatus === "all" || property.status === filterStatus;
        return matchesSearch && matchesStatus;
      }),
    [allMembers, filterStatus, query],
  );

  const hasActiveFilters = Boolean(query) || filterStatus !== "all";

  function clearFilters() {
    setSearchTerm("");
    setFilterStatus("all");
  }

  return {
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
  };
}
