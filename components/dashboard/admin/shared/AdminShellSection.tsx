"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

interface AdminShellSectionProps {
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
  badgeText?: string;
}

export function AdminShellSection({
  title,
  description,
  action,
  children,
  badgeText,
}: AdminShellSectionProps) {
  const t = useTranslations("admin.common");

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-surface/30">
      <div className="mx-auto max-w-[1500px] space-y-6 p-4 pb-16 sm:p-8 md:p-10">
        <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {title}
            </h2>
            <p className="mt-1 text-sm text-body">{description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="border border-line bg-white px-3 py-1.5 text-xs font-semibold text-body">
              {badgeText ?? t("simulatedModeBadge")}
            </span>
            {action}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
