import { getLocale, getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import type { MoveInCost } from "@/types/properties";

interface MoveInCostProps {
  costs: MoveInCost[];
}

export default async function MoveInCostBreakdown({ costs }: MoveInCostProps) {
  const [t, locale] = await Promise.all([
    getTranslations("properties.details.costs"),
    getLocale(),
  ]);
  const appLocale = locale as AppLocale;
  const total = costs.reduce((sum, cost) => sum + cost.amount, 0);

  return (
    <section>
      <h2 className="mb-4 text-lg font-extrabold">{t("moveInHeading")}</h2>

      <div className="overflow-hidden border border-line">
        {costs.map((cost, index) => (
          <div
            key={`${cost.label}-${index}`}
            className="flex justify-between border-b border-line px-4.5 py-3.5 text-sm"
          >
            <span className="text-body">{cost.label}</span>

            <span className="font-mono font-semibold">
              {formatRwfLocalized(cost.amount, appLocale)}
            </span>
          </div>
        ))}

        <div className="flex justify-between bg-surface px-4.5 py-3.5 text-sm font-bold">
          <span className="text-ink">{t("totalToMoveIn")}</span>

          <span className="font-mono">
            {formatRwfLocalized(total, appLocale)}
          </span>
        </div>
      </div>
    </section>
  );
}
