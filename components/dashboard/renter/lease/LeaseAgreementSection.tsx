"use client";

import { FileText, Download, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { RenterLeaseAgreement } from "@/types/renter";

interface Props {
  agreement?: RenterLeaseAgreement;
}

export function LeaseAgreementSection({ agreement }: Props) {
  const handleDownload = () => {
    if (!agreement) return;
    toast.success(`Downloading ${agreement.title}…`);
  };

  const handleView = () => {
    if (!agreement) return;
    toast.success(`Opening ${agreement.title}…`);
  };

  return (
    <div className="mt-5 border border-line bg-white p-5 shadow-xs">
      <h3 className="mb-4 text-[17px] font-bold text-ink">Lease Agreement</h3>

      {agreement ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-line bg-white p-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-tint text-brand">
              <FileText className="size-5" />
            </div>
            <div>
              <h4 className="text-[13.5px] font-bold text-ink">
                {agreement.title}
              </h4>
              <span className="text-[12.5px] text-faint">
                Lease Contract &middot; {agreement.size} &middot;{" "}
                {agreement.date}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleView}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-body hover:bg-surface"
            >
              <Eye className="size-3.5" />
              <span>View</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-body hover:bg-surface"
            >
              <Download className="size-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-line bg-surface p-6 text-center">
          <FileText className="size-7 text-faint mb-2" />
          <p className="text-sm font-semibold text-ink">
            No lease agreement uploaded yet.
          </p>
          <p className="text-xs text-body mt-0.5">
            Your landlord will upload the agreement when it becomes available.
          </p>
        </div>
      )}
    </div>
  );
}
