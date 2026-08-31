"use client";

import { useConfig } from "@/lib/config-context";
import { rawNav, filterNav, type NavSection } from "@/lib/nav";

/**
 * Live nav, filtered through the in-browser config (context + localStorage
 * overrides) rather than the static file — toggling a component off on
 * /config removes it from the sidebar and overview immediately, no reload.
 */
export function useNav(): NavSection[] {
  const { config } = useConfig();
  return filterNav(rawNav, (slug) => config[slug]?.enabled ?? true);
}
