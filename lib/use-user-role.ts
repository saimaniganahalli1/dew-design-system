"use client";

import { useSearchParams } from "next/navigation";
import { DEFAULT_USER_ROLE, isUserRole, type UserRole } from "@/lib/user-role";

/**
 * Reads the active role from the `userRole` URL search param, e.g.
 * `/projects/dashboard/option-1?userRole=public-user`. Falls back to `DEFAULT_USER_ROLE`
 * when the param is missing or isn't a recognised role.
 *
 * Callers must render inside a `<Suspense>` boundary - `useSearchParams` opts a page out of
 * static rendering otherwise (Next.js build error). See `app/projects/dashboard/option-1/page.tsx`
 * for the wrapping pattern.
 */
export function useUserRole(): UserRole {
  const searchParams = useSearchParams();
  const raw = searchParams.get("userRole");
  return isUserRole(raw) ? raw : DEFAULT_USER_ROLE;
}
