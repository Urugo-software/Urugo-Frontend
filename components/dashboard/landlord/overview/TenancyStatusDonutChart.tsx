"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TenancyOverview } from "@/types/landlord";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface TenancyStatusDonutChartProps {
  overview: TenancyOverview;
}

export function TenancyStatusDonutChart({
  overview,
}: TenancyStatusDonutChartProps) {
  const activePct = Math.round((overview.active / overview.total) * 100);
  const endingPct = Math.round((overview.endingSoon / overview.total) * 100);
  const closurePct = Math.round(
    (overview.pendingClosure / overview.total) * 100,
  );

  const chartData = [
    {
      name: "Active",
      value: overview.active,
      percent: activePct,
      color: "#1D66FF", // Brand blue
    },
    {
      name: "Ending Soon",
      value: overview.endingSoon,
      percent: endingPct,
      color: "#F4B740", // Soft warm yellow
    },
    {
      name: "Pending Closure",
      value: overview.pendingClosure,
      percent: closurePct,
      color: "#374151", // Soft charcoal
    },
  ];

  return (
    <div className="border border-line bg-white p-6 sm:p-7 shadow-2xs flex flex-col justify-between h-full space-y-4">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
          Tenancy Status Breakdown
        </h3>

        <div className="mt-5 flex items-center justify-between gap-4">
          {/* Donut Chart */}
          <div className="h-50 w-50 relative flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={62}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(val: any, name: any) => [
                    `${val ?? 0} tenancies`,
                    name ?? "",
                  ]}
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E5E7EB",
                    fontSize: "13px",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="space-y-3 flex-1">
            {chartData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-xs inline-block"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-body font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-ink">{item.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-line/60">
        <Link
          href="/landlord/tenancies"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
        >
          <span>View All Tenancies</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
