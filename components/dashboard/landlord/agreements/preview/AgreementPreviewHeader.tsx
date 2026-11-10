"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  FileEdit,
  Globe,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Agreement, AgreementLanguage } from "../types/agreement.types";
import { AgreementStatusBadge } from "../AgreementStatusBadge";

interface Props {
  agreement: Agreement;
  activeLanguage: AgreementLanguage;
  onLanguageChange: (lang: AgreementLanguage) => void;
  onOpenRenterSimulator?: () => void;
}

export function AgreementPreviewHeader({
  agreement,
  activeLanguage,
  onLanguageChange,
  onOpenRenterSimulator,
}: Props) {
  const handlePrint = () => {
    window.print();
  };

  const isEditable =
    agreement.status === "Draft" ||
    agreement.status === "Ready for Review" ||
    agreement.status === "Changes Requested";

  return (
    <div className="flex flex-col gap-4 border-b border-line pb-6 pt-2 print:hidden">
      {/* Top back & metadata bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/landlord/agreements"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-faint hover:text-ink transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Agreements</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-faint">
            Ref: <strong className="text-ink">{agreement.referenceNumber}</strong>
          </span>
          <AgreementStatusBadge status={agreement.status} />
        </div>
      </div>

      {/* Main Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink font-heading">
            {agreement.renter.name} — Lease Agreement
          </h1>
          <p className="mt-0.5 text-xs text-faint">
            {agreement.property.name}, Unit {agreement.property.unitNumber} &middot;{" "}
            Version {agreement.version}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Language Switcher */}
          <div className="inline-flex items-center border border-line bg-surface p-0.5">
            <button
              type="button"
              onClick={() => onLanguageChange("en")}
              className={`px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                activeLanguage === "en"
                  ? "bg-white text-ink shadow-xs"
                  : "text-faint hover:text-ink"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange("rw")}
              className={`px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                activeLanguage === "rw"
                  ? "bg-white text-ink shadow-xs"
                  : "text-faint hover:text-ink"
              }`}
            >
              Kinyarwanda
            </button>
          </div>

          {/* Renter Review / Signing Simulation */}
          {onOpenRenterSimulator && (
            <Button
              type="button"
              variant="outline"
              onClick={onOpenRenterSimulator}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none border-line bg-white px-3 text-xs font-medium text-ink hover:bg-surface transition-colors"
            >
              <UserCheck className="size-3.5 text-faint" />
              <span>Renter Action Simulator</span>
            </Button>
          )}

          {/* Print Action */}
          <Button
            type="button"
            variant="outline"
            onClick={handlePrint}
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none border-line bg-white px-3 text-xs font-medium text-ink hover:bg-surface transition-colors"
          >
            <Printer className="size-3.5 text-faint" />
            <span>Print / PDF</span>
          </Button>

          {/* Edit Action */}
          {isEditable && (
            <Link
              href={`/landlord/agreements/${agreement.id}/edit`}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none bg-ink px-4 text-xs font-semibold text-white hover:bg-black transition-colors"
            >
              <FileEdit className="size-3.5" />
              <span>Edit Articles</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
