"use client";

import { AgreementProperty } from "@/types/agreement.types";

interface Props {
  property: AgreementProperty;
  isKinyarwanda: boolean;
}

export function DocumentPropertySection({ property, isKinyarwanda }: Props) {
  return (
    <section className="mb-7 text-[13px] leading-relaxed break-inside-avoid">
      <h2 className="text-[12px] font-bold uppercase tracking-wider text-ink mb-2">
        {isKinyarwanda
          ? "Ibyerekeye Inzu n'Icyerekezo Cy'Ubukode"
          : "Recitals & Demised Premises"}
      </h2>

      <div className="space-y-2 text-justify text-ink">
        <p>
          {isKinyarwanda ? (
            <>
              <strong>KUKO</strong> Nyir&rsquo;inzu afite uburenganzira bwemewe
              n&rsquo;amategeko bwo gukodesha inzu yo guturamo iherereye{" "}
              <strong>{property.address}</strong>, mu Karere ka{" "}
              <strong>{property.district}</strong>, izwi nka{" "}
              <strong>{property.name}</strong>
              {property.unitNumber && (
                <>
                  , Umuturirwa <strong>{property.unitNumber}</strong>
                </>
              )}{" "}
              ({property.propertyType}) (hano mu masezerano yiswe{" "}
              <strong>&ldquo;Inzu Ikodeshwa&rdquo;</strong>);
            </>
          ) : (
            <>
              <strong>WHEREAS</strong>, the Landlord is the lawful owner or authorized
              custodian of the residential real property located at{" "}
              <strong>{property.address}</strong>, District of{" "}
              <strong>{property.district}</strong>, Republic of Rwanda, designated
              as <strong>{property.name}</strong>
              {property.unitNumber && (
                <>
                  , Unit No. <strong>{property.unitNumber}</strong>
                </>
              )}{" "}
              ({property.propertyType}) (hereinafter referred to as the{" "}
              <strong>&ldquo;Premises&rdquo;</strong>); and
            </>
          )}
        </p>

        <p>
          {isKinyarwanda ? (
            <>
              <strong>KANDI KUKO</strong> Umukode yifuza gukodesha iyo Nzu
              Ikodeshwa hagamijwe guturamo gusa, kandi Nyir&rsquo;inzu akaba yemeye
              kuyimukodesha hakurikijwe ingingo n&rsquo;amabwiriza akurikira:
            </>
          ) : (
            <>
              <strong>WHEREAS</strong>, the Tenant desires to lease the Premises
              from the Landlord for private residential dwelling purposes only,
              and the Landlord agrees to let the Premises to the Tenant upon the
              terms and conditions hereinafter stated;
            </>
          )}
        </p>
      </div>
    </section>
  );
}
