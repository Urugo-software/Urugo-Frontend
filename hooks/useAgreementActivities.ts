import { useMemo } from "react";
import { Agreement, ActivityItem } from "@/types/agreement.types";

const NEVER_SENT_STATUSES = new Set(["Draft", "Ready for Review"]);

export function useAgreementActivities(agreement: Agreement): ActivityItem[] {
  const isAwaitingLandlord = agreement.status === "Awaiting Landlord Signature";
  const isSigned = agreement.status === "Signed";

  return useMemo<ActivityItem[]>(() => {
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

    const items: ActivityItem[] = [
      {
        title: "Agreement created",
        date: agreement.createdAt,
        detail: `Created by ${agreement.landlord.name}`,
        status: "completed",
      },
    ];

    if (wasSent) {
      items.push({
        title: "Sent to renter for review",
        date: sentDate,
        detail: `Delivered to ${agreement.renter.name}`,
        status: "completed",
      });
    }

    if (agreement.changeRequests && agreement.changeRequests.length > 0) {
      items.push({
        title: "Revisions requested",
        date: agreement.changeRequests[0].createdAt,
        detail: `${agreement.changeRequests.length} clause(s) flagged by ${agreement.renter.name}`,
        status:
          agreement.status === "Changes Requested" ? "attention" : "completed",
      });
    }

    if (agreement.renterSignature) {
      items.push({
        title: "Signed by renter",
        date: agreement.renterSignature.signedAt,
        detail: `${agreement.renterSignature.signedBy} (${agreement.renterSignature.signatureType})`,
        status: "completed",
      });
    } else if (agreement.status === "Awaiting Renter Signature") {
      items.push({
        title: "Awaiting renter signature",
        date: "",
        detail: `Waiting for ${agreement.renter.name}`,
        status: "pending",
      });
    }

    if (agreement.landlordSignature) {
      items.push({
        title: "Signed by landlord",
        date: agreement.landlordSignature.signedAt,
        detail: `${agreement.landlordSignature.signedBy} (${agreement.landlordSignature.signatureType})`,
        status: "completed",
      });
    } else if (isAwaitingLandlord) {
      items.push({
        title: "Awaiting your signature",
        date: "",
        detail: "Action required to complete agreement",
        status: "pending",
      });
    }

    if (isSigned) {
      items.push({
        title: "Agreement fully executed",
        date: agreement.updatedAt,
        detail: "Recorded in Urugo Tenancy Registry",
        status: "completed",
      });
    }

    if (
      agreement.status === "Cancelled" ||
      agreement.status === "Declined" ||
      agreement.status === "Expired" ||
      agreement.status === "Superseded"
    ) {
      items.push({
        title: `Agreement ${agreement.status.toLowerCase()}`,
        date: agreement.updatedAt,
        detail: `Status updated to ${agreement.status}`,
        status: "attention",
      });
    }

    return items;
  }, [
    agreement.createdAt,
    agreement.landlord.name,
    agreement.status,
    agreement.updatedAt,
    agreement.renter.name,
    agreement.changeRequests,
    agreement.renterSignature,
    agreement.landlordSignature,
    isAwaitingLandlord,
    isSigned,
  ]);
}
