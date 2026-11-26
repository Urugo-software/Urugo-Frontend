import type {
  AdminActionCategory,
  AdminPermission,
  SystemRole,
} from "@/types/admin";

export type OperationPolicyKey =
  | "view_directory"
  | "routine_case_update"
  | "update_public_content"
  | "verify_property"
  | "moderate_listing"
  | "resolve_dispute"
  | "mediate_renter_history"
  | "restrict_user"
  | "emergency_lockout"
  | "initiate_association_consent"
  | "initiate_property_consent"
  | "initiate_service_mode_consent"
  | "initiate_lease_edit_consent"
  | "request_financial_adjustment"
  | "suspend_active_user"
  | "manage_admin_account"
  | "toggle_maintenance_mode";

export interface OperationPolicy {
  category: AdminActionCategory;
  permission: AdminPermission;
  reasonRequired: boolean;
  evidenceRequired: boolean;
  requiresLandlordConsent: boolean;
  requiresRenterConsent: boolean;
  requiresExplicitConfirmation: boolean;
}

/**
 * Centralized role capability map.
 * Keeping capabilities table-driven lets future specialized admin roles
 * be added without rewriting route guards or workflow handlers.
 */
export const ROLE_CAPABILITIES: Record<
  SystemRole,
  readonly AdminPermission[]
> = {
  ADMIN: [
    "admin:access",
    "users:manage",
    "properties:verify",
    "properties:moderate",
    "tenancies:intervene",
    "leases:intervene",
    "renter_history:mediate",
    "payments:investigate",
    "payments:request_adjustment",
    "cases:resolve",
    "public_content:manage",
    "settings:manage",
    "audit:view",
    "approvals:initiate",
  ],
  LANDLORD: ["consent:respond"],
  RENTER: ["consent:respond"],
};

