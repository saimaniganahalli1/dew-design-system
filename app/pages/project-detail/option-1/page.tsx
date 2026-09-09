"use client";

import type { FC, ReactNode } from "react";
import { Suspense, useState } from "react";
import Link from "next/link";
import { Button as AriaButton, Dialog, DialogTrigger, Tabs, TabList, Tab } from "react-aria-components";
import {
  SearchMd,
  Upload01,
  Plus,
  ChevronDown,
  ChevronSelectorVertical,
  ArrowNarrowLeft,
  ArrowNarrowRight,
  HomeLine,
  Folder,
  File02,
  Eye,
  FileLock01,
  Flag01,
  BarChart01,
  FileSearch01,
} from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { Avatar } from "@/components/base/avatar/avatar";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { Popover } from "@/components/base/select/popover";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { TreeView } from "@/components/application/tree-view/tree-view";
import { Breadcrumb } from "@/components/scaffold/breadcrumb";
import { HomeTabPanels } from "@/app/pages/_shared/home-tab-panels";
import { GlobalProjectSearch } from "@/app/pages/_shared/global-search";
import { useFeatureAccess } from "@/lib/use-feature-access";
import { registeredUserNav, registeredUserAccountMenu, registeredUserFooterLinks, type NavNode } from "@/lib/registered-user-nav";
import { cx } from "@/utils/cx";

// One project's detail view, on the sidebar-nav shell - same three-column chrome as
// project-list/option-1 (icon rail + contextual sidebar + main content), reused verbatim. Reached
// by clicking "Adelaide Hills Bushland Survey" from project-list/option-1 - the other three rows
// there aren't wired yet, same "only link what has a real page" convention used everywhere else.
//
// Content model (not layout) is drawn from the other designer's Projects Figma
// (https://www.figma.com/design/wer8CgO1UoCH3aQw2jQkdy/..., node 2266-40134) - per the user
// directly: reference it for content only, ignore its visual design, apply our own patterns. What's
// reused is the shape of a project: identifying metadata (ID, dates, status, publisher), a Project
// Details block, an Overview (abstract + geographic scope), and a nested-records tree of survey
// record types (Site, Observation, Occurrence, Visit, Transect, Quadrat, Block, Ramble, Trap,
// Custom Event) that live inside it. That tree renders with the same NavTree expand/collapse
// pattern already used for the registered-user IA (see dashboard/option-1) rather than the Figma's
// own tree-explorer widget - our pattern, their content.
//
// One concrete example project, not a dynamic per-ID route - same "one hardcoded instance, not a
// generalized system yet" scope as the rest of these explorations.

const sectionIcons: Record<string, FC<{ className?: string }>> = {
  Home: HomeLine,
  Projects: Folder,
  Observations: Eye,
  "Data Licencing Agreement (DLA)": FileLock01,
  "Nominate Sensitive Species": Flag01,
  "Reports (Own Submissions)": BarChart01,
  "Template Finder": FileSearch01,
};

// The nested-records tree that lives inside this project renders with the real `TreeView`
// component (components/application/tree-view/tree-view.tsx), composed inline where it's used
// below - not the hand-rolled NavTree used for the registered-user IA sidebar elsewhere on this
// page. That distinction matters: NavTree is nav chrome (IA not decided yet, exempt from real-
// component fidelity per CONTEXT.md); this tree is actual project content (a real data hierarchy),
// which is exactly the "contained widget" case that must use a real component when one exists -
// flagged directly by the user after this was built with NavTree instead. Content is real
// survey-methodology vocabulary (Site/Observation/Occurrence/Visit/Transect/Quadrat/Block/Ramble/
// Trap/Custom Event) drawn from the Figma reference in the file header comment, not invented.

