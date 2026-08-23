import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-0  h-[100dvh] w-screen overflow-hidden  font-sans text-ink antialiased">
      <DashboardSidebar currentRole="home_seeker" />
      <section className="flex flex-1 flex-col h-full min-w-0 overflow-hidden">
        <DashboardHeader />
        <div className="flex flex-1 flex-col min-h-0 overflow-hidden">{children}</div>
      </section>
    </main>
  );
}
export default layout;