export const OPERATION_POLICIES: Record<OperationPolicyKey, OperationPolicy> = {
  view_directory: {
    category: "view",
    permission: "admin:access",
    reasonRequired: false,
    evidenceRequired: false,
    requiresLandlordConsent: false,
    requiresRenterConsent: false,
    requiresExplicitConfirmation: false,
  },
  routine_case_update: {
    category: "routine",
    permission: "cases:resolve",
    reasonRequired: false,
    evidenceRequired: false,
    requiresLandlordConsent: false,
    requiresRenterConsent: false,
    requiresExplicitConfirmation: false,
  },
  update_public_content: {
    category: "routine",
    permission: "public_content:manage",
    reasonRequired: true,
    evidenceRequired: false,
    requiresLandlordConsent: false,
    requiresRenterConsent: false,
    requiresExplicitConfirmation: false,
  },
  verify_property: {
    category: "sensitive",
    permission: "properties:verify",
    reasonRequired: true,
    evidenceRequired: false,
    requiresLandlordConsent: false,
    requiresRenterConsent: false,
    requiresExplicitConfirmation: true,
  },
  moderate_listing: {
    category: "sensitive",
    permission: "properties:moderate",
    reasonRequired: true,
    evidenceRequired: false,
    requiresLandlordConsent: false,
    requiresRenterConsent: false,
    requiresExplicitConfirmation: true,
  },
  resolve_dispute: {
    category: "sensitive",
    permission: "cases:resolve",
    reasonRequired: true,
    evidenceRequired: false,
    requiresLandlordConsent: false,
    requiresRenterConsent: false,
    requiresExplicitConfirmation: true,
  },
  mediate_renter_history: {
    category: "sensitive",
    permission: "renter_history:mediate",
    reasonRequired: true,
    evidenceRequired: true,
    requiresLandlordConsent: false,
    requiresRenterConsent: false,
    requiresExplicitConfirmation: true,
  },
  restrict_user: {
    category: "sensitive",
    permission: "users:manage",
    reasonRequired: true,
    evidenceRequired: false,
    requiresLandlordConsent: false,
    requiresRenterConsent: false,
    requiresExplicitConfirmation: true,
  },
  emergency_lockout: {
    category: "sensitive",
    permission: "users:manage",
    reasonRequired: true,
    evidenceRequired: true,
    requiresLandlordConsent: false,
    requiresRenterConsent: false,
    requiresExplicitConfirmation: true,
  },
  initiate_association_consent: {
    category: "consent_required",
    permission: "approvals:initiate",
    reasonRequired: true,
    evidenceRequired: false,
    requiresLandlordConsent: true,
    requiresRenterConsent: true,
    requiresExplicitConfirmation: true,
  },
  initiate_property_consent: {
    category: "consent_required",
    permission: "approvals:initiate",
    reasonRequired: true,
    evidenceRequired: true,
    requiresLandlordConsent: true,
    requiresRenterConsent: false,
    requiresExplicitConfirmation: true,
  },
  initiate_service_mode_consent: {
    category: "consent_required",
    permission: "approvals:initiate",
    reasonRequired: true,
    evidenceRequired: false,
    requiresLandlordConsent: true,
    requiresRenterConsent: false,
    requiresExplicitConfirmation: true,
  },
  initiate_lease_edit_consent: {
    category: "consent_required",
    permission: "leases:intervene",
    reasonRequired: true,
    evidenceRequired: true,
    requiresLandlordConsent: true,
    requiresRenterConsent: true,
    requiresExplicitConfirmation: true,
  },
  request_financial_adjustment: {
    category: "restricted",
    permission: "payments:request_adjustment",
    reasonRequired: true,
    evidenceRequired: true,
    requiresLandlordConsent: false,
    requiresRenterConsent: false,
    requiresExplicitConfirmation: true,
  },
  suspend_active_user: {
    category: "restricted",
    permission: "users:manage",
    reasonRequired: true,
    evidenceRequired: true,
    requiresLandlordConsent: false,
    requiresRenterConsent: false,
    requiresExplicitConfirmation: true,
  },
  manage_admin_account: {
    category: "restricted",
    permission: "users:manage",
    reasonRequired: true,
    evidenceRequired: false,
    requiresLandlordConsent: false,
    requiresRenterConsent: false,
    requiresExplicitConfirmation: true,
  },
  toggle_maintenance_mode: {
    category: "restricted",
    permission: "settings:manage",
    reasonRequired: true,
    evidenceRequired: false,
    requiresLandlordConsent: false,
    requiresRenterConsent: false,
    requiresExplicitConfirmation: true,
  },
};

export function hasRolePermission(
  role: SystemRole,
  permission: AdminPermission,
): boolean {
  return ROLE_CAPABILITIES[role]?.includes(permission) ?? false;
}

export function assertAdminPermission(
  role: SystemRole,
  permission: AdminPermission,
): void {
  if (!hasRolePermission(role, permission)) {
    throw new Error(
      `Role "${role}" is not authorized for "${permission}".`,
    );
  }
}

export function validatePolicyInput(
  policyKey: OperationPolicyKey,
  input: { reason?: string; evidenceRef?: string },
): { valid: boolean; error?: string } {
  const policy = OPERATION_POLICIES[policyKey];
  if (policy.reasonRequired && (!input.reason || input.reason.trim().length < 5)) {
    return {
      valid: false,
      error: "A clear administrative reason (at least 5 characters) is required.",
    };
  }
  if (
    policy.evidenceRequired &&
    (!input.evidenceRef || input.evidenceRef.trim().length < 3)
  ) {
    return {
      valid: false,
      error: "Supporting evidence or reference is required for this operation.",
    };
  }
  return { valid: true };
}

export function normalizeSystemRole(raw?: string | null): SystemRole {
  const upper = raw?.trim().toUpperCase();
  if (upper === "ADMIN") return "ADMIN";
  if (upper === "RENTER") return "RENTER";
  return "LANDLORD";
}
