"use client";

import React, { useState } from "react";
import { Copy, Check, LucideIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface Props {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
}

export function LandlordContactItem({ label, value, href, icon: Icon }: Props) {
  const t = useTranslations("renter.messages");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyLabel = t("copyLabel", { label });

  return (
    <div className="flex items-center justify-between  border border-line p-3 bg-white">
      <div className="flex items-center gap-3 min-w-0">
        <div className="grid size-8 place-items-center rounded-lg bg-surface text-brand shrink-0">
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <div className="text-[12.5px] text-faint font-semibold">{label}</div>
          <Link
            href={href}
            className="text-xs font-bold text-ink hover:text-brand transition-colors block truncate"
          >
            {value}
          </Link>
        </div>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="p-1 text-faint hover:text-ink transition-colors"
        title={copyLabel}
        aria-label={copyLabel}
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
