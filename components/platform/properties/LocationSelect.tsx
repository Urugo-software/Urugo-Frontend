"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { propertyLocations } from "@/data/properties";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

function LocationSelect() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const handleLocationSelect = (location: string) => {
    console.log("Selected location:", location);
    setSelectedLocation(location);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex w-full items-center justify-between border border-line bg-white px-3 py-2.5 text-[13.5px] text-body hover:bg-surface">
        <span>{selectedLocation || "All districts"}</span>
        <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-popup-open:rotate-180 group-data-open:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-(--anchor-width) bg-white"
      >
        {propertyLocations.map((location) => (
          <DropdownMenuItem
            key={location.id}
            onClick={() => handleLocationSelect(location.name)}
          >
            {location.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LocationSelect;
