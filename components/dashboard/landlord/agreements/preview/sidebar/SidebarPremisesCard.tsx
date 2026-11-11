"use client";

import { AgreementParty, AgreementProperty } from "@/types/agreement.types";

interface Props {
  property: AgreementProperty;
  renter: AgreementParty;
  landlord: AgreementParty;
}

export function SidebarPremisesCard({
  property,
  renter,
  landlord,
}: Props) {
  return (
    <div className="border border-line bg-white p-5 space-y-3.5 text-[12.5px]">
      <h3 className="font-semibold uppercase tracking-wider text-faint border-b border-line pb-2.5">
        Premises & Parties
      </h3>

      <div className="space-y-3 text-[13px]">
        <div>
          <span className="text-[12.5px] text-faint block">Property & Unit</span>
          <span className="font-semibold text-ink block">
            {property.name} &middot; Unit {property.unitNumber}
          </span>
          <span className="text-body text-[12.5px]">
            {property.address}, {property.district}
          </span>
        </div>

        <div className="pt-2 border-t border-line/60">
          <span className="text-[12.5px] text-faint block">Renter</span>
          <span className="font-semibold text-ink block">
            {renter.name}
          </span>
          <span className="text-[12.5px] text-body block font-mono">
            {renter.phone} &middot; ID: {renter.nationalId}
          </span>
        </div>

        <div className="pt-2 border-t border-line/60">
          <span className="text-[12.5px] text-faint block">Landlord</span>
          <span className="font-semibold text-ink block">
            {landlord.name}
          </span>
          <span className="text-[12.5px] text-body block font-mono">
            {landlord.phone} &middot; ID: {landlord.nationalId}
          </span>
        </div>
      </div>
    </div>
  );
}
