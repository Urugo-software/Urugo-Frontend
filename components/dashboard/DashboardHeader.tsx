"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House } from "lucide-react";
import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  resolveDashboardTitle,
  resolveDashboardTitleKey,
} from "@/utils/dashboard-titles";
import { DashboardNotificationsDropdown } from "./DashboardNotificationsDropdown";
import MobileNavWrapper from "./home-seeker/mobile-nav/mobile-nav-wrapper";

interface DashboardHeaderProps {
  title?: string;
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  const pathname = usePathname();
  const tTitles = useTranslations("common.dashboardTitles");
  const tActions = useTranslations("common.actions");

  const titleKey = resolveDashboardTitleKey(pathname);
  const currentTitle =
    title ?? (titleKey ? tTitles(titleKey) : resolveDashboardTitle(pathname));

  return (
    <header className="sticky top-0 z-20 flex h-18 shrink-0 items-center justify-between gap-3 border-b border-line bg-white/90 px-4 backdrop-blur-md sm:gap-4 sm:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <MobileNavWrapper />
        <h1 className="truncate text-xl font-bold text-ink sm:text-2xl">
          {currentTitle}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <LanguageSwitcher variant="compact" shape="square" />

        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "hidden h-9 rounded-none border-line px-4 text-xs font-semibold text-ink hover:bg-brand hover:text-white md:inline-flex",
          )}
        >
          {tActions("backToHome")}
        </Link>

        <Link
          href="/"
          aria-label={tActions("backToHome")}
          className="flex size-10 items-center justify-center text-ink transition-colors hover:bg-surface md:hidden"
        >
          <House aria-hidden="true" className="size-5" />
        </Link>

        <DashboardNotificationsDropdown pathname={pathname} />
      </div>
    </header>
  );
}
