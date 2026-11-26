"use client";

import { useState } from "react";
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
    tick: { fontSize: 12, fill: "#5b6472" },
  };

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <section className="border border-line bg-white shadow-2xs">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <h3 className="text-sm font-bold text-ink">User growth</h3>
            <p className="mt-0.5 text-xs text-body">
              New account registrations
            </p>
          </div>
          <select
            value={period}
            onChange={(event) =>
              setPeriod(event.target.value as keyof typeof userGrowthByPeriod)
            }
            aria-label="User growth period"
            className="h-9 rounded-none border border-line bg-white px-2.5 text-xs font-semibold text-ink"
          >
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
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
                  name="New users"
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
            <h3 className="text-sm font-bold text-ink">Property activity</h3>
            <p className="mt-0.5 text-xs text-body">
              New listings and verified properties
            </p>
          </div>
          <select
            value={range}
            onChange={(event) => setRange(Number(event.target.value))}
            aria-label="Property analytics date range"
            className="h-9 rounded-none border border-line bg-white px-2.5 text-xs font-semibold text-ink"
          >
            <option value={3}>Last 3 months</option>
            <option value={6}>Last 6 months</option>
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
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="newListings" name="New listings" fill="#94a3b8" />
                <Bar dataKey="verified" name="Verified" fill="#1d4ed8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="border-t border-line px-2 pt-3 text-xs text-body">
            Selected period: {rejected} rejected, {suspended} suspended
          </p>
        </div>
      </section>
    </div>
  );
}
