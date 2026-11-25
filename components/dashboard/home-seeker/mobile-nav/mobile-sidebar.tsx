"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { HelpCircle, Settings, X } from "lucide-react";
import { motion } from "framer-motion";
import { useDashboardNavigation } from "@/hooks/useDashboardNavigation";
import { SidebarItem } from "../../SidebarItem";

function MobileSidebar({
  setMobileSidebarOpen,
}: {
  setMobileSidebarOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const { isAdmin, rootHref, navList, persona, isActive } =
    useDashboardNavigation(pathname);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setMobileSidebarOpen]);

  return (
    <div
      className="fixed inset-0 z-40 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setMobileSidebarOpen(false)}
        className="absolute inset-0 bg-black/40"
      />
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative flex h-[100dvh] w-[82%] max-w-[320px] flex-col overflow-hidden border-r border-line bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <span className="text-sm font-bold text-ink">Navigation</span>
          <button
            type="button"
            aria-label="Close mobile menu"
            className="flex size-10 cursor-pointer items-center justify-center text-body hover:bg-surface hover:text-ink"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav className="mt-2 flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-6">
          {navList.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              active={isActive(item.href)}
              onClick={() => setMobileSidebarOpen(false)}
            />
          ))}

          {!isAdmin && (
            <>
              <div className="px-3 pt-4 pb-1.5">
                <span className="text-[12.5px] font-bold uppercase tracking-widest text-faint">
                  Settings
                </span>
              </div>
              <SidebarItem
                href={`${rootHref}/settings`}
                icon={Settings}
                label="Settings"
                active={isActive(`${rootHref}/settings`)}
                onClick={() => setMobileSidebarOpen(false)}
              />
              <SidebarItem
                href={`${rootHref}/help-center`}
                icon={HelpCircle}
                label="Help Center"
                active={isActive(`${rootHref}/help-center`)}
                onClick={() => setMobileSidebarOpen(false)}
              />
            </>
          )}
        </nav>

        <div className="shrink-0 border-t border-line bg-surface px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-tint text-sm font-bold text-brand-blue">
              {persona.initials}
            </div>
            <div className="min-w-0">
              <div className="truncate text-[13.5px] font-bold text-ink">
                {persona.name}
              </div>
              <div className="truncate text-[12.5px] text-faint">
                {persona.subtitle}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default MobileSidebar;
