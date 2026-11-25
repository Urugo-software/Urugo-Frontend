const DASHBOARD_ROOTS = new Set(["admin", "home-seeker", "landlord", "renter"]);

export const DASHBOARD_EXACT_TITLES: Record<string, string> = {
  // Home Seeker
  "/home-seeker": "Dashboard",
  "/home-seeker/saved-properties": "Saved Properties",
  "/home-seeker/visits": "Visits",
  "/home-seeker/waiting-list": "Waiting List",
  "/home-seeker/notifications": "Notifications",
  "/home-seeker/profile": "Profile",
  "/home-seeker/settings": "Settings",
  "/home-seeker/help-center": "Help Center",

  // Landlord
  "/landlord": "Dashboard",
  "/landlord/properties": "My Properties",
  "/landlord/properties/new": "Add Property",
  "/landlord/inquiries": "Inquiries",
  "/landlord/viewings": "Viewing Requests",
  "/landlord/payments": "Payments",
  "/landlord/renters": "Renters",
  "/landlord/renters/add": "Add Renter",
  "/landlord/agreements": "Agreements",
  "/landlord/tenancies": "Tenancies",
  "/landlord/renter-history": "Renter History",
  "/landlord/notifications": "Notifications",
  "/landlord/settings": "Settings",
  "/landlord/help-center": "Help Center",

  // Renter
  "/renter": "Overview",
  "/renter/explore": "Explore Homes",
  "/renter/inquiries": "Inquiries & Visits",
  "/renter/property": "My Property",
  "/renter/lease": "Lease",
  "/renter/payments": "Payments",
  "/renter/payments/pay-rent": "Pay Rent",
  "/renter/maintenance": "Maintenance",
  "/renter/rental-history": "Rental History",
  "/renter/messages": "Messages",
  "/renter/documents": "Documents",
  "/renter/notifications": "Notifications",
  "/renter/settings": "Settings",
  "/renter/help-center": "Help Center",

  // Admin
  "/admin": "Overview",
  "/admin/users": "Users",
  "/admin/properties": "Properties",
  "/admin/property-verification": "Property verification",
  "/admin/leases": "Leases",
  "/admin/payments": "Payments",
  "/admin/complaints": "Complaints",
  "/admin/renter-history": "Renter's History",
  "/admin/analytics": "Analytics",
  "/admin/notifications": "Notifications",
  "/admin/moderation": "Moderation",
  "/admin/audit-logs": "Audit logs",
  "/admin/admin-management": "Admin management",
  "/admin/settings": "Settings",
};

const DASHBOARD_PATTERN_TITLES: Array<{ pattern: RegExp; title: string }> = [
  { pattern: /^\/landlord\/properties\/groups\/[^/]+$/, title: "Property Group" },
  { pattern: /^\/landlord\/properties\/[^/]+\/edit$/, title: "Edit Property" },
  { pattern: /^\/landlord\/properties\/[^/]+$/, title: "Property Details" },
  { pattern: /^\/landlord\/renters\/[^/]+$/, title: "Renter Details" },
  { pattern: /^\/landlord\/agreements\/[^/]+\/edit$/, title: "Edit Agreement" },
  { pattern: /^\/landlord\/agreements\/[^/]+$/, title: "Agreement Details" },
  { pattern: /^\/landlord\/tenancies\/[^/]+$/, title: "Tenancy Details" },
  { pattern: /^\/landlord\/renter-history\/[^/]+$/, title: "Renter History Details" },
  { pattern: /^\/admin\/payments\/[^/]+$/, title: "Transaction Details" },
];

