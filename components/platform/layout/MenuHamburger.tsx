"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

function MenuHamburger({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  const t = useTranslations("public.nav");

  return (
    <button
      type="button"
      data-mobile-menu-toggle="true"
      aria-label={mobileMenuOpen ? t("closeMenuAria") : t("openMenuAria")}
      aria-expanded={mobileMenuOpen}
      aria-controls="public-mobile-menu"
      className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    >
      {mobileMenuOpen ? (
        <X aria-hidden="true" className="size-5" />
      ) : (
        <Menu aria-hidden="true" className="size-5" />
      )}
    </button>
  );
}

export default MenuHamburger;
