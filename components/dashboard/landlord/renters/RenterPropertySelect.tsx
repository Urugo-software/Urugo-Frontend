"use client";

import { Building2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RenterPropertySelectProps } from "./types/renter-registration.types";

export function RenterPropertySelect({
  properties,
  selectedPropertyId,
  emptyLabel,
  onSelect,
}: RenterPropertySelectProps) {
  const selectedProperty = properties.find((p) => p.id === selectedPropertyId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="group flex h-11 w-full cursor-pointer items-center justify-between rounded-none border border-line bg-white px-3.5 text-sm font-normal text-ink hover:bg-surface focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
          >
            <span className="flex items-center gap-2 truncate">
              <Building2 className="size-4 shrink-0 text-faint" />
              <span className="truncate">
                {selectedProperty
                  ? `${selectedProperty.name} (${selectedProperty.location})`
                  : emptyLabel}
              </span>
            </span>
            <ChevronDown className="size-4 shrink-0 text-faint transition-transform duration-200 group-data-popup-open:rotate-180 group-data-open:rotate-180" />
          </Button>
        }
      />

      <DropdownMenuContent
        align="start"
        className="w-(--anchor-width) rounded-none border border-line bg-white p-1.5 shadow-md"
      >
        <DropdownMenuItem
          onClick={() => onSelect("")}
          className="cursor-pointer rounded-none py-2.5 text-sm"
        >
          {emptyLabel}
        </DropdownMenuItem>
        {properties.map((property) => (
          <DropdownMenuItem
            key={property.id}
            onClick={() => onSelect(property.id)}
            className="cursor-pointer rounded-none py-2.5 text-sm"
          >
            <div className="flex flex-col">
              <span className="font-medium text-ink">{property.name}</span>
              <span className="text-xs text-faint">{property.location}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
