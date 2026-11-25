"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Calendar,
  Check,
  DollarSign,
  FileText,
  MailOpen,
  MessageSquare,
  Settings2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LandlordNotificationItem } from "@/types/landlord";

const CATEGORY_META = {
  payment: { icon: DollarSign, label: "Payment", tone: "text-success" },
  dispute: { icon: AlertTriangle, label: "Dispute", tone: "text-amber-700" },
  tenancy: { icon: FileText, label: "Tenancy", tone: "text-brand-blue" },
  inquiry: { icon: MessageSquare, label: "Inquiry", tone: "text-brand-blue" },
  viewing: { icon: Calendar, label: "Viewing", tone: "text-brand" },
  system: { icon: Settings2, label: "System", tone: "text-faint" },
} as const;

interface NotificationItemCardProps {
  notif: LandlordNotificationItem;
  onMarkRead: (id: string) => void;
  onToggleRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function NotificationItemCard({
  notif,
  onMarkRead,
  onToggleRead,
  onDismiss,
}: NotificationItemCardProps) {
  const meta = CATEGORY_META[notif.category] ?? {
    icon: Bell,
    label: "Notice",
    tone: "text-faint",
  };
  const Icon = meta.icon;

  return (
    <article
      className={cn(
        "flex flex-col justify-between gap-4 p-5 transition-colors sm:flex-row sm:items-start",
        notif.isUnread
          ? "border-l-2 border-l-brand-blue bg-brand-tint/30"
          : "bg-white hover:bg-surface/40",
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center border border-line bg-white">
          <Icon className={cn("size-4", meta.tone)} />
        </div>

        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[13px]">
            <span className={cn("font-semibold", meta.tone)}>{meta.label}</span>
            <span aria-hidden="true" className="text-line">&middot;</span>
            <span className="text-faint">{notif.timestamp}</span>
            {notif.isUnread && (
              <>
                <span aria-hidden="true" className="text-line">&middot;</span>
                <span className="font-semibold text-brand-blue">Unread</span>
              </>
            )}
          </div>

          <h2 className="text-[15px] font-semibold leading-snug text-ink">
            {notif.title}
          </h2>

          <p className="text-sm leading-relaxed text-body">{notif.message}</p>

          {notif.actionHref && (
            <div className="pt-1">
              <Link
                href={notif.actionHref}
                onClick={() => onMarkRead(notif.id)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
              >
                <span>{notif.actionLabel || "View details"}</span>
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 self-end sm:self-start">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title={notif.isUnread ? "Mark as read" : "Mark as unread"}
          aria-label={notif.isUnread ? "Mark as read" : "Mark as unread"}
          onClick={() => onToggleRead(notif.id)}
          className="size-8 cursor-pointer rounded-none text-faint hover:text-ink"
        >
          {notif.isUnread ? (
            <Check className="size-4" />
          ) : (
            <MailOpen className="size-4" />
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title="Dismiss notification"
          aria-label="Dismiss notification"
          onClick={() => onDismiss(notif.id)}
          className="size-8 cursor-pointer rounded-none text-faint hover:text-ink"
        >
          <X className="size-4" />
        </Button>
      </div>
    </article>
  );
}
