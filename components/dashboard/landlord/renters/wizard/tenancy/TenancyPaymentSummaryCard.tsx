"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import type { InitialPaymentCalculation } from "@/types/renter-wizard.types";

interface TenancyPaymentSummaryCardProps {
  paymentSummary: InitialPaymentCalculation;
}

export function TenancyPaymentSummaryCard({
  paymentSummary,
}: TenancyPaymentSummaryCardProps) {
  const t = useTranslations("landlord.renters.wizard.paymentSummary");
  const locale = useLocale() as AppLocale;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 6 }
      }
      animate={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, height: "auto", y: 0 }
      }
      exit={
        shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 6 }
      }
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="overflow-hidden border border-line bg-white shadow-2xs"
    >
      {/* Header */}
      <div className="border-b border-line bg-surface/60 px-4 py-3.5 sm:px-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <CreditCard className="size-4 text-ink" />
          <h4 className="text-[12.5px] font-semibold text-ink uppercase tracking-wider">
            {t("heading")}
          </h4>
        </div>
        <span className="inline-flex items-center border border-line bg-white px-2 py-0.5 text-[12.5px] font-medium text-body">
          {t("badge")}
        </span>
      </div>

      {/* Breakdown Rows */}
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between text-[12.5px]">
          <span className="text-body">{t("agreedMonthlyRent")}</span>
          <span className=" font-medium text-ink">
            {formatRwfLocalized(paymentSummary.monthlyRent, locale)}
          </span>
        </div>

        <div className="flex items-center justify-between text-[12.5px]">
          <span className="text-body">{t("initialAdvancePeriod")}</span>
          <span className="font-medium text-ink">
            {t(
              paymentSummary.initialMonths === 1
                ? "monthSingle"
                : "monthPlural",
              { count: paymentSummary.initialMonths },
            )}
          </span>
        </div>

        <div className="flex items-center justify-between text-[12.5px] border-b border-line/80 pb-3">
          <span className="text-body">
            {t("initialAdvanceSubtotal")}{" "}
            <span className="text-faint">
              ({formatRwfLocalized(paymentSummary.monthlyRent, locale)} ×{" "}
              {paymentSummary.initialMonths})
            </span>
          </span>
          <span className=" font-medium text-ink">
            {formatRwfLocalized(paymentSummary.initialRentAmount, locale)}
          </span>
        </div>

        <div className="flex items-center justify-between text-[12.5px] border-b border-line/80 pb-3">
          <span className="text-body">{t("refundableDeposit")}</span>
          <span className=" font-medium text-ink">
            {paymentSummary.securityDeposit > 0
              ? formatRwfLocalized(paymentSummary.securityDeposit, locale)
              : t("noDeposit")}
          </span>
        </div>

        {/* Total Due Highlight Card */}
        <div className="flex items-center justify-between border border-line bg-surface/50 p-3.5">
          <div>
            <span className="block text-sm font-semibold text-ink">
              {t("totalMoveInDue")}
            </span>
            <span className="text-[12.5px] text-body">
              {t("totalMoveInDesc")}
            </span>
          </div>
          <span className=" text-base sm:text-lg font-semibold text-ink">
            {formatRwfLocalized(paymentSummary.totalInitialAmount, locale)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
