"use client";

import { useMemo, useRef, useState } from "react";
import { Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { Pagination } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { LandlordPropertyItem } from "@/types/landlord";
import { formatPropertyRent } from "@/utils/format";
import { paginateItems } from "@/utils/pagination";
import { partitionProperties } from "@/utils/property-groups";
import { GroupDialog, type GroupDialogRequest } from "./GroupDialog";
import { GroupList } from "./GroupList";
import type { ViewMode } from "./PortfolioCard";
import { AddPropertyLink, PropertiesHeader } from "./PropertiesHeader";
import {
  PropertiesToolbar,
  type PropertySortOrder,
} from "./PropertiesToolbar";
import { EagerCoverContext } from "./PropertyCover";
import { PropertyList } from "./PropertyList";
import { useMembershipControls } from "./membership/useMembershipControls";

const PROPERTIES_PER_PAGE = 6;

function sortProperties(
  items: LandlordPropertyItem[],
  sortBy: PropertySortOrder,
): LandlordPropertyItem[] {
  if (sortBy === "default") return items;
  return [...items].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    const rentA = formatPropertyRent(a) ?? 0;
    const rentB = formatPropertyRent(b) ?? 0;
    return sortBy === "rent-desc" ? rentB - rentA : rentA - rentB;
  });
}

function matchesPropertyStatus(
  property: LandlordPropertyItem,
  filterStatus: string,
): boolean {
  if (filterStatus === "all") return true;
  const listingStatus =
    property.listingStatus ??
    (property.status === "Occupied" ? "Rented" : "Published");
  return property.status === filterStatus || listingStatus === filterStatus;
}

