"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { navItems } from "@/data/navbar-data";
import AuthButtons from "./AuthButtons";
import Logo from "./Logo";
import MenuHamburger from "./MenuHamburger";
import NavItems from "./NavItems";

const NAV_KEY_BY_HREF = {
  "/": "home",
  "/properties": "properties",
  "/features": "features",
  "/how-it-works": "howItWorks",
} as const;

function Navbar({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  const t = useTranslations("public.nav");

  return (
    <nav className="flex items-center justify-between rounded-full bg-white px-2.5 py-2 shadow">
      {/* brand logo */}
      <div className="ml-3">
        <Logo />
      </div>
      {/* navigation items */}
      <div className="hidden items-center gap-4 font-medium md:flex md:gap-6">
        {navItems.map((item) => {
          const key =
            NAV_KEY_BY_HREF[item.href as keyof typeof NAV_KEY_BY_HREF];
          return (
            <Fragment key={item.id}>
              <NavItems
                href={item.href}
                name={key ? t(key) : item.title}
              />
            </Fragment>
          );
        })}
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <LanguageSwitcher
          variant="compact"
          shape="pill"
          className="hidden sm:inline-flex"
        />
        {/* auth buttons */}
        <AuthButtons />
        {/* Menu hamburger */}
        <MenuHamburger
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </div>
    </nav>
  );
}

export default Navbar;
