import type { ReactNode } from "react";

interface EmptyStateBoxProps {
  icon: React.ComponentType<{ className?: string }>;
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
    <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-line bg-white px-6 py-12 text-center shadow-2xs">
      <div className="flex size-12 items-center justify-center border border-line bg-surface text-faint">
        <Icon className="size-6" />
      </div>
      <div className="max-w-md space-y-1">
        <h3 className="text-base font-semibold text-ink">{title}</h3>
        <p className="text-sm leading-relaxed text-body">{description}</p>
      </div>
      {action}
    </div>
  );
}
