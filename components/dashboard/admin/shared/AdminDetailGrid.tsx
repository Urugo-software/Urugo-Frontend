import type { ReactNode } from "react";

export interface AdminDetailRow {
  label: string;
  value: ReactNode;
}

interface AdminDetailGridProps {
  title: string;
  subtitle?: string;
  rows: AdminDetailRow[];
  action?: ReactNode;
}

export function AdminDetailGrid({
  title,
  subtitle,
  rows,
  action,
}: AdminDetailGridProps) {
  return (
    <section className="border border-line bg-white shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <h3 className="text-sm font-bold text-ink">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-body">{subtitle}</p>}
        </div>
        {action}
      </div>

      <dl className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-4 border-b border-line px-5 py-3.5 text-sm"
          >
            <dt className="text-body">{row.label}</dt>
            <dd className="text-right font-semibold text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
