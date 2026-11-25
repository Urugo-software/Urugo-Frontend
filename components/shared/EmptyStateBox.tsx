import { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateBoxProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyStateBox({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateBoxProps) {
  return (
    <div className="flex flex-col items-center justify-center border border-line bg-white p-10 text-center shadow-2xs">
      <div className="mb-3 flex size-12 items-center justify-center border border-line bg-surface text-faint">
        <Icon aria-hidden="true" className="size-6" />
      </div>
      <h3 className="text-sm font-bold text-ink">{title}</h3>
      <p className="mt-1 max-w-sm text-xs leading-relaxed text-body">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
