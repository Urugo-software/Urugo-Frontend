import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface LeftSectionHeaderProps {
  subHeader: string;
  header: string;
  seeMore?: string;
  href?: string;
}

function LeftSectionHeader({
  subHeader,
  header,
  seeMore,
  href,
}: LeftSectionHeaderProps) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl flex-1">
        <span className="mb-2.5 block text-xs font-bold uppercase tracking-widest text-brand">
          {subHeader}
        </span>
        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          {header}
        </h2>
      </div>

      {href && seeMore && (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-brand transition-colors hover:text-brand-deep hover:underline"
        >
          <span>{seeMore}</span>
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      )}
    </div>
  );
}

export default LeftSectionHeader;
