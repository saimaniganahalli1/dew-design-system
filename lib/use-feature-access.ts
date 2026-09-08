"use client";

import { hasFeatureAccess, type FeatureKey } from "@/config/role-access.config";
import { useUserRole } from "@/lib/use-user-role";

/**
 * Whether the active role (from the `userRole` URL search param - see `useUserRole`) can see
 * `feature`, per `config/role-access.config.ts`. Same Suspense-boundary requirement as
 * `useUserRole` - see that hook's doc comment.
 */
export function useFeatureAccess(feature: FeatureKey): boolean {
  const role = useUserRole();
  return hasFeatureAccess(feature, role);
}
