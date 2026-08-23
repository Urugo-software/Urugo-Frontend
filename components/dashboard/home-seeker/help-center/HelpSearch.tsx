"use client";

import { Search } from "lucide-react";

interface HelpSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function HelpSearch({ value, onChange }: HelpSearchProps) {
  return (
    <label className="relative mt-7 block">
      <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-faint" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for help"
        className="w-full  border border-line py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/15"
      />
    </label>
  );
}
