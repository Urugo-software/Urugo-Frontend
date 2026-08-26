"use client";
import { NavItemConfig, roleNavItems } from "@/data/dashboard-data";
import { usePathname } from "next/navigation";
import { SidebarItem } from "../../SidebarItem";
import { X } from "lucide-react";
import { motion } from "framer-motion";

function MobileSidebar({
  setMobileSidebarOpen,
}: {
  setMobileSidebarOpen: (open: boolean) => void;
}) {
  // TODO: read these two lines carefully and implement role access logic
  const pathname = usePathname();
  const mobileNavList = roleNavItems.home_seeker;
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ duration: 0.3, ease: "easeInOut", type: "spring" }}
      className="md:hidden bg-white border border-line shadow w-[60%] h-[100dvh] absolute top-0 z-40"
    >
      <button
        aria-label="close mobile menu"
        className="p-4 text-body hover:text-brand"
        onClick={() => setMobileSidebarOpen(false)}
      >
        <X />
      </button>
      {/* Main Nav Items based on Role */}
      <nav className="mt-3 flex flex-col gap-1 px-4 overflow-y-auto">
        {mobileNavList.map((item: NavItemConfig) => (
          <SidebarItem
            key={item.label}
            href={item.href}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            active={pathname === item.href}
          />
        ))}
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
