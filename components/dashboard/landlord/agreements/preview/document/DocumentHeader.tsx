"use client";

import { formatDate } from "@/utils/agreement-utils";

interface Props {
  version: number;
  referenceNumber: string;
  updatedAt: string;
  isKinyarwanda: boolean;
}

export function DocumentHeader({
  version,
  referenceNumber,
  updatedAt,
  isKinyarwanda,
}: Props) {
  return (
    <header className="border-b border-zinc-200 pb-6 mb-8 text-[12.5px]">
      {/* Top Formal Branding & Document Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-ink uppercase">
              URUGO
            </span>
            <span className="size-1.5 rounded-full bg-blue-700" />
            <span className="text-[12.5px] font-medium text-body">
              {isKinyarwanda
                ? "Urubuga rw'Ubukode bw'Inzu mu Rwanda"
                : "Residential Tenancy Registry"}
            </span>
          </div>
          <p className="text-[12px] text-faint mt-0.5">
            Kigali, Republic of Rwanda
          </p>
        </div>

        <div className="text-left sm:text-right font-mono text-[12px] text-body space-y-0.5">
          <p>
            <span className="text-faint">REF: </span>
            <strong className="text-ink font-semibold">{referenceNumber}</strong>
          </p>
          <p>
            <span className="text-faint">{isKinyarwanda ? "Itariki: " : "Date: "}</span>
            <span className="text-ink">{formatDate(updatedAt)}</span>
          </p>
          <p>
            <span className="text-faint">Version: </span>
            <span className="text-ink">{version}.0</span>
          </p>
        </div>
      </div>

      {/* Main Document Title */}
      <div className="text-center pt-6">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-ink font-heading uppercase">
          {isKinyarwanda
            ? "Amasezerano y'Ubukode bw'Inzu yo Guturamo"
            : "Residential Lease Agreement"}
        </h1>
        <p className="text-[12.5px] text-body mt-1">
          {isKinyarwanda
            ? "Yateguwe hakurikijwe amategeko n'amabwiriza agenga ubutaka n'ubukode mu Rwanda"
            : "Governed by the statutory residential tenancy regulations of the Republic of Rwanda"}
        </p>
      </div>
    </header>
  );
}
