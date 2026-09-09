import React from "react";
import { FileText, Download } from "lucide-react";
import toast from "react-hot-toast";
import { RenterDocument } from "@/types/renter";

export function DocumentItemCard({ doc }: { doc: RenterDocument }) {
  const handleDownload = () => {
    toast.success(`Downloading ${doc.title}...`);
  };

  return (
    <div className="flex items-center rounded-md justify-between  border border-line bg-white p-4 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-lg bg-brand-tint text-brand">
          <FileText className="size-5" />
        </div>
        <div>
          <h4 className="text-[13px] font-bold text-ink">{doc.title}</h4>
          <span className="text-[12px] text-faint">
            {doc.category} · {doc.size} · {doc.date}
          </span>
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-body hover:bg-surface"
      >
        <Download className="size-3.5" />
        <span>Download</span>
      </button>
    </div>
  );
}
