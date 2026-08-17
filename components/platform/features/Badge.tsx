import { cn } from "@/lib/utils";

function Badge({ title, className }: { title: string; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-4 py-2 rounded-full border border-line bg-surface/60 text-xs font-semibold text-gray-600 transition-colors cursor-default shadow-xs",
        className,
      )}
    >
      {title}
    </div>
  );
}

export default Badge;
