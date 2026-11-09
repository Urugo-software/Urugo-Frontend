import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AddRenterAction() {
  return (
    <Link href="/landlord/renters/add">
      <Button
        type="button"
        className="h-10 cursor-pointer gap-2 rounded-none bg-brand-blue border border-line px-4 text-sm font-semibold text-white hover:bg-brand-deep"
      >
        <Plus className="size-4" />
        <span>Add Renter</span>
      </Button>
    </Link>
  );
}
