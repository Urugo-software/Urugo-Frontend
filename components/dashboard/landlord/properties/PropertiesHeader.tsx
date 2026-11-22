import Link from "next/link";
import { FolderPlus, Plus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export function   AddPropertyLink() {
  return (
    <Link href="/landlord/properties/new" className={buttonVariants({ size: "lg" })}>
      <Plus aria-hidden="true" /> Add Property
    </Link>
  );
}

export function PropertiesHeader({ onCreateGroup }: { onCreateGroup?: () => void }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:border-b border-line md:pb-5">
      <div>
        <h1 id="portfolio-title" tabIndex={-1} className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
          My Properties
        </h1>
        <p className="mt-1 text-[15px] text-body">
          Manage your real estate portfolio, unit occupancy, and rental
          revenues.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {onCreateGroup && (
          <Button id="create-property-group" variant="outline" size="lg" onClick={onCreateGroup}>
            <FolderPlus aria-hidden="true" /> Create Group
          </Button>
        )}
        <AddPropertyLink />
      </div>
    </div>
  );
}
