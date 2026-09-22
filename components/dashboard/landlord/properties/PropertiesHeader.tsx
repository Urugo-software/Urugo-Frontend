import Link from "next/link";
import { Plus } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";

export function PropertiesHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:border-b border-line md:pb-5">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
          My Properties
        </h1>
        <p className="mt-1 text-[15px] text-body">
          Manage your real estate portfolio, unit occupancy, and rental
          revenues.
        </p>
      </div>

      <Link className="max-md:hidden" href="/landlord/properties/new">
        <CustomButton
          title="Add New Property"
          variant="colored"
          className="rounded-none"
        >
          <Plus className="h-4 w-4" />
        </CustomButton>
      </Link>
    </div>
  );
}
