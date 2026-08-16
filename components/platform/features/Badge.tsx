import { cn } from "@/lib/utils";

function Badge({ title, className }: { title: string; className?: string }) {
  const defaultClassName = "border-line bg-surface text-sm text-gray-400  ";
  return (
    <div
      className={cn(
        (className ?? defaultClassName) + " " + "rounded-full border",
      )}
    >
      {title}
    </div>
  );
}

export default Badge;
