"use client";

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

import { formatRwf } from "@/utils/format";

interface RentCollectionChartProps {
  data: MonthlyCollectionPoint[];
}

export function RentCollectionChart({ data }: RentCollectionChartProps) {
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
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            Rent Collection History
          </h3>
          <p className="mt-1 text-sm font-medium text-ink">
            Expected vs. Collected Rent (Year-to-Date)
          </p>
        </div>
        <div className="text-xs font-medium text-faint">Values in RWF</div>
      </div>

      <div className="h-64 w-full pt-2 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
                typeof value === "number" ? formatRwf(value) : String(value ?? ""),
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
              name="Expected Rent"
              dataKey="expectedRwf"
              fill="#CBD5E1"
              radius={[2, 2, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              name="Collected Rent"
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
