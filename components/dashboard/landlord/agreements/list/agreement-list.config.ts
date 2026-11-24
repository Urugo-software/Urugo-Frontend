import type {
  Agreement,
  AgreementFilterTab,
  AgreementStatus,
} from "@/types/agreement.types";

export const AGREEMENT_TABS: { id: AgreementFilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "drafts", label: "Drafts" },
  { id: "in_review", label: "Sent" },
  { id: "changes_requested", label: "Changes requested" },
  { id: "awaiting_signatures", label: "Awaiting signature" },
  { id: "signed", label: "Signed" },
  { id: "archived", label: "Archived" },
];

const TAB_STATUS_MAP: Record<
  Exclude<AgreementFilterTab, "all">,
  AgreementStatus[]
> = {
  drafts: ["Draft", "Ready for Review"],
  in_review: ["Sent", "Viewed"],
  changes_requested: ["Changes Requested"],
  awaiting_signatures: [
    "Awaiting Renter Signature",
    "Awaiting Landlord Signature",
  ],
  signed: ["Signed"],
  archived: ["Declined", "Expired", "Superseded", "Cancelled"],
};

const EDITABLE_STATUSES: AgreementStatus[] = [
  "Draft",
  "Ready for Review",
  "Changes Requested",
];

export function isAgreementEditable(status: AgreementStatus): boolean {
  return EDITABLE_STATUSES.includes(status);
}

export function filterAgreements(
  agreements: readonly Agreement[],
  activeTab: AgreementFilterTab,
  searchQuery: string,
): Agreement[] {
  const query = searchQuery.trim().toLowerCase();

  return agreements.filter((agreement) => {
    if (activeTab !== "all" && !TAB_STATUS_MAP[activeTab].includes(agreement.status)) {
      return false;
    }
    if (!query) return true;

    return [
      agreement.referenceNumber,
      agreement.renter.name,
      agreement.property.name,
      agreement.property.unitNumber,
      agreement.property.district,
    ].some((field) => field?.toLowerCase().includes(query));
  });
}
