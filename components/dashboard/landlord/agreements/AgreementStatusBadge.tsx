import { AgreementStatus } from "./types/agreement.types";
import {
  FileEdit,
  Clock,
  Send,
  Eye,
  AlertTriangle,
  PenTool,
  CheckCircle2,
  XCircle,
  Archive,
  Ban,
  Hourglass,
} from "lucide-react";

interface Props {
  status: AgreementStatus;
  className?: string;
  showIcon?: boolean;
}

export function AgreementStatusBadge({
  status,
  className = "",
  showIcon = true,
}: Props) {
  let badgeStyle = "bg-surface text-ink border-line";
  let IconComponent = Clock;

  switch (status) {
    case "Draft":
      badgeStyle = "bg-stone-100 text-stone-700 border-stone-200";
      IconComponent = FileEdit;
      break;
    case "Ready for Review":
      badgeStyle = "bg-sky-50 text-sky-800 border-sky-200";
      IconComponent = Eye;
      break;
    case "Sent":
      badgeStyle = "bg-blue-50 text-blue-800 border-blue-200";
      IconComponent = Send;
      break;
    case "Viewed":
      badgeStyle = "bg-indigo-50 text-indigo-800 border-indigo-200";
      IconComponent = Eye;
      break;
    case "Changes Requested":
      badgeStyle = "bg-amber-50 text-amber-900 border-amber-300 font-medium";
      IconComponent = AlertTriangle;
      break;
    case "Awaiting Renter Signature":
      badgeStyle = "bg-amber-50/80 text-amber-800 border-amber-200";
      IconComponent = PenTool;
      break;
    case "Awaiting Landlord Signature":
      badgeStyle = "bg-purple-50 text-purple-900 border-purple-200 font-semibold";
      IconComponent = PenTool;
      break;
    case "Signed":
      // Fully executed - distinct primary visual
      badgeStyle = "bg-ink text-white border-ink font-semibold";
      IconComponent = CheckCircle2;
      break;
    case "Declined":
      badgeStyle = "bg-red-50 text-red-800 border-red-200";
      IconComponent = XCircle;
      break;
    case "Expired":
      badgeStyle = "bg-stone-100 text-stone-600 border-stone-200";
      IconComponent = Hourglass;
      break;
    case "Superseded":
      badgeStyle = "bg-stone-50 text-stone-500 border-stone-200 line-through";
      IconComponent = Archive;
      break;
    case "Cancelled":
      badgeStyle = "bg-stone-100 text-stone-500 border-stone-200";
      IconComponent = Ban;
      break;
    default:
      badgeStyle = "bg-surface text-ink border-line";
  }

  // Label formatting
  let displayLabel: string = status;
  if (status === "Signed") {
    displayLabel = "Fully Signed";
  } else if (status === "Awaiting Landlord Signature") {
    displayLabel = "Partially Signed (Landlord Pending)";
  } else if (status === "Awaiting Renter Signature") {
    displayLabel = "Partially Signed (Renter Pending)";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase border rounded-none shrink-0 ${badgeStyle} ${className}`}
    >
      {showIcon && <IconComponent className="size-3.5 shrink-0" />}
      <span>{displayLabel}</span>
    </span>
  );
}
