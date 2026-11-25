"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface GroupBreadcrumbProps {
  currentLabel: string;
}

export function GroupBreadcrumb({ currentLabel }: GroupBreadcrumbProps) {
  const t = useTranslations("landlord.properties");
  const tBreadcrumbs = useTranslations("common.breadcrumbs");

  return (
    <nav
      aria-label={tBreadcrumbs("ariaLabel")}
      className="flex flex-wrap items-center gap-2 text-sm text-body"
    >
      <Link
        href="/landlord/properties"
        className="inline-flex items-center gap-1.5 font-medium text-body transition-colors hover:text-ink hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        <span>{t("title")}</span>
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
