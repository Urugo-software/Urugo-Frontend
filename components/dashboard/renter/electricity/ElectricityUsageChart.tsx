"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ElectricityUsagePoint } from "@/types/renter";

export function ElectricityUsageChart({
  data,
}: {
  data: ElectricityUsagePoint[];
}) {
  return (
    <div className="mb-6  border border-line bg-white p-5 shadow-xs">
      <h3 className="mb-1 text-[16px] font-bold text-ink">
        Electricity Usage Curve (kWh)
      </h3>
      <p className="mb-4 text-[15px] text-body">
        Weekly consumption breakdown for current billing cycle
      </p>

      <div className="h-100 w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="kwhColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="period"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
            />
            <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="kwh"
              stroke="#1D4ED8"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#kwhColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
