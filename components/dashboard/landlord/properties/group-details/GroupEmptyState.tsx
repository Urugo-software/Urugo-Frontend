import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, FolderOpen, FolderX, SearchX } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateVariant = "not-found" | "empty-group" | "no-matches";

interface GroupEmptyStateProps {
  variant: EmptyStateVariant;
  action?: ReactNode;
  onClearFilters?: () => void;
}

const contentByVariant: Record<
  EmptyStateVariant,
  {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }
> = {
  "not-found": {
    icon: FolderX,
    title: "Group not found",
    description:
      "This property group is no longer in your portfolio. It may have been deleted or the link may be outdated.",
  },
  "empty-group": {
    icon: FolderOpen,
    title: "No properties in this group yet",
    description:
      "Add properties from your portfolio to organize them under this group and track their combined occupancy and rent.",
  },
  "no-matches": {
    icon: SearchX,
    title: "No matching properties",
    description:
      "Try adjusting your search query or switching the status filter back to all statuses.",
  },
};

export function GroupEmptyState({
  variant,
  action,
  onClearFilters,
}: GroupEmptyStateProps) {
  const { icon: Icon, title, description } = contentByVariant[variant];

  return (
    <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-line bg-white px-6 py-12 text-center shadow-2xs">
      <div className="flex size-12 items-center justify-center border border-line bg-surface text-faint">
        <Icon className="size-6" />
      </div>

      <div className="max-w-md space-y-1">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <p className="text-sm leading-relaxed text-body">{description}</p>
      </div>

      {variant === "not-found" && (
        <Link
          href="/landlord/properties"
          className={cn(buttonVariants({ variant: "outline" }), "rounded-none")}
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Return to My Properties
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
          Clear filters
        </Button>
      )}
    </div>
  );
}
