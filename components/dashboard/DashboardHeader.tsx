"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, House } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";
import MobileNavWrapper from "./home-seeker/mobile-nav/mobile-nav-wrapper";

interface DashboardHeaderProps {
  title?: string;
}

export function DashboardHeader({ title = "Dashboard" }: DashboardHeaderProps) {
  const pathname = usePathname();
  const adminTitles: Record<string, string> = { admin: "Overview", users: "Users", properties: "Properties", "property-verification": "Property verification", leases: "Leases", payments: "Payments", complaints: "Complaints", "renter-history": "Renter's History", analytics: "Analytics", notifications: "Notifications", moderation: "Moderation", "audit-logs": "Audit logs", "admin-management": "Admin management", settings: "Settings" };
  const currentTitle = pathname.startsWith("/admin") ? adminTitles[pathname.split("/")[2] || "admin"] || title : title;
  const notificationsHref = pathname.startsWith("/admin") ? "/admin/complaints" : "/home-seeker/notifications";
  return (
    <header className="sticky top-0 z-20 flex h-18 shrink-0 items-center justify-between border-b border-line  px-4 sm:px-8 backdrop-blur-md">
      {/* Current Page Title */}
      <div className="flex items-center gap-3">
        <MobileNavWrapper />
        <h1 className="text-xl  font-bold text-ink sm:text-2xl">{currentTitle}</h1>
      </div>

      {/* Header Actions & Routing */}
      <div className=" flex items-center gap-3">
        <Link className="border  border-line max-md:hidden" href="/">
          <CustomButton
            variant="light"
            className="flex justify-center min-w-fit  rounded-none"
          >
            <h1 className=" group-hover:text-white  text-brand">
              Back to homepage
            </h1>
          </CustomButton>
        </Link>

        <Link className="md:hidden " href="/">
          <span className="block  " aria-label="home button">
            <House className="size-5 text-ink " />
          </span>
        </Link>
        <Link
          href={notificationsHref}
          aria-label="Notifications"
          className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-line max-md:border-none transition hover:bg-surface cursor-pointer"
        >
          <Bell className="size-4 max-md:size-5  text-ink" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-600 animate-pulse" />
        </Link>
      </div>
    </header>
  );
}
