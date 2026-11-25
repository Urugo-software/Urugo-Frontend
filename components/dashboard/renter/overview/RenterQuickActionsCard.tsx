import Link from "next/link";
import {
  Building2,
  Calendar,
  Compass,
  Folder,
  History,
  ScrollText,
} from "lucide-react";

const QUICK_ACTIONS = [
  { label: "My Property", href: "/renter/property", icon: Building2 },
  { label: "Lease Agreement", href: "/renter/lease", icon: ScrollText },
  { label: "Documents & Receipts", href: "/renter/documents", icon: Folder },
  { label: "Explore Homes", href: "/renter/explore", icon: Compass },
  { label: "Inquiries & Visits", href: "/renter/inquiries", icon: Calendar },
  { label: "Rental History", href: "/renter/rental-history", icon: History },
];

export function RenterQuickActionsCard() {
  return (
    <section className="border border-line bg-white p-5 shadow-2xs">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-faint">
        Quick Access
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_ACTIONS.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 border border-line bg-white px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-surface"
          >
            <Icon aria-hidden="true" className="size-4 shrink-0 text-brand-blue" />
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
