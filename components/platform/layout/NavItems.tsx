"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath } from "@/lib/utils";
import type { NavItemProps } from "@/types";

function NavItems({ href, name }: NavItemProps) {
  const pathname = usePathname();
  const isActive = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`px-2 py-1 text-sm tracking-wide transition-colors duration-200 hover:border-b-2 hover:border-brand/80 hover:text-brand ${
        isActive ? "border-b-2 border-brand font-semibold text-brand" : "text-ink"
      }`}
    >
      {name}
    </Link>
  );
}

export default NavItems;
