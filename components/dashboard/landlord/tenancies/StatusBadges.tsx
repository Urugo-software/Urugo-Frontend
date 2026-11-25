"use client";

import { useTranslations } from "next-intl";
import type { LandlordRenter, TenancyStatus } from "@/types/landlord";

const tenancyTextStyles: Record<TenancyStatus, string> = {
  Active: "text-success",
  Ending: "text-amber-700",
  Closed: "text-faint",
};

const paymentTextStyles: Record<LandlordRenter["paymentStatus"], string> = {
  Paid: "text-success",
  Pending: "text-warn",
  Overdue: "text-red-700",
};

const occupancyTextStyles = {
  Occupied: "text-success",
  Partial: "text-brand-blue",
  Vacant: "text-amber-700",
  Maintenance: "text-body",
};

export function TenancyStatusBadge({
  status,
  label,
}: {
  status: TenancyStatus;
  label?: string;
}) {
  const t = useTranslations("landlord.tenancies.badges");
  return (
    <span className={`shrink-0 text-sm font-semibold ${tenancyTextStyles[status]}`}>
      {label ?? t(status)}
    </span>
  );
}

export function PaymentStatusBadge({
  status,
  prefix,
}: {
  status: LandlordRenter["paymentStatus"];
  prefix?: string;
}) {
  const t = useTranslations("landlord.tenancies.badges");
  const statusLabel = t(status);
  return (
    <span className={`shrink-0 text-sm font-semibold ${paymentTextStyles[status]}`}>
      {prefix ? `${prefix}: ${statusLabel}` : statusLabel}
    </span>
  );
}

export function OccupancyBadge({
  status,
}: {
  status: keyof typeof occupancyTextStyles;
}) {
  const t = useTranslations("landlord.tenancies.badges");
  return (
    <span className={`shrink-0 text-sm font-semibold ${occupancyTextStyles[status]}`}>
      {t(status)}
    </span>
  );
}
