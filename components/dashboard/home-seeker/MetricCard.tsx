"use client";

import React from "react";

interface MetricCardProps {
  title: string;
  count: number | string;
  icon: React.ElementType;
  iconBgClass: string;
  iconColorClass: string;
}

export function MetricCard({ title, count, icon: Icon, iconBgClass, iconColorClass }: MetricCardProps) {
  return (
    <div className="flex items-start justify-between rounded-2xl border border-line bg-white p-6 shadow-xs">
      <div>
        <div className="mb-3 text-[14.5px] font-bold text-ink">{title}</div>
        <div className="font-mono text-4xl font-extrabold text-ink">{count}</div>
      </div>
      <div className={`grid size-11 shrink-0 place-items-center rounded-xl ${iconBgClass} ${iconColorClass}`}>
        <Icon className="size-5" />
      </div>
    </div>
  );
}
