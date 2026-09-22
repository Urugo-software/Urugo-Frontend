import Link from "next/link";
import {
  Bell,
  DollarSign,
  AlertTriangle,
  FileText,
  Settings2,
  ChevronRight,
} from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";
import { LandlordNotificationItem } from "@/types/landlord";

const CATEGORY_META: Record<string, { icon: typeof Bell; label: string }> = {
  payment: { icon: DollarSign, label: "Payment" },
  dispute: { icon: AlertTriangle, label: "Dispute" },
  tenancy: { icon: FileText, label: "Tenancy" },
  system: { icon: Settings2, label: "System" },
};

function getCategoryMeta(category: string) {
  return CATEGORY_META[category] ?? { icon: Bell, label: "Notice" };
}

export function NotificationItemCard({
  notif,
}: {
  notif: LandlordNotificationItem;
}) {
  const { icon: Icon, label } = getCategoryMeta(notif.category);

  return (
    <div
      className={`group flex flex-col items-start justify-between gap-4 border bg-white p-5 transition-colors sm:flex-row ${
        notif.isUnread ? "border-line border-l-2 border-l-brand" : "border-line"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-surface">
          <Icon className="h-[18px] w-[18px] text-ink" strokeWidth={1.75} />
        </div>

        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10.5px] font-semibold uppercase tracking-wide text-faint">
              {label}
            </span>
            {notif.isUnread && (
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            )}
          </div>
          <h3 className="text-[15px] font-bold leading-snug tracking-[0.2px] text-ink">
            {notif.title}
          </h3>
          <p className="text-[13.5px] leading-relaxed text-body">
            {notif.message}
          </p>
          <span className="block pt-1 text-[11px] text-faint">
            {notif.timestamp}
          </span>
        </div>
      </div>

      {notif.actionHref && (
        <Link
          href={notif.actionHref}
          className="shrink-0 self-end sm:self-center"
        >
          <CustomButton
            title={notif.actionLabel || "View"}
            variant="colored"
            className="h-8 rounded-none text-xs font-semibold"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </CustomButton>
        </Link>
      )}
    </div>
  );
}
