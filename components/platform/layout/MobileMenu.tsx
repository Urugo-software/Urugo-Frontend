"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { navItems } from "@/data/navbar-data";
import { isActivePath } from "@/lib/utils";

const NAV_KEY_BY_HREF = {
  "/": "home",
  "/properties": "properties",
  "/features": "features",
  "/how-it-works": "howItWorks",
} as const;

import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { navItems } from "@/data/navbar-data";
import { isActivePath } from "@/lib/utils";

const NAV_KEY_BY_HREF = {
  "/": "home",
  "/properties": "properties",
  "/features": "features",
  "/how-it-works": "howItWorks",
} as const;

function MobileMenu({
  setMobileMenuOpen,
}: {
  setMobileMenuOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const tNav = useTranslations("public.nav");
  const tCommon = useTranslations("common");
  const initialPathname = useRef(pathname);
  const menuRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (pathname !== initialPathname.current) {
      setMobileMenuOpen(false);
    }
  }, [pathname, setMobileMenuOpen]);

  useEffect(() => {
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
    <nav
      id="public-mobile-menu"
      ref={menuRef}
      aria-label={tNav("mobileNavAria")}
      className="absolute left-0 right-0 top-full z-40 mt-2 max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-2xl border border-line bg-white shadow-lg md:hidden"
    >
      <ul className="divide-y divide-line">
        {navItems.map((item) => {
          const active = isActivePath(pathname, item.href);
          const key =
            NAV_KEY_BY_HREF[item.href as keyof typeof NAV_KEY_BY_HREF];
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
                <span>{key ? tNav(key) : item.title}</span>
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

      <div className="border-t border-line px-5 py-3.5">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-faint">
          {tCommon("language.label")}
        </p>
        <LanguageSwitcher
          variant="full"
          shape="pill"
          onSwitched={() => setMobileMenuOpen(false)}
        />
      </div>

      <div className="flex flex-col gap-2.5 border-t border-line bg-surface/50 p-4">
        <Link
          href="/auth/sign-in"
          onClick={() => setMobileMenuOpen(false)}
          className="flex min-h-11 w-full items-center justify-center rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
        >
          {tCommon("actions.signIn")}
        </Link>
        <Link
          href="/auth/sign-up"
          onClick={() => setMobileMenuOpen(false)}
          className="flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
        >
          {tCommon("actions.listYourProperty")}
        </Link>
      </div>
    </nav>
  );
}

export default MobileMenu;
