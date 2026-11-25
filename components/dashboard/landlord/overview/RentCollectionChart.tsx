"use client";

import { useLocale, useTranslations } from "next-intl";
import { MonthlyCollectionPoint } from "@/types/landlord";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

import type { AppLocale } from "@/i18n/config";
import { localizeMonthShort } from "@/i18n/display-format";
import { formatRwfLocalized } from "@/i18n/formatting";

interface RentCollectionChartProps {
  data: MonthlyCollectionPoint[];
}

export function RentCollectionChart({ data }: RentCollectionChartProps) {
  const t = useTranslations("landlord.overview.chart");
  const locale = useLocale() as AppLocale;

  const localizedData = data.map((point) => ({
    ...point,
    month: localizeMonthShort(point.month, locale),
  }));

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toString();
  };

  return (
    <div className="flex h-full flex-col justify-between border border-line bg-white p-5 shadow-2xs sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("heading")}
          </h3>
          <p className="text-sm font-medium leading-relaxed text-ink">
            {t("subtitle")}
          </p>
        </div>
        <div className="text-xs font-medium text-faint">{t("valuesInRwf")}</div>
      </div>

      <div className="h-64 w-full pt-2 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={localizedData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            barGap={6}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: "#E2E8F0" }}
              tick={{ fontSize: 12, fill: "#64748B" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12, fill: "#64748B" }}
            />
            <Tooltip
              formatter={(value, name) => [
                typeof value === "number"
                  ? formatRwfLocalized(value, locale)
                  : String(value ?? ""),
                String(name ?? ""),
              ]}
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E2E8F0",
                borderRadius: "0px",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
                fontSize: "13px",
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: "12px", fontSize: "13px" }}
              iconType="square"
            />
            <Bar
              name={t("expectedRent")}
              dataKey="expectedRwf"
              fill="#CBD5E1"
              radius={[2, 2, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              name={t("collectedRent")}
              dataKey="collectedRwf"
              fill="#10B981"
              radius={[2, 2, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
