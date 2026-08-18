"use client";
import { usePathname } from "next/navigation";
import { isActivePath } from "@/lib/utils";
import Link from "next/link";

import { NavItemProps } from "@/types";

function NavItems({ href, name }: NavItemProps) {
  const pathname = usePathname();
  const isActive = isActivePath(pathname, href);
  console.log("isActive", isActive, pathname, href);
  return (
    <Link
      className={` hover:border-b-2 duration-300 hover:border-brand/80 hover:text-brand rounded-full px-2 text-sm tracking-wide ${isActive ? "border-b-2 border-brand text-brand" : "text-ink"}`}
      href={href}
    >
      {name}
    </Link>
  );
}

export default NavItems;
