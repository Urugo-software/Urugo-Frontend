"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronDown,
  Ellipsis,
  ExternalLink,
  Folder,
  FolderOpen,
  FolderX,
  ImagePlus,
  MapPin,
  Pencil,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { partitionProperties, summarizeGroup } from "@/utils/property-groups";
import { formatCurrencyRwf } from "@/utils/agreement-utils";
import type { LandlordPropertyItem } from "@/types/landlord";
import { cardLayout, type ViewMode } from "./PortfolioCard";
import { PropertyCard } from "./PropertyCard";
import { PropertyCover, EagerCoverContext } from "./PropertyCover";
import { GroupDialog, type GroupDialogRequest } from "./GroupDialog";
import { useMembershipControls } from "./membership/useMembershipControls";

export function GroupDetails({ id }: { id: string }) {
  const { groups, properties } = useLandlordProperties();
  const membership = useMembershipControls();

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All Statuses");
  const [dialogRequest, setDialogRequest] = useState<GroupDialogRequest | null>(null);

  const group = groups.find((item) => item.id === id);
  const allMembers = group
    ? partitionProperties(groups, properties).byGroup.get(id) ?? []
    : [];

  const { totalUnits, occupiedUnits, expected, collected } = summarizeGroup(allMembers);

  const filteredMembers = allMembers.filter((prop: LandlordPropertyItem) => {
    const matchesSearch =
      prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All Statuses" || prop.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Group Not Found State
  if (!group) {
    return (
      <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 sm:p-8 md:p-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/landlord/properties">My Properties</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Group not found</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card className="flex flex-col items-center justify-center gap-4 rounded-none border border-line bg-white p-10 text-center shadow-2xs">
          <div className="flex size-14 items-center justify-center rounded-full bg-surface text-faint">
            <FolderX className="size-7" />
          </div>
          <div className="max-w-md space-y-1.5">
            <h1 className="text-xl font-bold text-ink">Group Not Found</h1>
            <p className="text-sm text-body">
              This property group could not be found in your current portfolio. It may have been deleted or the link is incorrect.
            </p>
          </div>
          <Link href="/landlord/properties">
            <Button variant="default" className="cursor-pointer">
              <ArrowLeft className="size-4" /> Return to My Properties
            </Button>
          </Link>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 sm:p-8 md:p-10">
      {/* 1. Breadcrumb navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/landlord/properties" className="inline-flex items-center gap-1.5">
                <ArrowLeft className="size-3.5" /> My Properties
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-ink">{group.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link
          href="/landlord/properties"
          className="text-xs font-semibold text-brand hover:underline sm:hidden"
        >
          &larr; Back to all properties
        </Link>
      </div>

      {/* 2. Group Header Card with Cover, Details & Actions */}
      <Card className="overflow-hidden rounded-none border border-line bg-white shadow-2xs">
        {/* Cover presentation with fallback */}
        <div className="relative h-44 w-full bg-surface sm:h-52 md:h-60">
          <PropertyCover
            src={group.coverImage}
            folder
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Group badge & basic info overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-end justify-between gap-3 text-white sm:bottom-6 sm:left-6 sm:right-6">
            <div className="min-w-0 space-y-1">
              <span className="inline-flex items-center gap-1.5 rounded bg-white/20 px-2 py-0.5 text-xs font-medium uppercase tracking-wider backdrop-blur-xs">
                <Folder className="size-3" /> Property Group
              </span>
              <h1 id="group-title" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {group.name}
              </h1>
              {group.location && (
                <p className="flex items-center gap-1.5 text-sm text-white/90">
                  <MapPin className="size-4 shrink-0 text-white/80" />
                  <span>{group.location}</span>
                </p>
              )}
            </div>

            {/* Actions on desktop */}
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant="outline"
                className="cursor-pointer border-white/30 bg-white/10 text-white backdrop-blur-xs hover:bg-white hover:text-ink"
                onClick={() => setDialogRequest({ kind: "edit", group })}
              >
                <Pencil className="size-4" /> Edit Group
              </Button>
              {membership.addButton(group)}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label={`More actions for ${group.name}`}
                      className="cursor-pointer border-white/30 bg-white/10 text-white backdrop-blur-xs hover:bg-white hover:text-ink"
                    >
                      <Ellipsis className="size-4" />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-auto min-w-44">
                  <DropdownMenuItem onClick={() => setDialogRequest({ kind: "rename", group })}>
                    <Pencil className="size-4" /> Rename Group
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDialogRequest({ kind: "cover", group })}>
                    <ImagePlus className="size-4" /> Change Cover Image
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setDialogRequest({ kind: "delete", group })}
                  >
                    <Trash2 className="size-4" /> Delete Group
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Mobile action bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line p-4 sm:hidden">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => setDialogRequest({ kind: "edit", group })}
            >
              <Pencil className="size-3.5" /> Edit Group
            </Button>
            {membership.addButton(group)}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="More actions">
                  <Ellipsis className="size-4" />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setDialogRequest({ kind: "rename", group })}>
                <Pencil className="size-4" /> Rename Group
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDialogRequest({ kind: "cover", group })}>
                <ImagePlus className="size-4" /> Change Cover Image
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setDialogRequest({ kind: "delete", group })}
              >
                <Trash2 className="size-4" /> Delete Group
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Description section when available */}
        {group.description && (
          <div className="border-t border-line bg-surface/30 p-4 sm:px-6">
            <p className="text-sm leading-relaxed text-body">{group.description}</p>
          </div>
        )}
      </Card>

      {/* 3. Small row of useful summary cards */}
      <section aria-label="Group Totals" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {/* Total Properties */}
        <Card className="rounded-none border border-line bg-white p-4 shadow-2xs">
          <span className="block text-xs font-semibold uppercase tracking-wider text-faint">
            Properties
          </span>
          <span className="mt-1 block text-xl sm:text-2xl font-bold text-ink">
            {allMembers.length}
          </span>
          <span className="text-xs text-body">
            {allMembers.length === 1 ? "Property assigned" : "Properties assigned"}
          </span>
        </Card>

        {/* Units Occupied (only if properties in group have units data) */}
        {totalUnits !== undefined && occupiedUnits !== undefined && (
          <Card className="rounded-none border border-line bg-white p-4 shadow-2xs">
            <span className="block text-xs font-semibold uppercase tracking-wider text-faint">
              Units Occupied
            </span>
            <span className="mt-1 block text-xl sm:text-2xl font-bold text-ink">
              {occupiedUnits} / {totalUnits}
            </span>
            <span className="text-xs text-body">
              {totalUnits > 0 ? `${Math.round((occupiedUnits / totalUnits) * 100)}% occupied` : "No units"}
            </span>
          </Card>
        )}

        {/* Expected Monthly Rent (only if available) */}
        {expected !== undefined && (
          <Card className="rounded-none border border-line bg-white p-4 shadow-2xs">
            <span className="block text-xs font-semibold uppercase tracking-wider text-faint">
              Expected Rent
            </span>
            <span className="mt-1 block text-xl sm:text-2xl font-bold text-ink">
              {formatCurrencyRwf(expected)}
            </span>
            <span className="text-xs text-body">Monthly projected</span>
          </Card>
        )}

        {/* Rent Collected This Month (only if available) */}
        {collected !== undefined && (
          <Card className="rounded-none border border-line bg-white p-4 shadow-2xs">
            <span className="block text-xs font-semibold uppercase tracking-wider text-faint">
              Rent Collected
            </span>
            <span className="mt-1 block text-xl sm:text-2xl font-bold text-emerald-600">
              {formatCurrencyRwf(collected)}
            </span>
            <span className="text-xs text-body">This calendar month</span>
          </Card>
        )}
      </section>

      {/* 4. Properties in this Group Section */}
      <section aria-label="Properties in this group" className="space-y-4">
        {/* Section Heading & Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border border-line bg-white p-4 shadow-2xs">
          {/* Title & Count Badge */}
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-ink">Properties in this Group</h2>
            <span className="inline-flex items-center rounded-full bg-surface px-2.5 py-0.5 text-xs font-semibold text-faint border border-line">
              {allMembers.length}
            </span>
          </div>

          {/* Search, Filter & View Controls */}
          {allMembers.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Search */}
              <div className="relative min-w-44 flex-1 sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-faint" />
                <input
                  type="text"
                  placeholder="Search in group..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-line bg-surface/40 py-1.5 pl-9 pr-3 text-sm text-ink placeholder:text-faint focus:border-brand focus:outline-none"
                />
              </div>

              {/* Status Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer border-line bg-white text-xs font-medium text-ink"
                    >
                      <SlidersHorizontal className="size-3.5 text-faint" />
                      <span>{filterStatus}</span>
                      <ChevronDown className="size-3 text-faint" />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-40 bg-white">
                  <DropdownMenuItem onClick={() => setFilterStatus("All Statuses")}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("Occupied")}>
                    Fully Occupied
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("Partial")}>
                    Partially Occupied
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("Vacant")}>
                    Vacant
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Grid / List View Toggle */}
              <div
                role="group"
                aria-label="View toggle"
                className="flex items-center gap-1 border border-line bg-white p-0.5"
              >
                {([
                  { mode: "grid", label: "Grid view", icon: "/assets/icons/grid-view.svg" },
                  { mode: "list", label: "List view", icon: "/assets/icons/list-view.svg" },
                ] as const).map(({ mode, label, icon }) => (
                  <button
                    key={mode}
                    type="button"
                    aria-label={label}
                    aria-pressed={viewMode === mode}
                    title={label}
                    onClick={() => setViewMode(mode)}
                    className={`group flex h-8 w-8 cursor-pointer items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                      viewMode === mode
                        ? "bg-brand/10 text-brand"
                        : "text-faint hover:bg-surface hover:text-brand"
                    }`}
                  >
                    <Image
                      src={icon}
                      alt={label}
                      width={16}
                      height={16}
                      unoptimized
                      className={`size-4 transition-all duration-200 group-hover:brightness-0 group-hover:[filter:brightness(0)] ${
                        viewMode === mode ? "brightness-0 [filter:brightness(0)]" : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 5. Properties List / Empty States */}
        {allMembers.length === 0 ? (
          /* Empty Group State */
          <Card className="flex flex-col items-center justify-center gap-4 rounded-none border border-dashed border-line bg-white p-12 text-center shadow-2xs">
            <div className="flex size-14 items-center justify-center rounded-full bg-surface text-faint">
              <FolderOpen className="size-7" />
            </div>
            <div className="max-w-md space-y-1.5">
              <h3 className="text-lg font-bold text-ink">No properties in this group yet</h3>
              <p className="text-sm text-body">
                This group is an organizational folder for your portfolio. Add properties from your portfolio to manage them together.
              </p>
            </div>
            {membership.addButton(group)}
          </Card>
        ) : filteredMembers.length === 0 ? (
          /* Empty Search / Filter State */
          <Card className="flex flex-col items-center justify-center gap-3 rounded-none border border-line bg-white p-8 text-center shadow-2xs">
            <p className="text-sm font-semibold text-ink">No properties match your filter.</p>
            <p className="text-xs text-body">Try clearing your search term or selecting “All Statuses”.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("All Statuses");
              }}
              className="cursor-pointer"
            >
              Reset Filters
            </Button>
          </Card>
        ) : (
          /* Active Properties Listing */
          <EagerCoverContext.Provider value={filteredMembers.find((p) => p.image)?.image}>
            <ul className={cardLayout(viewMode)}>
              {filteredMembers.map((property) => (
                <li key={property.id} className="min-w-0">
                  <PropertyCard
                    property={property}
                    viewMode={viewMode}
                    membershipActions={membership.propertyMenu(property)}
                    action={
                      <Link
                        href={`/landlord/properties/${encodeURIComponent(property.id)}/edit`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                      >
                        <ExternalLink className="size-4" /> Open Property
                      </Link>
                    }
                  />
                </li>
              ))}
            </ul>
          </EagerCoverContext.Provider>
        )}
      </section>

      {/* 6. Developer 2's Membership Dialog (Add / Move / Remove) */}
      {membership.dialog}

      {/* 7. Group Edit / Rename / Cover / Delete Dialog */}
      {dialogRequest && (
        <GroupDialog
          request={dialogRequest}
          onClose={() => setDialogRequest(null)}
          returnFocusId="group-title"
        />
      )}
    </main>
  );
}
