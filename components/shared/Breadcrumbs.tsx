import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { BreadcrumbItem } from "@/utils/public-properties";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  mobileBackHref?: string;
  mobileBackLabel?: string;
}

export function Breadcrumbs({
  items,
  mobileBackHref,
  mobileBackLabel,
}: BreadcrumbsProps) {
  const fallbackBack = items[0];
  const backHref = mobileBackHref ?? fallbackBack?.href ?? "/properties";
  const backLabel = mobileBackLabel ?? `Back to ${fallbackBack?.label ?? "Properties"}`;

  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      {/* Compact mobile back navigation */}
      <div className="flex items-center justify-between gap-3 sm:hidden">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-deep"
        >
          <ArrowLeft aria-hidden="true" className="size-4 shrink-0" />
          <span>{backLabel}</span>
        </Link>
      </div>

      {/* Full structured breadcrumb trail on sm+ */}
      <ol className="hidden flex-wrap items-center gap-1.5 text-sm text-faint sm:flex">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className="flex min-w-0 items-center gap-1.5"
            >
              {index > 0 && (
                <ChevronRight
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-faint/70"
                />
              )}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="max-w-[260px] truncate font-medium text-ink"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="whitespace-nowrap transition-colors hover:text-brand hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
