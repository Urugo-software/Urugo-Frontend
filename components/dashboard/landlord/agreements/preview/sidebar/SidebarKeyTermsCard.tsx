"use client";

import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/config";
import { formatDateLocalized, formatRwfLocalized } from "@/i18n/formatting";
import { AgreementFinancials } from "@/types/agreement.types";
import {
  formatCommencementDisplay,
  getOrdinalSuffix,
} from "@/utils/rent-schedule-utils";

interface Props {
  financials: AgreementFinancials;
  tenancyStartDate: string;
  tenancyDurationMonths?: number;
}

export function SidebarKeyTermsCard({
  financials,
  tenancyStartDate,
  tenancyDurationMonths,
}: Props) {
  const t = useTranslations("landlord.agreements.preview.sidebar");
  const tMeta = useTranslations("landlord.agreements.editor.metadata");
  const locale = useLocale() as AppLocale;

  const commencement = formatCommencementDisplay({
    startDate: tenancyStartDate,
    language: locale === "rw" ? "rw" : "en",
  });
  const commencementDisplay = commencement.isPending
    ? commencement.display
    : formatDateLocalized(tenancyStartDate, locale);

  const dueDay = financials.paymentDueDay || 1;
  const dayOrdinal =
    locale === "rw" ? String(dueDay) : `${dueDay}${getOrdinalSuffix(dueDay)}`;
  const dueDayText =
    dueDay >= 29
      ? tMeta("dueDayMonthEnd", { dayOrdinal })
      : tMeta("dueDayDisplay", { dayOrdinal });

  return (
    <div className="space-y-3.5 border border-line bg-white p-5 text-[12.5px]">
      <h3 className="border-b border-line pb-2.5 font-semibold uppercase tracking-wider text-faint">
        {t("keyTermsTitle")}
      </h3>

      <div className="grid grid-cols-2 gap-3 text-[13px]">
        <div>
          <span className="block text-[12.5px] text-faint">
            {tMeta("monthlyRent")}
          </span>
          <span className="text-[14px] font-bold text-ink">
            {formatRwfLocalized(financials.monthlyRentRwf, locale)}
          </span>
        </div>

        <div>
          <span className="block text-[12.5px] text-faint">
            {tMeta("securityDeposit")}
          </span>
          <span className="text-[13.5px] font-semibold text-ink">
            {formatRwfLocalized(financials.securityDepositRwf, locale)}
          </span>
        </div>

        <div>
          <span className="block text-[12.5px] text-faint">
            {t("monthlyRentDue")}
          </span>
          <span className="font-medium text-ink">{dueDayText}</span>
        </div>

        <div>
          <span className="block text-[12.5px] text-faint">
            {t("advanceRent")}
          </span>
          <span className="font-medium text-ink">
            {t("advanceMonths", { count: financials.advanceMonths })}
          </span>
        </div>

        <div>
          <span className="block text-[12.5px] text-faint">
            {tMeta("commencement")}
          </span>
          <span
            className={`font-medium ${commencement.isPending ? "italic text-amber-800" : "text-ink"}`}
          >
            {commencementDisplay}
          </span>
        </div>

        <div>
          <span className="block text-[12.5px] text-faint">
            {tMeta("duration")}
          </span>
          <span className="font-medium text-ink">
            {tMeta("monthsValue", { count: tenancyDurationMonths ?? 12 })}
          </span>
        </div>
      </div>
    </div>
  );
}
