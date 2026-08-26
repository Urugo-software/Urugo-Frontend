import { Heart, Calendar } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { SearchPreferencesCard } from "./SearchPreferencesCard";
import { NextViewingCard } from "./NextViewingCard";
import { SavedPropertiesSection } from "./SavedPropertiesSection";
import { WaitingListSection } from "./WaitingListSection";
import { VerificationBanner } from "./VerificationBanner";

export function HomeSeekerDashboard() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      {/* Greeting Banner */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="mb-1.5 text-xl font-bold text-ink sm:text-2xl">
            Good morning, Yves
          </h2>
          <p className="text-[14px] text-body">
            Here&apos;s what&apos;s happening with your home search.
          </p>
        </div>
      </div>

      {/* 3-Column Metric Cards & Widgets */}
      <div className="mb-6 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1fr_1.15fr_1.2fr]">
        <div className="flex flex-col gap-5">
          <MetricCard
            title="Saved Properties"
            count={4}
            icon={Heart}
            iconBgClass="bg-brand-tint"
            iconColorClass="text-brand"
          />
          <MetricCard
            title="Viewings Scheduled"
            count={2}
            icon={Calendar}
            iconBgClass="bg-success-tint"
            iconColorClass="text-success"
          />
        </div>
        <SearchPreferencesCard />
        <NextViewingCard />
      </div>

      <div className="space-y-6 ">
        <SavedPropertiesSection />
        <WaitingListSection />
        <VerificationBanner />
      </div>
    </div>
  );
}
