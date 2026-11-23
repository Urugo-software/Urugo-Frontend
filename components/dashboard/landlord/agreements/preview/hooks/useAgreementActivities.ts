import { useMemo } from "react";
import { Agreement } from "@/types/agreement.types";
import { ActivityItem } from "../sidebar/SidebarActivityAuditCard";

export function useAgreementActivities(agreement: Agreement): ActivityItem[] {
  const isAwaitingLandlord = agreement.status === "Awaiting Landlord Signature";
  const isSigned = agreement.status === "Signed";

  return useMemo<ActivityItem[]>(() => {
    return [
      {
        title: "Agreement created",
        date: agreement.createdAt,
        detail: `Created by ${agreement.landlord.name}`,
        status: "completed",
      },
      ...(agreement.status !== "Draft" && agreement.status !== "Ready for Review"
        ? [
            {
              title: "Sent to renter for review",
              date: agreement.updatedAt,
              detail: `Delivered to ${agreement.renter.name}`,
              status: "completed" as const,
            },
          ]
        : []),
      ...(agreement.changeRequests && agreement.changeRequests.length > 0
        ? [
            {
              title: "Revisions requested",
              date: agreement.changeRequests[0].createdAt,
              detail: `${agreement.changeRequests.length} clause(s) flagged by ${agreement.renter.name}`,
              status: "attention" as const,
            },
          ]
        : []),
      ...(agreement.renterSignature
        ? [
            {
              title: "Signed by renter",
              date: agreement.renterSignature.signedAt,
              detail: `${agreement.renterSignature.signedBy} (Electronic)`,
              status: "completed" as const,
            },
          ]
        : agreement.status === "Awaiting Renter Signature"
        ? [
            {
              title: "Awaiting renter signature",
              date: "",
              detail: `Waiting for ${agreement.renter.name}`,
              status: "pending" as const,
            },
          ]
        : []),
      ...(agreement.landlordSignature
        ? [
            {
              title: "Signed by landlord",
              date: agreement.landlordSignature.signedAt,
              detail: `${agreement.landlordSignature.signedBy} (Electronic)`,
              status: "completed" as const,
            },
          ]
        : isAwaitingLandlord
        ? [
            {
              title: "Awaiting your signature",
              date: "",
              detail: "Action required to complete agreement",
              status: "pending" as const,
            },
          ]
        : []),
      ...(isSigned
        ? [
            {
              title: "Agreement fully executed",
              date: agreement.updatedAt,
              detail: "Recorded in Urugo Tenancy Registry",
              status: "completed" as const,
            },
          ]
        : []),
    ];
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
