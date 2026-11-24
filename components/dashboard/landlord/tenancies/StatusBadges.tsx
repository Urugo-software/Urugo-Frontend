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
  return (
    <span className={`shrink-0 text-sm font-semibold ${tenancyTextStyles[status]}`}>
      {label ?? status}
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
  return (
    <span className={`shrink-0 text-sm font-semibold ${paymentTextStyles[status]}`}>
      {prefix ? `${prefix}: ${status}` : status}
    </span>
  );
}

export function OccupancyBadge({
  status,
}: {
  status: keyof typeof occupancyTextStyles;
}) {
  return (
    <span className={`shrink-0 text-sm font-semibold ${occupancyTextStyles[status]}`}>
      {status}
    </span>
  );
}
