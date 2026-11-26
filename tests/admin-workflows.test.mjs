import assert from "node:assert/strict";
import test from "node:test";
import {
  applyPartyConsentDecision,
  canExecuteApproval,
  computeApprovalStatus,
} from "../utils/admin-approvals.ts";
import { computeAdminOverviewSummary } from "../utils/admin-metrics.ts";
import {
  assertAdminPermission,
  hasRolePermission,
  normalizeSystemRole,
  ROLE_CAPABILITIES,
  validatePolicyInput,
} from "../utils/admin-permissions.ts";

// ---------------------------------------------------------------------------
// Minimal inline fixtures – avoids importing admin-seed-data.ts which has
// a runtime dependency on buildExpiryIso that the Node --test runner cannot
// resolve through path aliases.
// ---------------------------------------------------------------------------

/** APR-901: lease edit, landlord already approved, renter still Pending */
const mockApprovalPendingRenter = {
  id: "APR-901",
  actionType: "lease_material_edit",
  title: "Adjust monthly rent & extend lease end date",
  targetType: "lease",
  targetId: "LS-23041",
  initiatedBy: "Nadia Kamanzi",
  reason: "Agreed renewal adjustment requested via landlord support ticket.",
  evidenceRef: "SUP-2026-114",
  createdAt: new Date(Date.now() - 86_400_000).toISOString(),
  expiresAt: new Date(Date.now() + 7 * 86_400_000).toISOString(),
  status: "Pending Consent",
  landlordConsent: {
    required: true,
    partyId: "usr-lnd-1",
    partyName: "Emmanuel Ntaganda",
    status: "Approved",
    respondedAt: new Date(Date.now() - 43_200_000).toISOString(),
    note: "Confirmed agreed renewal rate.",
  },
  renterConsent: {
    required: true,
    partyId: "usr-rnt-1",
    partyName: "Aline Mukamana",
    status: "Pending",
  },
  payload: { summary: "Update rent and extend end date." },
};

/** APR-902: service-mode change, landlord consent still Pending */
const mockApprovalPendingLandlord = {
  id: "APR-902",
  actionType: "landlord_service_mode_change",
  title: "Upgrade landlord service mode to Full Management",
  targetType: "user",
  targetId: "usr-lnd-2",
  initiatedBy: "Nadia Kamanzi",
  reason: "Landlord requested assistance enabling managed tenancies.",
  evidenceRef: "ONB-2026-042",
  createdAt: new Date(Date.now() - 172_800_000).toISOString(),
  expiresAt: new Date(Date.now() + 7 * 86_400_000).toISOString(),
  status: "Pending Consent",
  landlordConsent: {
    required: true,
    partyId: "usr-lnd-2",
    partyName: "Eric Niyonzima",
    status: "Pending",
  },
  renterConsent: {
    required: false,
    partyId: "",
    partyName: "",
    status: "Approved",
  },
  payload: { summary: "Switch service mode to Full Management." },
};

const mockUsers = [
  { id: "usr-adm-1", role: "ADMIN",    status: "Active",    propertiesCount: 0, activeLeasesCount: 0 },
  { id: "usr-lnd-1", role: "LANDLORD", status: "Active",    propertiesCount: 3, activeLeasesCount: 2 },
  { id: "usr-lnd-2", role: "LANDLORD", status: "Suspended", propertiesCount: 1, activeLeasesCount: 0 },
  { id: "usr-rnt-1", role: "RENTER",   status: "Active",    propertiesCount: 0, activeLeasesCount: 1 },
  { id: "usr-rnt-2", role: "RENTER",   status: "Active",    propertiesCount: 0, activeLeasesCount: 0 },
];

const mockProperties = [
  { id: "UR-10231", verification: "Verified",         status: "Active"  },
  { id: "UR-10232", verification: "Pending",           status: "Active"  },
  { id: "UR-10233", verification: "Needs Information", status: "Active"  },
  { id: "UR-10234", verification: "Verified",          status: "Inactive" },
];

const mockLeases = [
  { id: "LS-23041", status: "Active"      },
  { id: "LS-23042", status: "Ending Soon" },
  { id: "LS-23043", status: "Expired"     },
];

