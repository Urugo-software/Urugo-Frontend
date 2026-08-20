"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { HomeSeekerDashboard } from "@/components/dashboard/home-seeker/HomeSeekerDashboard";
import { AssistantPanel } from "@/components/platform/ai-assistant/AssistantPanel";
import { AssistantLauncher } from "@/components/platform/ai-assistant/AssistantLauncher";
import { AssistantCanvas } from "@/components/platform/ai-assistant/AssistantCanvas";

export default function HomeSeekerPage() {
  const [isAIWidgetOpen, setIsAIWidgetOpen] = useState(false);

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-white font-sans text-ink antialiased">
      {/* Full-Height Sidebar */}
      <DashboardSidebar
        currentRole="home_seeker"
        onOpenAIWidget={() => setIsAIWidgetOpen(true)}
      />

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col h-screen min-w-0 overflow-hidden bg-white">
        {/* Sticky Header with Dynamic Page Name */}
        <DashboardHeader
          title="Dashboard"
          onOpenAIWidget={() => setIsAIWidgetOpen(true)}
        />

        {/* Scrollable Dashboard View */}
        <HomeSeekerDashboard
          onOpenAIWidget={() => setIsAIWidgetOpen(true)}
        />

        {/* Floating AI Assistant Widget Overlay */}
        <AnimatePresence>
          {isAIWidgetOpen && (
            <AssistantPanel onClose={() => setIsAIWidgetOpen(false)} />
          )}
        </AnimatePresence>

        {!isAIWidgetOpen && (
          <AssistantLauncher
            onOpen={() => setIsAIWidgetOpen(true)}
            visual={<AssistantCanvas animState="idle" />}
          />
        )}
      </div>
    </main>
  );
}
