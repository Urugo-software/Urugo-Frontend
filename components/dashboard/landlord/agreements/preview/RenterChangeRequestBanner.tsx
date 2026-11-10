import Link from "next/link";
import { AlertTriangle, ArrowRight, FileEdit, Clock } from "lucide-react";
import { RenterChangeRequest } from "../types/agreement.types";
import { formatDate } from "../utils/agreement-utils";

interface Props {
  agreementId: string;
  changeRequests: RenterChangeRequest[];
}

export function RenterChangeRequestBanner({
  agreementId,
  changeRequests,
}: Props) {
  if (!changeRequests || changeRequests.length === 0) return null;

  return (
    <div className="border border-amber-300 bg-amber-50/50 p-5 print:hidden space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="grid size-7 shrink-0 place-items-center bg-amber-200 text-amber-900 mt-0.5">
            <AlertTriangle className="size-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-950">
              Renter Proposed Revisions ({changeRequests.length})
            </h3>
            <p className="mt-0.5 text-xs text-amber-900/80">
              The renter reviewed the contract draft and requested adjustments before signing.
            </p>
          </div>
        </div>

        <Link
          href={`/landlord/agreements/${agreementId}/edit`}
          className="inline-flex h-8.5 shrink-0 items-center justify-center gap-1.5 bg-amber-900 px-3.5 text-xs font-semibold text-white hover:bg-black transition-colors"
        >
          <FileEdit className="size-3.5" />
          <span>Open Editor to Revise</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>

      <div className="space-y-2.5 pt-3 border-t border-amber-200/80">
        {changeRequests.map((cr) => (
          <div
            key={cr.id}
            className="border border-amber-200/90 bg-white p-3.5 text-xs text-ink space-y-1.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-1.5">
              <span className="font-bold text-ink">
                Article {cr.articleNumber}: {cr.articleTitle}
              </span>
              <span className="text-[11px] text-faint inline-flex items-center gap-1 font-mono">
                <Clock className="size-3" />
                {formatDate(cr.createdAt)}
              </span>
            </div>
            <div>
              <span className="font-semibold text-amber-950 uppercase tracking-wider text-[10px] block">
                Requested Adjustment:
              </span>
              <p className="mt-0.5 text-ink leading-relaxed">{cr.requestedChange}</p>
            </div>
            {cr.reason && (
              <div>
                <span className="font-semibold text-faint uppercase tracking-wider text-[10px] block">
                  Renter Explanation:
                </span>
                <p className="mt-0.5 text-faint italic leading-relaxed">
                  &ldquo;{cr.reason}&rdquo;
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
