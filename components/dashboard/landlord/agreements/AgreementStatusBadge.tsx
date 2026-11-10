import { AgreementStatus } from "@/types/agreement.types";
import { cn } from "@/lib/utils";

interface Props {
  status: AgreementStatus;
  className?: string;
  showDot?: boolean;
}

export function getStatusDotClass(status: AgreementStatus): string {
  switch (status) {
    case "Signed":
      return "bg-emerald-600";
    case "Awaiting Landlord Signature":
    case "Awaiting Renter Signature":
      return "bg-amber-500";
    case "Changes Requested":
      return "bg-amber-500";
    case "Sent":
      return "bg-blue-600";
    case "Viewed":
      return "bg-sky-500";
    case "Ready for Review":
      return "bg-blue-500";
    case "Draft":
      return "bg-neutral-400";
    case "Declined":
      return "bg-rose-500";
    case "Expired":
    case "Superseded":
    case "Cancelled":
      return "bg-neutral-400";
    default:
      return "bg-neutral-400";
  }
}

export function getStatusLabel(status: AgreementStatus): string {
  switch (status) {
    case "Signed":
      return "Fully signed";
    case "Awaiting Landlord Signature":
      return "Awaiting your signature";
    case "Awaiting Renter Signature":
      return "Awaiting renter signature";
    case "Changes Requested":
      return "Changes requested";
    case "Ready for Review":
      return "Ready for review";
    case "Draft":
      return "Draft";
    case "Sent":
      return "Sent";
    case "Viewed":
      return "Viewed";
    case "Declined":
      return "Declined";
    case "Expired":
      return "Expired";
    case "Superseded":
      return "Superseded";
    case "Cancelled":
      return "Cancelled";
    default:
      return status;
  }
}

/**
 * Clean, borderless status display with an optional subtle colored dot.
 * Adheres strictly to the minimal SpotDraft / DocuSign design direction:
 * No borders, no pill containers, no rectangular backgrounds.
 */
export function AgreementStatusBadge({
  status,
  className = "",
  showDot = true,
}: Props) {
  const dotClass = getStatusDotClass(status);
  const label = getStatusLabel(status);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-ink",
        className
      )}
    >
      {showDot && (
        <span
          className={cn("size-2 rounded-full shrink-0", dotClass)}
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </span>
  );
}
