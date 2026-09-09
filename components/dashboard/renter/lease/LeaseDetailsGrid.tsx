import { MapPin, User, Phone, Mail } from "lucide-react";
import { RenterLease } from "@/types/renter";

interface Props {
  lease: RenterLease;
}

interface LeaseRow {
  label: string;
  value: string;
}

export function LeaseDetailsGrid({ lease }: Props) {
  const endDateDisplay = lease.endDate ?? "No end date specified";

  const termRows: LeaseRow[] = [
    { label: "Lease Start Date", value: lease.startDate },
    { label: "Lease End Date", value: endDateDisplay },
    {
      label: "Monthly Rent",
      value: `RWF ${lease.monthlyRentRwf.toLocaleString()}`,
    },
    { label: "Payment Due", value: `${lease.paymentDueDay}th of each month` },
  ];

  if (lease.securityDepositRwf !== undefined) {
    termRows.push({
      label: "Security Deposit",
      value: `RWF ${lease.securityDepositRwf.toLocaleString()}`,
    });
  }

  if (lease.noticePeriodDays !== undefined) {
    termRows.push({
      label: "Notice Period",
      value: `${lease.noticePeriodDays} days`,
    });
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {/* Lease Terms Card */}
      <div className="border border-line bg-white p-5 shadow-xs">
        <h3 className="mb-4 text-[17px] font-bold text-ink">Lease Terms</h3>
        <div className="space-y-3 text-[12.5px]">
          {termRows.map((row, idx) => (
            <div
              key={row.label}
              className={`flex items-center justify-between${
                idx < termRows.length - 1
                  ? " border-b border-line pb-2"
                  : ""
              }`}
            >
              <span className="text-faint">{row.label}</span>
              <span
                className={`font-medium text-ink${
                  row.label === "Lease End Date" && !lease.endDate
                    ? " italic text-faint"
                    : ""
                }`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Property & Landlord Card */}
      <div className="border border-line bg-white p-5 shadow-xs">
        <h3 className="mb-4 text-[17px] font-bold text-ink">
          Property &amp; Landlord
        </h3>

        {/* Property address */}
        <div className="mb-4 flex items-start gap-2 text-[12.5px] text-body">
          <MapPin className="mt-0.5 size-4 shrink-0 text-faint" />
          <span>{lease.address}</span>
        </div>

        {/* Landlord contact */}
        <div className="flex items-start gap-4">
          <div className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
            <User className="size-6" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-[0.5px] text-ink">
              {lease.landlordName}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[12.5px] text-body">
              <Phone className="size-3.5 text-faint" />
              <span className="tracking-[0.5px]">{lease.landlordPhone}</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[12.5px] text-body">
              <Mail className="size-3.5 text-faint" />
              <span className="tracking-[0.5px]">{lease.landlordEmail}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
