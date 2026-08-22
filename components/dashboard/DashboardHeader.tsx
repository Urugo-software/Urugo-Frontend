"use client";

import Link from "next/link";
import { Bell, Sparkles } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";

interface DashboardHeaderProps {
  title?: string;
}

export function DashboardHeader({ title = "Dashboard" }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-18 shrink-0 items-center justify-between border-b border-line  px-6 sm:px-8 backdrop-blur-md">
      {/* Current Page Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl  font-bold text-ink sm:text-2xl">{title}</h1>
      </div>

      {/* Header Actions & Routing */}
      <div className="flex items-center gap-3">
        <Link href="/">
          <CustomButton
            variant="light"
            className="flex justify-center min-w-fit  rounded-none"
          >
            <h1 className="translate-x-[-18%] group-hover:text-white  text-brand">
              Back to homepage
            </h1>
          </CustomButton>
        </Link>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-line transition hover:bg-surface cursor-pointer"
        >
          <Bell className="size-4 text-ink" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-600 animate-pulse" />
        </button>
      </div>
    </header>
  );
}
