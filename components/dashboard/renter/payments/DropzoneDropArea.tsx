"use client";

import React from "react";
import { UploadCloud } from "lucide-react";
import { DropzoneRootProps, DropzoneInputProps } from "react-dropzone";

interface Props {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  isDragActive: boolean;
}

export function DropzoneDropArea({ getRootProps, getInputProps, isDragActive }: Props) {
  return (
    <div
      {...getRootProps()}
      className={`group cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${
        isDragActive
          ? "border-brand bg-brand-tint/30 scale-[1.01]"
          : "border-line bg-white hover:border-brand/50 hover:bg-slate-50/60"
      }`}
    >
      <input {...getInputProps()} />
      <div className="mx-auto grid size-12 place-items-center rounded-xl bg-surface border border-line text-brand transition-transform group-hover:scale-105">
        <UploadCloud className="size-6" />
      </div>
      <div className="mt-3 text-xs font-bold text-ink">
        {isDragActive ? "Drop receipt here..." : "Drag & drop payment receipt here"}
      </div>
      <p className="mt-1 text-[11px] text-body">
        or click to browse files (PNG, JPG, WEBP, or PDF)
      </p>
    </div>
  );
}
