"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { navItems } from "@/data/navbar-data";
import { isActivePath } from "@/lib/utils";

function MobileMenu({
  setMobileMenuOpen,
}: {
  setMobileMenuOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const initialPathname = useRef(pathname);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (pathname !== initialPathname.current) {
      setMobileMenuOpen(false);
    }
  }, [pathname, setMobileMenuOpen]);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-mobile-menu-toggle="true"]')) return;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setMobileMenuOpen]);

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <div
        aria-hidden="true"
        onClick={() => setMobileMenuOpen(false)}
        className="fixed inset-0 bg-ink/35 backdrop-blur-xs"
      />

      <nav
        id="public-mobile-menu"
        ref={menuRef}
        aria-label="Mobile navigation"
        className="relative z-50 mx-4 mt-20 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_18px_40px_-14px_rgba(14,17,22,.28)]"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <span className="text-xs font-bold uppercase tracking-wider text-faint">
            Navigation
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <ul className="divide-y divide-line">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex min-h-12 items-center justify-between px-5 py-3.5 text-[15px] transition-colors ${
                    active
                      ? "bg-brand-tint/60 font-semibold text-brand"
                      : "font-medium text-ink hover:bg-surface"
                  }`}
                >
                  <span>{item.title}</span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full bg-brand"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col gap-2.5 border-t border-line bg-surface/50 p-4">
          <Link
            href="/auth/sign-in"
            onClick={() => setMobileMenuOpen(false)}
            className="flex min-h-11 w-full items-center justify-center rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            Sign in
          </Link>
          <Link
            href="/auth/sign-up"
            onClick={() => setMobileMenuOpen(false)}
            className="flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
          >
            List your property
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default MobileMenu;
