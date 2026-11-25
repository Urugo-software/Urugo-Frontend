import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateUnpaidRentFromPayments,
  doesRejectionCreateUnpaidBalance,
  getIssueStatusMeta,
  isIssueActionable,
} from "../utils/rental-debt.ts";
import {
  computeListingOnlyStats,
  computeManagedStats,
} from "../utils/landlord-metrics.ts";
import { formatPropertyRent, formatRwf } from "../utils/format.ts";
import { summarizeGroup } from "../utils/property-groups.ts";
import { resolveDashboardTitle } from "../utils/dashboard-titles.ts";

test("payment rejection debt rules only create unpaid balance for non-payment categories", () => {
  assert.equal(doesRejectionCreateUnpaidBalance("money_not_received"), true);
  assert.equal(doesRejectionCreateUnpaidBalance("wrong_amount"), true);
  assert.equal(doesRejectionCreateUnpaidBalance("duplicate_payment"), false);
  assert.equal(doesRejectionCreateUnpaidBalance("invalid_receipt"), false);
  assert.equal(doesRejectionCreateUnpaidBalance("other"), false);

  const payments = [
    { id: "p1", amountRwf: 300000, status: "Approved", period: "Aug 2026" },
    {
      id: "p2",
      amountRwf: 300000,
      status: "Rejected",
      rejectionCategory: "money_not_received",
      period: "Sep 2026",
    },
    {
      id: "p3",
      amountRwf: 300000,
      status: "Rejected",
      rejectionCategory: "duplicate_payment",
      period: "Sep 2026",
    },
    {
      id: "p4",
      amountRwf: 150000,
      status: "Rejected",
      rejectionCategory: "wrong_amount",
      period: "Sep 2026",
    },
    {
      id: "p5",
      amountRwf: 250000,
      status: "Rejected",
      rejectionCategory: "invalid_receipt",
      period: "Sep 2026",
    },
  ];

  assert.equal(calculateUnpaidRentFromPayments(payments), 450000);
});

test("rental issue status metadata never treats Unresolved, Disputed, Reported, or Rejected as confirmed debt", () => {
  for (const status of ["Reported", "Unresolved", "Disputed", "Resolved", "Rejected"]) {
    const meta = getIssueStatusMeta(status);
    assert.equal(
      meta.isConfirmedObligation,
      false,
      `${status} must not be treated as confirmed obligation`,
    );
  }

  assert.equal(getIssueStatusMeta("Confirmed").isConfirmedObligation, true);
  assert.equal(isIssueActionable("Unresolved"), true);
  assert.equal(isIssueActionable("Disputed"), true);
  assert.equal(isIssueActionable("Confirmed"), false);
  assert.equal(isIssueActionable("Resolved"), false);
  assert.equal(isIssueActionable("Rejected"), false);
});

