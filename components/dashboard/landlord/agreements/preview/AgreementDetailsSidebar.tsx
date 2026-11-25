"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import type { ActivityItem, Agreement } from "@/types/agreement.types";
import { AGREEMENT_STATUS_KEYS } from "../AgreementStatusBadge";
import { SidebarStatusCard } from "./sidebar/SidebarStatusCard";
import { SidebarSigningProgressCard } from "./sidebar/SidebarSigningProgressCard";
import { SidebarKeyTermsCard } from "./sidebar/SidebarKeyTermsCard";
import { SidebarPremisesCard } from "./sidebar/SidebarPremisesCard";
import { SidebarActivityAuditCard } from "./sidebar/SidebarActivityAuditCard";

const NEVER_SENT_STATUSES = new Set(["Draft", "Ready for Review"]);

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
  const tActivity = useTranslations("landlord.agreements.preview.activity");
  const tStatuses = useTranslations("landlord.agreements.statuses");
  const isAwaitingLandlord = agreement.status === "Awaiting Landlord Signature";
  const isSigned = agreement.status === "Signed";

  const activities = useMemo<ActivityItem[]>(() => {
    const wasSent =
      !NEVER_SENT_STATUSES.has(agreement.status) &&
      (agreement.status !== "Cancelled" ||
        Boolean(
          agreement.renterSignature ||
            agreement.landlordSignature ||
            agreement.changeRequests?.length,
        ));

    const sentDate =
      agreement.changeRequests?.[0]?.createdAt ??
      agreement.renterSignature?.signedAt ??
      agreement.landlordSignature?.signedAt ??
      agreement.createdAt;

    const formatSigType = (type: string) =>
      type === "Electronic" ? tActivity("signatureTypeElectronic") : type;

    const items: ActivityItem[] = [
      {
        title: tActivity("createdTitle"),
        date: agreement.createdAt,
        detail: tActivity("createdDetail", { name: agreement.landlord.name }),
        status: "completed",
      },
    ];

    if (wasSent) {
      items.push({
        title: tActivity("sentTitle"),
        date: sentDate,
        detail: tActivity("sentDetail", { name: agreement.renter.name }),
        status: "completed",
      });
    }

    if (agreement.changeRequests && agreement.changeRequests.length > 0) {
      items.push({
        title: tActivity("revisionsTitle"),
        date: agreement.changeRequests[0].createdAt,
        detail: tActivity("revisionsDetail", {
          count: agreement.changeRequests.length,
          name: agreement.renter.name,
        }),
        status:
          agreement.status === "Changes Requested" ? "attention" : "completed",
      });
    }

    if (agreement.renterSignature) {
      items.push({
        title: tActivity("signedByRenterTitle"),
        date: agreement.renterSignature.signedAt,
        detail: tActivity("signatureDetail", {
          name: agreement.renterSignature.signedBy,
          type: formatSigType(agreement.renterSignature.signatureType),
        }),
        status: "completed",
      });
    } else if (agreement.status === "Awaiting Renter Signature") {
      items.push({
        title: tActivity("awaitingRenterTitle"),
        date: "",
        detail: tActivity("awaitingRenterDetail", {
          name: agreement.renter.name,
        }),
        status: "pending",
      });
    }

    if (agreement.landlordSignature) {
      items.push({
        title: tActivity("signedByLandlordTitle"),
        date: agreement.landlordSignature.signedAt,
        detail: tActivity("signatureDetail", {
          name: agreement.landlordSignature.signedBy,
          type: formatSigType(agreement.landlordSignature.signatureType),
        }),
        status: "completed",
      });
    } else if (isAwaitingLandlord) {
      items.push({
        title: tActivity("awaitingLandlordTitle"),
        date: "",
        detail: tActivity("awaitingLandlordDetail"),
        status: "pending",
      });
    }

    if (isSigned) {
      items.push({
        title: tActivity("executedTitle"),
        date: agreement.updatedAt,
        detail: tActivity("executedDetail"),
        status: "completed",
      });
    }

    if (
      agreement.status === "Cancelled" ||
      agreement.status === "Declined" ||
      agreement.status === "Expired" ||
      agreement.status === "Superseded"
    ) {
      const statusLabel = tStatuses(AGREEMENT_STATUS_KEYS[agreement.status]);
      items.push({
        title: tActivity("closedTitle", { status: statusLabel }),
        date: agreement.updatedAt,
        detail: tActivity("closedDetail", { status: statusLabel }),
        status: "attention",
      });
    }

    return items;
  }, [agreement, isAwaitingLandlord, isSigned, tActivity, tStatuses]);

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
