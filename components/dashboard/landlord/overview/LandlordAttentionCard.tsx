import Link from "next/link";
import { AttentionItem } from "@/types/landlord";
import { ArrowRight } from "lucide-react";

interface LandlordAttentionCardProps {
  items: AttentionItem[];
}

export function LandlordAttentionCard({ items }: LandlordAttentionCardProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="border bg-brand-tint/20 border-line  p-6 sm:p-7 shadow-2xs space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-red-700">
        Requires Your Attention
      </h3>
      <div className="flex flex-col gap-3.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-4 border border-line bg-white p-4 sm:p-5 shadow-2xs"
          >
            <p className="text-sm sm:text-[15px] font-semibold text-ink">
              {item.title}
            </p>
            <Link
              href={item.href}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
            >
              <span>{item.actionText}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
