import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";

interface PropertiesToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onFilterChange: (value: string) => void;
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
}

export function PropertiesToolbar({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  viewMode,
  onViewModeChange,
}: PropertiesToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border border-line bg-white p-4  shadow-2xs">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-faint" />
        <input
          type="text"
          placeholder="Search property name or location..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 lg:py-3 text-sm border border-line bg-surface/40 text-ink focus:outline-none focus:border-brand rounded-none"
        />
      </div>

      <div className="flex items-center gap-2 max-md:ml-auto md:ml-10">
        <SlidersHorizontal className="h-4 w-4 text-faint" />
        <span className="text-xs font-semibold uppercase tracking-wider text-faint hidden sm:inline">
          Status:
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant={"outline"}
                className="group px-3 duration-400 cursor-pointer py-2 text-sm border border-line bg-white text-ink focus-within:no-bg focus:outline-none focus:border-brand rounded-none"
              >
                {filterStatus}
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-popup-open:rotate-180 group-data-open:rotate-180" />
              </Button>
            }
          />

          <DropdownMenuContent
            align="start"
            className="w-(--anchor-width) min-w-42 bg-white"
          >
            <DropdownMenuItem onClick={() => onFilterChange("All Statuses")}>
              All Statuses
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange("Occupied")}>
              Fully Occupied
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange("Partial")}>
              Partially Occupied
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange("Vacant")}>
              Vacant
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {onViewModeChange && viewMode && (
          <div
            role="group"
            aria-label="Property display"
            className="flex items-center gap-1 border border-line bg-white p-1 ml-2"
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
                onClick={() => onViewModeChange(mode)}
                className={`group flex h-9 w-9 cursor-pointer items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                  viewMode === mode
                    ? "bg-brand/10 text-brand"
                    : "text-faint hover:bg-surface hover:text-brand"
                }`}
              >
                <Image
                  src={icon}
                  alt={label}
                  width={18}
                  height={18}
                  unoptimized
                  className={`h-4.5 w-4.5 transition-all duration-200 group-hover:brightness-0 group-hover:[filter:brightness(0)] ${
                    viewMode === mode ? "brightness-0 [filter:brightness(0)]" : ""
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
