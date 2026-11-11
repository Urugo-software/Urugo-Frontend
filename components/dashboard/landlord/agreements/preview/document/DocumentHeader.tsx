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
    <div className="border-b-2 border-ink pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[12.5px] font-bold tracking-widest uppercase bg-ink text-white px-2 py-0.5">
            URUGO OFFICIAL CONTRACT
          </span>
          <span className="font-mono text-[12.5px] text-faint">
            v{version}.0
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink font-heading uppercase">
          {isKinyarwanda
            ? "Amasezerano yo Gukodesha Inzu yo Guturamo"
            : "Residential Tenancy Lease Agreement"}
        </h2>
        <p className="text-[13px] text-faint mt-1">
          {isKinyarwanda
            ? "Yateguwe hakurikijwe amategeko n'amabwiriza agenga ubutaka n'ubukode mu Rwanda"
            : "Executed under the statutory tenancy regulations of the Republic of Rwanda"}
        </p>
      </div>

      <div className="text-left sm:text-right font-mono text-[12.5px]">
        <p className="font-bold text-ink">REF: {referenceNumber}</p>
        <p className="text-faint mt-0.5">
          {isKinyarwanda ? "Itariki: " : "Date: "}
          {formatDate(updatedAt)}
        </p>
      </div>
    </div>
  );
}
