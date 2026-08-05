import Link from "next/link";

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
    <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
      <div>
        <span className="block text-xs font-bold tracking-widest uppercase text-brand mb-3">
          {subHeader}
        </span>
        <h2 className="text-3xl text-ink font-extrabold tracking-tight">
          {header}
        </h2>
      </div>
      <Link
        href={href || "#"}
        className="text-sm font-semibold text-brand whitespace-nowrap"
      >
        {seeMore} →
      </Link>
    </div>
  );
}

export default LeftSectionHeader;
