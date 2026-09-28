import { Building2, CircleDollarSign, Users, UserRound, Home, BadgeCheck, Clock3, CircleAlert, CreditCard, Ban, LucideIcon } from "lucide-react";

export const adminMetrics: { label: string; value: string; detail: string; icon: LucideIcon }[] = [
  { label: "Total users", value: "10,482", detail: "Across renter and landlord accounts", icon: Users },
  { label: "Landlords", value: "1,286", detail: "42 awaiting verification", icon: UserRound },
  { label: "Renters", value: "9,196", detail: "128 pending identity review", icon: Users },
  { label: "Active users", value: "7,842", detail: "Active in the last 30 days", icon: UserRound },
  { label: "Properties", value: "1,248", detail: "1,086 currently verified", icon: Building2 },
  { label: "Awaiting verification", value: "86", detail: "Oldest submission: 3 days ago", icon: Clock3 },
  { label: "Active leases", value: "3,406", detail: "Across 1,086 properties", icon: Home },
  { label: "Monthly payment volume", value: "RWF 84.2M", detail: "September 2026", icon: CircleDollarSign },
  { label: "Pending payments", value: "24", detail: "Require provider or landlord review", icon: CreditCard },
  { label: "Failed payments", value: "11", detail: "September 2026", icon: CircleAlert },
  { label: "Open complaints", value: "7", detail: "2 escalated", icon: CircleAlert },
  { label: "Suspended accounts", value: "18", detail: "Platform-wide", icon: Ban },
  { label: "Verified properties", value: "1,086", detail: "87% of all registered listings", icon: BadgeCheck },
];