function NavTree({ node, depth = 0, defaultOpen = false }: { node: NavNode; depth?: number; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const hasChildren = !!node.items?.length;
  const href = node.key ? `/pages/${node.key}/option-1` : undefined;
  const indent = { paddingLeft: depth * 12 };

  if (!hasChildren) {
    return href ? (
      <Link href={href} style={indent} className="py-1 text-sm text-primary hover:text-brand-700">
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

// Same 4 example projects as project-list/option-1 - only this one has a real detail page, so it's
// the only clickable row, same "only wire what has a real page" convention used everywhere else.
const switcherProjects = [
  { name: "Adelaide Hills Bushland Survey", href: "/pages/project-detail/option-1" },
  { name: "Coorong Wetlands Bird Count" },
  { name: "Flinders Ranges Reptile Atlas" },
  { name: "Kangaroo Island Recovery Monitoring" },
];

// The breadcrumb's "Projects" segment (the category crumb, not the specific project) as a
// switcher, Supabase-style - click it for a searchable list of your other projects and jump
// straight to one, rather than backing out to the projects list first. The caret lives on this
// parent crumb, never on the child/current-project name next to it - that's a static label with no
// switcher behaviour, since dropdown affordances belong to the navigational level, not the data
// instance. Familiar pattern per the user's "reduce cognitive overload, build on what people
// already know" steer.
// Controlled DialogTrigger (isOpen/onOpenChange), not uncontrolled like ProfileMenu below - this
// one's items are real Links that should also close the dropdown on click, which needs `open` in
// our own state rather than left entirely to react-aria. Outside-click/Escape dismissal still
// comes from DialogTrigger/Popover itself either way.
function ProjectSwitcher() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = switcherProjects.filter((project) => project.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <DialogTrigger isOpen={open} onOpenChange={setOpen}>
      <AriaButton className="flex items-center gap-1 outline-hidden hover:text-primary">
        Projects
        <ChevronSelectorVertical className="size-3" />
      </AriaButton>
      {/* size="auto": sm/md/lg apply a `max-h-*!` (important) that a later className can't
          override - confirmed via computed styles, not just visual inspection, after the first
          "just add a bigger max-h" attempt silently lost to the !important and kept clipping
          "View all projects". This popover has its own fixed header (search) + footer (view all)
          around one scrollable region (the list, capped to ~5-6 rows via max-h-60 below) - it
          should size to its content, not be capped as a whole. */}
      <Popover size="auto" className="w-72 p-2">
        <Dialog className="outline-hidden">
          <Input size="sm" placeholder="Find project..." icon={SearchMd} value={query} onChange={setQuery} />
          <div className="mt-1 flex max-h-60 flex-col overflow-y-auto">
            {filtered.length === 0 && <p className="px-2 py-2 text-sm text-tertiary">No projects found.</p>}
            {filtered.map((project) =>
              project.href ? (
                <Link
                  key={project.name}
                  href={project.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2 text-sm text-primary hover:bg-secondary"
                >
                  {project.name}
                </Link>
              ) : (
                <p key={project.name} className="rounded-md px-2 py-2 text-sm text-tertiary">
                  {project.name}
                </p>
              ),
            )}
          </div>
          <div className="mt-1 shrink-0 border-t border-secondary pt-1">
            <Link
              href="/pages/project-list/option-1"
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-2 text-sm font-medium text-brand-700 hover:bg-secondary"
            >
              View all projects
            </Link>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}

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

// Two honest states, not one: a section either has a real page elsewhere (Home -> dashboard,
// Projects -> project-list) - say so and link to it, don't claim it's unscoped when it
// demonstrably isn't - or it genuinely has no page yet, which does get the "not scoped" copy.
// Conflating the two read as a bug: clicking Home from another screen showed "hasn't been scoped
// yet" directly above a working "Go to Home" link.
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
        <Button color="link-color" size="sm" href={`/pages/${relatedLink.key}/option-1`} iconTrailing={ArrowNarrowRight}>
          Go to {relatedLink.label}
        </Button>
      )}
    </div>
  );
}

function MetaField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-semibold tracking-wide text-quaternary uppercase">{label}</p>
      <div className="text-sm text-primary">{children}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
      <p className="w-56 shrink-0 text-sm text-tertiary">{label}</p>
      <p className="text-sm text-primary">{value}</p>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-secondary p-6">
      <p className="text-md font-medium text-primary">{title}</p>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

const abstract =
  "Ongoing flora and fauna monitoring across the Adelaide Hills reserve network, tracking indicator species before and after prescribed burns. The project brings together local Landcare volunteers, DEW ecologists and university researchers to build a long-term baseline for reserve management decisions, with quarterly transect surveys feeding directly into the region's fire-recovery reporting.";

export default function ProjectDetailPage() {
  return (
    <Suspense fallback={null}>
      <ProjectDetail />
    </Suspense>
  );
}

function ProjectDetail() {
  const showOrgSwitcher = useFeatureAccess("orgSwitcher");
  const [activeSection, setActiveSection] = useState("Projects");
  const [abstractExpanded, setAbstractExpanded] = useState(false);
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
          <Breadcrumb
            section={activeSection === "Home" ? undefined : activeSection === "Projects" ? <ProjectSwitcher /> : activeSectionNode.label}
            current={activeSection === "Projects" ? "Adelaide Hills Bushland Survey" : undefined}
            showOrgSwitcher={showOrgSwitcher}
          />
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

      {/* ── Primary icon rail: top-level IA (nav chrome - not pixel-matched) ── */}
      {(() => {
        const iconRail = (
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
        );

        // Home's two views (My Dashboard / Data Overview) get their own Tabs boundary, mounted
        // only while Home is active - not one Tabs wrapping the whole page permanently. React-aria's
        // Tabs keeps a single internal collection for its whole lifetime; wrapping the entire
        // three-column row in a permanent Tabs while TabList only mounted conditionally (once you
        // switched to Home) broke that - a real runtime crash the first time TabList mounted
        // ("Cannot destructure property 'onAction' ... as it is undefined"). Scoping Tabs to just
        // this branch means TabList and TabPanel always mount and unmount together.
        if (activeSection === "Home") {
          return (
            <Tabs orientation="vertical" defaultSelectedKey="dashboard" className="flex flex-1">
              {iconRail}

              {/* ── Contextual sidebar: Home's My Dashboard/Data Overview tab list (nav chrome - not pixel-matched) ── */}
              <aside className="hidden w-[286px] shrink-0 flex-col justify-between overflow-y-auto border-r border-secondary bg-secondary p-4 lg:flex">
                <div className="flex flex-col gap-1">
                  <p className="mb-3 text-xs font-semibold tracking-wide text-quaternary uppercase">{activeSectionNode.label}</p>
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
                      Data Dashboard
                    </Tab>
                  </TabList>
                </div>
                <div className="flex flex-col gap-1.5 border-t border-secondary pt-4 text-[10px] font-semibold tracking-wide text-quaternary uppercase">
                  {registeredUserFooterLinks.map((link) => (
                    <p key={link}>{link}</p>
                  ))}
                </div>
              </aside>

              {/* ── Main content: Home's tab panels render the shared real dashboard content
                  (see app/pages/_shared/home-dashboard.tsx and data-overview.tsx) ── */}
              <main className="flex flex-1 flex-col overflow-y-auto">
                <HomeTabPanels />
              </main>
            </Tabs>
          );
        }

        return (
          <div className="flex flex-1">
            {iconRail}

            {/* ── Contextual sidebar: this project's nested-records tree when on Projects,
                otherwise the selected section's children (nav chrome - not pixel-matched) ── */}
            <aside className="hidden w-[286px] shrink-0 flex-col justify-between overflow-y-auto border-r border-secondary bg-secondary p-4 lg:flex">
              <div className="flex flex-col gap-1">
                <p className="mb-3 text-xs font-semibold tracking-wide text-quaternary uppercase">
                  {activeSection === "Projects" ? "Adelaide Hills Bushland Survey" : activeSectionNode.label}
                </p>
                {activeSection === "Projects" ? (
                  <TreeView
                    aria-label="Adelaide Hills Bushland Survey records"
                    showConnectors
                    defaultExpandedKeys={["site", "visit"]}
                    className="w-full"
                  >
                    <TreeView.Item id="site" textValue="Site SU00501">
                      <TreeView.ItemContent icon={Folder}>Site SU00501</TreeView.ItemContent>
                      <TreeView.Item id="obs-nonbiotic" textValue="Observation OBS094 · Nonbiotic">
                        <TreeView.ItemContent icon={File02}>Observation OBS094 · Nonbiotic</TreeView.ItemContent>
                      </TreeView.Item>
                      <TreeView.Item id="obs-community" textValue="Observation OBS094 · Community">
                        <TreeView.ItemContent icon={File02}>Observation OBS094 · Community</TreeView.ItemContent>
                      </TreeView.Item>
                      <TreeView.Item id="obs-094" textValue="Observation OBS094">
                        <TreeView.ItemContent icon={File02}>Observation OBS094</TreeView.ItemContent>
                      </TreeView.Item>
                      <TreeView.Item id="occ-individual" textValue="Occurrence OBS094 · Individual">
                        <TreeView.ItemContent icon={File02}>Occurrence OBS094 · Individual</TreeView.ItemContent>
                      </TreeView.Item>
                      <TreeView.Item id="occ-population" textValue="Occurrence OBS094 · Population">
                        <TreeView.ItemContent icon={File02}>Occurrence OBS094 · Population</TreeView.ItemContent>
                      </TreeView.Item>
                      <TreeView.Item id="visit" textValue="Visit VU00501">
                        <TreeView.ItemContent icon={Folder}>Visit VU00501</TreeView.ItemContent>
                        <TreeView.Item id="visit-obs" textValue="Observation OBS095">
                          <TreeView.ItemContent icon={File02}>Observation OBS095</TreeView.ItemContent>
                        </TreeView.Item>
                      </TreeView.Item>
                      <TreeView.Item id="transect" textValue="Transect TR00501">
                        <TreeView.ItemContent icon={File02}>Transect TR00501</TreeView.ItemContent>
                      </TreeView.Item>
                      <TreeView.Item id="quadrat" textValue="Quadrat QR00501">
                        <TreeView.ItemContent icon={File02}>Quadrat QR00501</TreeView.ItemContent>
                      </TreeView.Item>
                      <TreeView.Item id="block" textValue="Block BK00501">
                        <TreeView.ItemContent icon={File02}>Block BK00501</TreeView.ItemContent>
                      </TreeView.Item>
                      <TreeView.Item id="ramble" textValue="Ramble RMB00501">
                        <TreeView.ItemContent icon={File02}>Ramble RMB00501</TreeView.ItemContent>
                      </TreeView.Item>
                      <TreeView.Item id="trap" textValue="Trap TRP00501">
                        <TreeView.ItemContent icon={File02}>Trap TRP00501</TreeView.ItemContent>
                      </TreeView.Item>
                      <TreeView.Item id="custom-event" textValue="Custom Event">
                        <TreeView.ItemContent icon={File02}>Custom Event</TreeView.ItemContent>
                      </TreeView.Item>
                    </TreeView.Item>
                  </TreeView>
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

            {/* ── Main content: Projects has this screen's own content - every other section is an
                honest placeholder (see SectionPlaceholder above) until it's actually scoped ── */}
            <main className="flex flex-1 flex-col overflow-y-auto">
              {activeSection === "Projects" ? (
                <>
                  {/* "Back to projects" is column 3's own content, above everything else here -
                      not spanning the nav columns (icon rail, contextual sidebar). */}
                  <div className="p-6 pb-0">
                    <Link
                      href="/pages/project-list/option-1"
                      className="flex w-fit items-center gap-1.5 text-sm font-medium text-tertiary hover:text-primary"
                    >
                      <ArrowNarrowLeft className="size-4" />
                      Back to projects
                    </Link>
                  </div>

                  <div className="flex flex-col gap-1 p-6 pb-0">
                    <p className="text-xs font-semibold tracking-wide text-quaternary uppercase">Project</p>
                    <p className="text-2xl font-medium text-primary">Adelaide Hills Bushland Survey</p>
                  </div>

                  <div className="flex flex-wrap items-start gap-8 border-b border-secondary p-6">
                    <MetaField label="Project ID">BD-5039</MetaField>
                    <MetaField label="Start Date">3 Feb 2025</MetaField>
                    <MetaField label="End Date">—</MetaField>
                    <MetaField label="Status">
                      <BadgeWithDot size="sm" color="success">Active</BadgeWithDot>
                    </MetaField>
                    <MetaField label="Published by">Adelaide Hills Landcare</MetaField>
                  </div>

                  <div className="flex flex-col gap-4 p-6">
                    <DetailSection title="Project Details">
                      <DetailRow label="Project No" value="BD-5039" />
                      <DetailRow label="Short Title (Display Name)" value="Adelaide Hills Bushland Survey" />
                      <DetailRow
                        label="Full Project Name"
                        value="Ongoing flora and fauna monitoring across the Adelaide Hills reserve network, tracking indicator species before and after prescribed burns."
                      />
                      <DetailRow label="Start Date" value="3 Feb 2025" />
                      <DetailRow label="End Date" value="—" />
                      <DetailRow label="Attached Resources" value="04" />
                      <div className="flex flex-wrap gap-8 border-t border-secondary pt-4">
                        <MetaField label="Events">6</MetaField>
                        <MetaField label="Occurrences">18</MetaField>
                        <MetaField label="Observations">42</MetaField>
                      </div>
                    </DetailSection>

                    <DetailSection title="Overview">
                      <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold tracking-wide text-quaternary uppercase">Abstract</p>
                        <p className={cx("text-sm text-secondary", !abstractExpanded && "line-clamp-3")}>{abstract}</p>
                        <Button color="link-color" size="sm" className="self-start" onClick={() => setAbstractExpanded((e) => !e)}>
                          {abstractExpanded ? "Show less" : "Read more"}
                        </Button>
                      </div>
                      <div className="flex flex-col gap-2 border-t border-secondary pt-4">
                        <p className="text-xs font-semibold tracking-wide text-quaternary uppercase">Geographic scope</p>
                        <div className="flex h-48 items-center justify-center rounded-lg bg-secondary">
                          <p className="text-sm text-primary">Map view</p>
                        </div>
                      </div>
                    </DetailSection>
                  </div>
                </>
              ) : (
                <SectionPlaceholder node={activeSectionNode} />
              )}
            </main>
          </div>
        );
      })()}
    </div>
  );
}
