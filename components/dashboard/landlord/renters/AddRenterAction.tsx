import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AddRenterAction() {
  return (
    <Link
      href="/landlord/renters/add"
      aria-label="Add renter"
      className={cn(
        buttonVariants({ variant: "default" }),
        "h-10 shrink-0 rounded-none px-3 sm:px-4",
      )}
    >
      <Plus aria-hidden="true" className="size-4" />
      <span className="hidden sm:inline">Add Renter</span>
    </Link>
  );
}
