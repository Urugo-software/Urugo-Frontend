import { StatusBadge } from "@/components/shared/StatusBadge";
import type { RenterLease } from "@/types/renter";

interface Props {
  lease: RenterLease;
}

export function LeasePageHeader({ lease }: Props) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-line pb-5">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          My Lease
        </h2>
        <p className="mt-1 text-sm text-body">
          {lease.propertyName} &mdash; Unit {lease.unitNumber}
        </p>
      </div>
      <StatusBadge
        label={`${lease.status} Lease`}
        tone={lease.status === "Active" ? "success" : "warning"}
        className="text-sm"
      />
    </div>
  );
}
