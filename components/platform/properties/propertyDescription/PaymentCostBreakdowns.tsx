import { getLocale, getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import type { MoveInCost, RecurringCost } from "@/types/properties";

interface PaymentCostBreakdownProps {
  moveInCosts: MoveInCost[];
  recurringCosts: RecurringCost[];
}

const COST_LABEL_KEYS = {
  "first month rent": "firstMonthRent",
  "rent upfront (2 months)": "rentUpfront2Months",
  "security deposit (1 month)": "securityDeposit1Month",
  "monthly rent": "monthlyRent",
  water: "water",
  wifi: "wifi",
  "water & wifi": "waterAndWifi",
  "compound security": "compoundSecurity",
  "waste collection": "wasteCollection",
  "home internet": "homeInternet",
} as const;

export default async function PaymentCostBreakdown({
  moveInCosts,
  recurringCosts,
}: PaymentCostBreakdownProps) {
  const [t, locale] = await Promise.all([
    getTranslations("properties"),
    getLocale(),
  ]);
  const appLocale = locale as AppLocale;

  const resolveCostLabel = (label: string) => {
    const key =
      COST_LABEL_KEYS[
        label.trim().toLowerCase() as keyof typeof COST_LABEL_KEYS
      ];
    return key ? t(`costLabels.${key}`) : label;
  };

  const moveInTotal = moveInCosts.reduce((sum, cost) => sum + cost.amount, 0);

  const tenantMonthlyTotal = recurringCosts
    .filter((cost) => cost.payer === "TENANT")
    .reduce((sum, cost) => sum + cost.amount, 0);

  return (
    <section>
      <h2 className="mb-6 text-lg font-extrabold text-ink">
        {t("details.costs.heading")}
      </h2>

      {/* Before moving in */}
      <div className="mb-7">
        <h3 className="mb-3 text-sm font-bold tracking-tight text-ink">
          {t("details.costs.beforeMovingIn")}
        </h3>

        <div className="overflow-hidden border border-line">
          {moveInCosts.map((cost, index) => (
            <div
              key={`${cost.label}-${index}`}
              className="flex items-center justify-between gap-4 border-b border-line px-4.5 py-3.5 text-sm"
            >
              <span className="text-body">{resolveCostLabel(cost.label)}</span>
              <span className="shrink-0 font-mono font-semibold text-ink">
                {formatRwfLocalized(cost.amount, appLocale)}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between gap-4 bg-surface px-4.5 py-3.5 text-sm font-bold">
            <span className="text-ink">
              {t("details.costs.estimatedMoveInTotal")}
            </span>
            <span className="shrink-0 font-mono text-ink">
              {formatRwfLocalized(moveInTotal, appLocale)}
            </span>
          </div>
        </div>
      </div>

      {/* Recurring monthly costs */}
      <div>
        <h3 className="mb-3 text-sm font-bold tracking-tight text-ink">
          {t("details.costs.monthlyCosts")}
        </h3>

        <div className="overflow-hidden border border-line">
          {recurringCosts.map((cost, index) => {
            const isTenant = cost.payer === "TENANT";
            const amountLabel =
              cost.amount === 0 && !isTenant
                ? t("details.costs.included")
                : formatRwfLocalized(cost.amount, appLocale);

            return (
              <div
                key={`${cost.label}-${index}`}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4.5 py-3.5 text-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-ink">
                    {resolveCostLabel(cost.label)}
                  </span>
                  {cost.isEstimated && (
                    <span className="text-xs text-faint">
                      {t("details.costs.estimatedTag")}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold ${
                      isTenant ? "text-brand-deep" : "text-faint"
                    }`}
                  >
                    {isTenant
                      ? t("details.costs.paidByRenter")
                      : t("details.costs.paidByLandlord")}
                  </span>
                  <span className="min-w-24 text-right font-mono font-semibold text-ink">
                    {amountLabel}
                  </span>
                </div>
              </div>
            );
          })}

          <div className="flex items-center justify-between gap-4 bg-surface px-4.5 py-4 text-sm font-bold">
            <span className="text-ink">
              {t("details.costs.estimatedMonthlyTotal")}
            </span>
            <span className="shrink-0 font-mono text-ink">
              {formatRwfLocalized(tenantMonthlyTotal, appLocale)}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-faint">{t("details.costs.disclaimer")}</p>
    </section>
  );
}
