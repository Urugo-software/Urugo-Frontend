"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { paymentVolume } from "@/data/admin-dashboard-data";

export function AdminPaymentsChart() {
  const t = useTranslations("admin.charts");
  const [range, setRange] = useState(6);
  const data = paymentVolume.slice(-range);

  return (
    <section className="border border-line bg-white shadow-2xs">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line px-5 py-4">
        <div>
          <h3 className="text-sm font-bold text-ink">
            {t("paymentVolumeTitle")}
          </h3>
          <p className="mt-0.5 text-xs text-body">
            {t("paymentVolumeSubtitle")}
          </p>
        </div>
        <select
          value={range}
          onChange={(event) => setRange(Number(event.target.value))}
          aria-label={t("paymentRangeAria")}
          className="h-9 rounded-none border border-line bg-white px-2.5 text-xs font-semibold text-ink"
        >
          <option value={3}>{t("last3Months")}</option>
          <option value={6}>{t("last6Months")}</option>
        </select>
      </div>

      <div className="px-3 pb-4 pt-5">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 4, right: 8, left: -12, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="#e7e9ee" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12.5, fill: "#5b6472" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12.5, fill: "#5b6472" }}
                tickFormatter={(value) => `${value}M`}
              />
              <Tooltip
                formatter={(value, name) => [`${value}M RWF`, name]}
                contentStyle={{ borderColor: "#e7e9ee", fontSize: 13 }}
              />
              <Bar
                dataKey="successful"
                stackId="a"
                name={t("successful")}
                fill="#1d4ed8"
              />
              <Bar
                dataKey="pending"
                stackId="a"
                name={t("pending")}
                fill="#d97706"
              />
              <Bar
                dataKey="failed"
                stackId="a"
                name={t("failed")}
                fill="#be123c"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
