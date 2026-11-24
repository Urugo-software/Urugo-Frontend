import type { LandlordRenter, TenancyStatus } from "@/types/landlord";

const paymentStyles: Record<LandlordRenter["paymentStatus"], string> = {
  Paid: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  Overdue: "border-rose-200 bg-rose-50 text-rose-700",
};

const occupancyStyles = {
  Occupied: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Partial: "border-blue-200 bg-brand-tint text-brand",
  Vacant: "border-amber-200 bg-amber-50 text-amber-700",
  Maintenance: "border-line bg-surface text-body",
};

export function TenancyStatusBadge({
  status,
  label,
}: {
  status: TenancyStatus;
  label?: string;
}) {
  const tone =
    status === "Active"
      ? "border-blue-200 bg-brand-tint text-brand"
      : "border-amber-200 bg-amber-50 text-amber-700";

  return (
    <span className={`shrink-0 border px-2.5 py-0.5 text-[12.5px] font-semibold ${tone}`}>
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
    <span
      className={`shrink-0 border px-2.5 py-0.5 text-[12.5px] font-semibold ${paymentStyles[status]}`}
    >
      {prefix ? `${prefix}: ${status}` : status}
    </span>
  );
}

export function OccupancyBadge({
  status,
}: {
  status: keyof typeof occupancyStyles;
}) {
  return (
    <span
      className={`shrink-0 border px-2.5 py-0.5 text-[12.5px] font-semibold ${occupancyStyles[status]}`}
    >
      {status}
    </span>
  );
}
