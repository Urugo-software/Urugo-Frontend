"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import { Agreement } from "@/types/agreement.types";
import { formatCurrencyRwf, formatDate } from "@/utils/agreement-utils";

interface Props {
  agreement: Agreement;
}

export function EditorSystemMetadataCard({ agreement }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-line bg-surface/30 p-4 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="grid size-6 place-items-center bg-surface border border-line text-ink">
            <Lock className="size-3.5 text-faint" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-ink">
                System-Governed Tenancy Specifications
              </span>
              <span className="text-[10px] uppercase font-semibold text-faint bg-surface border border-line px-1.5 py-0.2">
                Fixed Metadata
              </span>
            </div>
            <p className="text-[11px] text-faint">
              Parties, property identification, and agreed rent figures are linked to the verified tenancy registration.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-ink hover:underline cursor-pointer"
        >
          <span>{isExpanded ? "Hide Details" : "Inspect Specifications"}</span>
          {isExpanded ? (
            <ChevronUp className="size-3.5" />
          ) : (
            <ChevronDown className="size-3.5" />
          )}
        </button>
      </div>

      {/* Collapsible Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Parties */}
          <div className="space-y-1 bg-white border border-line p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-faint block">
              Contracting Parties
            </span>
            <p className="font-semibold text-ink">
              Landlord: <span className="font-normal">{agreement.landlord.name}</span>
            </p>
            <p className="font-semibold text-ink">
              Renter: <span className="font-normal">{agreement.renter.name}</span>
            </p>
            <p className="font-mono text-[11px] text-faint">
              ID: {agreement.renter.nationalId}
            </p>
          </div>

          {/* Property */}
          <div className="space-y-1 bg-white border border-line p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-faint block">
              Demarcated Premises
            </span>
            <p className="font-semibold text-ink">{agreement.property.name}</p>
            <p className="text-faint">Unit: {agreement.property.unitNumber}</p>
            <p className="text-faint">{agreement.property.address}</p>
          </div>

          {/* Financials */}
          <div className="space-y-1 bg-white border border-line p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-faint block">
              Agreed Financials & Term
            </span>
            <p className="font-bold text-ink">
              {formatCurrencyRwf(agreement.financials.monthlyRentRwf)} / mo
            </p>
            <p className="text-faint">
              Due on the {agreement.financials.paymentDueDay}th of each month
            </p>
            <p className="text-faint">
              Deposit: {formatCurrencyRwf(agreement.financials.securityDepositRwf)}
            </p>
            <p className="text-faint">
              Commences: {formatDate(agreement.tenancyStartDate)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
