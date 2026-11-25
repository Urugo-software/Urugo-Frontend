"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { AttentionItem } from "@/types/landlord";

interface LandlordAttentionCardProps {
  items: AttentionItem[];
}

export function LandlordAttentionCard({ items }: LandlordAttentionCardProps) {
  const t = useTranslations("landlord.overview.attention");

  return (
    <div className="flex h-full flex-col justify-between space-y-4 border border-line bg-white p-5 shadow-2xs sm:p-6">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
          {t("heading")}
        </h3>

        {items.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2
              aria-hidden="true"
              className="size-7 text-emerald-600"
            />
            <p className="mt-3 text-sm font-semibold text-ink">
              {t("allCaughtUp")}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-body">
              {t("allCaughtUpDesc")}
            </p>
          </div>
        ) : (
          <div className="mt-5 flex flex-col gap-3.5">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-4 border border-line bg-surface/40 p-4"
              >
                <p className="text-sm font-semibold leading-snug text-ink">
                  {item.title}
                </p>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline"
                >
                  <span>{item.actionText}</span>
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
