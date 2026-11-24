"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ViewMode } from "@/components/dashboard/landlord/properties/PortfolioCard";

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
  label?: string;
}

export function ViewModeToggle({
  value,
  onChange,
  label = "Switch layout view",
}: ViewModeToggleProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="hidden items-center border border-line bg-white p-0.5 md:flex"
    >
      {(
        [
          { mode: "grid", label: "Grid view", Icon: LayoutGrid },
          { mode: "list", label: "List view", Icon: List },
        ] as const
      ).map(({ mode, label: itemLabel, Icon }) => {
        const active = value === mode;
        return (
          <Button
            key={mode}
            type="button"
            size="icon"
            variant={active ? "default" : "ghost"}
            aria-label={itemLabel}
            aria-pressed={active}
            onClick={() => onChange(mode)}
            className="size-8 cursor-pointer rounded-none"
          >
            <Icon className="size-4" />
          </Button>
        );
      })}
    </div>
  );
}
