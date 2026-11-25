"use client";

import Link from "next/link";
import { FolderPlus, Plus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";

export function AddPropertyLink({
  compactOnMobile = false,
}: {
  compactOnMobile?: boolean;
}) {
  const serviceMode = useLandlordWorkspace((s) => s.serviceMode);
  const label = serviceMode === "listing_only" ? "Add Listing" : "Add Property";

  return (
    <Link
      href="/landlord/properties/new"
      title={compactOnMobile ? label : undefined}
      className={cn(
        buttonVariants({ variant: "default", size: "lg" }),
        "rounded-none",
        compactOnMobile && "size-10 px-0 sm:w-auto sm:px-3.5",
      )}
    >
      <Plus aria-hidden="true" className="size-4" />
      <span className={compactOnMobile ? "sr-only sm:not-sr-only" : undefined}>
        {label}
      </span>
    </Link>
  );
}

export function PropertiesHeader({
  onCreateGroup,
}: {
  onCreateGroup?: () => void;
}) {
  const serviceMode = useLandlordWorkspace((s) => s.serviceMode);

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 border-line sm:gap-x-4 md:border-b md:pb-5">
      <h2
        id="portfolio-title"
        tabIndex={-1}
        className="text-2xl font-bold tracking-tight text-ink sm:text-3xl"
      >
        My Properties
      </h2>

      <div className="flex shrink-0 items-center gap-2 sm:row-span-2 sm:self-center">
        {onCreateGroup && (
          <Button
            id="create-property-group"
            type="button"
            variant="outline"
            size="lg"
            title="Create Group"
            className="size-10 cursor-pointer rounded-none px-0 sm:w-auto sm:px-3.5"
            onClick={onCreateGroup}
          >
            <FolderPlus aria-hidden="true" className="size-4" />
            <span className="sr-only sm:not-sr-only">Create Group</span>
          </Button>
        )}
        <AddPropertyLink compactOnMobile />
      </div>

      <p className="col-span-2 text-sm text-body sm:col-span-1">
        {serviceMode === "listing_only"
          ? "Publish, pause, update, and organize your advertised rental listings."
          : "Manage your real estate portfolio, listing visibility, unit occupancy, and rent."}
      </p>
    </div>
  );
}
