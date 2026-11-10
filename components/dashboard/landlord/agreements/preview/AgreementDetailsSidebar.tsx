"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  FileEdit,
  PenTool,
} from "lucide-react";
import { Agreement } from "@/types/agreement.types";
import { AgreementStatusBadge } from "../AgreementStatusBadge";
import { formatCurrencyRwf, formatDate } from "@/utils/agreement-utils";
import { Button } from "@/components/ui/button";

interface Props {
  agreement: Agreement;
  onOpenLandlordSign?: () => void;
}

export function AgreementDetailsSidebar({
  agreement,
  onOpenLandlordSign,
}: Props) {
  const isAwaitingLandlord = agreement.status === "Awaiting Landlord Signature";
  const isChangesRequested = agreement.status === "Changes Requested";
  const isDraft = agreement.status === "Draft" || agreement.status === "Ready for Review";
  const isSigned = agreement.status === "Signed";

  // Build activity timeline items based on agreement state
  const activities = [
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
            status: "completed",
          },
        ]
      : []),
    ...(agreement.changeRequests && agreement.changeRequests.length > 0
      ? [
          {
            title: "Revisions requested",
            date: agreement.changeRequests[0].createdAt,
            detail: `${agreement.changeRequests.length} clause(s) flagged by ${agreement.renter.name}`,
            status: "attention",
          },
        ]
      : []),
    ...(agreement.renterSignature
      ? [
          {
            title: "Signed by renter",
            date: agreement.renterSignature.signedAt,
            detail: `${agreement.renterSignature.signedBy} (Electronic)`,
            status: "completed",
          },
        ]
      : agreement.status === "Awaiting Renter Signature"
      ? [
          {
            title: "Awaiting renter signature",
            date: "",
            detail: `Waiting for ${agreement.renter.name}`,
            status: "pending",
          },
        ]
      : []),
    ...(agreement.landlordSignature
      ? [
          {
            title: "Signed by landlord",
            date: agreement.landlordSignature.signedAt,
            detail: `${agreement.landlordSignature.signedBy} (Electronic)`,
            status: "completed",
          },
        ]
      : isAwaitingLandlord
      ? [
          {
            title: "Awaiting your signature",
            date: "",
            detail: "Action required to complete agreement",
            status: "pending",
          },
        ]
      : []),
    ...(isSigned
      ? [
          {
            title: "Agreement fully executed",
            date: agreement.updatedAt,
            detail: "Recorded in Urugo Tenancy Registry",
            status: "completed",
          },
        ]
      : []),
  ];

  return (
    <aside className="w-full space-y-6 text-ink">
      {/* 1. Status & Next Action Panel */}
      <div className="border border-line bg-white p-5 space-y-3.5">
        <div className="flex items-center justify-between pb-3 border-b border-line">
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            Agreement Status
          </span>
          <AgreementStatusBadge status={agreement.status} />
        </div>

        {/* Contextual Next Step Prompt */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-faint block">
            Next Action
          </span>
          {isAwaitingLandlord && (
            <div className="space-y-2.5">
              <p className="text-xs text-body leading-relaxed">
                The renter has signed. Your digital endorsement is required to
                finalize and execute this contract.
              </p>
              {onOpenLandlordSign && (
                <Button
                  type="button"
                  onClick={onOpenLandlordSign}
                  className="w-full rounded-none bg-ink text-white hover:bg-black text-xs font-semibold h-9 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PenTool className="size-3.5" />
                  <span>Sign Agreement Now</span>
                </Button>
              )}
            </div>
          )}

          {isChangesRequested && (
            <div className="space-y-2.5">
              <p className="text-xs text-body leading-relaxed">
                The renter proposed changes to{" "}
                <strong className="text-ink">
                  {agreement.changeRequests?.length ?? 1} clause(s)
                </strong>
                . Review their notes and update the clauses.
              </p>
              <Link
                href={`/landlord/agreements/${agreement.id}/edit`}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-none bg-ink text-white hover:bg-black text-xs font-semibold h-9 cursor-pointer transition-colors"
              >
                <FileEdit className="size-3.5" />
                <span>Open Clause Editor</span>
              </Link>
            </div>
          )}

          {isDraft && (
            <div className="space-y-2.5">
              <p className="text-xs text-body leading-relaxed">
                This agreement is currently in draft. You can customize the 18
                statutory clauses before sending to the renter.
              </p>
              <Link
                href={`/landlord/agreements/${agreement.id}/edit`}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-none bg-ink text-white hover:bg-black text-xs font-semibold h-9 cursor-pointer transition-colors"
              >
                <FileEdit className="size-3.5" />
                <span>Edit Clauses</span>
              </Link>
            </div>
          )}

          {agreement.status === "Sent" && (
            <p className="text-xs text-body leading-relaxed">
              Agreement sent to <strong className="text-ink">{agreement.renter.name}</strong>. Awaiting their review.
            </p>
          )}

          {agreement.status === "Awaiting Renter Signature" && (
            <p className="text-xs text-body leading-relaxed">
              Waiting for <strong className="text-ink">{agreement.renter.name}</strong> to sign.
            </p>
          )}

          {isSigned && (
            <div className="space-y-1">
              <p className="text-xs text-body leading-relaxed">
                Both parties have signed. This agreement is legally active and recorded.
              </p>
              <span className="text-[11px] font-mono text-faint block">
                Ref: {agreement.referenceNumber} &middot; v{agreement.version}.0
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Signing Progress (SpotDraft / Juro style) */}
      <div className="border border-line bg-white p-5 space-y-3.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-faint border-b border-line pb-2.5">
          Signing Progress
        </h3>

        <div className="space-y-3 text-xs">
          {/* Renter Signature Row */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-semibold text-ink block">
                {agreement.renter.name}
              </span>
              <span className="text-[11px] text-faint">Renter (Lessee)</span>
            </div>
            <div className="text-right">
              {agreement.renterSignature ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                  <CheckCircle2 className="size-3 shrink-0" />
                  <span>Signed {formatDate(agreement.renterSignature.signedAt)}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700">
                  <Clock className="size-3 shrink-0" />
                  <span>Pending</span>
                </span>
              )}
            </div>
          </div>

          {/* Landlord Signature Row */}
          <div className="flex items-start justify-between gap-3 pt-2.5 border-t border-line/60">
            <div className="space-y-0.5">
              <span className="font-semibold text-ink block">
                {agreement.landlord.name}
              </span>
              <span className="text-[11px] text-faint">Landlord (Lessor)</span>
            </div>
            <div className="text-right">
              {agreement.landlordSignature ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                  <CheckCircle2 className="size-3 shrink-0" />
                  <span>Signed {formatDate(agreement.landlordSignature.signedAt)}</span>
                </span>
              ) : isAwaitingLandlord ? (
                <button
                  type="button"
                  onClick={onOpenLandlordSign}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 underline hover:text-black cursor-pointer"
                >
                  <PenTool className="size-3 shrink-0" />
                  <span>Sign Now</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-faint">
                  <Clock className="size-3 shrink-0" />
                  <span>Pending</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Key Financial & Tenancy Terms */}
      <div className="border border-line bg-white p-5 space-y-3.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-faint border-b border-line pb-2.5">
          Key Tenancy Terms
        </h3>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[11px] text-faint block">Monthly Rent</span>
            <span className="font-bold text-ink text-sm">
              {formatCurrencyRwf(agreement.financials.monthlyRentRwf)}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-faint block">Security Deposit</span>
            <span className="font-semibold text-ink">
              {formatCurrencyRwf(agreement.financials.securityDepositRwf)}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-faint block">Payment Due</span>
            <span className="font-medium text-ink">
              {agreement.financials.paymentDueDay}th of each month
            </span>
          </div>

          <div>
            <span className="text-[11px] text-faint block">Advance Rent</span>
            <span className="font-medium text-ink">
              {agreement.financials.advanceMonths} month(s)
            </span>
          </div>

          <div>
            <span className="text-[11px] text-faint block">Commencement</span>
            <span className="font-medium text-ink">
              {formatDate(agreement.tenancyStartDate)}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-faint block">Duration</span>
            <span className="font-medium text-ink">
              {agreement.tenancyDurationMonths ?? 12} Months
            </span>
          </div>
        </div>
      </div>

      {/* 4. Demarcated Premises & Parties */}
      <div className="border border-line bg-white p-5 space-y-3.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-faint border-b border-line pb-2.5">
          Premises & Parties
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <span className="text-[11px] text-faint block">Property & Unit</span>
            <span className="font-semibold text-ink block">
              {agreement.property.name} &middot; Unit {agreement.property.unitNumber}
            </span>
            <span className="text-body text-[11px]">
              {agreement.property.address}, {agreement.property.district}
            </span>
          </div>

          <div className="pt-2 border-t border-line/60">
            <span className="text-[11px] text-faint block">Renter</span>
            <span className="font-semibold text-ink block">
              {agreement.renter.name}
            </span>
            <span className="text-[11px] text-body block font-mono">
              {agreement.renter.phone} &middot; ID: {agreement.renter.nationalId}
            </span>
          </div>

          <div className="pt-2 border-t border-line/60">
            <span className="text-[11px] text-faint block">Landlord</span>
            <span className="font-semibold text-ink block">
              {agreement.landlord.name}
            </span>
            <span className="text-[11px] text-body block font-mono">
              {agreement.landlord.phone} &middot; ID: {agreement.landlord.nationalId}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Activity History / Audit Trail (Compact SpotDraft / DocuSign style) */}
      <div className="border border-line bg-white p-5 space-y-3.5">
        <div className="flex items-center justify-between border-b border-line pb-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            Activity History
          </h3>
          <span className="text-[10px] font-mono text-faint">Audit Trail</span>
        </div>

        <div className="relative pl-4 space-y-4 before:absolute before:left-1.5 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-line">
          {activities.map((act, i) => (
            <div key={i} className="relative text-xs">
              <span
                className={`absolute -left-4 top-1 size-2 rounded-full ${
                  act.status === "completed"
                    ? "bg-emerald-600 ring-2 ring-white"
                    : act.status === "attention"
                    ? "bg-amber-500 ring-2 ring-white"
                    : "bg-neutral-300 ring-2 ring-white"
                }`}
              />
              <div className="space-y-0.5">
                <span className="font-medium text-ink block leading-snug">
                  {act.title}
                </span>
                <span className="text-[11px] text-body block leading-relaxed">
                  {act.detail}
                </span>
                {act.date && (
                  <span className="text-[10px] text-faint font-mono block">
                    {formatDate(act.date)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
