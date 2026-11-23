"use client";

import { CheckCircle2 } from "lucide-react";

interface Props {
  referenceNumber: string;
  renterName: string;
  propertyName: string;
  unitNumber: string;
}

export function SignModalLegalNotice({
  referenceNumber,
  renterName,
  propertyName,
  unitNumber,
}: Props) {
  return (
    <div className="border border-line bg-surface/40 p-4 text-[13px] text-body space-y-2">
      <div className="flex items-center gap-2 font-semibold text-ink">
        <CheckCircle2 className="size-4 text-ink" />
        <span>Landlord Electronic Endorsement</span>
      </div>
      <p className="leading-relaxed">
        By confirming below, you legally execute Residential Tenancy Agreement{" "}
        <strong className="text-ink">{referenceNumber}</strong> with{" "}
        <strong className="text-ink">{renterName}</strong> for{" "}
        <strong className="text-ink">{propertyName} (Unit {unitNumber})</strong>.
      </p>
    </div>
  );
}
