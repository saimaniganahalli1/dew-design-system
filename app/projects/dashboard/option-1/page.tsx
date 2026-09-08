"use client";

import type { FC } from "react";
import { Suspense, useState } from "react";
import Link from "next/link";
import { Button as AriaButton, Dialog, DialogTrigger, Tabs, TabList, Tab } from "react-aria-components";
import { Upload01, Plus, ChevronDown, ArrowNarrowRight, HomeLine, Folder, Eye, FileLock01, Flag01, BarChart01, FileSearch01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Avatar } from "@/components/base/avatar/avatar";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { Popover } from "@/components/base/select/popover";
import { Breadcrumb } from "@/components/scaffold/breadcrumb";
import { HomeTabPanels } from "@/app/projects/_shared/home-tab-panels";
import { ProjectListContent } from "@/app/projects/_shared/project-list-content";
import { GlobalProjectSearch } from "@/app/projects/_shared/global-search";
import { useFeatureAccess } from "@/lib/use-feature-access";
import { registeredUserNav, registeredUserAccountMenu, registeredUserFooterLinks, type NavNode } from "@/lib/registered-user-nav";
import { cx } from "@/utils/cx";

// One icon per top-level section, for the primary icon rail below - presentation-only, so it
// lives here rather than in lib/registered-user-nav.ts (which stays shell-agnostic; option-2's
// top-nav has no use for icons).
const sectionIcons: Record<string, FC<{ className?: string }>> = {
  Home: HomeLine,
  Projects: Folder,
  Observations: Eye,
  "Data Licencing Agreement (DLA)": FileLock01,
  "Nominate Sensitive Species": Flag01,
  "Reports (Own Submissions)": BarChart01,
  "Template Finder": FileSearch01,
};

// Option 1 of 2: a task-first dashboard for a registered user. Personal activity stats (KPI row)
// stay at the top, directly under the greeting - that positioning is a fixed convention, not
// something to relitigate per redesign. "Needs your attention" (a pending DLA request, a
// nomination under review, a draft project) follows below it - that's the "task first" part: it's
// the dashboard's actual primary content, the reason personal contribution stats and org-wide
// accountability numbers (total records, flora/fauna species counts, the map) that used to live
// here have been trimmed to just the KPI row. Decided directly by the user: a registered user has
// limited scope on this platform, so the dashboard's job is to surface what's actually theirs to
// act on, not to be a smaller version of an org-wide reporting surface - see CONTEXT.md's
// "Registered User dashboard scope". See app/projects/dashboard/option-2 for the same idea on the
// top-nav shell.
//
// Figma source: https://www.figma.com/design/SQ58QgwP9Xz0uo3tBpuf6e/DEW-Toolkit--version-1.0-?node-id=103-105
// "SCREEN" (BioData SA dashboard shell, 1440px) - an exploratory layout per CONTEXT.md's
// "Exploratory page layouts (/pages/<page-name>, /projects/<page-name>/<variant>)" section.
// Unlike a /test-* screen (a fixed, already-decided Figma frame), this explores what the
// dashboard could look like while the surrounding IA - primary icon rail, contextual sidebar,
// breadcrumb - is still undecided, so that chrome is built as simplified structural placeholder
// from real tokens rather than pixel-matched or ?-blocked. Every contained widget (search,
// buttons, avatar, alert) still goes through the same "real DEW or honest ? gap" rule as a
// /test-* screen - except the date range control, which graduated from a `?` gap marker to a
// real custom component (components/custom/date-range/date-range-control.tsx, documented under
// "Custom components") once its shape was clear enough to build, ahead of a stakeholder decision
// on where it belongs long-term. Figma's yellow "GENERAL NOTES" sticky note (a designer's comment
// layer, not product UI) is excluded entirely.

// ─────────────────────────────────────────────────────────────────────────
// Local screen chrome - NOT real DEW components. Nav rail/sidebar/footer links
// are exempt from fidelity per CONTEXT.md (IA isn't decided yet); KPI row,
// metric cards, filter panel, and map panel are structural shells composed
// from real tokens because nothing under components/base|application/** models
// these patterns yet.
//
// Three-column shell (Mobbin/Supabase-style): the primary icon rail is the real top-level IA
// (lib/registered-user-nav.ts) - one icon per section, click to select - the contextual sidebar
// shows only the selected section's children as a plain expand/collapse tree built from tokens,
// same exemption as the rest of this nav chrome (no Accordion component exists or is warranted
// for content this undecided), and the third column is the page's own main content. Only the two
// items with a real page (`key` set) are actual links; everything else is inert text until it has
// somewhere to go.
// ─────────────────────────────────────────────────────────────────────────

// This screen's own page key, so its own entry in the tree (Home > BioData Dashboard) can show a
// selected state - it's the page the user is already on by default, so the nav should say so
// rather than looking identical to every unvisited item. Flagged directly by the user off a
// screenshot of this exact link with no active styling.
const CURRENT_KEY = "dashboard";

