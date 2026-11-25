"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight, ScrollText } from "lucide-react";
import { useTranslations } from "next-intl";
import type { PropertyGroup } from "@/types/landlord";

interface PropertyTenancyBreadcrumbProps {
  currentLabel: string;
  group?: PropertyGroup;
}

export function PropertyTenancyBreadcrumb({
  currentLabel,
  group,
}: PropertyTenancyBreadcrumbProps) {
  const t = useTranslations("landlord.tenancies.propertyView");
  const tBreadcrumbs = useTranslations("common.breadcrumbs");

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <nav
        aria-label={tBreadcrumbs("ariaLabel")}
        className="flex flex-wrap items-center gap-2 text-sm text-body"
      >
        <Link
          href="/landlord/properties"
          className="inline-flex items-center gap-1.5 font-medium text-body transition-colors hover:text-ink hover:underline"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span>{t("myProperties")}</span>
        </Link>

        {group && (
          <>
            <ChevronRight aria-hidden="true" className="size-4 text-faint" />
            <Link
              href={`/landlord/properties/groups/${encodeURIComponent(group.id)}`}
              className="truncate font-medium text-body transition-colors hover:text-ink hover:underline"
            >
              {group.name}
            </Link>
          </>
        )}

        <ChevronRight aria-hidden="true" className="size-4 text-faint" />
        <span aria-current="page" className="truncate font-semibold text-ink">
          {currentLabel}
        </span>
      </nav>

      <Link
        href="/landlord/tenancies"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
      >
        <ScrollText aria-hidden="true" className="size-4" />
        <span>{t("allTenancies")}</span>
      </Link>
    </div>
  );
}
