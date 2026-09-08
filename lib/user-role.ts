/**
 * The BioData SA portal's user roles - see CONTEXT.md's "User roles" section for what each one
 * means and what it can see/do. Kept as a flat list of slugs (not an enum) so it can be read
 * straight out of a URL search param - see `useUserRole` in `lib/use-user-role.ts`.
 *
 * Ordered highest to lowest privilege - this is the real hierarchy, not just a list:
 * biodata-admin (DEW, super user) > biodata-user (DEW) > privileged-admin (partner org admin) >
 * privileged-user (partner org member) > registered-user (no org) > public-user (not signed in).
 * biodata-admin/biodata-user are themselves an organisation - DEW - which is why org-affiliated
 * chrome (e.g. the breadcrumb's org switcher) applies to them too, not just privileged-*.
 *
 * The full list stays here - the type isn't scoped down. Active build focus is narrower: only
 * `registered-user` and `public-user` are being built for right now (see CONTEXT.md's "User
 * roles" section) - don't build features for the other four ahead of being told to, but don't
 * remove them from this list either.
 */
export const USER_ROLES = [
  "biodata-admin",
  "biodata-user",
  "privileged-admin",
  "privileged-user",
  "registered-user",
  "public-user",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const DEFAULT_USER_ROLE: UserRole = "registered-user";

export function isUserRole(value: string | null | undefined): value is UserRole {
  return !!value && (USER_ROLES as readonly string[]).includes(value);
}