test("computeManagedStats separates current-month collected, YTD collected, pending verification, and overdue", () => {
  const stats = computeManagedStats({
    properties: [
      { id: "p1", name: "Apt A", hasUnits: true, totalUnits: 2, occupiedUnits: 1, status: "Occupied" },
      { id: "p2", name: "House B", hasUnits: false, status: "Vacant" },
    ],
    units: [
      { id: "u1", propertyId: "p1", unitNumber: "1A", status: "Occupied", renterId: "r1" },
      { id: "u2", propertyId: "p1", unitNumber: "1B", status: "Vacant" },
    ],
    renters: [
      { id: "r1", tenancyStatus: "Active", paymentStatus: "Paid", monthlyRentRwf: 400000 },
      { id: "r2", tenancyStatus: "Ending", paymentStatus: "Overdue", monthlyRentRwf: 300000 },
      { id: "r3", tenancyStatus: "Closed", paymentStatus: "Paid", monthlyRentRwf: 500000 },
    ],
    payments: [
      { id: "pay-1", period: "September 2026", amountRwf: 400000, status: "Approved" },
      { id: "pay-2", period: "September 2026", amountRwf: 300000, status: "Pending" },
    ],
    monthlyHistory: [
      { month: "Jul", expectedRwf: 700000, collectedRwf: 650000 },
      { month: "Aug", expectedRwf: 700000, collectedRwf: 700000 },
      { month: "Sep", expectedRwf: 700000, collectedRwf: 400000 },
    ],
    issues: [
      { id: "i1", status: "Unresolved" },
      { id: "i2", status: "Resolved" },
    ],
    inquiries: [{ id: "q1", status: "New" }, { id: "q2", status: "Replied" }],
    viewings: [{ id: "v1", status: "Pending" }, { id: "v2", status: "Confirmed" }],
  });

  assert.equal(stats.totalSpaces, 3);
  assert.equal(stats.occupiedSpaces, 1);
  assert.equal(stats.vacantSpaces, 2);
  assert.equal(stats.occupancyRate, 33);
  assert.equal(stats.currentMonthExpectedRwf, 700000);
  assert.equal(stats.currentMonthCollectedRwf, 400000);
  assert.equal(stats.ytdRentCollectedRwf, 1750000);
  assert.equal(stats.pendingVerificationRwf, 300000);
  assert.equal(stats.confirmedOverdueRwf, 300000);
  assert.equal(stats.openIssuesCount, 1);
  assert.equal(stats.pendingInquiriesCount, 1);
  assert.equal(stats.pendingViewingsCount, 1);
});

test("computeListingOnlyStats summarizes listing lifecycle, views, inquiries, and viewings", () => {
  const stats = computeListingOnlyStats({
    properties: [
      { id: "p1", listingStatus: "Published", viewsCount: 120, status: "Vacant" },
      { id: "p2", listingStatus: "Paused", viewsCount: 45, status: "Vacant" },
      { id: "p3", listingStatus: "Rented", viewsCount: 200, status: "Occupied" },
      { id: "p4", listingStatus: "Draft", viewsCount: 0, status: "Vacant" },
    ],
    inquiries: [{ id: "q1", status: "New" }, { id: "q2", status: "Replied" }],
    viewings: [
      { id: "v1", status: "Pending" },
      { id: "v2", status: "Confirmed" },
    ],
  });

  assert.equal(stats.totalListings, 4);
  assert.equal(stats.publishedListings, 1);
  assert.equal(stats.pausedListings, 1);
  assert.equal(stats.rentedListings, 1);
  assert.equal(stats.draftListings, 1);
  assert.equal(stats.totalViews, 365);
  assert.equal(stats.pendingInquiries, 1);
  assert.equal(stats.pendingViewings, 1);
  assert.equal(stats.confirmedViewings, 1);
});

test("summarizeGroup aggregates mixed standalone and multi-unit properties cleanly", () => {
  const summary = summarizeGroup([
    {
      id: "p1",
      hasUnits: true,
      totalUnits: 4,
      occupiedUnits: 3,
      expectedMonthlyRentRwf: 1200000,
      collectedRentThisMonthRwf: 900000,
      status: "Occupied",
    },
    {
      id: "p2",
      hasUnits: false,
      monthlyRevenueRwf: 500000,
      collectedRentThisMonthRwf: 500000,
      status: "Occupied",
    },
  ]);

  assert.deepEqual(summary, {
    totalUnits: 5,
    occupiedUnits: 4,
    expected: 1700000,
    collected: 1400000,
  });
});

test("format helpers and new landlord dashboard titles resolve deterministically", () => {
  assert.equal(formatRwf(450000), "450,000 RWF");
  assert.equal(formatPropertyRent({ expectedMonthlyRentRwf: 300000, monthlyRevenueRwf: 100000 }), 300000);
  assert.equal(formatPropertyRent({ monthlyRevenueRwf: 250000 }), 250000);
  assert.equal(resolveDashboardTitle("/landlord/inquiries"), "Inquiries");
  assert.equal(resolveDashboardTitle("/landlord/viewings"), "Viewing Requests");
  assert.equal(resolveDashboardTitle("/landlord/payments"), "Payments");
  assert.equal(resolveDashboardTitle("/landlord/properties/prop-101"), "Property Details");
});
