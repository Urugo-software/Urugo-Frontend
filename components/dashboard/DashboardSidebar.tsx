"use client";

import { usePathname } from "next/navigation";
import { Settings, HelpCircle } from "lucide-react";
import { RoleType } from "@/types";
import { NavItemConfig, roleNavItems } from "@/data/dashboard-data";
import { SidebarItem } from "./SidebarItem";
import Logo from "../platform/layout/Logo";

interface DashboardSidebarProps {
  currentRole?: RoleType;
}

export function DashboardSidebar({ currentRole }: DashboardSidebarProps) {
  const pathname = usePathname();
  const derivedRole: RoleType = pathname.startsWith("/renter")
    ? "renter"
    : pathname.startsWith("/landlord")
      ? "landlord"
      : currentRole || "home_seeker";

  const navList = roleNavItems[derivedRole] || roleNavItems.home_seeker;
  const settingsHrefByRole = `/${
    derivedRole === "home_seeker" ? "home-seeker" : derivedRole
  }`;

  return (
    <aside className="relative hidden md:flex h-screen w-[272px] shrink-0 flex-col overflow-hidden border-r border-line bg-white">
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 px-6 pt-6 pb-2">
        <Logo />
      </div>

      {/* Main Nav Items based on Role */}
      <nav className="mt-4 flex flex-col gap-1 px-4 overflow-y-auto">
        {navList.map((item: NavItemConfig) => {
          return (
            <SidebarItem
              key={item.label}
              href={item.href}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              active={pathname === item.href}
            />
          );
        })}
      </nav>

      {/* Settings Section */}
      <div className="relative z-10 px-7 pt-6 pb-2">
        <span className="text-[11px] font-bold uppercase tracking-widest text-faint">
          Settings
        </span>
      </div>
      <div className="relative z-10 flex flex-col gap-1 px-4">
        <SidebarItem
          href={settingsHrefByRole + "/settings"}
          icon={Settings}
          label="Settings"
          active={pathname === settingsHrefByRole + "/settings"}
        />
        <SidebarItem
          href={settingsHrefByRole + "/help-center"}
          icon={HelpCircle}
          label="Help Center"
          active={pathname === settingsHrefByRole + "/help-center"}
        />
      </div>

      {/* Background Graphic SVG */}
      <div className="relative min-h-[70px] flex-1 pointer-events-none">
        <svg
          className="absolute bottom-0 left-0 pointer-events-none"
          width="272"
          height="200"
          viewBox="0 0 272 200"
          fill="none"
        >
          <path
            d="M-20 200L140 30L180 70L60 200H-20Z"
            fill="#1D4ED8"
            fillOpacity="0.05"
          />
          <path
            d="M40 200L200 10"
            stroke="#1D4ED8"
            strokeOpacity="0.18"
            strokeWidth="1.4"
          />
          <path
            d="M80 200L230 50"
            stroke="#1D4ED8"
            strokeOpacity="0.12"
            strokeWidth="1.4"
          />
        </svg>
      </div>

      {/* User Session Footer */}
      <div className="relative border-t border-line bg-surface px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-tint text-sm font-bold text-brand">
            YK
          </div>
          <div className="min-w-0">
            <div className="truncate text-[13.5px] font-bold text-ink">
              Yves Kamanzi
            </div>
            <div className="truncate text-[12px] text-faint">
              Guest · not yet verified
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
