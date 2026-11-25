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
    <div className="mb-8 border-b border-zinc-200 pb-6 text-[12.5px]">
      <div className="flex flex-col justify-between gap-4 border-b border-zinc-100 pb-4 sm:flex-row sm:items-start">
        <div>
          <span className="text-base font-extrabold uppercase tracking-tight text-ink">
            URUGO
          </span>
          <p className="mt-0.5 text-[12.5px] text-faint">
            {isKinyarwanda
              ? "Kigali, Repubulika y'u Rwanda"
              : "Kigali, Republic of Rwanda"}
          </p>
        </div>

        <div className="space-y-0.5 text-left font-ibm text-[12.5px] text-body">
          <p>
            <span className="text-faint">REF: </span>
            <strong className="font-semibold text-ink">{referenceNumber}</strong>
          </p>
          <p>
            <span className="text-faint">
              {isKinyarwanda ? "Itariki: " : "Date: "}
            </span>
            <span className="text-ink">
              {formatDate(updatedAt, isKinyarwanda ? "rw" : "en")}
            </span>
          </p>
          <p>
            <span className="text-faint">
              {isKinyarwanda ? "Inyandiko ya: " : "Version: "}
            </span>
            <span className="text-ink">{version}.0</span>
          </p>
        </div>
      </div>

      <div className="pt-6 text-center">
        <h1 className="font-heading text-lg font-bold uppercase tracking-wide text-ink sm:text-xl">
          {isKinyarwanda
            ? "Amasezerano y'Ubukode bw'Inzu yo Guturamo"
            : "Residential Lease Agreement"}
        </h1>
        <p className="mt-1 text-[13px] text-body">
          {isKinyarwanda
            ? "Yateguwe hakurikijwe amategeko n'amabwiriza agenga ubutaka n'ubukode mu Rwanda"
            : "Governed by the statutory residential tenancy regulations of the Republic of Rwanda"}
        </p>
      </div>
    </div>
  );
}
