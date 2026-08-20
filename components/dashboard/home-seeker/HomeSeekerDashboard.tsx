"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Calendar,
  Bot,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface HomeSeekerDashboardProps {
  onOpenAIWidget?: () => void;
}

export function HomeSeekerDashboard({ onOpenAIWidget }: HomeSeekerDashboardProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10">
      {/* Greeting Banner */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="mb-1.5 text-xl font-extrabold text-ink sm:text-2xl">Good morning, Yves</h2>
          <p className="text-[14px] text-body">Here&apos;s what&apos;s happening with your home search.</p>
        </div>

        <button
          type="button"
          onClick={onOpenAIWidget}
          className="flex items-center gap-2 rounded-[10px] bg-brand px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-sm transition hover:bg-brand-deep cursor-pointer"
        >
          <Bot className="size-4" />
          Continue with AI Assistant
        </button>
      </div>

      {/* 3-Column Metric Cards & Widgets */}
      <div className="mb-6 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1fr_1.15fr_1.2fr]">
        {/* Metric Cards Stack */}
        <div className="flex flex-col gap-5">
          {/* Saved Properties Metric */}
          <div className="flex items-start justify-between rounded-2xl border border-line bg-white p-6 shadow-xs">
            <div>
              <div className="mb-3 text-[14.5px] font-bold text-ink">Saved Properties</div>
              <div className="font-mono text-4xl font-extrabold text-ink">4</div>
            </div>
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand">
              <Heart className="size-5" />
            </div>
          </div>

          {/* Viewings Scheduled Metric */}
          <div className="flex items-start justify-between rounded-2xl border border-line bg-white p-6 shadow-xs">
            <div>
              <div className="mb-3 text-[14.5px] font-bold text-ink">Viewings Scheduled</div>
              <div className="font-mono text-4xl font-extrabold text-ink">2</div>
            </div>
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-success-tint text-success">
              <Calendar className="size-5" />
            </div>
          </div>
        </div>

        {/* Search Preferences Card */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[14.5px] font-bold text-ink">Your Search Preferences</div>
            <button
              type="button"
              onClick={onOpenAIWidget}
              className="text-[12px] font-semibold text-brand transition hover:underline cursor-pointer"
            >
              Update →
            </button>
          </div>
          <p className="mb-4 text-[12.5px] text-faint">Learned from your conversations with the AI Assistant</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-[13.5px]">
              <span className="text-body">Location</span>
              <span className="font-semibold text-ink">Remera, Kimironko</span>
            </div>
            <div className="h-px bg-line" />
            <div className="flex items-center justify-between text-[13.5px]">
              <span className="text-body">Budget</span>
              <span className="font-semibold text-ink">Up to 200,000 RWF</span>
            </div>
            <div className="h-px bg-line" />
            <div className="flex items-center justify-between text-[13.5px]">
              <span className="text-body">Bedrooms</span>
              <span className="font-semibold text-ink">2</span>
            </div>
            <div className="h-px bg-line" />
            <div className="flex items-center justify-between text-[13.5px]">
              <span className="text-body">Must-have</span>
              <span className="font-semibold text-ink">Parking</span>
            </div>
          </div>
        </div>

        {/* Next Viewing Widget */}
        <div className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[14.5px] font-bold text-ink">Next Viewing</div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous viewing"
                className="grid size-6 place-items-center rounded-md border border-line text-body transition hover:bg-surface"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="Next viewing"
                className="grid size-6 place-items-center rounded-md border border-line text-body transition hover:bg-surface"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="mb-3.5 text-[13px] font-semibold text-body">Saturday, 22 March</div>

          <div className="mb-3 flex items-center gap-2.5 rounded-[10px] bg-brand-tint p-3.5">
            <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-surface">
              <Image
                src="/assets/home/prop1.jpg"
                alt="Property"
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="truncate text-[12.5px] font-bold text-ink">2BR Apartment — Kimironko</div>
              <div className="text-[11px] text-body">2:00 PM · Jean Claude M.</div>
            </div>
          </div>

          <div className="rounded-[9px] bg-surface p-3.5 text-[12px] leading-relaxed text-body">
            You&apos;ll get an SMS reminder 1 hour before, plus the landlord&apos;s contact number.
          </div>
        </div>
      </div>

      {/* SAVED PROPERTIES LIST SECTION */}
      <div className="mb-6 rounded-2xl border border-line bg-white p-6 shadow-xs">
        <div className="mb-5 flex items-center justify-between">
          <div className="text-[16px] font-extrabold text-ink">Saved Properties</div>
          <Link href="/properties" className="text-[13.5px] font-semibold text-brand transition hover:underline">
            Browse more →
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {/* Item 1 */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface px-5 py-4">
            <div className="flex items-center gap-3.5 min-w-[220px]">
              <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-white">
                <Image src="/assets/home/prop1.jpg" alt="Property" fill className="object-cover" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-ink">2BR Apartment — Kimironko</div>
                <div className="text-[12.5px] text-faint">150,000 RWF/month · Parking, WiFi</div>
              </div>
            </div>
            <span className="rounded-full bg-success-tint px-3 py-1.5 text-[11.5px] font-bold text-success">
              Available
            </span>
            <Link
              href="/properties"
              className="rounded-lg border border-line bg-white px-4 py-2 text-[12.5px] font-semibold text-brand transition hover:bg-brand-tint"
            >
              View
            </Link>
          </div>

          {/* Item 2 */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface px-5 py-4">
            <div className="flex items-center gap-3.5 min-w-[220px]">
              <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-white">
                <Image src="/assets/home/prop2.jpg" alt="Property" fill className="object-cover" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-ink">Studio — Kacyiru</div>
                <div className="text-[12.5px] text-faint">80,000 RWF/month · WiFi included</div>
              </div>
            </div>
            <span className="rounded-full bg-success-tint px-3 py-1.5 text-[11.5px] font-bold text-success">
              Available
            </span>
            <Link
              href="/properties"
              className="rounded-lg border border-line bg-white px-4 py-2 text-[12.5px] font-semibold text-brand transition hover:bg-brand-tint"
            >
              View
            </Link>
          </div>

          {/* Item 3 */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface px-5 py-4">
            <div className="flex items-center gap-3.5 min-w-[220px]">
              <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-white">
                <Image src="/assets/home/prop3.jpg" alt="Property" fill className="object-cover" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-ink">2BR Apartment — Kabeza</div>
                <div className="text-[12.5px] text-faint">180,000 RWF/month · Parking</div>
              </div>
            </div>
            <span className="rounded-full bg-warn-tint px-3 py-1.5 text-[11.5px] font-bold text-warn">
              Occupied
            </span>
            <Link
              href="/properties"
              className="rounded-lg border border-line bg-white px-4 py-2 text-[12.5px] font-semibold text-brand transition hover:bg-brand-tint"
            >
              View
            </Link>
          </div>
        </div>
      </div>

      {/* WAITING LIST SECTION */}
      <div className="mb-6 rounded-2xl border border-line bg-white p-6 shadow-xs">
        <div className="mb-5 flex items-center justify-between">
          <div className="text-[16px] font-extrabold text-ink">Waiting List</div>
          <span className="text-[12px] text-faint">You&apos;ll be notified the moment a spot opens</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface px-5 py-4">
          <div className="flex items-center gap-3.5 min-w-[220px]">
            <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-white">
              <Image src="/assets/home/prop3.jpg" alt="Property" fill className="object-cover" />
            </div>
            <div>
              <div className="text-[14px] font-bold text-ink">2BR Apartment — Kabeza</div>
              <div className="text-[12.5px] text-faint">Currently occupied · joined waiting list Jul 28</div>
            </div>
          </div>
          <span className="rounded-full bg-brand-tint px-3 py-1.5 text-[12px] font-bold text-brand">
            #3 in queue
          </span>
        </div>
      </div>

      {/* VERIFICATION CTA BANNER */}
      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-ink p-7 text-white md:flex-row">
        <div className="flex-1 text-center md:text-left">
          <h3 className="mb-1.5 text-lg font-extrabold text-white">Found the one? Let&apos;s get you verified.</h3>
          <p className="text-[13.5px] leading-relaxed text-white/70">
            To sign a lease, an admin confirms your National ID and income — this protects you and the landlord. It takes about a day.
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-full bg-white px-6 py-3 text-[13.5px] font-semibold text-ink transition hover:bg-surface shadow-md cursor-pointer"
        >
          Start Verification
        </button>
      </div>
    </div>
  );
}
