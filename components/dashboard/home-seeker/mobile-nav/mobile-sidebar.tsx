"use client";
import { NavItemConfig, roleNavItems } from "@/data/dashboard-data";
import { usePathname } from "next/navigation";
import { SidebarItem } from "../../SidebarItem";
import { HelpCircle, Settings, X } from "lucide-react";
import { motion } from "framer-motion";

function MobileSidebar({
  setMobileSidebarOpen,
}: {
  setMobileSidebarOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const derivedRole = pathname.startsWith("/renter")
    ? "renter"
    : pathname.startsWith("/landlord")
    ? "landlord"
    : "home_seeker";
  const mobileNavList = roleNavItems[derivedRole] || roleNavItems.home_seeker;
  const settingsHrefByRole = `/${
    derivedRole === "home_seeker" ? "home-seeker" : derivedRole
  }`;

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ duration: 0.3, ease: "easeInOut", type: "spring" }}
      className="md:hidden bg-white border border-line shadow w-[80%] max-w-[320px] h-[100dvh] absolute top-0 z-40 flex flex-col overflow-hidden"
    >
      <button
        aria-label="close mobile menu"
        className="p-4 text-body hover:text-brand self-start"
        onClick={() => setMobileSidebarOpen(false)}
      >
        <X />
      </button>
      {/* Main Nav Items based on Role */}
      <nav className="mt-1 flex flex-col gap-1 px-4 overflow-y-auto flex-1 pb-4">
        {mobileNavList.map((item: NavItemConfig) => (
          <SidebarItem
            key={item.label}
            href={item.href}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            active={pathname === item.href}
            onClick={() => setMobileSidebarOpen(false)}
          />
        ))}

        <div className="px-3 pt-4 pb-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-faint">
            Settings
          </span>
        </div>
        <SidebarItem
          href={settingsHrefByRole + "/settings"}
          icon={Settings}
          label="Settings"
          active={pathname === settingsHrefByRole + "/settings"}
          onClick={() => setMobileSidebarOpen(false)}
        />
        <SidebarItem
          href={settingsHrefByRole + "/help-center"}
          icon={HelpCircle}
          label="Help Center"
          active={pathname === settingsHrefByRole + "/help-center"}
          onClick={() => setMobileSidebarOpen(false)}
        />
      </nav>
      {/* User Session Footer */}
      <div className="absolute bottom-0 inset-x-0 border-t border-line bg-surface px-6 py-4">
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
    </motion.div>
  );
}

export default MobileSidebar;