export const paymentVolume = [
  { month: "Apr", successful: 58, pending: 4, failed: 2 },
  { month: "May", successful: 64, pending: 3, failed: 2 },
  { month: "Jun", successful: 61, pending: 5, failed: 3 },
  { month: "Jul", successful: 72, pending: 4, failed: 2 },
  { month: "Aug", successful: 78, pending: 6, failed: 4 },
  { month: "Sep", successful: 84, pending: 5, failed: 3 },
];
export const userGrowthByPeriod = {
  day: [
    { period: "Sep 22", users: 88 }, { period: "Sep 23", users: 102 },
    { period: "Sep 24", users: 94 }, { period: "Sep 25", users: 121 },
    { period: "Sep 26", users: 117 }, { period: "Sep 27", users: 143 },
    { period: "Sep 28", users: 96 },
  ],
  week: [
    { period: "Aug 04", users: 510 }, { period: "Aug 11", users: 552 },
    { period: "Aug 18", users: 487 }, { period: "Aug 25", users: 592 },
    { period: "Sep 01", users: 621 }, { period: "Sep 08", users: 690 },
    { period: "Sep 15", users: 713 }, { period: "Sep 22", users: 761 },
  ],
  month: [
    { period: "Apr", users: 540 }, { period: "May", users: 610 },
    { period: "Jun", users: 575 }, { period: "Jul", users: 730 },
    { period: "Aug", users: 802 }, { period: "Sep", users: 864 },
  ],
};
export const propertyGrowth = [
  { month: "Apr", newListings: 96, verified: 72, rejected: 4, suspended: 1 },
  { month: "May", newListings: 108, verified: 80, rejected: 5, suspended: 2 },
  { month: "Jun", newListings: 101, verified: 77, rejected: 3, suspended: 1 },
  { month: "Jul", newListings: 122, verified: 91, rejected: 6, suspended: 2 },
  { month: "Aug", newListings: 139, verified: 102, rejected: 7, suspended: 2 },
  { month: "Sep", newListings: 131, verified: 96, rejected: 5, suspended: 1 },
];
export const geographicDistribution = {
  province: [
    { area: "Kigali City", count: 1192 }, { area: "Eastern Province", count: 20 },
    { area: "Northern Province", count: 16 }, { area: "Southern Province", count: 14 },
    { area: "Western Province", count: 6 },
  ],
  district: [
    { area: "Gasabo", count: 516 }, { area: "Kicukiro", count: 382 },
    { area: "Nyarugenge", count: 294 }, { area: "Rwamagana", count: 20 },
    { area: "Musanze", count: 16 }, { area: "Huye", count: 14 },
  ],
  sector: [
    { area: "Kimironko", count: 184 }, { area: "Remera", count: 137 },
    { area: "Kicukiro", count: 118 }, { area: "Gisozi", count: 94 },
    { area: "Kacyiru", count: 83 },
  ],
};
export const adminAttention = [
  { title: "Properties awaiting verification", detail: "86 listings are in the review queue", href: "/admin/property-verification", count: "86" },
  { title: "Payment issues", detail: "24 pending and 11 failed transactions", href: "/admin/payments", count: "35" },
  { title: "Open complaints", detail: "7 cases, including 2 escalations", href: "/admin/complaints", count: "7" },
  { title: "Renter history reviews", detail: "4 records awaiting review", href: "/admin/renter-history", count: "4" },
];
export const recentPayments = [
  { transactionId: "TX-98231", renter: "Aline Mukamana", landlord: "Emmanuel Ntaganda", property: "Kimironko Heights · A-03", amount: "RWF 180,000", method: "MTN Mobile Money", provider: "MTN MoMo", status: "Successful", reference: "MM-61A29", created: "28 Sep, 10:42", updated: "28 Sep, 10:44" },
  { transactionId: "TX-98230", renter: "Eric Niyonzima", landlord: "Alice Uwera", property: "Kacyiru View · B-12", amount: "RWF 250,000", method: "Bank payment", provider: "Bank of Kigali", status: "Pending", reference: "BK-10988", created: "28 Sep, 10:19", updated: "28 Sep, 10:19" },
  { transactionId: "TX-98229", renter: "Diane Uwase", landlord: "Alice Uwera", property: "Remera Gardens · C-04", amount: "RWF 145,000", method: "Airtel Money", provider: "Airtel Money", status: "Successful", reference: "AM-88310", created: "28 Sep, 09:58", updated: "28 Sep, 10:00" },
  { transactionId: "TX-98228", renter: "Claude Habimana", landlord: "Claude Habimana", property: "Gisozi Court - A-08", amount: "RWF 210,000", method: "MTN Mobile Money", provider: "MTN MoMo", status: "Failed", reference: "MM-57B41", created: "28 Sep, 09:33", updated: "28 Sep, 09:35" },
  { transactionId: "TX-98227", renter: "Bella Uwase", landlord: "Alice Uwera", property: "Remera Gardens - D-01", amount: "RWF 145,000", method: "Airtel Money", provider: "Airtel Money", status: "Refunded", reference: "AM-88302", created: "27 Sep, 16:12", updated: "28 Sep, 08:11" },
  { transactionId: "TX-98226", renter: "Patrick Nkurunziza", landlord: "Olive Mukamana", property: "Kibagabaga Residences - 2A", amount: "RWF 200,000", method: "Bank payment", provider: "Bank of Kigali", status: "Cancelled", reference: "BK-10973", created: "27 Sep, 15:04", updated: "27 Sep, 15:10" },
];

export type AdminRow = Record<string, string>;
export type AdminColumn = { key: string; label: string };
export type AdminDirectory = { title: string; description: string; columns: AdminColumn[]; rows: AdminRow[]; filters?: { key: string; label: string }[]; detailPath?: string };

const userColumns = ["name|Full name", "email|Email", "phone|Phone", "role|Role", "verification|Verification", "status|Account", "properties|Properties", "lease|Active lease", "registered|Registered", "activity|Last activity"];
const propertyColumns = ["id|Property ID", "title|Property", "landlord|Landlord", "location|Location", "type|Type", "rent|Rent / month", "deposit|Deposit", "units|Units", "occupancy|Occupancy", "status|Status", "created|Created", "updated|Updated"];
const paymentColumns = ["transactionId|Transaction ID", "renter|Renter", "landlord|Landlord", "property|Property", "amount|Amount", "method|Method", "provider|Provider", "status|Status", "reference|Provider reference", "created|Created", "updated|Updated"];
const cols = (items: string[]): AdminColumn[] => items.map((item) => { const [key, label] = item.split("|"); return { key, label }; });

