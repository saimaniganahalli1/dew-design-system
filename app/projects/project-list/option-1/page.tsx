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

// Option 1 of 2: the projects list on the sidebar-nav shell (primary icon rail + contextual
// sidebar), reusing app/projects/dashboard/option-1's three-column header/rail/sidebar chrome
// verbatim - see that file's comment for the full rationale. See app/projects/project-list/option-2
// for the same screen on the top-nav shell.
//
// No Figma frame yet for a Projects list screen, so - same as the dashboard body's metric/filter/
// map panels - this is built structurally: every contained widget (search, buttons, avatar, badge)
// is a real DEW component used exactly, the project rows are a structural shell composed from real
// tokens (no `?` marker, same "structural pattern organizing the whole screen" exemption as those
// dashboard panels). The primary icon rail is the real top-level IA (lib/registered-user-nav.ts),
// the contextual sidebar shows only the selected section's children - same NavTree/ProfileMenu
// treatment as dashboard/option-1, "Projects" selected by default since that's the active section
// here.

// Same icon map as dashboard/option-1 - kept local (not in lib/registered-user-nav.ts) since it's
// presentation-only and option-2's top-nav has no use for it.
const sectionIcons: Record<string, FC<{ className?: string }>> = {
  Home: HomeLine,
  Projects: Folder,
  Observations: Eye,
  "Data Licencing Agreement (DLA)": FileLock01,
  "Nominate Sensitive Species": Flag01,
  "Reports (Own Submissions)": BarChart01,
  "Template Finder": FileSearch01,
};

// This screen's own page key, so its own entry in the tree (Projects > Manage Project and
// Datasets) can show a selected state, same fix as dashboard/option-1's "BioData Dashboard" link.
const CURRENT_KEY = "project-list";

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

// DialogTrigger + our real Popover (react-aria) instead of a hand-rolled useState toggle - gets
// outside-click and Escape dismissal for free, same primitive DateRangeControl already uses for
// its overlay. Any hand-rolled dropdown (a switcher, an org-switcher when that gets built) should
// use this, not a plain conditional div.
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

// What column 3 shows for every section besides this screen's own (Projects, here). Two honest
// states, not one: a section either has a real page elsewhere (Home -> dashboard) - say so and
// link to it, don't claim it's unscoped when it demonstrably isn't - or it genuinely has no page
// yet, which does get the "not scoped" copy. Conflating the two read as a bug: clicking Home from
// another screen showed "hasn't been scoped yet" directly above a working "Go to Home" link.
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

export default function ProjectListPage() {
  return (
    <Suspense fallback={null}>
      <ProjectList />
    </Suspense>
  );
}

function ProjectList() {
  const showOrgSwitcher = useFeatureAccess("orgSwitcher");
  const [activeSection, setActiveSection] = useState("Projects");
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

      {/* Home's two views (My Dashboard / Data Overview) as a real vertical Tabs - see
          dashboard/option-1's comment for the full rationale (TabList in column 2, TabPanel in
          column 3, one Tabs ancestor wiring them together). Inert for every other section. */}
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

        {/* ── Main content: Projects has this screen's own content, Home's tab panels render the
            shared real dashboard content (see app/projects/_shared/home-dashboard.tsx and
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
