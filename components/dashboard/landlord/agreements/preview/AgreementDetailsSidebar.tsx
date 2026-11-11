"use client";

import { Agreement } from "@/types/agreement.types";
import { SidebarStatusCard } from "./sidebar/SidebarStatusCard";
import { SidebarSigningProgressCard } from "./sidebar/SidebarSigningProgressCard";
import { SidebarKeyTermsCard } from "./sidebar/SidebarKeyTermsCard";
import { SidebarPremisesCard } from "./sidebar/SidebarPremisesCard";
import { SidebarActivityAuditCard } from "./sidebar/SidebarActivityAuditCard";
import { useAgreementActivities } from "./hooks/useAgreementActivities";

interface Props {
  agreement: Agreement;
  onOpenLandlordSign?: () => void;
}

export function AgreementDetailsSidebar({
  agreement,
  onOpenLandlordSign,
}: Props) {
  const isAwaitingLandlord = agreement.status === "Awaiting Landlord Signature";
  const activities = useAgreementActivities(agreement);

  return (
    <aside className="w-full space-y-6 text-ink">
      {/* 1. Status & Contextual Next Step */}
      <SidebarStatusCard
        agreement={agreement}
        onOpenLandlordSign={onOpenLandlordSign}
      />

      {/* 2. Signing Progress */}
      <SidebarSigningProgressCard
        renter={agreement.renter}
        landlord={agreement.landlord}
        renterSignature={agreement.renterSignature}
        landlordSignature={agreement.landlordSignature}
        isAwaitingLandlord={isAwaitingLandlord}
        onOpenLandlordSign={onOpenLandlordSign}
      />

      {/* 3. Key Financial & Tenancy Terms */}
      <SidebarKeyTermsCard
        financials={agreement.financials}
        tenancyStartDate={agreement.tenancyStartDate}
        tenancyDurationMonths={agreement.tenancyDurationMonths}
      />

      {/* 4. Demarcated Premises & Parties */}
      <SidebarPremisesCard
        property={agreement.property}
        renter={agreement.renter}
        landlord={agreement.landlord}
      />

      {/* 5. Activity History / Audit Trail */}
      <SidebarActivityAuditCard activities={activities} />
    </aside>
  );
}