export function LandlordPropertiesView() {
  const t = useTranslations("landlord.properties");
  const mainRef = useRef<HTMLDivElement>(null);
  const { properties, groups } = useLandlordProperties();
  const serviceMode = useLandlordWorkspace((s) => s.serviceMode);
  const membership = useMembershipControls();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState<PropertySortOrder>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [groupOrder, setGroupOrder] = useState("custom");
  const [currentPage, setCurrentPage] = useState(1);
  const [dialog, setDialog] = useState<GroupDialogRequest | null>(null);

  const { byGroup, ungrouped } = useMemo(
    () => partitionProperties(groups, properties),
    [groups, properties],
  );

  const query = searchTerm.trim().toLowerCase();

  const visibleProperties = useMemo(() => {
    const matchesText = (item: { name: string; location?: string }) =>
      !query ||
      [item.name, item.location].some((text) =>
        text?.toLowerCase().includes(query),
      );
    const base = serviceMode === "listing_only" ? properties : ungrouped;
    const filtered = base.filter(
      (property) =>
        matchesText(property) && matchesPropertyStatus(property, filterStatus),
    );
    return sortProperties(filtered, sortBy);
  }, [filterStatus, properties, query, serviceMode, sortBy, ungrouped]);

  const visibleGroups = useMemo(() => {
    if (serviceMode === "listing_only") return [];
    const matchesText = (item: { name: string; location?: string }) =>
      !query ||
      [item.name, item.location].some((text) =>
        text?.toLowerCase().includes(query),
      );
    const filtered = groups.filter((group) => {
      const members = byGroup.get(group.id) ?? [];
      const groupMatch = matchesText(group);
      return (
        (groupMatch && filterStatus === "all") ||
        members.some(
          (property) =>
            matchesPropertyStatus(property, filterStatus) &&
            (groupMatch || matchesText(property)),
        )
      );
    });
    if (groupOrder === "name") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    return filtered;
  }, [byGroup, filterStatus, groupOrder, groups, query, serviceMode]);

  const {
    items: paginatedProperties,
    page,
    totalPages,
    totalItems,
  } = paginateItems(visibleProperties, currentPage, PROPERTIES_PER_PAGE);

  const firstCover =
    visibleGroups[0]?.coverImage ?? paginatedProperties[0]?.image;

  const filterOptions: Record<string, string> =
    serviceMode === "listing_only"
      ? {
          all: t("statuses.all"),
          Published: t("statuses.Published"),
          Draft: t("statuses.Draft"),
          Paused: t("statuses.Paused"),
          Rented: t("statuses.Rented"),
          Archived: t("statuses.Archived"),
        }
      : {
          all: t("statuses.all"),
          Published: t("statuses.Published"),
          Draft: t("statuses.Draft"),
          Paused: t("statuses.Paused"),
          Occupied: t("statuses.Occupied"),
          Partial: t("statuses.Partial"),
          Vacant: t("statuses.Vacant"),
        };

  function clearFilters() {
    setSearchTerm("");
    setFilterStatus("all");
    setSortBy("default");
    setCurrentPage(1);
  }

  const hasFilters = Boolean(query) || filterStatus !== "all";
  const nothingVisible =
    visibleGroups.length === 0 && visibleProperties.length === 0;

  return (
    <EagerCoverContext.Provider value={firstCover}>
      <div
        ref={mainRef}
        className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 md:p-10"
      >
        <PropertiesHeader
          onCreateGroup={
            serviceMode === "managed" && properties.length > 1
              ? () => setDialog({ kind: "create" })
              : undefined
          }
        />

        {properties.length > 0 && (
          <PropertiesToolbar
            searchTerm={searchTerm}
            onSearchChange={(val) => {
              setSearchTerm(val);
              setCurrentPage(1);
            }}
            searchLabel={
              serviceMode === "listing_only"
                ? t("searchListingsLabel")
                : t("searchGroupsAndPropertiesLabel")
            }
            filterStatus={filterStatus}
            onFilterChange={(val) => {
              setFilterStatus(val);
              setCurrentPage(1);
            }}
            filterOptions={filterOptions}
            sortBy={sortBy}
            onSortChange={(val) => {
              setSortBy(val);
              setCurrentPage(1);
            }}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            groupOrder={groupOrder}
            onOrderChange={setGroupOrder}
            showGroupOrder={serviceMode === "managed" && groups.length > 1}
          />
        )}

        {properties.length === 0 ? (
          <EmptyStateBox
            icon={Building2}
            title={t("emptyNoPropertiesTitle")}
            description={t("emptyNoPropertiesDesc")}
            action={<AddPropertyLink />}
          />
        ) : nothingVisible ? (
          <EmptyStateBox
            icon={Building2}
            title={t("emptyNoMatchesTitle")}
            description={t("emptyNoMatchesDesc")}
            action={
              hasFilters ? (
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer rounded-none"
                  onClick={clearFilters}
                >
                  {t("clearFilters")}
                </Button>
              ) : undefined
            }
          />
        ) : (
          <>
            {visibleGroups.length > 0 && (
              <section
                aria-labelledby="property-groups-heading"
                className="space-y-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3
                    id="property-groups-heading"
                    className="text-lg font-bold text-ink"
                  >
                    {t("propertyGroupsHeading")}
                  </h3>
                  <span className="border border-line bg-white px-2.5 py-0.5 font-ibm text-xs font-semibold text-body">
                    {visibleGroups.length}
                  </span>
                </div>
                <GroupList
                  groups={visibleGroups}
                  byGroup={byGroup}
                  mode={viewMode}
                  reorderable={groupOrder === "custom" && !hasFilters}
                  onAction={(group, kind) => setDialog({ kind, group })}
                  renderMembershipActions={membership.groupMenu}
                />
              </section>
            )}

            {paginatedProperties.length > 0 && (
              <section
                aria-labelledby="properties-list-heading"
                className="space-y-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3
                    id="properties-list-heading"
                    className="text-lg font-bold text-ink"
                  >
                    {serviceMode === "listing_only"
                      ? t("yourListingsHeading")
                      : visibleGroups.length > 0
                        ? t("ungroupedPropertiesHeading")
                        : t("propertiesHeading")}
                  </h3>
                  <span className="border border-line bg-white px-2.5 py-0.5 font-ibm text-xs font-semibold text-body">
                    {visibleProperties.length}
                  </span>
                </div>

                <PropertyList
                  properties={paginatedProperties}
                  mode={viewMode}
                  renderMembershipActions={
                    serviceMode === "managed"
                      ? membership.propertyMenu
                      : undefined
                  }
                />

                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={PROPERTIES_PER_PAGE}
                  itemLabel={t("paginationLabel")}
                  onPageChange={(nextPage) => {
                    setCurrentPage(nextPage);
                    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </section>
            )}
          </>
        )}

        {dialog && (
          <GroupDialog
            request={dialog}
            returnFocusId={
              dialog.kind === "create"
                ? "create-property-group"
                : `group-menu-${dialog.group.id}`
            }
            onClose={() => setDialog(null)}
          />
        )}
        {membership.dialog}
      </div>
    </EagerCoverContext.Provider>
  );
}
