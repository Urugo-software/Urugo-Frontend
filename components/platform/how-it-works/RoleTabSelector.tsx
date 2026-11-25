"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import type { RoleType } from "@/types";

interface RoleTabSelectorProps {
  activeRole: RoleType;
  onRoleChange: (role: RoleType) => void;
}

const ROLE_IDS: readonly RoleType[] = ["home_seeker", "landlord", "renter"];

export default function RoleTabSelector({
  activeRole,
  onRoleChange,
}: RoleTabSelectorProps) {
  const t = useTranslations("public.howItWorks.roles");

  return (
    <div className="mb-12 flex flex-wrap items-center justify-center gap-2 px-4 sm:gap-3">
      {ROLE_IDS.map((roleId) => {
        const isActive = activeRole === roleId;

        return (
          <button
            key={roleId}
            type="button"
            onClick={() => onRoleChange(roleId)}
            className="relative z-10 flex cursor-pointer select-none items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold outline-none transition-colors duration-200"
          >
            {/* Sliding Pill Background for Active Tab */}
            {isActive && (
              <motion.div
                layoutId="activeRolePill"
                className="absolute inset-0 z-0 rounded-full bg-brand shadow-md"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            {/* Inactive Tab Border/Background hover */}
            {!isActive && (
              <div className="absolute inset-0 z-0 rounded-full border border-line bg-white transition-colors hover:border-brand/30 hover:bg-surface/80" />
            )}

            {/* Content inside button */}
            <span
              className={`relative z-10 flex items-center gap-2 transition-colors duration-200 ${
                isActive ? "font-bold text-white" : "text-ink hover:text-brand"
              }`}
            >
              <span>{t(`${roleId}.tabLabel`)}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
