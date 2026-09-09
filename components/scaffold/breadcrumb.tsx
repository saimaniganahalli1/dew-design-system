"use client";

/**
 * Live breadcrumb for the Registered User sidebar shell (option-1 pages) - reflects the real IA
 * (`lib/registered-user-nav.ts`) instead of the generic "Home / Project ▾ / ... / [Location]"
 * mockup text it replaced.
 *
 * Fixed shape, per direct feedback after the first (trail-of-NavNode) version got the depth
 * wrong - it descended to the specific leaf ("Manage Project and Datasets") instead of stopping
 * at the section:
 *   - Home page:          Home
 *   - A section's page:   Home / <section label>                      (e.g. "Home / Projects")
 *   - A page below that:  Home / <section, or a switcher for it> / <current>
 *                          (e.g. "Home / Projects⌄ / Adelaide Hills Bushland Survey")
 * `section` is the label only (never the leaf) - pass a switcher component instead of a string
 * when the section itself needs to be interactive (project-detail's ProjectSwitcher).
 */

import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronSelectorVertical } from "@untitledui/icons";

const HOME_HREF = "/pages/dashboard/option-1";

export function Breadcrumb({
  section,
  current,
  showOrgSwitcher,
}: {
  /** The current top-level nav section - a plain label (e.g. "Projects"), or a custom
   * interactive element in its place (e.g. a project switcher). Omit for the Home page itself. */
  section?: ReactNode;
  /** A final, page-specific crumb after `section` - e.g. a project's name. Always plain, always current. */
  current?: string;
  showOrgSwitcher?: boolean;
}) {
  const isHomeCurrent = !section && !current;

  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-tertiary" aria-label="Breadcrumb">
      {isHomeCurrent ? (
        <span className="text-primary">Home</span>
      ) : (
        <Link href={HOME_HREF} className="hover:text-primary">
          Home
        </Link>
      )}
      {showOrgSwitcher && (
        <span className="flex items-center gap-1 rounded-full border border-secondary px-1.5 py-0.5 text-[10px] font-medium">
          ORG <ChevronSelectorVertical className="size-3" />
        </span>
      )}
      {section && (
        <>
          <span>/</span>
          {typeof section === "string" ? <span className={current ? undefined : "text-primary"}>{section}</span> : section}
        </>
      )}
      {current && (
        <>
          <span>/</span>
          <span className="text-primary">{current}</span>
        </>
      )}
    </nav>
  );
}