function normalizePathname(pathname: string): string {
  const withoutQueryOrHash = pathname.split(/[?#]/)[0] ?? "";
  const trimmed = withoutQueryOrHash.replace(/\/+$/, "");
  return trimmed || "/";
}

function formatSlug(segment: string): string {
  let decoded = segment;
  try {
    decoded = decodeURIComponent(segment);
  } catch {
    decoded = segment;
  }

  return decoded
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const DASHBOARD_EXACT_TITLE_KEYS: Record<string, string> = {
  "/home-seeker": "homeSeekerDashboard",
  "/home-seeker/saved-properties": "homeSeekerSaved",
  "/home-seeker/visits": "homeSeekerVisits",
  "/home-seeker/waiting-list": "homeSeekerWaitingList",
  "/home-seeker/notifications": "homeSeekerNotifications",
  "/home-seeker/profile": "homeSeekerProfile",
  "/home-seeker/settings": "homeSeekerSettings",
  "/home-seeker/help-center": "homeSeekerHelp",
  "/landlord": "landlordDashboard",
  "/landlord/properties": "landlordProperties",
  "/landlord/properties/new": "landlordNewProperty",
  "/landlord/inquiries": "landlordInquiries",
  "/landlord/viewings": "landlordViewings",
  "/landlord/payments": "landlordPayments",
  "/landlord/renters": "landlordRenters",
  "/landlord/renters/add": "landlordAddRenter",
  "/landlord/agreements": "landlordAgreements",
  "/landlord/tenancies": "landlordTenancies",
  "/landlord/renter-history": "landlordRenterHistory",
  "/landlord/notifications": "landlordNotifications",
  "/landlord/settings": "landlordSettings",
  "/landlord/help-center": "landlordHelp",
  "/renter": "renterOverview",
  "/renter/explore": "renterExplore",
  "/renter/inquiries": "renterInquiries",
  "/renter/property": "renterProperty",
  "/renter/lease": "renterLease",
  "/renter/payments": "renterPayments",
  "/renter/payments/pay-rent": "renterPayRent",
  "/renter/maintenance": "renterMaintenance",
  "/renter/rental-history": "renterRentalHistory",
  "/renter/messages": "renterMessages",
  "/renter/documents": "renterDocuments",
  "/renter/notifications": "renterNotifications",
  "/renter/settings": "renterSettings",
  "/renter/help-center": "renterHelp",
  "/admin": "adminOverview",
  "/admin/users": "adminUsers",
  "/admin/properties": "adminProperties",
  "/admin/property-verification": "adminVerification",
  "/admin/leases": "adminLeases",
  "/admin/payments": "adminPayments",
  "/admin/complaints": "adminComplaints",
  "/admin/renter-history": "adminRenterHistory",
  "/admin/analytics": "adminAnalytics",
  "/admin/notifications": "adminNotifications",
  "/admin/moderation": "adminModeration",
  "/admin/audit-logs": "adminAuditLogs",
  "/admin/admin-management": "adminManagement",
  "/admin/settings": "adminSettings",
};

const DASHBOARD_PATTERN_TITLE_KEYS: Array<{ pattern: RegExp; key: string }> = [
  { pattern: /^\/landlord\/properties\/groups\/[^/]+$/, key: "landlordPropertyGroup" },
  { pattern: /^\/landlord\/properties\/[^/]+\/edit$/, key: "landlordEditProperty" },
  { pattern: /^\/landlord\/properties\/[^/]+$/, key: "landlordPropertyDetails" },
  { pattern: /^\/landlord\/renters\/[^/]+$/, key: "landlordRenterDetails" },
  { pattern: /^\/landlord\/agreements\/[^/]+\/edit$/, key: "landlordEditAgreement" },
  { pattern: /^\/landlord\/agreements\/[^/]+$/, key: "landlordAgreementDetails" },
  { pattern: /^\/landlord\/tenancies\/[^/]+$/, key: "landlordTenancyDetails" },
  { pattern: /^\/landlord\/renter-history\/[^/]+$/, key: "landlordRenterHistoryDetails" },
  { pattern: /^\/admin\/payments\/[^/]+$/, key: "adminPaymentDetails" },
];

export function resolveDashboardTitleKey(
  pathname: string | null | undefined,
): string | null {
  if (!pathname) return null;

  const normalized = normalizePathname(pathname);
  const exactKey = DASHBOARD_EXACT_TITLE_KEYS[normalized];
  if (exactKey) return exactKey;

  for (const { pattern, key } of DASHBOARD_PATTERN_TITLE_KEYS) {
    if (pattern.test(normalized)) return key;
  }

  const segments = normalized.split("/").filter(Boolean);
  if (segments.length >= 2 && DASHBOARD_ROOTS.has(segments[0])) {
    const sectionPath = `/${segments[0]}/${segments[1]}`;
    return DASHBOARD_EXACT_TITLE_KEYS[sectionPath] ?? null;
  }

  return null;
}

export function resolveDashboardTitle(
  pathname: string | null | undefined,
  fallback = "Dashboard",
): string {
  if (!pathname) return fallback;

  const normalized = normalizePathname(pathname);

  const exactMatch = DASHBOARD_EXACT_TITLES[normalized];
  if (exactMatch) return exactMatch;

  for (const { pattern, title } of DASHBOARD_PATTERN_TITLES) {
    if (pattern.test(normalized)) return title;
  }

  const segments = normalized.split("/").filter(Boolean);
  if (segments.length >= 2 && DASHBOARD_ROOTS.has(segments[0])) {
    const sectionPath = `/${segments[0]}/${segments[1]}`;
    const sectionMatch = DASHBOARD_EXACT_TITLES[sectionPath];
    if (sectionMatch) return sectionMatch;

    const formatted = formatSlug(segments[1]);
    if (formatted) return formatted;
  }

  return fallback;
}