export const adminDirectories: Record<string, AdminDirectory> = {
  users: { title: "Users", description: "Review renter, landlord, and administrator accounts.", filters: [{ key: "role", label: "account types" }, { key: "verification", label: "verification" }, { key: "status", label: "account status" }], columns: cols(userColumns), rows: [
    { name: "Aline Mukamana", email: "aline.mukamana@example.rw", phone: "+250 788 203 144", role: "Renter", verification: "Verified", status: "Active", properties: "—", lease: "Active", registered: "18 Sep 2026", activity: "Today, 10:42" },
    { name: "Emmanuel Ntaganda", email: "emmanuel.nt@example.rw", phone: "+250 788 123 456", role: "Landlord", verification: "Verified", status: "Active", properties: "6", lease: "—", registered: "12 Aug 2026", activity: "Today, 10:40" },
    { name: "Eric Niyonzima", email: "eric.niyonzima@example.rw", phone: "+250 788 654 321", role: "Landlord", verification: "Pending", status: "Active", properties: "2", lease: "—", registered: "17 Sep 2026", activity: "Yesterday" },
    { name: "Diane Uwase", email: "diane.uwase@example.rw", phone: "+250 789 112 233", role: "Renter", verification: "Verified", status: "Active", properties: "—", lease: "Active", registered: "16 Sep 2026", activity: "Today, 09:58" },
    { name: "Sandrine Ishimwe", email: "sandrine.ishimwe@example.rw", phone: "+250 788 219 987", role: "Renter", verification: "Pending", status: "Suspended", properties: "—", lease: "None", registered: "14 Sep 2026", activity: "20 Sep 2026" },
    { name: "Claude Habimana", email: "claude.h@example.rw", phone: "+250 788 433 521", role: "Landlord", verification: "Verified", status: "Active", properties: "4", lease: "Active", registered: "03 Sep 2026", activity: "Today, 09:35" },
    { name: "Nadia Kamanzi", email: "nadia.k@example.rw", phone: "+250 788 100 430", role: "Administrator", verification: "Verified", status: "Active", properties: "-", lease: "-", registered: "12 Jan 2025", activity: "Today, 15:32" },
  ] },
  properties: { title: "Properties", description: "Registered listings, ownership, occupancy, and verification status.", filters: [{ key: "status", label: "status" }, { key: "location", label: "district" }, { key: "type", label: "property type" }], columns: cols(propertyColumns), rows: [
    { id: "UR-10231", title: "Kimironko Heights", landlord: "Emmanuel Ntaganda", location: "Gasabo, Kigali", type: "Apartment", rent: "RWF 180,000", deposit: "RWF 180,000", units: "6", occupancy: "5 of 6", status: "Verified", created: "12 Aug 2026", updated: "28 Sep 2026" },
    { id: "UR-10232", title: "Kacyiru View", landlord: "Eric Niyonzima", location: "Gasabo, Kigali", type: "Apartment", rent: "RWF 250,000", deposit: "RWF 250,000", units: "12", occupancy: "9 of 12", status: "Pending", created: "28 Sep 2026", updated: "28 Sep 2026" },
    { id: "UR-10233", title: "Remera Gardens", landlord: "Alice Uwera", location: "Gasabo, Kigali", type: "Apartment", rent: "RWF 145,000", deposit: "RWF 145,000", units: "8", occupancy: "7 of 8", status: "Verified", created: "18 Aug 2026", updated: "28 Sep 2026" },
    { id: "UR-10234", title: "Gisozi Court", landlord: "Claude Habimana", location: "Gasabo, Kigali", type: "House", rent: "RWF 210,000", deposit: "RWF 210,000", units: "4", occupancy: "3 of 4", status: "Reported", created: "03 Sep 2026", updated: "28 Sep 2026" },
    { id: "UR-10235", title: "Nyamirambo Flats", landlord: "Beatrice Mutesi", location: "Nyarugenge, Kigali", type: "Apartment", rent: "RWF 120,000", deposit: "RWF 120,000", units: "10", occupancy: "8 of 10", status: "Suspended", created: "22 Aug 2026", updated: "28 Sep 2026" },
    { id: "UR-10239", title: "Kigali View Apartments", landlord: "Patrick Nkurunziza", location: "Kicukiro, Kigali", type: "Apartment", rent: "RWF 165,000", deposit: "RWF 165,000", units: "8", occupancy: "0 of 8", status: "Rejected", created: "21 Aug 2026", updated: "28 Sep 2026" },
  ] },
  "property-verification": { title: "Property verification", description: "Review submitted property details and supporting documents.", filters: [{ key: "status", label: "status" }, { key: "location", label: "district" }], columns: cols(["id|Property ID", "title|Property", "landlord|Landlord", "location|Location", "submitted|Submitted", "documents|Documents", "status|Status"]), rows: [
    { id: "UR-10232", title: "Kacyiru View", landlord: "Eric Niyonzima", location: "Gasabo, Kigali", submitted: "28 Sep 2026", documents: "3 files", status: "Pending" },
    { id: "UR-10236", title: "Kibagabaga Residences", landlord: "Olive Mukamana", location: "Gasabo, Kigali", submitted: "27 Sep 2026", documents: "4 files", status: "Pending" },
    { id: "UR-10237", title: "Kicukiro Family Home", landlord: "Patrick Nkurunziza", location: "Kicukiro, Kigali", submitted: "26 Sep 2026", documents: "2 files", status: "Needs information" },
    { id: "UR-10238", title: "Huye Student Rooms", landlord: "Claudine Uwamahoro", location: "Huye, Southern Province", submitted: "25 Sep 2026", documents: "3 files", status: "Pending" },
  ] },
  leases: { title: "Leases", description: "Administrative view of rental agreements and tenancy dates.", filters: [{ key: "status", label: "lease status" }], columns: cols(["id|Lease ID", "renter|Renter", "landlord|Landlord", "property|Property / unit", "rent|Monthly rent", "deposit|Deposit", "start|Start date", "end|End date", "status|Status"]), rows: [
    { id: "LS-23041", renter: "Aline Mukamana", landlord: "Emmanuel Ntaganda", property: "Kimironko Heights · A-03", rent: "RWF 180,000", deposit: "RWF 180,000", start: "01 Jun 2026", end: "31 May 2027", status: "Active" },
    { id: "LS-23042", renter: "Diane Uwase", landlord: "Alice Uwera", property: "Remera Gardens · C-04", rent: "RWF 145,000", deposit: "RWF 145,000", start: "15 Apr 2026", end: "14 Apr 2027", status: "Active" },
    { id: "LS-23043", renter: "Claude Habimana", landlord: "Claude Habimana", property: "Gisozi Court · A-08", rent: "RWF 210,000", deposit: "RWF 210,000", start: "01 Mar 2025", end: "30 Sep 2026", status: "Ending soon" },
    { id: "LS-23044", renter: "Eric Niyonzima", landlord: "Alice Uwera", property: "Kacyiru View - B-12", rent: "RWF 250,000", deposit: "RWF 250,000", start: "10 Jan 2026", end: "09 Jan 2027", status: "Disputed" },
    { id: "LS-23045", renter: "Beatrice Mutesi", landlord: "Beatrice Mutesi", property: "Nyamirambo Flats - 2B", rent: "RWF 120,000", deposit: "RWF 120,000", start: "-", end: "-", status: "Draft" },
    { id: "LS-23046", renter: "Olive Mukamana", landlord: "Olive Mukamana", property: "Kibagabaga Residences - 2A", rent: "RWF 200,000", deposit: "RWF 200,000", start: "01 Oct 2024", end: "30 Sep 2025", status: "Expired" },
  ] },
  payments: { title: "Payments", description: "Transaction status, provider references, and payment history.", detailPath: "/admin/payments", filters: [{ key: "status", label: "payment status" }, { key: "provider", label: "provider" }], columns: cols(paymentColumns), rows: recentPayments.map((payment) => ({ ...payment })) },
  complaints: { title: "Complaints", description: "Investigate reports and disputes submitted by platform users.", filters: [{ key: "status", label: "status" }, { key: "category", label: "category" }], columns: cols(["category|Category", "reporter|Reported by", "subject|Subject", "property|Property", "created|Created", "assignee|Assigned to", "status|Status"]), rows: [
    { category: "Payment dispute", reporter: "Eric Manzi", subject: "Final water bill", property: "Kacyiru View · Studio B", created: "28 Sep 2026", assignee: "Nadia K.", status: "Under review" },
    { category: "Property misrepresentation", reporter: "Aline Mukamana", subject: "Listing details differ from unit", property: "Nyamirambo Flats · 2B", created: "27 Sep 2026", assignee: "Unassigned", status: "Open" },
    { category: "Maintenance issue", reporter: "Diane Uwase", subject: "Unresolved water leak", property: "Remera Gardens · C-04", created: "26 Sep 2026", assignee: "Jean P.", status: "Waiting for information" },
    { category: "Fraud report", reporter: "Patrick M.", subject: "Duplicate property listing", property: "Kimironko Heights", created: "25 Sep 2026", assignee: "Nadia K.", status: "Escalated" },
    { category: "Other", reporter: "Beatrice Mutesi", subject: "Duplicate account report", property: "-", created: "24 Sep 2026", assignee: "Jean P.", status: "Resolved" },
    { category: "Lease dispute", reporter: "Alain Patrick", subject: "Deposit return disagreement", property: "UR-10231", created: "22 Sep 2026", assignee: "Nadia K.", status: "Rejected" },
  ] },
  "renter-history": { title: "Renter's History", description: "Factual rental records, evidence, and dispute status. No renter score is assigned.", filters: [{ key: "status", label: "record status" }], columns: cols(["renter|Renter", "record|Record", "property|Property", "reportedBy|Reported by", "created|Created", "evidence|Evidence", "status|Status"]), rows: [
    { renter: "Eric Manzi", record: "Final water bill dispute", property: "Kacyiru View · Studio B", reportedBy: "Landlord", created: "28 Sep 2026", evidence: "2 files", status: "Disputed" },
    { renter: "Alain Patrick", record: "Electricity balance", property: "Kimironko Heights · A-02", reportedBy: "Landlord", created: "12 May 2025", evidence: "1 file", status: "Resolved" },
    { renter: "Bella Uwase", record: "Property damage report", property: "Remera Gardens · D-01", reportedBy: "Landlord", created: "25 Sep 2026", evidence: "Awaiting evidence", status: "Pending review" },
    { renter: "Aline Mukamana", record: "Rent payment delay", property: "Kimironko Heights · A-03", reportedBy: "Landlord", created: "18 Sep 2026", evidence: "Payment record", status: "Rejected" },
  ] },
  moderation: { title: "Moderation", description: "Review user reports about listings, accounts, and platform content.", filters: [{ key: "status", label: "status" }, { key: "type", label: "report type" }], columns: cols(["report|Report ID", "type|Report type", "target|Reported item", "reportedBy|Reported by", "created|Received", "status|Status"]), rows: [
    { report: "RP-4201", type: "Duplicate listing", target: "Nyamirambo Flats", reportedBy: "Aline Mukamana", created: "28 Sep 2026", status: "Open" },
    { report: "RP-4200", type: "Misleading information", target: "UR-10234", reportedBy: "Diane Uwase", created: "27 Sep 2026", status: "Under review" },
    { report: "RP-4199", type: "Suspicious account", target: "User U-8831", reportedBy: "System review", created: "26 Sep 2026", status: "Escalated" },
    { report: "RP-4198", type: "Inappropriate content", target: "Listing UR-10221", reportedBy: "Platform user", created: "24 Sep 2026", status: "Resolved" },
  ] },
  notifications: { title: "Notifications", description: "Platform messages and delivery status by audience and channel.", filters: [{ key: "audience", label: "audience" }, { key: "delivery", label: "delivery" }], columns: cols(["title|Notification", "audience|Audience", "channel|Channel", "sent|Sent", "delivery|Delivery", "created|Created"]), rows: [
    { title: "September payment reminder", audience: "Renters", channel: "In-app, SMS", sent: "2,418", delivery: "Delivered", created: "25 Sep 2026" },
    { title: "Scheduled maintenance notice", audience: "All users", channel: "In-app, Email", sent: "10,482", delivery: "Delivered", created: "22 Sep 2026" },
    { title: "Identity review required", audience: "Specific users", channel: "Email", sent: "34", delivery: "Partially delivered", created: "20 Sep 2026" },
  ] },
  "audit-logs": { title: "Audit logs", description: "Read-only record of sensitive administrative changes.", filters: [{ key: "action", label: "action" }], columns: cols(["admin|Administrator", "action|Action", "target|Target", "previous|Previous value", "next|New value", "time|Timestamp", "device|IP / device"]), rows: [
    { admin: "Nadia Kamanzi", action: "PROPERTY_APPROVED", target: "UR-10231", previous: "Pending verification", next: "Verified", time: "28 Sep 2026, 15:32", device: "10.12.4.8 · Web" },
    { admin: "Jean Pierre M.", action: "COMPLAINT_ESCALATED", target: "CP-3308", previous: "Under review", next: "Escalated", time: "28 Sep 2026, 14:05", device: "10.12.4.12 · Web" },
    { admin: "Nadia Kamanzi", action: "USER_SUSPENDED", target: "U-8831", previous: "Active", next: "Suspended", time: "27 Sep 2026, 17:21", device: "10.12.4.8 · Web" },
  ] },
  "admin-management": { title: "Admin management", description: "Administrative accounts, roles, permissions, and access status.", filters: [{ key: "role", label: "role" }, { key: "status", label: "status" }], columns: cols(["name|Name", "email|Email", "role|Role", "permissions|Permission groups", "login|Last login", "created|Created", "status|Status"]), rows: [
    { name: "Nadia Kamanzi", email: "nadia.k@example.rw", role: "SUPER_ADMIN", permissions: "All modules", login: "Today, 15:32", created: "12 Jan 2025", status: "Active" },
    { name: "Jean Pierre M.", email: "jean.pierre@example.rw", role: "VERIFICATION_AGENT", permissions: "Users, Properties", login: "Today, 14:05", created: "08 Mar 2025", status: "Active" },
    { name: "Aurore U.", email: "aurore.u@example.rw", role: "FINANCE_ADMIN", permissions: "Payments, Analytics", login: "Yesterday", created: "16 Jun 2025", status: "Active" },
    { name: "Patrick N.", email: "patrick.n@example.rw", role: "SUPPORT_AGENT", permissions: "Users, Complaints", login: "24 Sep 2026", created: "01 Sep 2025", status: "Disabled" },
    { name: "Claudine U.", email: "claudine.u@example.rw", role: "MODERATOR", permissions: "Moderation", login: "Today, 12:10", created: "09 Feb 2026", status: "Active" },
  ] },
  settings: { title: "Platform settings", description: "Configuration categories. Secret credentials are not displayed in the dashboard.", filters: [{ key: "category", label: "category" }, { key: "status", label: "status" }], columns: cols(["category|Category", "configuration|Configuration", "current|Current value", "scope|Scope", "status|Status"]), rows: [
    { category: "Platform", configuration: "Platform name", current: "Urugo", scope: "Global", status: "Active" },
    { category: "Platform", configuration: "Currency", current: "RWF", scope: "Global", status: "Active" },
    { category: "Payments", configuration: "Payment providers", current: "MTN MoMo, Airtel Money, Bank", scope: "Payments", status: "Active" },
    { category: "Payments", configuration: "Transaction fees", current: "Restricted", scope: "Payments", status: "Protected" },
    { category: "Verification", configuration: "Required documents", current: "Landlord and property documents", scope: "Verification", status: "Active" },
    { category: "AI", configuration: "Provider credentials", current: "Hidden", scope: "AI services", status: "Protected" },
  ] },
};
