import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface OverviewStatCardItem {
  label: string;
  value: string;
  helper: string;
  href?: string;
  progressPercent?: number;
  accent?: "default" | "success" | "warning" | "danger";
}

const ACCENT_VALUE: Record<NonNullable<OverviewStatCardItem["accent"]>, string> = {
  default: "text-ink",
  success: "text-emerald-700",
  warning: "text-amber-700",
  danger: "text-rose-700",
};

export function OverviewStatGrid({ items }: { items: OverviewStatCardItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const content = (
          <div className="flex h-full flex-col justify-between border border-line bg-white p-5 shadow-2xs transition-colors hover:border-ink/25">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                {item.label}
              </span>
              {item.href && (
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 shrink-0 text-faint"
                />
              )}
            </div>

            <div className="mt-3">
              <p
                className={`font-ibm text-2xl font-bold tracking-tight ${
                  ACCENT_VALUE[item.accent ?? "default"]
                }`}
              >
                {item.value}
              </p>

              {typeof item.progressPercent === "number" && (
                <div className="mt-2.5 h-1.5 w-full overflow-hidden bg-surface">
                  <div
                    className="h-full bg-emerald-600 transition-all"
                    style={{ width: `${Math.min(100, Math.max(0, item.progressPercent))}%` }}
                  />
                </div>
              )}

              <p className="mt-2 text-xs leading-relaxed text-body">
                {item.helper}
              </p>
            </div>
          </div>
        );

        return item.href ? (
          <Link key={item.label} href={item.href} className="block h-full">
            {content}
          </Link>
        ) : (
          <div key={item.label} className="h-full">
            {content}
          </div>
        );
      })}
    </div>
  );
}
