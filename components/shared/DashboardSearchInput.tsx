"use client";

import { useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DashboardSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  className?: string;
  inputClassName?: string;
  showSubmitButton?: boolean;
  onSubmitSearch?: (value: string) => void;
  preventFormEnter?: boolean;
}

export function DashboardSearchInput({
  value,
  onChange,
  placeholder,
  label,
  className,
  inputClassName,
  showSubmitButton = false,
  onSubmitSearch,
  preventFormEnter = false,
}: DashboardSearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    inputRef.current?.blur();
    onSubmitSearch?.(value.trim());
  };

  const inner = (
    <div className="relative flex min-w-0 flex-1 items-center">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint"
      />
      <label className="w-full">
        <span className="sr-only">{label}</span>
        <Input
          ref={inputRef}
          type="search"
          inputMode="search"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={
            preventFormEnter
              ? (event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    inputRef.current?.blur();
                  }
                }
              : undefined
          }
          className={cn(
            "h-10 w-full rounded-none border-line bg-white pl-9 pr-9 text-sm text-ink placeholder:text-faint [&::-webkit-search-cancel-button]:hidden",
            inputClassName,
          )}
        />
      </label>
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
          className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center text-faint transition-colors hover:text-ink"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      )}
    </div>
  );

  if (preventFormEnter) {
    return <div className={cn("flex min-w-0 items-center", className)}>{inner}</div>;
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn("flex min-w-0 items-center gap-2", className)}
    >
      {inner}
      {showSubmitButton && (
        <button
          type="submit"
          aria-label="Run search"
          className="flex h-10 shrink-0 cursor-pointer items-center gap-1.5 border border-line bg-ink px-3.5 text-xs font-semibold text-white transition-colors hover:bg-ink/90"
        >
          <Search aria-hidden="true" className="size-3.5" />
          <span>Search</span>
        </button>
      )}
    </form>
  );
}
