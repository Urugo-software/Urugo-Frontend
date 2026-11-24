import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

interface GroupBreadcrumbProps {
  currentLabel: string;
}

export function GroupBreadcrumb({ currentLabel }: GroupBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-sm text-body"
    >
      <Link
        href="/landlord/properties"
        className="inline-flex items-center gap-1.5 font-medium text-body transition-colors hover:text-ink hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        <span>My Properties</span>
      </Link>
      <ChevronRight aria-hidden="true" className="size-4 text-faint" />
      <span
        aria-current="page"
        className="truncate font-semibold text-ink"
      >
        {currentLabel}
      </span>
    </nav>
  );
}
