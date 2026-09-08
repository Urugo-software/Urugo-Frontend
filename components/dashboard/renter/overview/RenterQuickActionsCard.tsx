import React from "react";
import Link from "next/link";
import { Building2, Bell, Folder } from "lucide-react";

export function RenterQuickActionsCard() {
  const actions = [
    { label: "My Property & Lease", href: "/renter/property", icon: Building2 },
    { label: "Documents & Receipts", href: "/renter/documents", icon: Folder },
    { label: "Notifications", href: "/renter/notifications", icon: Bell },
  ];

  return (
    <div className=" border border-line bg-white p-5 shadow-xs">
      <h3 className="mb-3 text-xs font-semibold text-faint uppercase tracking-wider">
        Quick Access
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {actions.map((act) => (
          <Link
            key={act.label}
            href={act.href}
            className="flex items-center gap-3 rounded-lg border border-line p-3 transition hover:bg-surface"
          >
            <act.icon className="size-5 text-brand" />
            <span className="text-xs font-semibold text-ink">{act.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
