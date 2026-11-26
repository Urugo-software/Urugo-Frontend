"use client";

import { useState } from "react";
import { geographicDistribution } from "@/data/admin-dashboard-data";

export function AdminGeographyPanel() {
  const [level, setLevel] =
    useState<keyof typeof geographicDistribution>("district");
  const labels = {
    province: "Province",
    district: "District",
    sector: "Sector",
  };
  const rows = geographicDistribution[level];

  return (
    <section className="border border-line bg-white shadow-2xs">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <h3 className="text-sm font-bold text-ink">Property locations</h3>
          <p className="mt-0.5 text-xs text-body">
            Registered listings across Rwanda
          </p>
        </div>
        <select
          value={level}
          onChange={(event) =>
            setLevel(event.target.value as keyof typeof geographicDistribution)
          }
          aria-label="Geographic grouping"
          className="h-9 rounded-none border border-line bg-white px-2.5 text-xs font-semibold text-ink"
        >
          {Object.entries(labels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="divide-y divide-line px-5">
        {rows.map((item) => (
          <div
            key={item.area}
            className="flex items-center justify-between py-3.5 text-sm"
          >
            <span className="text-body">{item.area}</span>
            <span className="font-semibold text-ink">
              {item.count.toLocaleString()} properties
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
