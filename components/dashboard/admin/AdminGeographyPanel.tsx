"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { geographicDistribution } from "@/data/admin-dashboard-data";

export function AdminGeographyPanel() {
  const [level, setLevel] = useState<keyof typeof geographicDistribution>("district");
  const labels = { province: "Province", district: "District", sector: "Sector" };
  const rows = geographicDistribution[level];
  return <Card className="gap-0 rounded-lg py-0 shadow-xs ring-line">
    <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-line py-4"><div><CardTitle className="text-[15px] font-semibold">Property locations</CardTitle><p className="mt-1 text-sm text-body">Registered listings across Rwanda</p></div>
      <select value={level} onChange={(event) => setLevel(event.target.value as keyof typeof geographicDistribution)} aria-label="Geographic grouping" className="rounded-md border border-line bg-white px-2.5 py-1.5 text-[13px] text-body">{Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
    </CardHeader>
    <CardContent className="divide-y divide-line px-5">{rows.map((item) => <div key={item.area} className="flex items-center justify-between py-3.5 text-sm"><span className="text-body">{item.area}</span><span className="font-medium text-ink">{item.count.toLocaleString()} properties</span></div>)}</CardContent>
  </Card>;
}
