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
    case "Changes Requested":
      return "bg-amber-500";
    case "Sent":
      return "bg-blue-600";
    case "Viewed":
      return "bg-sky-500";
    case "Ready for Review":
      return "bg-blue-500";
    case "Declined":
      return "bg-rose-500";
    case "Draft":
    case "Expired":
    case "Superseded":
    case "Cancelled":
    default:
      return "bg-neutral-400";
  }
}

export function getStatusTextClass(status: AgreementStatus): string {
  switch (status) {
    case "Signed":
      return "text-success";
    case "Awaiting Landlord Signature":
    case "Awaiting Renter Signature":
    case "Changes Requested":
      return "text-amber-700";
    case "Sent":
    case "Viewed":
    case "Ready for Review":
      return "text-brand-blue";
    case "Declined":
      return "text-red-700";
    case "Draft":
    case "Expired":
    case "Superseded":
    case "Cancelled":
    default:
      return "text-faint";
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

export function AgreementStatusBadge({
  status,
  className = "",
  showDot = true,
}: Props) {
  const dotClass = getStatusDotClass(status);
  const textClass = getStatusTextClass(status);
  const label = getStatusLabel(status);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold",
        showDot ? "text-ink" : textClass,
        className,
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
