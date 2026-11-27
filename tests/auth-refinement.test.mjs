import test from "node:test";
import assert from "node:assert/strict";
import {
  formatPhotoFileSize,
  getPostLoginRoute,
  isValidEmail,
  isValidNationalId,
  isValidPassword,
  isValidTelephone,
} from "../utils/auth-helpers.ts";

test("getPostLoginRoute maps backend account roles to their dashboards", () => {
  assert.equal(getPostLoginRoute("ADMIN"), "/admin");
  assert.equal(getPostLoginRoute("super_admin"), "/admin");
  assert.equal(getPostLoginRoute("RENTER"), "/renter");
  assert.equal(getPostLoginRoute("LANDLORD"), "/landlord");
  assert.equal(getPostLoginRoute("HOME_SEEKER"), "/home-seeker");
  assert.equal(getPostLoginRoute(undefined), "/landlord");
  assert.equal(getPostLoginRoute(""), "/landlord");
});

test("isValidEmail validates standard email addresses cleanly", () => {
  assert.equal(isValidEmail("landlord@urugo.rw"), true);
  assert.equal(isValidEmail("  user.name+tag@example.co.rw  "), true);
  assert.equal(isValidEmail("not-an-email"), false);
  assert.equal(isValidEmail("missing@domain"), false);
  assert.equal(isValidEmail(""), false);
});

test("isValidTelephone accepts Rwandan and international phone numbers", () => {
  assert.equal(isValidTelephone("+250 788 123 456"), true);
  assert.equal(isValidTelephone("0788123456"), true);
  assert.equal(isValidTelephone("12345"), false);
  assert.equal(isValidTelephone("abc-def-ghij"), false);
  assert.equal(isValidTelephone("abc123456789"), false);
});

test("isValidPassword matches backend password requirements", () => {
  assert.equal(isValidPassword("UrugoPass1!"), true);
  assert.equal(isValidPassword("urugopass1!"), false);
  assert.equal(isValidPassword("UrugoPass!"), false);
  assert.equal(isValidPassword("UrugoPass1"), false);
  assert.equal(isValidPassword("Urugo space1!"), false);
});

test("isValidNationalId checks non-empty compact ID length", () => {
  assert.equal(isValidNationalId("1 1990 8 0012345 0 12"), true);
  assert.equal(isValidNationalId("AB123456"), true);
  assert.equal(isValidNationalId("   "), false);
  assert.equal(isValidNationalId("12345"), false);
});

test("formatPhotoFileSize formats bytes, KB, and MB safely", () => {
  assert.equal(formatPhotoFileSize(512), "512 B");
  assert.equal(formatPhotoFileSize(245760), "240 KB");
  assert.equal(formatPhotoFileSize(2.5 * 1024 * 1024), "2.5 MB");
  assert.equal(formatPhotoFileSize(-10), "0 B");
});
