"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  propertyGrowth,
  userGrowthByPeriod,
} from "@/data/admin-dashboard-data";

export function AdminGrowthCharts() {
  const t = useTranslations("admin.charts");
  const [period, setPeriod] =
    useState<keyof typeof userGrowthByPeriod>("month");
  const [range, setRange] = useState(6);

  const users = userGrowthByPeriod[period];
  const properties = propertyGrowth.slice(-range);
  const rejected = properties.reduce((sum, item) => sum + item.rejected, 0);
  const suspended = properties.reduce((sum, item) => sum + item.suspended, 0);
  const axis = {
    axisLine: false,
    tickLine: false,
    tick: { fontSize: 12.5, fill: "#5b6472" },
  };

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <section className="border border-line bg-white shadow-2xs">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <h3 className="text-sm font-bold text-ink">
              {t("userGrowthTitle")}
            </h3>
            <p className="mt-0.5 text-xs text-body">
              {t("userGrowthSubtitle")}
            </p>
          </div>
          <select
            value={period}
            onChange={(event) =>
              setPeriod(event.target.value as keyof typeof userGrowthByPeriod)
            }
            aria-label={t("userGrowthPeriodAria")}
            className="h-9 rounded-none border border-line bg-white px-2.5 text-xs font-semibold text-ink"
          >
            <option value="day">{t("daily")}</option>
            <option value="week">{t("weekly")}</option>
            <option value="month">{t("monthly")}</option>
          </select>
        </div>
        <div className="px-3 pb-4 pt-5">
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={users}
                margin={{ left: -20, right: 8, top: 5 }}
              >
                <CartesianGrid vertical={false} stroke="#e7e9ee" />
                <XAxis dataKey="period" {...axis} />
                <YAxis {...axis} />
                <Tooltip
                  contentStyle={{ borderColor: "#e7e9ee", fontSize: 13 }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  name={t("newUsers")}
                  stroke="#1d4ed8"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#1d4ed8" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="border border-line bg-white shadow-2xs">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <h3 className="text-sm font-bold text-ink">
              {t("propertyActivityTitle")}
            </h3>
            <p className="mt-0.5 text-xs text-body">
              {t("propertyActivitySubtitle")}
            </p>
          </div>
          <select
            value={range}
            onChange={(event) => setRange(Number(event.target.value))}
            aria-label={t("propertyRangeAria")}
            className="h-9 rounded-none border border-line bg-white px-2.5 text-xs font-semibold text-ink"
          >
            <option value={3}>{t("last3Months")}</option>
            <option value={6}>{t("last6Months")}</option>
          </select>
        </div>
        <div className="px-3 pb-3 pt-5">
          <div className="h-[190px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={properties}
                margin={{ left: -20, right: 8, top: 5 }}
              >
                <CartesianGrid vertical={false} stroke="#e7e9ee" />
                <XAxis dataKey="month" {...axis} />
                <YAxis {...axis} />
                <Tooltip
                  contentStyle={{ borderColor: "#e7e9ee", fontSize: 13 }}
                />
                <Legend wrapperStyle={{ fontSize: 12.5 }} />
                <Bar
                  dataKey="newListings"
                  name={t("newListings")}
                  fill="#94a3b8"
                />
                <Bar dataKey="verified" name={t("verified")} fill="#1d4ed8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="border-t border-line px-2 pt-3 text-xs text-body">
            {t("selectedPeriodSummary", { rejected, suspended })}
          </p>
        </div>
      </section>
    </div>
  );
}
