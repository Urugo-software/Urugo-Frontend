"use client";

import React from "react";
import { FileCheck, Trash2 } from "lucide-react";

interface Props {
  file: File;
  previewUrl: string | null;
  onRemove: (e: React.MouseEvent) => void;
}

export function DropzoneFilePreview({ file, previewUrl, onRemove }: Props) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        {previewUrl ? (
          <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-line bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Receipt Preview" className="size-full object-cover" />
          </div>
        ) : (
          <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
            <FileCheck className="size-6" />
          </div>
        )}
        <div className="min-w-0">
          <div className="text-xs font-bold text-ink truncate">{file.name}</div>
          <div className="text-[11px] text-body mt-0.5">
            {(file.size / 1024).toFixed(1)} KB &bull; Attached
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors"
      >
        <Trash2 className="size-3.5" />
        <span>Remove</span>
      </button>
    </div>
  );
}
