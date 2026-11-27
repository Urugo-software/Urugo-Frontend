import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  isValidRenterActivationPassword,
  isValidRenterInvitationCapability,
  isValidRenterInvitationCode,
  isValidRenterInvitationReference,
  RegistrationInvitationRejectedError,
} from "../utils/renter-invitation.ts";
import { RegistrationCooldownError } from "../utils/renter-invitation.ts";

const apiSource = await readFile(new URL("../api/registration.api.ts", import.meta.url), "utf8");
const activationSource = await readFile(new URL("../components/platform/auth/invitation/RenterInvitationActivation.tsx", import.meta.url), "utf8");
const landlordSource = await readFile(new URL("../components/dashboard/landlord/renters/RenterRegistrationWizard.tsx", import.meta.url), "utf8");
const registrationServiceSource = await readFile(new URL("../services/registration.service.ts", import.meta.url), "utf8");
const loginHookSource = await readFile(new URL("../hooks/mutate/useLogin.ts", import.meta.url), "utf8");
const authApiSource = await readFile(new URL("../api/auth.api.ts", import.meta.url), "utf8");

test("renter invitation references and capability match backend formats", () => {
  assert.equal(isValidRenterInvitationReference("ref_123456"), true);
  assert.equal(isValidRenterInvitationReference("short"), false);
  assert.equal(isValidRenterInvitationReference("bad reference"), false);
  assert.equal(isValidRenterInvitationCapability("a".repeat(43)), true);
  assert.equal(isValidRenterInvitationCapability("a".repeat(42)), false);
  assert.equal(isValidRenterInvitationCapability("a".repeat(42) + "+"), false);
});

test("OTP and password validation match the backend activation rules", () => {
  assert.equal(isValidRenterInvitationCode("123456"), true);
  assert.equal(isValidRenterInvitationCode("12345a"), false);
  assert.equal(isValidRenterInvitationCode("12345"), false);
  assert.equal(isValidRenterActivationPassword("UrugoPass1!"), true);
  assert.equal(isValidRenterActivationPassword("urugopass1!"), false);
  assert.equal(isValidRenterActivationPassword("UrugoPass1"), false);
});

test("registration API calls use the backend routes and secret headers", () => {
  assert.match(apiSource, /\/api\/landlord\/renters/);
  assert.match(apiSource, /\/api\/admin\/renters/);
  assert.match(apiSource, /Idempotency-Key/);
  assert.match(apiSource, /participants\/RENTER\/verify/);
  assert.match(apiSource, /participants\/RENTER\/resend/);
  assert.match(apiSource, /\/renter-password/);
  assert.equal((apiSource.match(/x-capability-token/g) ?? []).length, 3);
});

test("resend cooldown honors Retry-After and successful resend replaces the old capability", () => {
  const cooldown = new RegistrationCooldownError(45);
  assert.equal(cooldown.retryAfterSeconds, 45);
  assert.match(registrationServiceSource, /response\?\.headers\?\.\[\"retry-after\"\]/);
  assert.match(activationSource, /setCapability\(\"\"\)[\s\S]*setStage\(\"access\"\)/);
  assert.equal(new RegistrationInvitationRejectedError().name, "RegistrationInvitationRejectedError");
});

test("activation keeps the capability in component state and clears it on completion or failure", () => {
  assert.match(activationSource, /useState\(\"\"\);[\s\S]*const \[capability, setCapability\] = useState\(\"\"\)/);
  assert.match(activationSource, /setCapability\(\"\"\)/);
  assert.doesNotMatch(activationSource, /localStorage|sessionStorage|searchParams|console\.(log|error)/);
  assert.doesNotMatch(apiSource, /capabilityToken[^\n]*URLSearchParams|\?[^\n]*capabilityToken/);
});

test("landlord invitation retries use the same idempotency key for unchanged identity and do not display capability", () => {
  assert.match(landlordSource, /invitationKeyRef/);
  assert.match(landlordSource, /crypto\.randomUUID\(\)/);
  assert.match(landlordSource, /emailStatus: \"QUEUED\"/);
  assert.doesNotMatch(landlordSource, /capabilityToken|capability/);
});

test("plan selection uses the authenticated backend contract and existing login keeps role dashboard routing", () => {
  assert.match(authApiSource, /patch\(\"\/api\/auth\/landlord\/plan\"/);
  assert.match(loginHookSource, /getPostLoginRoute\(user\.role\)/);
});
