import { Agreement } from "@/types/agreement.types";
import { SidebarStatusCard } from "./sidebar/SidebarStatusCard";
import { SidebarSigningProgressCard } from "./sidebar/SidebarSigningProgressCard";
import { SidebarKeyTermsCard } from "./sidebar/SidebarKeyTermsCard";
import { SidebarPremisesCard } from "./sidebar/SidebarPremisesCard";
import { SidebarActivityAuditCard } from "./sidebar/SidebarActivityAuditCard";
import { useAgreementActivities } from "@/hooks/useAgreementActivities";

interface Props {
  agreement: Agreement;
  onOpenLandlordSign?: () => void;
  onSendDraft?: () => void;
  onCreateRenewalDraft?: () => void;
}

export function AgreementDetailsSidebar({
  agreement,
  onOpenLandlordSign,
  onSendDraft,
  onCreateRenewalDraft,
}: Props) {
  const isAwaitingLandlord = agreement.status === "Awaiting Landlord Signature";
  const activities = useAgreementActivities(agreement);

  return (
    <aside className="w-full space-y-6 text-ink">
      <SidebarStatusCard
        agreement={agreement}
        onOpenLandlordSign={onOpenLandlordSign}
        onSendDraft={onSendDraft}
        onCreateRenewalDraft={onCreateRenewalDraft}
      />

      <SidebarSigningProgressCard
        renter={agreement.renter}
        landlord={agreement.landlord}
        renterSignature={agreement.renterSignature}
        landlordSignature={agreement.landlordSignature}
        isAwaitingLandlord={isAwaitingLandlord}
        onOpenLandlordSign={onOpenLandlordSign}
      />

      <SidebarKeyTermsCard
        financials={agreement.financials}
        tenancyStartDate={agreement.tenancyStartDate}
        tenancyDurationMonths={agreement.tenancyDurationMonths}
      />

      <SidebarPremisesCard
        property={agreement.property}
        renter={agreement.renter}
        landlord={agreement.landlord}
      />

      <SidebarActivityAuditCard activities={activities} />
    </aside>
  );
}
