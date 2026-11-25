import assert from "node:assert/strict";
import test from "node:test";
import { resolveDashboardTitle } from "../utils/dashboard-titles.ts";

test("resolves all home-seeker dashboard page titles", () => {
  const cases = [
    ["/home-seeker", "Dashboard"],
    ["/home-seeker/saved-properties", "Saved Properties"],
    ["/home-seeker/visits", "Visits"],
    ["/home-seeker/waiting-list", "Waiting List"],
    ["/home-seeker/notifications", "Notifications"],
    ["/home-seeker/profile", "Profile"],
    ["/home-seeker/settings", "Settings"],
    ["/home-seeker/help-center", "Help Center"],
  ];

  for (const [pathname, expected] of cases) {
    assert.equal(resolveDashboardTitle(pathname), expected);
  }
});

test("resolves all landlord dashboard and nested page titles", () => {
  const cases = [
    ["/landlord", "Dashboard"],
    ["/landlord/properties", "My Properties"],
    ["/landlord/properties/new", "Add Property"],
    ["/landlord/properties/prop-101/edit", "Edit Property"],
    ["/landlord/properties/groups/grp-1", "Property Group"],
    ["/landlord/renters", "Renters"],
    ["/landlord/renters/add", "Add Renter"],
    ["/landlord/renters/r-101", "Renter Details"],
    ["/landlord/agreements", "Agreements"],
    ["/landlord/agreements/agr-001", "Agreement Details"],
    ["/landlord/agreements/agr-001/edit", "Edit Agreement"],
    ["/landlord/tenancies", "Tenancies"],
    ["/landlord/tenancies/r-101", "Tenancy Details"],
    ["/landlord/renter-history", "Renter History"],
    ["/landlord/renter-history/iss-01", "Renter History Details"],
    ["/landlord/notifications", "Notifications"],
    ["/landlord/settings", "Settings"],
    ["/landlord/help-center", "Help Center"],
  ];

  for (const [pathname, expected] of cases) {
    assert.equal(resolveDashboardTitle(pathname), expected);
  }
});

test("resolves all renter dashboard and nested page titles", () => {
  const cases = [
    ["/renter", "Overview"],
    ["/renter/property", "My Property"],
    ["/renter/lease", "Lease"],
    ["/renter/payments", "Payments"],
    ["/renter/payments/pay-rent", "Pay Rent"],
    ["/renter/electricity", "Electricity"],
    ["/renter/maintenance", "Maintenance"],
    ["/renter/messages", "Messages"],
    ["/renter/documents", "Documents"],
    ["/renter/notifications", "Notifications"],
    ["/renter/settings", "Settings"],
    ["/renter/help-center", "Help Center"],
  ];

  for (const [pathname, expected] of cases) {
    assert.equal(resolveDashboardTitle(pathname), expected);
  }
});

test("resolves all admin dashboard and nested page titles", () => {
  const cases = [
    ["/admin", "Overview"],
    ["/admin/users", "Users"],
    ["/admin/properties", "Properties"],
    ["/admin/property-verification", "Property verification"],
    ["/admin/leases", "Leases"],
    ["/admin/payments", "Payments"],
    ["/admin/payments/TX-98231", "Transaction Details"],
    ["/admin/complaints", "Complaints"],
    ["/admin/renter-history", "Renter's History"],
    ["/admin/analytics", "Analytics"],
    ["/admin/notifications", "Notifications"],
    ["/admin/moderation", "Moderation"],
    ["/admin/audit-logs", "Audit logs"],
    ["/admin/admin-management", "Admin management"],
    ["/admin/settings", "Settings"],
  ];

  for (const [pathname, expected] of cases) {
    assert.equal(resolveDashboardTitle(pathname), expected);
  }
});

test("handles trailing slashes, query strings, future dashboard slugs, and fallbacks", () => {
  assert.equal(resolveDashboardTitle("/landlord/properties/"), "My Properties");
  assert.equal(
    resolveDashboardTitle("/landlord/tenancies?property=prop-101"),
    "Tenancies",
  );
  assert.equal(
    resolveDashboardTitle("/landlord/settings/security"),
    "Settings",
  );
  assert.equal(
    resolveDashboardTitle("/renter/billing-history"),
    "Billing History",
  );
  assert.equal(resolveDashboardTitle(""), "Dashboard");
  assert.equal(resolveDashboardTitle(null, "Overview"), "Overview");
  assert.equal(resolveDashboardTitle("/properties"), "Dashboard");
});
