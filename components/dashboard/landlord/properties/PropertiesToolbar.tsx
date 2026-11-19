import { ChevronDown, LayoutGrid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { ViewMode } from "./PortfolioCard";

interface ToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onFilterChange: (value: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  groupOrder: string;
  onOrderChange: (value: string) => void;
  showGroupOrder: boolean;
}

function FilterMenu({ label, value, options, onChange }: {
  label: string;
  value: string;
  options: Record<string, string>;
  onChange: (value: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" aria-label={`${label}: ${options[value]}`}>{options[value]}<ChevronDown /></Button>} />
      <DropdownMenuContent align="end" className="w-auto min-w-40">
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {Object.entries(options).map(([key, text]) => <DropdownMenuRadioItem key={key} value={key}>{text}</DropdownMenuRadioItem>)}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function PropertiesToolbar(props: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 border border-line bg-white p-3 shadow-2xs">
      <label className="relative min-w-0 basis-full sm:min-w-48 sm:flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
        <span className="sr-only">Search groups and properties</span>
        <Input type="search" placeholder="Search by name or location" value={props.searchTerm}
          onChange={(event) => props.onSearchChange(event.target.value)} className="pl-9" />
      </label>
      <FilterMenu label="Property status" value={props.filterStatus} onChange={props.onFilterChange}
        options={{ all: "All statuses", Occupied: "Fully occupied", Partial: "Partially occupied", Vacant: "Vacant" }} />
      {props.showGroupOrder && <FilterMenu label="Group order" value={props.groupOrder} onChange={props.onOrderChange}
        options={{ custom: "Group order", name: "Group name A–Z" }} />}
      <div role="group" aria-label="Property display" className="ml-auto flex gap-1">
        {(["grid", "list"] as const).map((mode) => {
          const Icon = mode === "grid" ? LayoutGrid : List;
          return <Button key={mode} size="icon" variant={props.viewMode === mode ? "secondary" : "ghost"}
            aria-label={mode === "grid" ? "Grid view" : "List view"} aria-pressed={props.viewMode === mode}
            onClick={() => props.onViewModeChange(mode)}><Icon /></Button>;
        })}
      </div>
    </div>
  );
}
