/**
 * Role access matrix - which UserRole(s) can see a given feature.
 *
 * This is the single source of truth for per-feature visibility across
 * /pages/dashboard/**. It's deliberately separate from
 * design-system.config.ts (that one's about which component/variant a doc
 * page shows; this one's about which *product feature* a given user role
 * sees) and deliberately just data - add/remove a role from a feature's
 * array, no JSX changes needed at the call site.
 *
 * Build convention: build every feature as if for "biodata-admin" (full
 * access - see the bypass in hasFeatureAccess below), then add the feature
 * key here and list which other roles should also see it. A feature with no
 * entry here is visible to everyone - only add an entry once a feature is
 * actually meant to be gated.
 *
 * Current build focus is just registered-user/public-user (see lib/user-role.ts) - features
 * gated to the privileged-user/privileged-admin/biodata-user/biodata-admin roles, like
 * orgSwitcher below, are correct and stay defined, they just won't show for either in-focus role
 * right now.
 */

import type { UserRole } from "@/lib/user-role";

/** One entry per gated product feature. Add a key as a feature is actually gated - don't pre-populate speculatively. */
export type FeatureKey = "orgSwitcher";

/** Feature -> the roles (besides biodata-admin, which always passes) allowed to see it. */
export const roleAccessMatrix: Record<FeatureKey, UserRole[]> = {
  // Breadcrumb's [ORG ▾] pill - any role affiliated with an organisation has one to switch.
  // biodata-admin/biodata-user are themselves DEW staff (DEW is an org), so they're included
  // alongside the partner-org roles (privileged-admin/privileged-user) - only registered-user and
  // public-user have no organisation at all.
  orgSwitcher: ["privileged-user", "privileged-admin", "biodata-user"],
};

/**
 * Whether `role` can see `feature`. `biodata-admin` always returns true (the top of the access
 * matrix, per the "build for admin, hide for everyone else" convention) - every other role is
 * checked against `roleAccessMatrix`.
 */
export function hasFeatureAccess(feature: FeatureKey, role: UserRole): boolean {
  if (role === "biodata-admin") return true;
  return roleAccessMatrix[feature].includes(role);
}
