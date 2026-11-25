import { Mail, MapPin, Phone } from "lucide-react";
import { UserAvatar } from "@/components/shared/UserAvatar";
import type { RenterLease } from "@/types/renter";
import { formatRwf } from "@/utils/format";
import { getOrdinalSuffix } from "@/utils/rent-schedule-utils";

interface Props {
  lease: RenterLease;
}

export function LeaseDetailsGrid({ lease }: Props) {
  const termRows = [
    { label: "Lease Start Date", value: lease.startDate },
    {
      label: "Lease End Date",
      value: lease.endDate ?? "Open-ended monthly tenancy",
    },
    { label: "Monthly Rent", value: formatRwf(lease.monthlyRentRwf) },
    {
      label: "Payment Due",
      value: `${lease.paymentDueDay}${getOrdinalSuffix(lease.paymentDueDay)} of each month`,
    },
    ...(lease.securityDepositRwf !== undefined
      ? [
          {
            label: "Security Deposit",
            value: formatRwf(lease.securityDepositRwf),
          },
        ]
      : []),
    ...(lease.noticePeriodDays !== undefined
      ? [{ label: "Notice Period", value: `${lease.noticePeriodDays} days` }]
      : []),
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="border border-line bg-white p-5 shadow-2xs">
        <h3 className="mb-4 text-base font-bold text-ink">Lease Terms</h3>
        <div className="space-y-3 text-sm">
          {termRows.map((row, idx) => (
            <div
              key={row.label}
              className={`flex items-center justify-between gap-4${
                idx < termRows.length - 1 ? " border-b border-line pb-2.5" : ""
              }`}
            >
              <span className="text-body">{row.label}</span>
              <span className="text-right font-semibold text-ink">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-line bg-white p-5 shadow-2xs">
        <h3 className="mb-4 text-base font-bold text-ink">
          Property &amp; Landlord
        </h3>

        <div className="mb-4 flex items-start gap-2 text-sm text-body">
          <MapPin className="mt-0.5 size-4 shrink-0 text-faint" />
          <span>{lease.address}</span>
        </div>

        <div className="flex items-start gap-4 border-t border-line pt-4">
          <UserAvatar name={lease.landlordName} className="size-12 text-sm" />
          <div className="min-w-0 space-y-2">
            <div className="text-sm font-bold text-ink">
              {lease.landlordName}
            </div>
            <a
              href={`tel:${lease.landlordPhone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 text-sm text-body hover:text-ink hover:underline"
            >
              <Phone className="size-3.5 text-faint" />
              <span>{lease.landlordPhone}</span>
            </a>
            <a
              href={`mailto:${lease.landlordEmail}`}
              className="flex items-center gap-1.5 text-sm text-body hover:text-ink hover:underline"
            >
              <Mail className="size-3.5 text-faint" />
              <span className="truncate">{lease.landlordEmail}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
