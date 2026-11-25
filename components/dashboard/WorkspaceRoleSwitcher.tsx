"use client";

import Link from "next/link";
import { ArrowLeftRight } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface WorkspaceRoleSwitcherProps {
  currentRole: "renter" | "landlord" | "home_seeker" | "admin";
  onNavigate?: () => void;
}

const ROLE_LINKS = [
  { id: "renter", labelKey: "renterDashboard", href: "/renter" },
  { id: "landlord", labelKey: "landlordDashboard", href: "/landlord" },
] as const;

export function WorkspaceRoleSwitcher({
  currentRole,
  onNavigate,
}: WorkspaceRoleSwitcherProps) {
  const t = useTranslations("common.workspace");

  if (currentRole === "admin") return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label={t("switchRoleAria")}
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center border border-line bg-white text-body transition-colors hover:border-ink/40 hover:text-ink"
          >
            <ArrowLeftRight aria-hidden="true" className="size-3.5" />
          </button>
        }
      />
      <DropdownMenuContent
        side="top"
        align="end"
        sideOffset={8}
        className="w-52 rounded-none border border-line bg-white p-1 shadow-lg"
      >
        <DropdownMenuLabel className="px-2.5 py-1.5 text-[12.5px] font-bold uppercase tracking-wider text-faint">
          {t("switchWorkspace")}
        </DropdownMenuLabel>
        {ROLE_LINKS.map((role) => {
          const active = role.id === currentRole;
          return (
            <DropdownMenuItem
              key={role.id}
              render={
                <Link
                  href={role.href}
                  onClick={onNavigate}
                  className={cn(
                    "block w-full rounded-none px-2.5 py-2 text-xs font-semibold",
                    active
                      ? "bg-brand-tint text-brand-blue"
                      : "text-ink hover:bg-surface",
                  )}
                />
              }
            >
              {t(role.labelKey)}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
