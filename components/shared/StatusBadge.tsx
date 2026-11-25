import { cn } from "@/lib/utils";

export type StatusTone = "success" | "info" | "warning" | "danger" | "neutral";

const TONE_STYLES: Record<StatusTone, string> = {
  success: "text-success",
  info: "text-brand-blue",
  warning: "text-amber-700",
  danger: "text-rose-700",
  neutral: "text-faint",
};

interface StatusBadgeProps {
  label: string;
  tone?: StatusTone;
  className?: string;
}

export function StatusBadge({
  label,
  tone = "neutral",
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-semibold whitespace-nowrap",
        TONE_STYLES[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}
