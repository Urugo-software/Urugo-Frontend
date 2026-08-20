"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  Calendar,
  Bot,
  Bell,
  User,
  Settings,
  HelpCircle,
  Clock,
  Building2,
  FileText,
  DollarSign,
  Wrench,
  Folder,
} from "lucide-react";
import { RoleType } from "@/types";

interface SidebarItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: number | string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({ href, icon: Icon, label, badge, active, onClick }: SidebarItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-all ${
        active
          ? "bg-white font-semibold text-brand border border-line shadow-xs"
          : "text-body hover:bg-white hover:text-ink"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`size-4.5 transition-colors ${active ? "text-brand" : "text-body group-hover:text-ink"}`} />
        <span>{label}</span>
      </div>
      {badge !== undefined && (
        <span className="grid min-w-[20px] place-items-center rounded-full bg-brand px-1.5 py-0.5 text-[11px] font-bold text-white">
          {badge}
        </span>
      )}
    </Link>
  );
}

// Role-based Nav Configuration
const roleNavItems: Record<RoleType, Array<{ label: string; href: string; icon: React.ElementType; badge?: number }>> = {
  home_seeker: [
    { label: "Dashboard", href: "/home-seeker", icon: LayoutDashboard },
    { label: "Saved Properties", href: "/properties", icon: Heart, badge: 4 },
    { label: "Viewings", href: "#", icon: Calendar },
    { label: "Waiting List", href: "#", icon: Clock },
    { label: "AI Assistant", href: "#", icon: Bot },
    { label: "Notifications", href: "#", icon: Bell, badge: 1 },
    { label: "Profile", href: "#", icon: User },
  ],
  landlord: [
    { label: "Dashboard", href: "/landlord", icon: LayoutDashboard },
    { label: "My Properties", href: "/properties", icon: Building2, badge: 8 },
    { label: "Applications", href: "#", icon: FileText, badge: 3 },
    { label: "Revenue & Payouts", href: "#", icon: DollarSign },
    { label: "AI Assistant", href: "#", icon: Bot },
    { label: "Notifications", href: "#", icon: Bell, badge: 2 },
    { label: "Settings", href: "#", icon: Settings },
  ],
  renter: [
    { label: "Dashboard", href: "/renter", icon: LayoutDashboard },
    { label: "My Lease", href: "#", icon: FileText },
    { label: "Payments", href: "#", icon: DollarSign },
    { label: "Maintenance", href: "#", icon: Wrench, badge: 1 },
    { label: "Documents", href: "#", icon: Folder },
    { label: "AI Assistant", href: "#", icon: Bot },
    { label: "Notifications", href: "#", icon: Bell },
  ],
};

interface DashboardSidebarProps {
  currentRole?: RoleType;
  onOpenAIWidget?: () => void;
}

export function DashboardSidebar({ currentRole = "home_seeker", onOpenAIWidget }: DashboardSidebarProps) {
  const pathname = usePathname();
  const navList = roleNavItems[currentRole] || roleNavItems.home_seeker;

  return (
    <aside className="relative flex h-screen w-[272px] shrink-0 flex-col overflow-hidden border-r border-line bg-surface">
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 px-6 pt-6 pb-2">
        <div className="grid size-8 place-items-center rounded-lg bg-brand text-sm font-extrabold text-white shadow-xs">
          U
        </div>
        <div className="text-lg font-extrabold text-ink">
          Urugo<span className="font-semibold text-faint">rw</span>
        </div>
      </div>

      {/* Role Badge Indicator */}
      <div className="px-6 mt-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-3 py-1 text-[11px] font-bold text-brand uppercase tracking-wider border border-brand/10">
          <span className="size-1.5 rounded-full bg-brand" />
          {currentRole.replace("_", " ")} Mode
        </div>
      </div>

      {/* Main Nav Items based on Role */}
      <nav className="mt-4 flex flex-col gap-1 px-4 overflow-y-auto">
        {navList.map((item) => {
          const isAI = item.label === "AI Assistant";
          return (
            <SidebarItem
              key={item.label}
              href={isAI ? "#" : item.href}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              active={pathname === item.href}
              onClick={isAI ? onOpenAIWidget : undefined}
            />
          );
        })}
      </nav>

      {/* Settings Section */}
      <div className="px-7 pt-6 pb-2">
        <span className="text-[11px] font-bold uppercase tracking-widest text-faint">Settings</span>
      </div>
      <div className="flex flex-col gap-1 px-4">
        <SidebarItem href="#" icon={Settings} label="Settings" />
        <SidebarItem href="#" icon={HelpCircle} label="Help Center" />
      </div>

      {/* Background Graphic SVG */}
      <div className="relative min-h-[70px] flex-1">
        <svg className="absolute bottom-0 left-0" width="272" height="200" viewBox="0 0 272 200" fill="none">
          <path d="M-20 200L140 30L180 70L60 200H-20Z" fill="#1D4ED8" fillOpacity="0.05" />
          <path d="M40 200L200 10" stroke="#1D4ED8" strokeOpacity="0.18" strokeWidth="1.4" />
          <path d="M80 200L230 50" stroke="#1D4ED8" strokeOpacity="0.12" strokeWidth="1.4" />
        </svg>
      </div>

      {/* User Session Footer */}
      <div className="relative border-t border-line bg-surface px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-tint text-sm font-bold text-brand">
            YK
          </div>
          <div className="min-w-0">
            <div className="truncate text-[13.5px] font-bold text-ink">Yves Kamanzi</div>
            <div className="truncate text-[12px] text-faint">Guest · not yet verified</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
