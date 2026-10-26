"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { propertyGrowth, userGrowthByPeriod } from "@/data/admin-dashboard-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminGrowthCharts() {
  const [period, setPeriod] = useState<keyof typeof userGrowthByPeriod>("month");
  const [range, setRange] = useState(6);
  const users = userGrowthByPeriod[period];
  const properties = propertyGrowth.slice(-range);
  const rejected = properties.reduce((sum, item) => sum + item.rejected, 0);
  const suspended = properties.reduce((sum, item) => sum + item.suspended, 0);
  const axis = { axisLine: false, tickLine: false, tick: { fontSize: 13, fill: "#5b6472" } };
  return <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
    <Card className="gap-0 rounded-lg py-0 shadow-xs ring-line"><CardHeader className="flex flex-row items-center justify-between border-b border-line py-4"><div><CardTitle className="text-[15px] font-semibold">User growth</CardTitle><p className="mt-1 text-sm text-body">New account registrations</p></div><select value={period} onChange={(event) => setPeriod(event.target.value as keyof typeof userGrowthByPeriod)} aria-label="User growth period" className="rounded-md border border-line bg-white px-2.5 py-1.5 text-[13px] text-body"><option value="day">Daily</option><option value="week">Weekly</option><option value="month">Monthly</option></select></CardHeader><CardContent className="px-3 pb-4 pt-5"><div className="h-[220px]"><ResponsiveContainer width="100%" height="100%"><LineChart data={users} margin={{ left: -20, right: 8, top: 5 }}><CartesianGrid vertical={false} stroke="#e7e9ee" /><XAxis dataKey="period" {...axis} /><YAxis {...axis} /><Tooltip contentStyle={{ borderColor: "#e7e9ee", borderRadius: 8, fontSize: 14 }} /><Line type="monotone" dataKey="users" name="New users" stroke="#1d66ff" strokeWidth={2.5} dot={{ r: 3, fill: "#1d66ff" }} /></LineChart></ResponsiveContainer></div></CardContent></Card>
    <Card className="gap-0 rounded-lg py-0 shadow-xs ring-line"><CardHeader className="flex flex-row items-center justify-between border-b border-line py-4"><div><CardTitle className="text-[15px] font-semibold">Property activity</CardTitle><p className="mt-1 text-sm text-body">New listings and verified properties</p></div><select value={range} onChange={(event) => setRange(Number(event.target.value))} aria-label="Property analytics date range" className="rounded-md border border-line bg-white px-2.5 py-1.5 text-[13px] text-body"><option value={3}>Last 3 months</option><option value={6}>Last 6 months</option></select></CardHeader><CardContent className="px-3 pb-3 pt-5"><div className="h-[190px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={properties} margin={{ left: -20, right: 8, top: 5 }}><CartesianGrid vertical={false} stroke="#e7e9ee" /><XAxis dataKey="month" {...axis} /><YAxis {...axis} /><Tooltip contentStyle={{ borderColor: "#e7e9ee", borderRadius: 8, fontSize: 14 }} /><Legend wrapperStyle={{ fontSize: 13 }} /><Bar dataKey="newListings" name="New listings" fill="#aeb8c8" radius={[3, 3, 0, 0]} /><Bar dataKey="verified" name="Verified" fill="#1d66ff" radius={[3, 3, 0, 0]} /></BarChart></ResponsiveContainer></div><p className="border-t border-line px-2 pt-3 text-[13px] text-body">Selected period: {rejected} rejected, {suspended} suspended</p></CardContent></Card>
  </div>;
}