const mockPayments = [
  { id: "PAY-1", status: "Successful", amountRwf: 180_000 },
  { id: "PAY-2", status: "Successful", amountRwf: 145_000 },
  { id: "PAY-3", status: "Pending",    amountRwf:  95_000 },
  { id: "PAY-4", status: "Failed",     amountRwf:  60_000 },
];

const mockCases = [
  { id: "CS-1", status: "Open"      },
  { id: "CS-2", status: "Escalated" },
  { id: "CS-3", status: "Resolved"  },
];

const mockRenterHistory = [
  { id: "RH-1", status: "Reported"  },
  { id: "RH-2", status: "Cleared"   },
  { id: "RH-3", status: "Disputed"  },
];

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test("system maintains strictly three roles: ADMIN, LANDLORD, RENTER", () => {
  assert.deepEqual(Object.keys(ROLE_CAPABILITIES).sort(), [
    "ADMIN",
    "LANDLORD",
    "RENTER",
  ]);
  assert.equal(hasRolePermission("ADMIN", "admin:access"), true);
  assert.equal(hasRolePermission("ADMIN", "approvals:initiate"), true);
  assert.equal(hasRolePermission("LANDLORD", "admin:access"), false);
  assert.equal(hasRolePermission("RENTER", "admin:access"), false);
  assert.equal(hasRolePermission("LANDLORD", "consent:respond"), true);
  assert.equal(hasRolePermission("RENTER", "consent:respond"), true);
  assert.throws(() => assertAdminPermission("LANDLORD", "users:manage"));
  assert.equal(normalizeSystemRole("admin"), "ADMIN");
  assert.equal(normalizeSystemRole("renter"), "RENTER");
  assert.equal(normalizeSystemRole("unknown"), "LANDLORD");
});

test("sensitive operation policy requires reason and evidence where mandated", () => {
  assert.equal(
    validatePolicyInput("verify_property", { reason: "ok" }).valid,
    false,
  );
  assert.equal(
    validatePolicyInput("verify_property", { reason: "Deed verified" }).valid,
    true,
  );
  assert.equal(
    validatePolicyInput("request_financial_adjustment", {
      reason: "Confirmed duplicate charge",
      evidenceRef: "",
    }).valid,
    false,
  );
  assert.equal(
    validatePolicyInput("request_financial_adjustment", {
      reason: "Confirmed duplicate charge",
      evidenceRef: "MM-61A29",
    }).valid,
    true,
  );
});

test("approval request cannot execute until all required parties approve", () => {
  const req = mockApprovalPendingRenter;
  assert.equal(req.status, "Pending Consent");
  assert.equal(canExecuteApproval(req).allowed, false);

  const rejected = applyPartyConsentDecision(
    req,
    "renter",
    "Rejected",
    "Rent increase not agreed",
  );
  assert.equal(rejected.status, "Rejected");
  assert.equal(canExecuteApproval(rejected).allowed, false);

  const approved = applyPartyConsentDecision(req, "renter", "Approved");
  assert.equal(approved.status, "Approved");
  assert.equal(canExecuteApproval(approved).allowed, true);
});

test("expired approval request is blocked from execution", () => {
  const req = {
    ...mockApprovalPendingLandlord,
    expiresAt: new Date(Date.now() - 10_000).toISOString(),
  };
  assert.equal(computeApprovalStatus(req), "Expired");
  assert.equal(canExecuteApproval(req).allowed, false);
});

test("computeAdminOverviewSummary derives verifiable counts from records", () => {
  const summary = computeAdminOverviewSummary({
    users: mockUsers,
    properties: mockProperties,
    leases: mockLeases,
    payments: mockPayments,
    cases: mockCases,
    approvals: [mockApprovalPendingRenter, mockApprovalPendingLandlord],
    renterHistory: mockRenterHistory,
  });

  assert.equal(summary.totalUsers, mockUsers.length);           // 5
  assert.equal(summary.totalProperties, mockProperties.length); // 4
  assert.equal(summary.pendingApprovalsCount, 2);               // both "Pending Consent"
  assert.equal(summary.successfulVolumeRwf, 325_000);           // 180k + 145k
});
