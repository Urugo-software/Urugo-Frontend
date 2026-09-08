"use client";

import React, { useState } from "react";
import { Copy, Check, LucideIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
}

export function LandlordContactItem({ label, value, href, icon: Icon }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between  border border-line p-3 bg-white">
      <div className="flex items-center gap-3 min-w-0">
        <div className="grid size-8 place-items-center rounded-lg bg-surface text-brand shrink-0">
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] text-faint font-semibold">{label}</div>
          <Link
            href={href}
            className="text-xs font-bold text-ink hover:text-brand transition-colors block truncate"
          >
            {value}
          </Link>
        </div>
      </div>
      <button
        onClick={handleCopy}
        className="p-1 text-faint hover:text-ink transition-colors"
        title={`Copy ${label}`}
      >
        {copied ? (
          <Check className="size-4 text-emerald-600" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
    </div>
  );
}
