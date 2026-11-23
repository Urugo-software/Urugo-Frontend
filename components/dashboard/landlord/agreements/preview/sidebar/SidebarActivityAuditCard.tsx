"use client";

import { formatDate } from "@/utils/agreement-utils";

export interface ActivityItem {
  title: string;
  date: string;
  detail: string;
  status: "completed" | "attention" | "pending";
}

interface Props {
  activities: ActivityItem[];
}

export function SidebarActivityAuditCard({ activities }: Props) {
  return (
    <div className="border border-line bg-white p-5 space-y-3.5 text-[12.5px]">
      <div className="flex items-center justify-between border-b border-line pb-2.5">
        <h3 className="font-semibold uppercase tracking-wider text-faint">
          Activity History
        </h3>
        <span className="font-mono text-faint">Audit Trail</span>
      </div>

      <div className="relative pl-4 space-y-4 before:absolute before:left-1.5 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-line">
        {activities.map((act, i) => (
          <div key={i} className="relative text-[13px]">
            <span
              className={`absolute -left-4 top-1 size-2 rounded-full ${
                act.status === "completed"
                  ? "bg-emerald-600 ring-2 ring-white"
                  : act.status === "attention"
                  ? "bg-amber-500 ring-2 ring-white"
                  : "bg-neutral-300 ring-2 ring-white"
              }`}
            />
            <div className="space-y-0.5">
              <span className="font-medium text-ink block leading-snug">
                {act.title}
              </span>
              <span className="text-[12.5px] text-body block leading-relaxed">
                {act.detail}
              </span>
              {act.date && (
                <span className="text-[12.5px] text-faint font-mono block">
                  {formatDate(act.date)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
