import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  DEFAULT_LOCALE,
  isAppLocale,
  LOCALES,
  normalizeLocale,
  resolveLocaleFromAcceptLanguage,
} from "../i18n/config.ts";
import {
  localizeDisplayDate,
  localizeMonthShort,
  localizePaymentMethod,
  localizeRelativeTime,
} from "../i18n/display-format.ts";
import {
  formatDateLocalized,
  formatNumberLocalized,
  formatRwfLocalized,
} from "../i18n/formatting.ts";
import { getStatusTranslationKey } from "../i18n/status-map.ts";
import { resolveDashboardTitleKey } from "../utils/dashboard-titles.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = path.resolve(__dirname, "..", "messages");
const NAMESPACES = [
  "common",
  "public",
  "properties",
  "auth",
  "landlord",
  "renter",
  "admin",
];

function flattenMessages(obj, prefix = "") {
  const entries = new Map();
  for (const [key, value] of Object.entries(obj)) {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      for (const [childKey, childVal] of flattenMessages(value, nextKey)) {
        entries.set(childKey, childVal);
      }
    } else {
      entries.set(nextKey, value);
    }
  }
  return entries;
}

function extractPlaceholders(template) {
  if (typeof template !== "string") return [];
  const matches = template.matchAll(/\{([a-zA-Z0-9_]+)(?:,|\})/g);
  return [...new Set([...matches].map((m) => m[1]))].sort();
}

test("i18n config validates locales and resolves Accept-Language headers accurately", () => {
  assert.deepEqual([...LOCALES], ["en", "rw"]);
  assert.equal(DEFAULT_LOCALE, "en");
  assert.equal(isAppLocale("en"), true);
  assert.equal(isAppLocale("rw"), true);
  assert.equal(isAppLocale("fr"), false);
  assert.equal(normalizeLocale("rw-RW"), "rw");
  assert.equal(normalizeLocale("kin"), "rw");
  assert.equal(normalizeLocale("en-GB"), "en");
  assert.equal(normalizeLocale("fr-FR"), "en");
  assert.equal(resolveLocaleFromAcceptLanguage("rw-RW,rw;q=0.9,en;q=0.8"), "rw");
  assert.equal(resolveLocaleFromAcceptLanguage("en-US,en;q=0.9,rw;q=0.7"), "en");
  assert.equal(resolveLocaleFromAcceptLanguage("fr-FR,kin;q=0.8"), "rw");
  assert.equal(resolveLocaleFromAcceptLanguage(null), "en");
});

test("locale-aware formatting helpers preserve numeric values and format RWF and dates", () => {
  assert.equal(formatNumberLocalized(125000, "en"), "125,000");
  assert.equal(formatRwfLocalized(250000, "en"), "250,000 RWF");
  assert.equal(formatRwfLocalized(250000, "rw"), "250,000 RWF");
  assert.equal(formatRwfLocalized(Number.NaN, "rw"), "0 RWF");
  assert.equal(formatDateLocalized("2026-03-15T00:00:00Z", "rw"), "15 Wer 2026");
  assert.match(formatDateLocalized("2026-03-15T00:00:00Z", "en"), /15\s+Mar\s+2026/);
  assert.equal(localizeMonthShort("Sep", "rw"), "Nze");
  assert.equal(localizeDisplayDate("September 2026", "rw"), "Nzeri 2026");
  assert.equal(localizeDisplayDate("10 Sep 2026", "rw"), "10 Nze 2026");
  assert.equal(localizeRelativeTime("2 hours ago", "rw"), "Hashize amasaha 2");
  assert.equal(localizeRelativeTime("Today, 09:15", "rw"), "Uyu munsi, 09:15");
  assert.equal(localizePaymentMethod("Bank Transfer", "rw"), "Banki");
  assert.equal(localizePaymentMethod("MTN Mobile Money", "rw"), "MTN Mobile Money");
});

test("status map resolves standard rental domain statuses and returns null for unknown labels", () => {
  assert.equal(getStatusTranslationKey("Paid"), "paid");
  assert.equal(getStatusTranslationKey("In Progress"), "inProgress");
  assert.equal(getStatusTranslationKey("Listing-Only"), "listingOnly");
  assert.equal(getStatusTranslationKey("Full Management"), "fullManagement");
  assert.equal(getStatusTranslationKey("Disputed"), "disputed");
  assert.equal(getStatusTranslationKey("Custom Unknown Label"), null);
});

test("resolveDashboardTitleKey maps exact and dynamic dashboard routes cleanly", () => {
  assert.equal(resolveDashboardTitleKey("/landlord/properties"), "landlordProperties");
  assert.equal(resolveDashboardTitleKey("/landlord/properties/prop-1/edit"), "landlordEditProperty");
  assert.equal(resolveDashboardTitleKey("/landlord/tenancies/r-101"), "landlordTenancyDetails");
  assert.equal(resolveDashboardTitleKey("/renter/payments/pay-rent"), "renterPayRent");
  assert.equal(resolveDashboardTitleKey("/admin/payments/TX-1"), "adminPaymentDetails");
  assert.equal(resolveDashboardTitleKey("/properties"), null);
});

test("every EN and RW message namespace has 100% key parity, non-empty strings, and matching placeholders", () => {
  for (const ns of NAMESPACES) {
    const enPath = path.join(MESSAGES_DIR, "en", `${ns}.json`);
    const rwPath = path.join(MESSAGES_DIR, "rw", `${ns}.json`);
    assert.equal(fs.existsSync(enPath), true, `Missing EN namespace file: ${enPath}`);
    assert.equal(fs.existsSync(rwPath), true, `Missing RW namespace file: ${rwPath}`);

    const enJson = JSON.parse(fs.readFileSync(enPath, "utf8"));
    const rwJson = JSON.parse(fs.readFileSync(rwPath, "utf8"));

    const enFlat = flattenMessages(enJson);
    const rwFlat = flattenMessages(rwJson);

    const missingInRw = [...enFlat.keys()].filter((k) => !rwFlat.has(k));
    const missingInEn = [...rwFlat.keys()].filter((k) => !enFlat.has(k));

    assert.deepEqual(
      missingInRw,
      [],
      `Keys present in en/${ns}.json but missing in rw/${ns}.json: ${missingInRw.join(", ")}`,
    );
    assert.deepEqual(
      missingInEn,
      [],
      `Keys present in rw/${ns}.json but missing in en/${ns}.json: ${missingInEn.join(", ")}`,
    );

    for (const [key, enVal] of enFlat.entries()) {
      const rwVal = rwFlat.get(key);
      assert.equal(
        typeof enVal,
        "string",
        `Expected string at en/${ns}.json -> ${key}`,
      );
      assert.equal(
        typeof rwVal,
        "string",
        `Expected string at rw/${ns}.json -> ${key}`,
      );
      assert.ok(
        enVal.trim().length > 0,
        `Empty string at en/${ns}.json -> ${key}`,
      );
      assert.ok(
        rwVal.trim().length > 0,
        `Empty string at rw/${ns}.json -> ${key}`,
      );
      assert.deepEqual(
        extractPlaceholders(rwVal),
        extractPlaceholders(enVal),
        `Mismatched ICU placeholders at ${ns}.${key}: en=${JSON.stringify(enVal)} rw=${JSON.stringify(rwVal)}`,
      );
    }
  }
});
