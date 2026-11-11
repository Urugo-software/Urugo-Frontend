"use client";

import { AgreementParty } from "@/types/agreement.types";

interface Props {
  landlord: AgreementParty;
  renter: AgreementParty;
  isKinyarwanda: boolean;
}

export function DocumentPartiesSection({
  landlord,
  renter,
  isKinyarwanda,
}: Props) {
  return (
    <section className="mb-8 space-y-3 break-inside-avoid text-[12.5px]">
      <h3 className="text-[13px] font-bold uppercase tracking-wider text-ink border-b border-line pb-1.5 flex items-center justify-between">
        <span>
          {isKinyarwanda ? "1. Ibiranga Impande Zombi" : "1. The Contracting Parties"}
        </span>
        <span className="text-[12.5px] text-faint font-normal font-mono">
          {isKinyarwanda ? "nyir'inzu n'umukode" : "landlord & renter"}
        </span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Landlord Box */}
        <div className="border border-line p-4 bg-surface/20">
          <span className="text-[12.5px] font-bold uppercase tracking-wider text-faint block mb-2">
            {isKinyarwanda ? "Nyir'inzu (Landlord)" : "Landlord (Lessor)"}
          </span>
          <div className="space-y-1.5 text-[13px]">
            <p className="font-bold text-ink text-[15px]">{landlord.name}</p>
            <p className="text-faint font-mono text-[12.5px]">
              {isKinyarwanda ? "Indangamuntu: " : "National ID: "}
              <span className="text-ink">{landlord.nationalId}</span>
            </p>
            <p className="text-faint font-mono text-[12.5px]">
              {isKinyarwanda ? "Telefoni: " : "Phone: "}
              <span className="text-ink">{landlord.phone}</span>
            </p>
            {landlord.email && (
              <p className="text-faint text-[12.5px]">
                Email: <span className="text-ink">{landlord.email}</span>
              </p>
            )}
            {landlord.address && (
              <p className="text-faint text-[12.5px]">
                {isKinyarwanda ? "Aderesi: " : "Address: "}
                <span className="text-ink">{landlord.address}</span>
              </p>
            )}
          </div>
        </div>

        {/* Renter Box */}
        <div className="border border-line p-4 bg-surface/20">
          <span className="text-[12.5px] font-bold uppercase tracking-wider text-faint block mb-2">
            {isKinyarwanda ? "Umukode (Renter / Tenant)" : "Renter (Lessee)"}
          </span>
          <div className="space-y-1.5 text-[13px]">
            <p className="font-bold text-ink text-[15px]">{renter.name}</p>
            <p className="text-faint font-mono text-[12.5px]">
              {isKinyarwanda ? "Indangamuntu: " : "National ID: "}
              <span className="text-ink">{renter.nationalId}</span>
            </p>
            <p className="text-faint font-mono text-[12.5px]">
              {isKinyarwanda ? "Telefoni: " : "Phone: "}
              <span className="text-ink">{renter.phone}</span>
            </p>
            {renter.email && (
              <p className="text-faint text-[12.5px]">
                Email: <span className="text-ink">{renter.email}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
