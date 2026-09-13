import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";

interface PropertiesToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onFilterChange: (value: string) => void;
}

export function PropertiesToolbar({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
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
      </div>
    </div>
  );
}
