"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface RenterSearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function RenterSearchFilter({
  searchQuery,
  onSearchChange,
}: RenterSearchFilterProps) {
  return (
    <div className="relative h-full w-full max-w-sm">
      <Search className="absolute  left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
      <Input
        type="text"
        placeholder="Search by renter name, property..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9 py-2.5 h-full rounded-none text-[14px] "
      />
    </div>
  );
}
