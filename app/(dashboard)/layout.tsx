import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex  h-[100dvh] w-screen overflow-hidden  font-sans text-ink antialiased">
      <DashboardSidebar currentRole="home_seeker" />
      <section className="flex-1 ">
        <DashboardHeader />
        <div className="min-h-0">{children}</div>
      </section>
    </main>
  );
}
export default layout;
