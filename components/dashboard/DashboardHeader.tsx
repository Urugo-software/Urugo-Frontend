"use client";

import Link from "next/link";
import { Bell, Sparkles } from "lucide-react";

interface DashboardHeaderProps {
  title?: string;
  onOpenAIWidget?: () => void;
}

export function DashboardHeader({
  title = "Dashboard",
  onOpenAIWidget,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-line bg-white/90 px-6 sm:px-8 backdrop-blur-md">
      {/* Current Page Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-extrabold text-ink sm:text-2xl">{title}</h1>
      </div>

      {/* Header Actions & Routing */}
      <div className="flex items-center gap-3">
        <Link
          href="/properties"
          className="hidden rounded-[10px] border border-line px-4 py-2 text-[13.5px] font-semibold text-brand transition hover:bg-surface sm:inline-flex"
        >
          Browse Properties
        </Link>

        {onOpenAIWidget && (
          <button
            type="button"
            onClick={onOpenAIWidget}
            className="flex items-center gap-2 rounded-[10px] bg-brand/10 px-3.5 py-2 text-[13.5px] font-semibold text-brand transition hover:bg-brand/20 cursor-pointer"
          >
            <Sparkles className="size-4" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>
        )}

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
