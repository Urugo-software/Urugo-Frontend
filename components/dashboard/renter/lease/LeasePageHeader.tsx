import { RenterLease } from "@/types/renter";

interface Props {
  lease: RenterLease;
}

export function LeasePageHeader({ lease }: Props) {
  const statusClass =
    lease.status === "Active"
      ? "bg-emerald-50 text-emerald-600"
      : "bg-amber-50 text-amber-700";

  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-line pb-5">
      <div>
        <h2 className="text-xl font-bold text-ink sm:text-2xl">My Lease</h2>
        <p className="text-[14px] text-body mt-1">
          {lease.propertyName} &mdash; Unit {lease.unitNumber}
        </p>
      </div>
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
      >
        {lease.status}
      </span>
    </div>
  );
}
