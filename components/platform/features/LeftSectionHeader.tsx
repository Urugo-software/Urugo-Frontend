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
    <div className="flex items-center justify-between mb-10 flex-wrap  ">
      <div className="max-md:flex-1">
        <div className="flex  items-center justify-between gap-4 mb-3 ">
          <span className="block text-xs font-bold tracking-widest uppercase text-brand ">
            {subHeader}
          </span>
          <Link
            href={href || "#"}
            className="md:hidden text-sm font-semibold text-brand whitespace-nowrap"
          >
            →
          </Link>
        </div>
        <h2 className="text-3xl text-ink font-extrabold tracking-tight">
          {header}
        </h2>
      </div>
      <Link
        href={href || "#"}
        className="max-md:hidden text-sm font-semibold text-brand whitespace-nowrap"
      >
        {seeMore} →
      </Link>
    </div>
  );
}

export default LeftSectionHeader;
