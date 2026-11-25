import assert from "node:assert/strict";
import test from "node:test";
import {
  buildDocumentDownloadContent,
  getGreetingByHour,
  getInitials,
  parseListingPrice,
  summarizeRenterPayments,
} from "../utils/renter-helpers.ts";
import { getRenterNavItems, isNavItemActive } from "../data/dashboard-data.ts";

test("summarizeRenterPayments totals paid, outstanding, and prioritizes overdue over pending", () => {
  const summary = summarizeRenterPayments([
    { id: "p1", amountRwf: 150000, dueDate: "10 Sep 2026", status: "Pending", period: "September 2026" },
    { id: "p2", amountRwf: 150000, dueDate: "10 Aug 2026", status: "Overdue", period: "August 2026" },
    { id: "p3", amountRwf: 150000, dueDate: "10 Jul 2026", status: "Paid", period: "July 2026" },
    { id: "p4", amountRwf: 150000, dueDate: "10 Jun 2026", status: "Paid", period: "June 2026" },
  ]);

  assert.equal(summary.totalPaidRwf, 300000);
  assert.equal(summary.outstandingRwf, 300000);
  assert.equal(summary.paidCount, 2);
  assert.equal(summary.pendingPayment?.id, "p2");

  const emptySummary = summarizeRenterPayments([]);
  assert.equal(emptySummary.totalPaidRwf, 0);
  assert.equal(emptySummary.outstandingRwf, 0);
  assert.equal(emptySummary.paidCount, 0);
  assert.equal(emptySummary.pendingPayment, undefined);
});

test("parseListingPrice extracts numeric amounts cleanly", () => {
  assert.equal(parseListingPrice("150,000 RWF/month"), 150000);
  assert.equal(parseListingPrice("RWF 85,500"), 85500);
  assert.equal(parseListingPrice("Negotiable"), 0);
  assert.equal(parseListingPrice(""), 0);
});

test("buildDocumentDownloadContent includes renter, property, and honest preview disclaimer", () => {
  const content = buildDocumentDownloadContent(
    {
      id: "doc-1",
      title: "Rent Receipt — August 2026",
      category: "Payment Receipt",
      date: "08 Aug 2026",
      size: "340 KB",
      summary: "Confirmed payment of 150,000 RWF via MTN Mobile Money.",
    },
    {
      id: "prop-101",
      name: "Kimironko Heights — Apartment A-03",
      unitNumber: "A-03",
      address: "KG 182 St, Kimironko, Kigali",
      bedrooms: 2,
      bathrooms: 1,
      parking: true,
      wifi: true,
      landlordName: "Emmanuel Ntaganda",
      landlordPhone: "+250 788 123 456",
      email: "emmanuel@urugo.rw",
      moveInDate: "15 Jan 2024",
      leaseStatus: "Active",
      monthlyRentRwf: 150000,
    },
    "Jean Claude",
  );

  assert.match(content, /URUGO RESIDENTIAL RECORD \(FRONTEND PREVIEW\)/);
  assert.match(content, /Renter: Jean Claude/);
  assert.match(content, /Kimironko Heights — Apartment A-03/);
  assert.match(content, /Confirmed payment of 150,000 RWF/);
  assert.match(content, /requires backend document service/);
});

test("getGreetingByHour and getInitials handle edge cases cleanly", () => {
  assert.equal(getGreetingByHour(7), "Good morning");
  assert.equal(getGreetingByHour(14), "Good afternoon");
  assert.equal(getGreetingByHour(20), "Good evening");

  assert.equal(getInitials("Jean Claude"), "JC");
  assert.equal(getInitials("  emmanuel   ntaganda  mugisha "), "EN");
  assert.equal(getInitials("   "), "UR");
});

test("getRenterNavItems omits Electricity and Saved Properties and sets live badges cleanly", () => {
  const nav = getRenterNavItems({
    activeInquiries: 2,
    pendingPayments: 1,
    activeMaintenance: 0,
    actionableIssues: 1,
    unreadNotifications: 2,
  });

  assert.equal(
    nav.some((item) => item.href === "/renter/electricity"),
    false,
  );
  assert.equal(
    nav.some((item) => item.href === "/renter/saved-properties"),
    false,
  );
  assert.equal(
    nav.find((item) => item.href === "/renter/inquiries")?.badge,
    2,
  );
  assert.equal(
    nav.find((item) => item.href === "/renter/maintenance")?.badge,
    undefined,
  );
  assert.equal(
    nav.find((item) => item.href === "/renter/rental-history")?.badge,
    1,
  );
  assert.equal(
    nav.find((item) => item.href === "/renter/notifications")?.badge,
    2,
  );

  assert.equal(
    isNavItemActive("/renter/payments/pay-rent", "/renter/payments", "/renter"),
    true,
  );
  assert.equal(
    isNavItemActive("/renter/payments", "/renter", "/renter"),
    false,
  );
  assert.equal(isNavItemActive("/renter", "/renter", "/renter"), true);
});
