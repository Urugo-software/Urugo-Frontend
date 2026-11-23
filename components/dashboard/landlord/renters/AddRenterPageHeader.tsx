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
    </header>
  );
}
