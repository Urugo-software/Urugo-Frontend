import Link from "next/link";
import { navItems } from "@/data/navbar-data";
import { useEffect, useRef } from "react";

function MobileMenu({
  setMobileMenuOpen,
}: {
  setMobileMenuOpen: (open: boolean) => void;
}) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Your effect logic here
    const handleClickOutsie = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsie);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsie);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="absolute mx-4 inset-x-0 z-30 md:hidden max-w-7xl  mt-2 bg-white border border-line rounded-2xl shadow-[0_12px_32px_-12px_rgba(14,17,22,.18)] overflow-hidden"
    >
      {navItems.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="block text-[15px] font-medium px-5 py-3.5 border-b border-line"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export default MobileMenu;
