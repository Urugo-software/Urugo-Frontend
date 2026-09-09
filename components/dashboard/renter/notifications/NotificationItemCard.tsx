import React from "react";
import { DollarSign, Zap, Wrench, FileText } from "lucide-react";
import { RenterNotification } from "@/types/renter";

export function NotificationItemCard({ notif }: { notif: RenterNotification }) {
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "rent":
        return <DollarSign className="size-4 text-emerald-600" />;
      case "electricity":
        return <Zap className="size-4 text-amber-600" />;
      case "maintenance":
        return <Wrench className="size-4 text-blue-600" />;
      default:
        return <FileText className="size-4 text-purple-600" />;
    }
  };

  return (
    <div
      className={`flex items-start gap-3 rounded-sm border border-line p-4 shadow-xs transition ${
        !notif.read ? "bg-brand-tint/20 border-brand/20" : "bg-white"
      }`}
    >
      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface mt-0.5">
        {getCategoryIcon(notif.category)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-[13.5px] font-bold text-ink truncate">
            {notif.title}
          </h4>
          <span className="text-[11px] text-faint shrink-0">{notif.date}</span>
        </div>
        <p className="mt-1 text-[12.5px] lg:text-[13px] text-body leading-relaxed">
          {notif.message}
        </p>
      </div>
      {!notif.read && (
        <span className="size-2 rounded-full bg-brand shrink-0 mt-2" />
      )}
    </div>
  );
}
