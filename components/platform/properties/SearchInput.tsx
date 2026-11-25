"use client";

import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  className?: string;
}

function SearchInput({
  value,
  onChange,
  onSubmit,
  className = "",
}: SearchInputProps) {
  return (
    <form
      role="search"
      aria-label="Search rental listings"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="flex items-center border border-line bg-white transition-all duration-200 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20"
    >
      <Search aria-hidden="true" size={16} className="ml-3 shrink-0 text-faint" />
      <label htmlFor="public-properties-search" className="sr-only">
        Search by neighborhood, district, or property name
      </label>
      <input
        id="public-properties-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by location, district, or home type (e.g. Kimironko)..."
        className={`min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-faint focus:outline-none ${className}`}
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="mr-1 inline-flex size-8 cursor-pointer items-center justify-center text-faint hover:text-ink"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      )}
      <button
        type="submit"
        className="h-full shrink-0 cursor-pointer border-l border-line bg-brand px-4 py-3 text-xs font-semibold text-white transition-colors hover:bg-brand-deep sm:px-5 sm:text-sm"
      >
        Search
      </button>
    </form>
  );
}

export default SearchInput;
