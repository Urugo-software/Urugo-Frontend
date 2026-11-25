"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";
import { DashboardNotificationsDropdown } from "./DashboardNotificationsDropdown";
import MobileNavWrapper from "./home-seeker/mobile-nav/mobile-nav-wrapper";
import { resolveDashboardTitle } from "@/utils/dashboard-titles";

interface DashboardHeaderProps {
  title?: string;
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  const pathname = usePathname();
  const currentTitle = title ?? resolveDashboardTitle(pathname);
  return (
    <header className="sticky top-0 z-20 flex h-18 shrink-0 items-center justify-between gap-4 border-b border-line px-4 sm:px-8 backdrop-blur-md">
      {/* Current Page Title */}
      <div className="flex min-w-0 items-center gap-3">
        <MobileNavWrapper />
        <h1 className="truncate text-xl font-bold text-ink sm:text-2xl">
          {currentTitle}
        </h1>
      </div>

      {/* Header Actions & Routing */}
      <div className="flex items-center gap-3">
        <Link className="border border-line max-md:hidden" href="/">
          <CustomButton
            variant="light"
            className="flex justify-center min-w-fit rounded-none"
          >
            <h1 className="group-hover:text-white text-brand">
              Back to homepage
            </h1>
          </CustomButton>
        </Link>

        <Link className="md:hidden" href="/">
          <span className="block" aria-label="home button">
            <House className="size-5 text-ink" />
          </span>
        </Link>

        <DashboardNotificationsDropdown pathname={pathname} />
      </div>
    </header>
  );
}

