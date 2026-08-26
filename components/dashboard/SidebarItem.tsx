import Link from "next/link";
import { LucideIcon } from "lucide-react";

export interface SidebarItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: number | string;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  href,
  icon: Icon,
  label,
  badge,
  active,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`group flex  items-center justify-between  max-md:px-1 px-3.5 py-2.5 text-[14px] font-medium transition-all ${
        active
          ? "bg-white font-semibold text-brand md:border-l-4 md:border-brand md:shadow-xs"
          : "text-body hover:bg-white hover:text-ink"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon
          className={`size-4.5 transition-colors ${active ? "text-brand" : "text-body group-hover:text-ink"}`}
        />
        <span>{label}</span>
      </div>
      {badge !== undefined && (
        <span className="grid min-w-[20px] place-items-center rounded-full bg-brand px-1.5 py-0.5 text-[11px] font-bold text-white">
          {badge}
        </span>
      )}
    </Link>
  );
}
