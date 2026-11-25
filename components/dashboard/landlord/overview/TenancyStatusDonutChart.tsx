"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { TenancyOverview } from "@/types/landlord";

interface TenancyStatusDonutChartProps {
  overview: TenancyOverview;
}

export function TenancyStatusDonutChart({
  overview,
}: TenancyStatusDonutChartProps) {
  const t = useTranslations("landlord.overview.tenancyDonut");
  const total = overview.total;
  const pct = (value: number) =>
    total > 0 ? Math.round((value / total) * 100) : 0;

  const chartData = [
    {
      key: "active" as const,
      name: t("active"),
      value: overview.active,
      percent: pct(overview.active),
      color: "#1D4ED8",
    },
    {
      key: "endingSoon" as const,
      name: t("endingSoon"),
      value: overview.endingSoon,
      percent: pct(overview.endingSoon),
      color: "#D97706",
    },
    {
      key: "closed" as const,
      name: t("closed"),
      value: overview.pendingClosure,
      percent: pct(overview.pendingClosure),
      color: "#475569",
    },
  ].filter((item) => item.value > 0 || item.key !== "closed");

  return (
    <div className="flex h-full flex-col justify-between space-y-4 border border-line bg-white p-5 shadow-2xs sm:p-6">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
          {t("heading")}
        </h3>

        {total === 0 ? (
          <p className="py-10 text-center text-xs text-body">{t("empty")}</p>
        ) : (
          <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row">
            <div className="relative h-36 w-36 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={34}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.key} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val, name) => [
                      t("tooltipTenancies", { count: Number(val ?? 0) }),
                      String(name ?? ""),
                    ]}
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E7E9EE",
                      fontSize: "12.5px",
                      borderRadius: "0px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full min-w-0 flex-1 space-y-3.5">
              {chartData.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-3 text-xs sm:text-sm"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="inline-block size-2.5 shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="truncate font-medium text-body">
                      {item.name}
                    </span>
                  </div>
                  <span className="shrink-0 font-ibm font-bold text-ink">
                    {item.value} ({item.percent}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-line pt-4">
        <Link
          href="/landlord/tenancies"
          className="inline-flex w-full items-center justify-between gap-1.5 text-xs font-semibold text-ink hover:underline"
        >
          <span>{t("viewAll")}</span>
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
