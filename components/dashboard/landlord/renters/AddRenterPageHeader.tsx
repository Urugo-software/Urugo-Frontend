import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AddRenterPageHeader() {
  return (
    <header className="space-y-3.5">
      <Link
        href="/landlord/renters"
        className="inline-flex items-center gap-2 text-sm font-semibold text-faint transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
      >
        <ArrowLeft className="size-4" />
        <span>Back to Renters</span>
      </Link>

      {/* <div>
        <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          Add Renter
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-body">
          Register a renter into your directory and optionally configure their
          tenancy terms, monthly rent, and initial move-in payment schedule.
        </p>
      </div> */}
    </header>
  );
}
