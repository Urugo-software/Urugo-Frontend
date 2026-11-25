"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/config";
import { formatDateLocalized } from "@/i18n/formatting";
import type { Agreement } from "@/types/agreement.types";
import { AgreementStatusBadge } from "../AgreementStatusBadge";
import { AgreementRowActions } from "./AgreementRowActions";

interface AgreementMobileListProps {
  agreements: Agreement[];
}

export function AgreementMobileList({ agreements }: AgreementMobileListProps) {
  const t = useTranslations("landlord.agreements.list");
  const locale = useLocale() as AppLocale;

  return (
    <div className="divide-y divide-line border border-line bg-white shadow-2xs md:hidden">
      {agreements.map((agreement) => (
        <article key={agreement.id} className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                href={`/landlord/agreements/${agreement.id}`}
                className="block truncate text-base font-semibold text-ink hover:underline"
              >
                {agreement.renter.name}
              </Link>
              <span className="mt-0.5 block font-ibm text-[13px] text-faint">
                {agreement.referenceNumber}
              </span>
            </div>

            <AgreementStatusBadge
              status={agreement.status}
              showDot={false}
              className="text-sm"
            />
          </div>

          <div>
            <p className="text-[15px] font-medium text-ink">
              {agreement.property.name}
            </p>
            <p className="mt-0.5 text-[13.5px] text-body">
              {t("unitLabel", { unit: agreement.property.unitNumber })} &middot;{" "}
              {agreement.property.district}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-line/70 pt-3">
            <span className="text-sm font-medium text-body">
              {t("updatedPrefix", {
                date: formatDateLocalized(agreement.updatedAt, locale),
              })}
            </span>
            <AgreementRowActions agreement={agreement} />
          </div>
        </article>
      ))}
    </div>
  );
}
