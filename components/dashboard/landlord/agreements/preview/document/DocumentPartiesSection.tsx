"use client";

import { AgreementParty } from "@/types/agreement.types";
import { formatDate } from "@/utils/agreement-utils";

interface Props {
  landlord: AgreementParty;
  renter: AgreementParty;
  updatedAt: string;
  isKinyarwanda: boolean;
}

export function DocumentPartiesSection({
  landlord,
  renter,
  updatedAt,
  isKinyarwanda,
}: Props) {
  return (
    <section className="mb-7 text-[13px] leading-relaxed break-inside-avoid">
      {/* Formal Preamble / Recital */}
      <p className="text-justify text-ink mb-4">
        {isKinyarwanda ? (
          <>
            Aya Masezerano yo Gukodesha Inzu yo Guturamo (hano mu nyandiko yiswe{" "}
            <strong>&ldquo;Amasezerano&rdquo;</strong>) asinywe kandi agiriwe
            agaciro ku itariki ya <strong>{formatDate(updatedAt)}</strong>, hagati
            y&rsquo;impande zikurikira:
          </>
        ) : (
          <>
            This Residential Lease Agreement (the{" "}
            <strong>&ldquo;Agreement&rdquo;</strong>) is made and entered into
            as of <strong>{formatDate(updatedAt)}</strong>, by and between the
            contracting parties designated below:
          </>
        )}
      </p>

      {/* Structured Parties Details */}
      <div className="space-y-3.5 pl-3 border-l-2 border-zinc-200">
        {/* Landlord Party */}
        <div>
          <span className="font-bold uppercase tracking-wider text-ink text-[12px] block">
            {isKinyarwanda ? "1. Nyir'inzu (Landlord):" : "1. Landlord (Lessor):"}
          </span>
          <p className="text-ink mt-0.5">
            <strong>{landlord.name}</strong>,{" "}
            {isKinyarwanda ? "Indangamuntu No. " : "National ID No. "}
            <span className="font-mono text-[12.5px]">{landlord.nationalId}</span>
            {landlord.phone && <>, {isKinyarwanda ? "Telefoni: " : "Tel: "}{landlord.phone}</>}
            {landlord.email && <>, Email: {landlord.email}</>}
            {landlord.address && <>, {isKinyarwanda ? "Aderesi: " : "Address: "}{landlord.address}</>}
            <span className="text-body italic">
              {" "}
              ({isKinyarwanda ? "hano yiswe \"Nyir'inzu\"" : "hereinafter referred to as the \"Landlord\""})
            </span>.
          </p>
        </div>

        {/* Renter Party */}
        <div>
          <span className="font-bold uppercase tracking-wider text-ink text-[12px] block">
            {isKinyarwanda ? "2. Umukode (Tenant):" : "2. Tenant / Renter (Lessee):"}
          </span>
          <p className="text-ink mt-0.5">
            <strong>{renter.name}</strong>,{" "}
            {isKinyarwanda ? "Indangamuntu No. " : "National ID No. "}
            <span className="font-mono text-[12.5px]">{renter.nationalId}</span>
            {renter.phone && <>, {isKinyarwanda ? "Telefoni: " : "Tel: "}{renter.phone}</>}
            {renter.email && <>, Email: {renter.email}</>}
            <span className="text-body italic">
              {" "}
              ({isKinyarwanda ? "hano yiswe \"Umukode\"" : "hereinafter referred to as the \"Tenant\""})
            </span>.
          </p>
        </div>
      </div>
    </section>
  );
}
