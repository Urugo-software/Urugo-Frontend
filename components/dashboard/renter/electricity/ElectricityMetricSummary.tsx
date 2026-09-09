import React from "react";
import { Zap } from "lucide-react";
import { RenterElectricity } from "@/types/renter";

export function ElectricityMetricSummary({
  data,
}: {
  data: RenterElectricity;
}) {
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "Approaching limit":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Limit reached":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Exceeded":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
  };

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="border  border-line bg-white p-5 shadow-xs">
        <span className="text-xs font-semibold text-faint uppercase">
          Current Consumption
        </span>
        <div className="mt-2 text-3xl font-extrabold text-ink">
          {data.currentKwh}{" "}
          <span className="text-sm font-normal text-faint">kWh</span>
        </div>
        <p className="my-1 text-xs tracking-wide text-body">
          Limit: {data.monthlyLimitKwh} kWh
        </p>
      </div>

      <div className=" border border-line bg-white p-5 shadow-xs">
        <span className="text-xs font-semibold text-faint uppercase">
          Limit Usage
        </span>
        <div className="mt-2 text-3xl font-extrabold text-brand">
          {data.percentUsed}%
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface">
          <div
            className="h-full bg-brand rounded-full transition-all"
            style={{ width: `${Math.min(data.percentUsed, 100)}%` }}
          />
        </div>
      </div>

      <div className=" border border-line bg-white p-5 shadow-xs flex flex-col justify-between">
        <span className="text-xs font-semibold text-faint uppercase">
          Metering Status
        </span>
        <div
          className={`mt-2 inline-flex items-center gap-1.5 self-start rounded-full border px-3 py-1 text-xs font-bold ${getBadgeStyle(data.status)}`}
        >
          <Zap className="size-3.5" />
          <span>{data.status}</span>
        </div>
        <p className="mt-2 text-xs tracking-wide text-body">
          {data.statusMessage}
        </p>
      </div>
    </div>
  );
}
