"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, FileEdit, Clock } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/config";
import { formatDateLocalized } from "@/i18n/formatting";
import { RenterChangeRequest } from "@/types/agreement.types";

interface Props {
  agreementId: string;
  changeRequests: RenterChangeRequest[];
}

export function RenterChangeRequestBanner({
  agreementId,
  changeRequests,
}: Props) {
  const t = useTranslations("landlord.agreements.preview.changeRequestBanner");
  const locale = useLocale() as AppLocale;

  if (!changeRequests || changeRequests.length === 0) return null;

  return (
    <div className="space-y-4 border border-amber-300 bg-amber-50/50 p-5 print:hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 grid size-7 shrink-0 place-items-center bg-amber-200 text-amber-900">
            <AlertTriangle className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-950 sm:text-[15px]">
              {t("title", { count: changeRequests.length })}
            </h3>
            <p className="mt-0.5 text-[13px] text-amber-900/80">
              {t("subtitle")}
            </p>
          </div>
        </div>

        <Link
          href={`/landlord/agreements/${agreementId}/edit`}
          className="inline-flex h-8.5 shrink-0 items-center justify-center gap-1.5 bg-amber-900 px-3.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-black"
        >
          <FileEdit className="size-3.5" />
          <span>{t("openEditor")}</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>

      <div className="space-y-2.5 border-t border-amber-200/80 pt-3">
        {changeRequests.map((cr) => (
          <div
            key={cr.id}
            className="space-y-1.5 border border-amber-200/90 bg-white p-3.5 text-[13px] text-ink"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-1.5">
              <span className="text-[13.5px] font-bold text-ink">
                {t("articleHeader", {
                  number: cr.articleNumber,
                  title: cr.articleTitle,
                })}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[12.5px] text-faint">
                <Clock className="size-3.5" />
                {formatDateLocalized(cr.createdAt, locale)}
              </span>
            </div>
            <div>
              <span className="block text-[12.5px] font-semibold uppercase tracking-wider text-amber-950">
                {t("requestedAdjustment")}
              </span>
              <p className="mt-0.5 leading-relaxed text-ink">
                {cr.requestedChange}
              </p>
            </div>
            {cr.reason && (
              <div>
                <span className="block text-[12.5px] font-semibold uppercase tracking-wider text-faint">
                  {t("renterExplanation")}
                </span>
                <p className="mt-0.5 italic leading-relaxed text-faint">
                  &ldquo;{cr.reason}&rdquo;
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
