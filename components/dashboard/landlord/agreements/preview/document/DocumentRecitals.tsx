"use client";

interface Props {
  isKinyarwanda: boolean;
}

export function DocumentRecitals({ isKinyarwanda }: Props) {
  return (
    <div className="mb-8 text-[13px] leading-relaxed text-body bg-surface/40 border border-line p-4">
      <p>
        {isKinyarwanda
          ? "Aya masezerano asinywe hagati y'impande zombi zivugwa muri iyi nyandiko. Nyir'inzu yemeranyije n'Umukode gukodesha inzu yo guturamo ifite ibiranga byavuzwe hano munsi, hashingiwe ku ngingo zikurikira n'amabwiriza yose akubiyemo."
          : "This Residential Lease Agreement is entered into by and between the Landlord and Renter identified below. The Landlord hereby lets to the Renter, and the Renter leases from the Landlord, the described residential premises subject to the terms and covenants stipulated herein."}
      </p>
    </div>
  );
}
