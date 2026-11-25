"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { cn } from "@/lib/utils";

interface TenancySubmittedCardProps {
  totalOwed: number;
  createdIssueId?: string;
}

export function TenancySubmittedCard({
  totalOwed,
  createdIssueId,
}: TenancySubmittedCardProps) {
  const t = useTranslations("landlord.tenancies.endWorkflow");
  const locale = useLocale() as AppLocale;

  return (
    <div className="space-y-4 border border-emerald-200 bg-emerald-50/70 p-6 text-center">
      <div className="mx-auto flex size-12 items-center justify-center border border-emerald-200 bg-white text-emerald-600">
        <CheckCircle2 aria-hidden="true" className="size-6" />
      </div>
      <h3 className="text-base font-bold text-ink">{t("submittedTitle")}</h3>
      <p className="mx-auto max-w-md text-xs leading-relaxed text-body">
        {totalOwed > 0
          ? t("submittedDescWithBalance", {
              amount: formatRwfLocalized(totalOwed, locale),
            })
          : t("submittedDescZero")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <Link
          href="/landlord/tenancies"
          className={cn(buttonVariants({ variant: "default" }), "rounded-none text-xs")}
        >
          {t("backToTenancies")}
        </Link>
        {createdIssueId && (
          <Link
            href={`/landlord/renter-history/${createdIssueId}`}
            className={cn(buttonVariants({ variant: "outline" }), "rounded-none text-xs")}
          >
            {t("viewHistoryCase")}
          </Link>
        )}
      </div>
    </div>
  );
}
