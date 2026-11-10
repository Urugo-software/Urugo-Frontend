import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AddRenterAction() {
  return (
    <Link href="/landlord/renters/add">
      <Button
        type="button"
        className="h-10 cursor-pointer gap-2 rounded-none bg-ink border border-line px-4 text-sm font-semibold text-white hover:bg-gray-100/60 hover:text-ink "
      >
        <Plus className="size-4" />
        <span>Add Renter</span>
      </Button>
    </Link>
  );
}
