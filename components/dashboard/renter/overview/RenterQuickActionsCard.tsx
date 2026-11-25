"use client";

import Link from "next/link";
import {
  Building2,
  Calendar,
  Compass,
  Folder,
  History,
  ScrollText,
} from "lucide-react";
import { useTranslations } from "next-intl";

const QUICK_ACTIONS = [
  { key: "myProperty", href: "/renter/property", icon: Building2 },
  { key: "leaseAgreement", href: "/renter/lease", icon: ScrollText },
  { key: "documentsAndReceipts", href: "/renter/documents", icon: Folder },
  { key: "exploreHomes", href: "/renter/explore", icon: Compass },
  { key: "inquiriesAndVisits", href: "/renter/inquiries", icon: Calendar },
  { key: "rentalHistory", href: "/renter/rental-history", icon: History },
] as const;

export function RenterQuickActionsCard() {
  const t = useTranslations("renter.overview.quickActions");

  return (
    <section className="border border-line bg-white p-5 shadow-2xs">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-faint">
        {t("title")}
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_ACTIONS.map(({ key, href, icon: Icon }) => (
          <Link
            key={key}
            href={href}
            className="flex items-center gap-3 border border-line bg-white px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-surface"
          >
            <Icon aria-hidden="true" className="size-4 shrink-0 text-brand-blue" />
            <span className="truncate">{t(key)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
