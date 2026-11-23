import Link from "next/link";
import { FolderPlus, Plus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AddPropertyLink({
  compactOnMobile = false,
}: {
  compactOnMobile?: boolean;
}) {
  return (
    <Link
      href="/landlord/properties/new"
      title={compactOnMobile ? "Add Property" : undefined}
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "rounded-none",
        compactOnMobile && "size-9 px-0 sm:w-auto sm:px-2.5",
      )}
    >
      <Plus aria-hidden="true" />
      <span className={compactOnMobile ? "sr-only sm:not-sr-only" : undefined}>
        Add Property
      </span>
    </Link>
  );
}

export function PropertiesHeader({
  onCreateGroup,
}: {
  onCreateGroup?: () => void;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 sm:gap-x-4 md:border-b/98 border-line md:pb-5">
      <h1
        id="portfolio-title"
        tabIndex={-1}
        className="text-2xl sm:text-3xl font-bold text-ink tracking-tight"
      >
        My Properties
      </h1>

      <div className="flex shrink-0 items-center gap-2 sm:row-span-2 sm:self-center">
        {onCreateGroup && (
          <Button
            id="create-property-group"
            variant="outline"
            size="lg"
            title="Create Group"
            className="size-9 rounded-none px-0 sm:w-auto sm:px-2.5"
            onClick={onCreateGroup}
          >
            <FolderPlus aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Create Group</span>
          </Button>
        )}
        <AddPropertyLink compactOnMobile />
      </div>

      <p className="col-span-2 text-[15px] text-body sm:col-span-1">
        Manage your real estate portfolio, unit occupancy, and rental revenues.
      </p>
    </div>
  );
}
