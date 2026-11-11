"use client";

import { AgreementParty, AgreementSignature } from "@/types/agreement.types";
import { DocumentPartySignatureCard } from "./DocumentPartySignatureCard";

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
    <section className="mt-12 pt-8 border-t-2 border-ink space-y-4 break-inside-avoid text-[12.5px]">
      <h3 className="text-[13px] font-bold uppercase tracking-wider text-ink">
        {isKinyarwanda
          ? "4. Isinywa ry'Amasezerano n'Ibyemezo"
          : "4. Execution & Digital Signatures"}
      </h3>
      <p className="text-[13px] text-faint">
        {isKinyarwanda
          ? "Mu gushyira umukono kuri iyi nyandiko, impande zombi zemeje ko zasomye, zasobanukiwe kandi zemeye amabwiriza yose akubiye muri aya masezerano."
          : "In witness whereof, the parties hereto have digitally endorsed this Agreement on the dates recorded below through the Urugo Verified Tenancy Service."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Landlord Signature Block */}
        <DocumentPartySignatureCard
          party={landlord}
          signature={landlordSignature}
          roleLabel={
            isKinyarwanda ? "Umukono wa Nyir'inzu" : "Landlord Endorsement"
          }
          pendingText={
            isKinyarwanda
              ? "[Bitegereje umukono wa Nyir'inzu]"
              : "[Pending Landlord Signature]"
          }
          signedText={
            isKinyarwanda
              ? "Yasinye mu buryo bw'ikoranabuhanga"
              : "Digitally Endorsed"
          }
        />

        {/* Renter Signature Block */}
        <DocumentPartySignatureCard
          party={renter}
          signature={renterSignature}
          roleLabel={isKinyarwanda ? "Umukono w'Umukode" : "Renter Endorsement"}
          pendingText={
            isKinyarwanda
              ? "[Bitegereje umukono w'Umukode]"
              : "[Pending Renter Signature]"
          }
          signedText={
            isKinyarwanda
              ? "Yasinye mu buryo bw'ikoranabuhanga"
              : "Digitally Endorsed"
          }
        />
      </div>
    </section>
  );
}
