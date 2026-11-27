import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { LandlordStoreHydrator } from "@/components/dashboard/LandlordStoreHydrator";
import MobileSidebarWrapper from "@/components/dashboard/home-seeker/mobile-nav/mobile-sidebar-wrapper";
import { ReactNode } from "react";
import { AuthSessionGuard } from "@/components/auth/AuthSessionGuard";

function layout({ children }: { children: ReactNode }) {
  return (
    <AuthSessionGuard>
      <div className="flex min-h-0 h-[100dvh] w-screen overflow-hidden font-sans text-ink antialiased print:block print:h-auto print:w-auto print:overflow-visible">
        <LandlordStoreHydrator />
        <div className="print:hidden">
          <DashboardSidebar currentRole="home_seeker" />
        </div>
        <section className="relative flex flex-1 flex-col h-full min-w-0 overflow-hidden print:block print:h-auto print:overflow-visible">
          <div className="print:hidden">
            <DashboardHeader />
            <MobileSidebarWrapper />
          </div>
          <div className="flex flex-1 flex-col min-h-0 overflow-hidden print:block print:h-auto print:overflow-visible">
            {children}
          </div>
        </section>
      </div>
    </AuthSessionGuard>
  );
}
export default layout;
