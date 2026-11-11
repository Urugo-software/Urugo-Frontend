"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  FileEdit,
  PenTool,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Agreement, AgreementLanguage } from "@/types/agreement.types";
import { AgreementStatusBadge } from "../AgreementStatusBadge";

interface Props {
  agreement: Agreement;
  activeLanguage: AgreementLanguage;
  onLanguageChange: (lang: AgreementLanguage) => void;
  onOpenLandlordSign?: () => void;
  onOpenRenterSimulator?: () => void;
}

export function AgreementPreviewHeader({
  agreement,
  activeLanguage,
  onLanguageChange,
  onOpenLandlordSign,
  onOpenRenterSimulator,
}: Props) {
  const handlePrint = () => {
    window.print();
  };

  const isEditable =
    agreement.status === "Draft" ||
    agreement.status === "Ready for Review" ||
    agreement.status === "Changes Requested";

  const isAwaitingLandlord = agreement.status === "Awaiting Landlord Signature";

  return (
    <header className="space-y-4 print:hidden">
      {/* Top back navigation */}
      <div>
        <Link
          href="/landlord/agreements"
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-faint hover:text-ink transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Agreements</span>
        </Link>
      </div>

      {/* Main Title, Status & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-line">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink font-heading">
              {agreement.renter.name}
            </h1>
            <span className="text-faint">&middot;</span>
            <AgreementStatusBadge status={agreement.status} />
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-body">
            <span className="font-mono text-faint text-[12.5px]">
              Ref: <strong className="text-ink font-semibold">{agreement.referenceNumber}</strong>
            </span>
            <span>&middot;</span>
            <span>Unit {agreement.property.unitNumber}, {agreement.property.name}</span>
            <span>&middot;</span>
            <span className="font-mono text-[12.5px]">v{agreement.version}.0</span>
            <span>&middot;</span>
            <button
              type="button"
              onClick={() => onLanguageChange(activeLanguage === "en" ? "rw" : "en")}
              className="inline-flex items-center gap-1 font-medium text-ink hover:underline cursor-pointer text-[12.5px]"
              title="Click to switch document language"
            >
              <span>{activeLanguage === "rw" ? "Kinyarwanda" : "English"}</span>
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Print Action */}
          <Button
            type="button"
            variant="outline"
            onClick={handlePrint}
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none border-line bg-white px-3 text-[12.5px] font-medium text-ink hover:bg-surface transition-colors"
          >
            <Printer className="size-3.5 text-faint" />
            <span>Print / PDF</span>
          </Button>

          {/* Landlord Sign Action (when awaiting landlord signature) */}
          {isAwaitingLandlord && onOpenLandlordSign && (
            <Button
              type="button"
              onClick={onOpenLandlordSign}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none bg-ink px-4 text-[12.5px] font-semibold text-white hover:bg-black transition-colors"
            >
              <PenTool className="size-3.5" />
              <span>Sign Agreement</span>
            </Button>
          )}

          {/* Edit Clauses Action (when draft or revisions requested) */}
          {isEditable && (
            <Link
              href={`/landlord/agreements/${agreement.id}/edit`}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none bg-ink px-4 text-[12.5px] font-semibold text-white hover:bg-black transition-colors"
            >
              <FileEdit className="size-3.5" />
              <span>
                {agreement.status === "Changes Requested"
                  ? "Revise Clauses"
                  : "Edit Clauses"}
              </span>
            </Link>
          )}

          {/* Renter Simulation Trigger (Understated demo utility) */}
          {onOpenRenterSimulator && (
            <Button
              type="button"
              variant="outline"
              onClick={onOpenRenterSimulator}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none border-dashed border-line bg-surface/50 px-3 text-[12.5px] font-medium text-faint hover:text-ink hover:bg-surface transition-colors"
              title="Test renter actions (review, request changes, or sign)"
            >
              <UserCheck className="size-3.5" />
              <span>Simulate Renter</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
