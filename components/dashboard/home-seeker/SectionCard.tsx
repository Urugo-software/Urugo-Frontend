"use client";

import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionCard({
  title,
  subtitle,
  action,
  children,
  className = "",
}: SectionCardProps) {
  return (
    <div className={`border border-line bg-white p-6 shadow-xs ${className}`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <div className="text-[16px] font-extrabold text-ink">{title}</div>
          {subtitle && (
            <div className="mt-0.5 text-[12px] text-faint">{subtitle}</div>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
