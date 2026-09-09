import { ScrollText } from "lucide-react";

export function LeaseEmptyState() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-line bg-surface p-8 text-center">
      <ScrollText className="size-8 text-faint mb-2" />
      <p className="text-sm font-semibold text-ink">No active lease found.</p>
      <p className="text-xs text-body mt-0.5">
        Your lease details will appear here once a tenancy is set up.
      </p>
    </div>
  );
}
