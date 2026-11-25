"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Calendar,
  Check,
  DollarSign,
  FileText,
  History,
  MailOpen,
  Wrench,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { RenterNotification } from "@/types/renter";

const CATEGORY_META = {
  rent: { icon: DollarSign, label: "Rent", tone: "text-success" },
  maintenance: { icon: Wrench, label: "Maintenance", tone: "text-brand-blue" },
  lease: { icon: FileText, label: "Lease", tone: "text-ink" },
  history: { icon: History, label: "Rental History", tone: "text-amber-700" },
  inquiry: { icon: Calendar, label: "Inquiries", tone: "text-brand-blue" },
} as const;

interface NotificationItemCardProps {
  notif: RenterNotification;
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
        !notif.read
          ? "border-l-2 border-l-brand-blue bg-brand-tint/30"
          : "bg-white hover:bg-surface/40",
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center border border-line bg-white">
          <Icon className={cn("size-4", meta.tone)} />
        </div>

        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-xs">
            <span className={cn("font-semibold", meta.tone)}>{meta.label}</span>
            <span aria-hidden="true" className="text-line">&middot;</span>
            <span className="text-faint">{notif.date}</span>
            {!notif.read && (
              <>
                <span aria-hidden="true" className="text-line">&middot;</span>
                <span className="font-semibold text-brand-blue">Unread</span>
              </>
            )}
          </div>

          <h3 className="text-sm font-bold leading-snug text-ink">
            {notif.title}
          </h3>
          <p className="text-sm leading-relaxed text-body">{notif.message}</p>

          {notif.href && (
            <div className="pt-1">
              <Link
                href={notif.href}
                onClick={() => onMarkRead(notif.id)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline"
              >
                <span>{notif.actionLabel || "Open"}</span>
                <ArrowRight aria-hidden="true" className="size-3.5" />
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
          title={!notif.read ? "Mark as read" : "Mark as unread"}
          aria-label={!notif.read ? "Mark as read" : "Mark as unread"}
          onClick={() => onToggleRead(notif.id)}
          className="size-8 cursor-pointer rounded-none text-faint hover:text-ink"
        >
          {!notif.read ? (
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
