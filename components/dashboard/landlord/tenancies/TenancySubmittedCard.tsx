import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatRwf } from "@/utils/format";

interface TenancySubmittedCardProps {
  totalOwed: number;
  createdIssueId?: string;
}

export function TenancySubmittedCard({
  totalOwed,
  createdIssueId,
}: TenancySubmittedCardProps) {
  return (
    <div className="space-y-4 border border-emerald-200 bg-emerald-50/70 p-6 text-center">
      <div className="mx-auto flex size-12 items-center justify-center border border-emerald-200 bg-white text-emerald-600">
        <CheckCircle2 aria-hidden="true" className="size-6" />
      </div>
      <h3 className="text-base font-bold text-ink">Tenancy Closure Submitted</h3>
      <p className="mx-auto max-w-md text-xs leading-relaxed text-body">
        {totalOwed > 0
          ? `A final balance notice of ${formatRwf(totalOwed)} has been issued to the renter under an Unresolved 3-day notice window. They may pay or submit proof before any obligation is confirmed.`
          : "All rent and final utility obligations were marked settled. This tenancy has been closed cleanly and the unit is now vacant."}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <Link
          href="/landlord/tenancies"
          className={cn(buttonVariants({ variant: "default" }), "rounded-none text-xs")}
        >
          Back to Tenancies
        </Link>
        {createdIssueId && (
          <Link
            href={`/landlord/renter-history/${createdIssueId}`}
            className={cn(buttonVariants({ variant: "outline" }), "rounded-none text-xs")}
          >
            View Rental History Case
          </Link>
        )}
      </div>
    </div>
  );
}
