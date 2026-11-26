"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { Settings, HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import type { RoleType } from "@/types";
import { useDashboardNavigation } from "@/hooks/useDashboardNavigation";
import { SidebarItem } from "./SidebarItem";
import { WorkspaceRoleSwitcher } from "./WorkspaceRoleSwitcher";
import Logo from "../platform/layout/Logo";

interface DashboardSidebarProps {
  currentRole?: RoleType;
}

export function DashboardSidebar({ currentRole }: DashboardSidebarProps) {
  const pathname = usePathname();
  const tNav = useTranslations("common.navigation");
  const {
    isAdmin,
    activeWorkspaceRole,
    rootHref,
    navList,
    persona,
    isActive,
  } = useDashboardNavigation(pathname, currentRole);

  return (
    <aside className="relative hidden h-screen w-[272px] shrink-0 flex-col overflow-hidden border-r border-line bg-white md:flex">
      <div className="flex items-center gap-2.5 px-6 pt-6 pb-2">
        <Logo />
      </div>

      <nav
        aria-label={tNav("dashboardNavigation")}
        className="mt-4 flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-4"
      >
        {navList.map((item, idx) => {
          const prevSection = idx > 0 ? navList[idx - 1]?.sectionKey : undefined;
          const showSectionHeader =
            Boolean(item.sectionKey) && item.sectionKey !== prevSection;
          return (
            <Fragment key={item.href}>
              {showSectionHeader && item.sectionKey && (
                <div className={idx === 0 ? "px-3 pb-1 pt-1" : "px-3 pb-1 pt-4"}>
                  <span className="text-[12.5px] font-bold uppercase tracking-widest text-faint">
                    {tNav(item.sectionKey)}
                  </span>
                </div>
              )}
              <SidebarItem
                href={item.href}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                active={isActive(item.href)}
              />
            </Fragment>
          );
        })}

        {!isAdmin && (
          <>
            <div className="px-3 pt-5 pb-1.5">
              <span className="text-[12.5px] font-bold uppercase tracking-widest text-faint">
                {tNav("settingsSection")}
              </span>
            </div>
            <SidebarItem
              href={`${rootHref}/settings`}
              icon={Settings}
              label={tNav("settings")}
              active={isActive(`${rootHref}/settings`)}
            />
            <SidebarItem
              href={`${rootHref}/help-center`}
              icon={HelpCircle}
              label={tNav("helpCenter")}
              active={isActive(`${rootHref}/help-center`)}
            />
          </>
        )}
      </nav>

      <div className="relative shrink-0 border-t border-line bg-surface px-5 py-4">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center bg-brand-tint text-sm font-bold text-brand-blue">
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
          <WorkspaceRoleSwitcher currentRole={activeWorkspaceRole} />
        </div>
      </div>
    </aside>
  );
}
