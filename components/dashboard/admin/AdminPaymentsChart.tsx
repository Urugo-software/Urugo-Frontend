"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { paymentVolume } from "@/data/admin-dashboard-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminPaymentsChart() {
  const [range, setRange] = useState(6);
  const data = paymentVolume.slice(-range);
  return <Card className="gap-0 rounded-lg py-0 shadow-xs ring-line">
    <CardHeader className="flex flex-wrap flex-row items-start justify-between gap-4 border-b border-line py-4">
      <div><CardTitle className="text-[15px] font-semibold">Monthly payment volume</CardTitle><p className="mt-1 text-sm leading-5 text-body">Successful, pending, and failed payments · millions of RWF</p></div>
      <select value={range} onChange={(event) => setRange(Number(event.target.value))} aria-label="Payment chart date range" className="rounded-md border border-line bg-white px-2.5 py-1.5 text-[13px] text-body"><option value={3}>Last 3 months</option><option value={6}>Last 6 months</option></select>
    </CardHeader>
    <CardContent className="px-3 pb-4 pt-5"><div className="h-[250px] w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
      <CartesianGrid vertical={false} stroke="#e7e9ee" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#5b6472" }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#5b6472" }} tickFormatter={(value) => `${value}M`} />
      <Tooltip formatter={(value, name) => [`${value}M RWF`, name]} contentStyle={{ borderRadius: 8, borderColor: "#e7e9ee", fontSize: 14 }} /><Bar dataKey="successful" stackId="a" name="Successful" fill="#1d66ff" /><Bar dataKey="pending" stackId="a" name="Pending" fill="#fbbf24" /><Bar dataKey="failed" stackId="a" name="Failed" fill="#ef4444" radius={[4, 4, 0, 0]} />
    </BarChart></ResponsiveContainer></div></CardContent>
  </Card>;
}