function NavTree({ node, depth = 0, defaultOpen = false }: { node: NavNode; depth?: number; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const hasChildren = !!node.items?.length;
  const href = node.key ? `/projects/${node.key}/option-1` : undefined;
  const isCurrent = !!node.key && node.key === CURRENT_KEY;
  const indent = { paddingLeft: 8 + depth * 12, paddingRight: 8 };

  if (!hasChildren) {
    return href ? (
      <Link
        href={href}
        style={indent}
        aria-current={isCurrent ? "page" : undefined}
        className={cx(
          "rounded-md py-1 text-sm",
          isCurrent ? "bg-primary font-medium text-primary shadow-xs ring-1 ring-secondary" : "text-primary hover:text-brand-700",
        )}
      >
        {node.label}
      </Link>
    ) : (
      <p style={indent} className="py-1 text-sm text-primary">
        {node.label}
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={indent}
        className={cx(
          "flex w-full items-center justify-between gap-2 py-1 text-left",
          depth === 0 ? "text-xs font-semibold tracking-wide text-quaternary uppercase" : "text-sm font-medium text-primary",
        )}
      >
        {node.label}
        <ChevronDown className={cx("size-3.5 shrink-0 text-quaternary transition-transform", !open && "-rotate-90")} />
      </button>
      {open && (
        <div className="mt-1 flex flex-col gap-0.5">
          {node.items!.map((child) => (
            <NavTree key={child.label} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// What column 3 shows for every section besides this screen's own (Home, here). Two honest
// states, not one: a section either has a real page elsewhere (Home -> this very dashboard,
// Projects -> project-list) - in which case say so and link to it, don't claim it's unscoped when
// it demonstrably isn't - or it genuinely has no page yet, which does get the "not scoped" copy.
// Conflating the two read as a bug: clicking Home from another screen showed "hasn't been scoped
// yet" directly above a working "Go to Home" link, flagged directly by the user off a screenshot.
function SectionPlaceholder({ node }: { node: NavNode }) {
  // A section can itself be the link (a leaf like Home) or have one keyed child (like Projects).
  const relatedLink = node.key ? node : node.items?.find((item) => item.key);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-12 text-center">
      <p className="text-lg font-medium text-primary">{node.label}</p>
      <p className="max-w-sm text-sm text-tertiary">
        {relatedLink
          ? "This section has its own page - it isn't embedded here."
          : "This section's content hasn't been scoped yet - only its place in the navigation is decided so far."}
      </p>
      {relatedLink && (
        <Button color="link-color" size="sm" href={`/projects/${relatedLink.key}/option-1`} iconTrailing={ArrowNarrowRight}>
          Go to {relatedLink.label}
        </Button>
      )}
    </div>
  );
}

// DialogTrigger + our real Popover (react-aria) instead of a hand-rolled useState toggle - gets
// outside-click and Escape dismissal for free, same primitive DateRangeControl already uses for
// its overlay. Any hand-rolled dropdown (a switcher, an org-switcher when that gets built) should
// use this, not a plain conditional div - flagged directly by the user after the project switcher
// shipped without it.
function ProfileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <DialogTrigger onOpenChange={setOpen}>
      <AriaButton className="flex items-center gap-1 outline-hidden">
        <Avatar size="md" initials="OW" alt="Olivia Wyatt" />
        <ChevronDown className={cx("size-3.5 text-quaternary transition-transform", open && "rotate-180")} />
      </AriaButton>
      <Popover size="sm" className="w-48 p-1">
        <Dialog className="outline-hidden">
          <p className="px-3 py-2 text-xs font-semibold tracking-wide text-quaternary uppercase">Profile</p>
          {registeredUserAccountMenu.map((item) => (
            <p key={item} className="cursor-pointer rounded-md px-3 py-2 text-sm text-secondary hover:bg-secondary">
              {item}
            </p>
          ))}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}

// User roles - see CONTEXT.md's "User roles" section. Full 6-role hierarchy is defined in
// lib/user-role.ts, but build focus right now is just registered-user (default) and public-user -
// don't build features for the other four ahead of being told to. Gated features (like the org
// switcher below) read config/role-access.config.ts's role-access matrix via useFeatureAccess
// rather than checking the role inline - that matrix is the single place feature visibility is
// decided, owned separately from this screen. Switch roles via the `userRole` URL search param,
// e.g. `?userRole=public-user`. No real auth/session in this exploratory build, so the URL is the
// only source of truth for "who's looking at this".
export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <Dashboard />
    </Suspense>
  );
}

function Dashboard() {
  const showOrgSwitcher = useFeatureAccess("orgSwitcher");
  const [activeSection, setActiveSection] = useState("Home");
  const activeSectionNode = registeredUserNav.find((section) => section.label === activeSection) ?? registeredUserNav[0];

  return (
    <div className="font-barlow flex min-h-screen flex-col">
      {/* ── Header ── */}
      <header className="flex min-h-16 shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-secondary bg-primary px-4 py-3">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative size-11 shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pages/dashboard/gov-sa-dew-logo.png"
              alt="Government of South Australia, Department for Environment and Water"
              className="absolute top-[-0.46%] left-0 w-[484%] max-w-none"
            />
          </div>
          <p className="text-[17px] font-medium tracking-tight text-primary">BioData SA</p>
          <Breadcrumb section={activeSection === "Home" ? undefined : activeSectionNode.label} showOrgSwitcher={showOrgSwitcher} />
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-full sm:w-64 lg:w-[395px]">
              <GlobalProjectSearch />
            </div>
            <Button color="primary" iconLeading={Plus}>Add project</Button>
            <Button color="secondary" iconLeading={Upload01}>Upload dataset</Button>
          </div>
          <ProfileMenu />
        </div>
      </header>

      {/* Home's two views (My Dashboard / Data Overview) as a real vertical Tabs - the TabList
          lives in column 2, its TabPanels in column 3, wired together by this one Tabs ancestor
          (react-aria's Tabs is a context provider, not a DOM-adjacency requirement, so the two
          halves can sit in separate columns). Inert for every other section - no TabList/TabPanel
          renders unless Home is active, so it doesn't affect anything else on this page. Placed on
          column 2 per the user directly - the tabs are a sub-nav choice (which Home view), not
          column-3 content in their own right. */}
      <Tabs orientation="vertical" defaultSelectedKey="dashboard" className="flex flex-1">
        {/* ── Primary icon rail: top-level IA (nav chrome - not pixel-matched) ── */}
        <aside className="hidden w-20 shrink-0 flex-col items-center gap-1 border-r border-secondary bg-secondary py-4 lg:flex">
          {registeredUserNav.map((section) => {
            const Icon = sectionIcons[section.label];
            const active = section.label === activeSection;
            return (
              <Tooltip key={section.label} title={section.label} placement="right">
                <TooltipTrigger
                  onPress={() => setActiveSection(section.label)}
                  className={cx(
                    "flex size-12 items-center justify-center rounded-lg transition duration-100 ease-linear",
                    active ? "bg-brand-solid text-white" : "text-quaternary hover:bg-tertiary hover:text-primary",
                  )}
                >
                  {Icon && <Icon className="size-5" />}
                </TooltipTrigger>
              </Tooltip>
            );
          })}
        </aside>

        {/* ── Contextual sidebar: selected section's children, or Home's My Dashboard/Data
            Overview tab list (nav chrome - not pixel-matched) ── */}
        <aside className="hidden w-[286px] shrink-0 flex-col justify-between overflow-y-auto border-r border-secondary bg-secondary p-4 lg:flex">
          <div className="flex flex-col gap-1">
            <p className="mb-3 text-xs font-semibold tracking-wide text-quaternary uppercase">{activeSectionNode.label}</p>
            {activeSection === "Home" ? (
              <TabList aria-label="Home views" className="flex flex-col gap-0.5">
                <Tab
                  id="dashboard"
                  className={({ isSelected }) =>
                    cx(
                      "cursor-pointer rounded-md px-2 py-1 text-sm outline-hidden",
                      isSelected ? "bg-primary font-medium text-primary shadow-xs ring-1 ring-secondary" : "text-primary hover:text-brand-700",
                    )
                  }
                >
                  My Dashboard
                </Tab>
                <Tab
                  id="overview"
                  className={({ isSelected }) =>
                    cx(
                      "cursor-pointer rounded-md px-2 py-1 text-sm outline-hidden",
                      isSelected ? "bg-primary font-medium text-primary shadow-xs ring-1 ring-secondary" : "text-primary hover:text-brand-700",
                    )
                  }
                >
                  Data Overview
                </Tab>
              </TabList>
            ) : (
              activeSectionNode.items?.map((item) => <NavTree key={item.label} node={item} depth={1} />)
            )}
          </div>
          <div className="flex flex-col gap-1.5 border-t border-secondary pt-4 text-[10px] font-semibold tracking-wide text-quaternary uppercase">
            {registeredUserFooterLinks.map((link) => (
              <p key={link}>{link}</p>
            ))}
          </div>
        </aside>

        {/* ── Main content: Home's tab panels render the real dashboard content (shared with
            project-list and project-detail, see app/projects/_shared/home-dashboard.tsx and
            data-overview.tsx) - every other section is an honest placeholder (see
            SectionPlaceholder above) until it's actually scoped ── */}
        <main className="flex flex-1 flex-col">
          {activeSection === "Home" ? (
            <HomeTabPanels />
          ) : activeSection === "Projects" ? (
            <ProjectListContent />
          ) : (
            <SectionPlaceholder node={activeSectionNode} />
          )}
        </main>
      </Tabs>
    </div>
  );
}
