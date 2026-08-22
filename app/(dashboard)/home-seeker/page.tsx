import { HomeSeekerDashboard } from "@/components/dashboard/home-seeker/HomeSeekerDashboard";

export default function HomeSeekerPage() {
  return (
    <main className="min-h-0 flex-1">
      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col h-screen min-w-0 overflow-hidden bg-white">
        {/* Scrollable Dashboard View */}
        <HomeSeekerDashboard />
      </div>
    </main>
  );
}
