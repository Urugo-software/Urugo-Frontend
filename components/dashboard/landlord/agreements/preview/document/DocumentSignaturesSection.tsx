"use client";

import { AgreementParty, AgreementSignature } from "@/types/agreement.types";
import { DocumentPartySignatureBlock } from "./DocumentPartySignatureBlock";

interface Props {
  landlord: AgreementParty;
  renter: AgreementParty;
  landlordSignature?: AgreementSignature;
  renterSignature?: AgreementSignature;
  isKinyarwanda: boolean;
}

export function DocumentSignaturesSection({
  landlord,
  renter,
  landlordSignature,
  renterSignature,
  isKinyarwanda,
}: Props) {
  return (
    <section className="mt-10 pt-6  break-inside-avoid text-[12.5px]">
      <div className="mb-6">
        <h2 className="text-[12px] font-bold uppercase tracking-wider text-ink">
          {isKinyarwanda
            ? "Gushyira Umukono ku Masezerano"
            : "Execution & Signatures"}
        </h2>
        <p className="text-[12.5px] text-body mt-1">
          {isKinyarwanda
            ? "HAMYANYWE N'IBI, Nyir'inzu n'Umukode bashyize umukono kuri iyi nyandiko ku munsi n'umwaka byavuzwe haruguru."
            : "IN WITNESS WHEREOF, the Landlord and Tenant have executed this Residential Lease Agreement as of the date first written above."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
        {/* Landlord Signature Block */}
        <DocumentPartySignatureBlock
          party={landlord}
          signature={landlordSignature}
          roleTitleEn="Landlord (Lessor)"
          roleTitleRw="Nyir'inzu (Landlord)"
          isKinyarwanda={isKinyarwanda}
        />

        {/* Tenant Signature Block */}
        <DocumentPartySignatureBlock
          party={renter}
          signature={renterSignature}
          roleTitleEn="Tenant / Renter (Lessee)"
          roleTitleRw="Ukodesha (Tenant)"
          isKinyarwanda={isKinyarwanda}
        />
      </div>
    </section>
  );
}
