import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { LandlordPropertyItem } from "@/types/landlord";

interface PropertyChecklistProps {
  properties: LandlordPropertyItem[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

export function PropertyChecklist({ properties, selected, onChange }: PropertyChecklistProps) {
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase();
  const matches = properties.filter(({ name, location }) =>
    [name, location].some((value) => value.toLowerCase().includes(query)),
  );

  return (
    <fieldset className="min-w-0 space-y-3">
      <legend className="mb-2 text-sm font-medium">Ungrouped Properties</legend>
      <label className="relative block">
        <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" />
        <span className="sr-only">Search ungrouped properties by name or location</span>
        <Input type="search" className="pl-9" placeholder="Search by name or location"
          onKeyDown={(event) => { if (event.key === "Enter") event.preventDefault(); }}
          value={search} onChange={(event) => setSearch(event.target.value)} />
      </label>
      {matches.length ? (
        <ul className="max-h-56 divide-y divide-line overflow-y-auto overscroll-contain rounded-lg border border-line">
          {matches.map((property) => (
            <li key={property.id}>
              <label className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-surface">
                <input type="checkbox" className="size-4 shrink-0 cursor-pointer accent-brand"
                  checked={selected.includes(property.id)}
                  onChange={(event) => onChange(event.target.checked
                    ? [...selected, property.id]
                    : selected.filter((id) => id !== property.id))} />
                <span className="min-w-0 break-words">
                  <span className="block text-sm font-medium text-ink">{property.name}</span>
                  <span className="block text-xs text-body">{property.location}</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-body">{properties.length ? "No properties match your search." : "There are no ungrouped properties to add."}</p>
      )}
      <p role="status" className="text-sm font-medium">{selected.length} selected</p>
    </fieldset>
  );
}
