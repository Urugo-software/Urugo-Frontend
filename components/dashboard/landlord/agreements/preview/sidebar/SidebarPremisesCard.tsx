"use client";

import { useTranslations } from "next-intl";
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
  const t = useTranslations("landlord.agreements.preview.sidebar");
  const tMeta = useTranslations("landlord.agreements.editor.metadata");

  return (
    <div className="space-y-3.5 border border-line bg-white p-5 text-[12.5px]">
      <h3 className="border-b border-line pb-2.5 font-semibold uppercase tracking-wider text-faint">
        {t("premisesAndParties")}
      </h3>

      <div className="space-y-3 text-[13px]">
        <div>
          <span className="block text-[12.5px] text-faint">
            {tMeta("propertyAndUnit")}
          </span>
          <span className="block font-semibold text-ink">
            {tMeta("premisesUnit", {
              property: property.name,
              unit: property.unitNumber,
            })}
          </span>
          <span className="text-[12.5px] text-body">
            {property.address}, {property.district}
          </span>
        </div>

        <div className="border-t border-line/60 pt-2">
          <span className="block text-[12.5px] text-faint">
            {tMeta("renter")}
          </span>
          <span className="block font-semibold text-ink">{renter.name}</span>
          <span className="block font-mono text-[12.5px] text-body">
            {renter.phone} &middot; {tMeta("idPrefix", { id: renter.nationalId })}
          </span>
        </div>

        <div className="border-t border-line/60 pt-2">
          <span className="block text-[12.5px] text-faint">
            {tMeta("landlord")}
          </span>
          <span className="block font-semibold text-ink">{landlord.name}</span>
          <span className="block font-mono text-[12.5px] text-body">
            {landlord.phone} &middot;{" "}
            {tMeta("idPrefix", { id: landlord.nationalId })}
          </span>
        </div>
      </div>
    </div>
  );
}
