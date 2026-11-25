"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, FolderOpen, FolderX, SearchX } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateVariant = "not-found" | "empty-group" | "no-matches";

interface GroupEmptyStateProps {
  variant: EmptyStateVariant;
  action?: ReactNode;
  onClearFilters?: () => void;
}

const ICON_BY_VARIANT: Record<
  EmptyStateVariant,
  {
    icon: React.ComponentType<{ className?: string }>;
    titleKey: string;
    descKey: string;
  }
> = {
  "not-found": {
    icon: FolderX,
    titleKey: "notFoundTitle",
    descKey: "notFoundDesc",
  },
  "empty-group": {
    icon: FolderOpen,
    titleKey: "emptyGroupTitle",
    descKey: "emptyGroupDesc",
  },
  "no-matches": {
    icon: SearchX,
    titleKey: "noMatchesTitle",
    descKey: "noMatchesDesc",
  },
};

export function GroupEmptyState({
  variant,
  action,
  onClearFilters,
}: GroupEmptyStateProps) {
  const t = useTranslations("landlord.properties.groupEmpty");
  const { icon: Icon, titleKey, descKey } = ICON_BY_VARIANT[variant];

  return (
    <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-line bg-white px-6 py-12 text-center shadow-2xs">
      <div className="flex size-12 items-center justify-center border border-line bg-surface text-faint">
        <Icon className="size-6" />
      </div>

      <div className="max-w-md space-y-1">
        <h2 className="text-lg font-semibold text-ink">{t(titleKey)}</h2>
        <p className="text-sm leading-relaxed text-body">{t(descKey)}</p>
      </div>

      {variant === "not-found" && (
        <Link
          href="/landlord/properties"
          className={cn(buttonVariants({ variant: "outline" }), "rounded-none")}
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          {t("returnToProperties")}
        </Link>
      )}

      {variant === "empty-group" && action}

      {variant === "no-matches" && onClearFilters && (
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer rounded-none"
          onClick={onClearFilters}
        >
          {t("clearFilters")}
        </Button>
      )}
    </div>
  );
}
