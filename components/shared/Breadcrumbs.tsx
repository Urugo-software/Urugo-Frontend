"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("common.breadcrumbs");
  const resolveLabel = (label: string) =>
    label === "Properties" ? t("properties") : label;

  const fallbackBack = items[0];
  const backHref = mobileBackHref ?? fallbackBack?.href ?? "/properties";
  const backLabel =
    mobileBackLabel ??
    t("backTo", {
      label: resolveLabel(fallbackBack?.label ?? "Properties"),
    });

  return (
    <nav aria-label={t("ariaLabel")} className="mb-5">
      <div className="flex items-center justify-between gap-3 sm:hidden">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-deep"
        >
          <ArrowLeft aria-hidden="true" className="size-4 shrink-0" />
          <span>{backLabel}</span>
        </Link>
      </div>

      <ol className="hidden flex-wrap items-center gap-1.5 text-sm text-faint sm:flex">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const displayLabel = resolveLabel(item.label);
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
                  {displayLabel}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="whitespace-nowrap transition-colors hover:text-brand hover:underline"
                >
                  {displayLabel}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
