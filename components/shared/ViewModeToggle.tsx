"use client";

import { LayoutGrid, List } from "lucide-react";
import { useTranslations } from "next-intl";

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
  label,
}: ViewModeToggleProps) {
  const t = useTranslations("common.viewMode");

  return (
    <div
      role="group"
      aria-label={label ?? t("switchLayout")}
      className="hidden items-center border border-line bg-white p-0.5 md:flex"
    >
      {(
        [
          { mode: "grid", itemLabel: t("grid"), Icon: LayoutGrid },
          { mode: "list", itemLabel: t("list"), Icon: List },
        ] as const
      ).map(({ mode, itemLabel, Icon }) => {
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
