"use client";

import { motion } from "framer-motion";
import { Building2, KeyRound, Search } from "lucide-react";

export type RoleType = "home_seeker" | "landlord" | "renter";

interface RoleTabSelectorProps {
  activeRole: RoleType;
  onRoleChange: (role: RoleType) => void;
}

const ROLES: { id: RoleType; label: string; icon: React.ElementType }[] = [
  { id: "home_seeker", label: "For Home Seekers", icon: Search },
  { id: "landlord", label: "For Landlords", icon: Building2 },
  { id: "renter", label: "For Renters", icon: KeyRound },
];

export default function RoleTabSelector({
  activeRole,
  onRoleChange,
}: RoleTabSelectorProps) {
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap mb-12 px-4">
      {ROLES.map((role) => {
        const Icon = role.icon;
        const isActive = activeRole === role.id;

        return (
          <button
            key={role.id}
            type="button"
            onClick={() => onRoleChange(role.id)}
            className="relative px-5 py-3 rounded-full text-sm font-semibold cursor-pointer transition-colors duration-200 outline-none select-none flex items-center gap-2 z-10"
          >
            {/* Sliding Pill Background for Active Tab */}
            {isActive && (
              <motion.div
                layoutId="activeRolePill"
                className="absolute inset-0 bg-brand rounded-full shadow-md z-0"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            {/* Inactive Tab Border/Background hover */}
            {!isActive && (
              <div className="absolute inset-0 rounded-full border border-line bg-white hover:bg-surface/80 hover:border-brand/30 transition-colors z-0" />
            )}

            {/* Content inside button */}
            <span
              className={`relative z-10 flex items-center gap-2 transition-colors duration-200 ${
                isActive ? "text-white font-bold" : "text-ink hover:text-brand"
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform duration-200 ${
                  isActive ? "scale-110 text-white" : "text-body"
                }`}
              />
              <span>{role.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
