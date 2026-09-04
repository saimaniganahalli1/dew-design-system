"use client";

import { useState } from "react";
import {
  BarChart03,
  ChevronDown,
  ChevronLeftDouble,
  ChevronSelectorVertical,
  ChevronUp,
  Circle,
  Database02,
  DotsGrid,
  Eye,
  Folder,
  Grid03,
  HelpCircle,
  Mail01,
  MarkerPin01,
  Phone01,
  SearchMd,
  Share03,
  Target01,
  X,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Inspectable, InspectorProvider, type InspectableToken } from "@/components/scaffold/token-inspector";

// Figma source: https://www.figma.com/design/wer8CgO1UoCH3aQw2jQkdy/BioData-SA-High-Fidelity?node-id=1885-6177
// "Projects" (BioData SA high-fidelity Projects screen, 1920px). The direct design-context
// call requires a live Figma layer selection in this session, so this page is reconstructed from
// Figma metadata for node 1885:6177 plus the screenshot for frame 2266:40134. As with
// app/pages/dashboard/page.tsx, product chrome and structural patterns that do not exist in
// components/base|application yet are composed from DEW tokens and documented in the mapping table.

const sidebarTokens: InspectableToken[] = [
  { cls: "bg-[var(--color-brand-900)]", cssVar: "--color-brand-900", value: "#08475A", swatch: true },
  { cls: "text-white", cssVar: "--color-fg-white", value: "#FFFFFF", swatch: true },
  { cls: "border-white/15", cssVar: "rgba(255,255,255,.15)", value: "15% white" },
];
const listTokens: InspectableToken[] = [
  { cls: "bg-primary", cssVar: "--ui-bg-primary", value: "#FFFFFF", swatch: true },
  { cls: "bg-secondary", cssVar: "--ui-bg-secondary", value: "#F8F8F7", swatch: true },
  { cls: "border-secondary", cssVar: "--ui-border-secondary", value: "#E5E4E2", swatch: true },
  { cls: "text-primary", cssVar: "--ui-text-primary", value: "#2E2925", swatch: true },
];
const headerTokens: InspectableToken[] = [
  { cls: "bg-brand-solid", cssVar: "--ui-bg-brand-solid -> --color-brand-600", value: "#185E74", swatch: true },
  { cls: "text-white", cssVar: "--color-fg-white", value: "#FFFFFF", swatch: true },
  { cls: "border-brand", cssVar: "--ui-border-brand", value: "#99D6E8", swatch: true },
];
const treeTokens: InspectableToken[] = [
  { cls: "bg-secondary", cssVar: "--ui-bg-secondary", value: "#F8F8F7", swatch: true },
  { cls: "text-secondary", cssVar: "--ui-text-secondary", value: "#585451", swatch: true },
  { cls: "text-brand-secondary", cssVar: "--ui-text-brand-secondary", value: "#0D576E", swatch: true },
  { cls: "border-secondary", cssVar: "--ui-border-secondary", value: "#E5E4E2", swatch: true },
];
const panelTokens: InspectableToken[] = [
  { cls: "bg-primary", cssVar: "--ui-bg-primary", value: "#FFFFFF", swatch: true },
  { cls: "border-brand", cssVar: "--ui-border-brand", value: "#99D6E8", swatch: true },
  { cls: "text-primary", cssVar: "--ui-text-primary", value: "#2E2925", swatch: true },
  { cls: "text-tertiary", cssVar: "--ui-text-tertiary", value: "#706B68", swatch: true },
];
const badgeTokens: InspectableToken[] = [
  { cls: "bg-utility-brand-50", cssVar: "--color-utility-brand-50", value: "#E9F8FC", swatch: true },
  { cls: "text-utility-brand-700", cssVar: "--color-utility-brand-700", value: "#0D576E", swatch: true },
  { cls: "ring-utility-brand-200", cssVar: "--color-utility-brand-200", value: "#BCE7F2", swatch: true },
];

const projects = [
  { id: "BD- 5038", name: "Kangaroo Island Wildlife Rehabilitation", description: "Providing care and rehabilitation for injured and orphaned native wildlife." },
  { id: "BD- 5039", name: "Adelaide Festival of Arts", description: "An annual celebration of arts and culture showcasing local communities." },
  { id: "BD- 5040", name: "Flinders Ranges Geological Survey", description: "Exploring and documenting the unique geological features of the region." },
  { id: "BD- 5041", name: "Murray River Eco-Tourism Initiative", description: "Promoting sustainable tourism along the Murray River waterways." },
  { id: "BD- 5042", name: "Port Adelaide Historical Preservation", description: "Restoring and preserving historical sites in Port Adelaide." },
  { id: "BD- 5043", name: "Barossa Valley Sustainable Farming", description: "Implementing eco-friendly farming practices to protect the landscape." },
  { id: "BD- 5044", name: "Tjilbruke Dreaming Trail", description: "Developing a walking trail that highlights Indigenous cultural heritage." },
  { id: "BD- 5045", name: "Flora and Fauna of Yorke Peninsula", description: "Researching and documenting unique plant and animal species." },
  { id: "BD- 5046", name: "Adelaide Solar Energy Project", description: "Expanding solar energy use across Adelaide to promote renewable power." },
  { id: "BD- 5047", name: "Coober Pedy Opal Mining Education", description: "Providing educational workshops about opal mining and land care." },
];

const treeRows = [
  { label: "Kangaroo Island Wildlife Rehabilitation", icon: Folder, depth: 0, selected: true },
  { label: "2.1KM NNE of Yalata", icon: MarkerPin01, depth: 1 },
  { label: "Site SU00501", icon: Target01, depth: 2 },
  { label: "Observation Nonbiotic OBS094", icon: Eye, depth: 3 },
  { label: "Observation Community OBS094", icon: Eye, depth: 3 },
  { label: "Observation OBS094", icon: Eye, depth: 3 },
  { label: "Occurrence Individual OBS094", icon: Circle, depth: 2, muted: true },
  { label: "Occurrence Population OBS094", icon: Circle, depth: 2 },
  { label: "Visit VU00501", icon: Share03, depth: 2 },
  { label: "Observation OBS095", icon: Eye, depth: 3 },
  { label: "Transect TR00501", icon: DotsGrid, depth: 2 },
  { label: "Quadrat QR00501", icon: Grid03, depth: 2 },
  { label: "Block BK00501", icon: Target01, depth: 2 },
  { label: "Ramble RMB00501", icon: Share03, depth: 2 },
  { label: "Trap TRP00501", icon: Target01, depth: 2 },
  { label: "Custom Event", icon: Circle, depth: 2 },
];

const mapping = [
  { layer: "Sidebar navigation Biodata", figma: "296px dark BioData SA sidebar with search, nav links, help links, government card, user footer", dew: "Composed product chrome", note: "No app-shell/sidebar product component exists in DEW yet; built from semantic tokens and real icons. Government logo reuses the existing dashboard asset." },
  { layer: "Projects List", figma: "384px list with search input, filter icon button, count/sort row, active project row", dew: "Input + composed list shell", note: "Input maps to components/base/input/input.tsx. The list itself is an app pattern, not a shipped DEW component." },
  { layer: "Project header", figma: "Brand header with project title and metadata columns", dew: "Composed header + BadgeWithDot", note: "Metadata uses text and dividers. Status uses the real BadgeWithDot component." },
  { layer: "Project breadcrumb/actions", figma: "Folder breadcrumb, Project badge, share and grid controls, close control", dew: "BadgeWithIcon + Button/icon shells", note: "Project badge uses BadgeWithIcon. Icon-only header controls are composed because DEW has Button but no documented square icon-button variant in this screen size." },
  { layer: "Tree", figma: "384px hierarchical record tree with connector lines and icon rows", dew: "Composed tree shell", note: "Tree view is a structural data pattern not present in components/base or components/application. It is rendered rather than ?-blocked so child records remain visible." },
  { layer: "Content Container / Project", figma: "856px detail area with section title and accordion bodies", dew: "Composed accordion shell", note: "Accordion is not shipped yet. Sections are composed from tokens and documented as a gap, but the actual contents remain visible." },
  { layer: "Project Details fields", figma: "Label/value rows plus attached resources and nested records counts", dew: "Composed definition list", note: "Plain text metadata, not a reusable DEW component yet." },
  { layer: "Overview / Geographic scope", figma: "Abstract text, read-more link, divider, map image", dew: "Composed panel + local image asset", note: "Map is cropped from the Figma screenshot and saved at public/pages/projects/geographic-scope.png for a real visual reference." },
  { layer: "Hidden content variants", figma: "Occurrence, observations, events, resources, table view and many nested record detail instances hidden", dew: "Excluded", note: "Hidden Figma layers are not rendered in this default Projects screen." },
];

function SidebarNav() {
  const nav = [
    { label: "Dashboard", icon: BarChart03 },
    { label: "Projects", icon: Database02, active: true },
    { label: "Occurrences", icon: Target01, help: true },
  ];

  return (
    <Inspectable label="Composed BioData sidebar" source="app/pages/projects/page.tsx" tokens={sidebarTokens} className="w-[296px] shrink-0">
      <aside className="flex h-[1064px] w-[296px] flex-col justify-between bg-[var(--color-brand-900)] px-4 py-8 text-white">
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-[28px] font-semibold leading-none">Biodata SA</h1>
            <ChevronLeftDouble className="size-4 text-white/70" />
          </div>
          <div className="mb-6">
            <Input placeholder="Search" icon={SearchMd} className="bg-white/5 text-white ring-white/20 placeholder:text-white/60" />
          </div>
          <nav className="flex flex-col gap-2">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`flex h-10 items-center justify-between rounded-md px-3 text-sm font-semibold ${item.active ? "bg-white/14 ring-1 ring-white/16" : "text-white/75"}`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="size-5" />
                    {item.label}
                  </span>
                  {item.help && <HelpCircle className="size-4" />}
                </div>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 text-sm font-semibold text-white/75">
            <p className="flex items-center gap-2"><Folder className="size-5" />Help and Documentation</p>
            <p className="flex items-center gap-2"><Folder className="size-5" />Templates and Resources</p>
          </div>
          <div className="flex items-center gap-3 rounded-md bg-white p-3 text-[12px] text-[var(--color-brand-900)]">
            <div className="relative size-11 shrink-0 overflow-hidden rounded-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pages/dashboard/gov-sa-dew-logo.png" alt="Government of South Australia" className="absolute top-0 left-[-2px] h-full max-w-none" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold leading-tight">Government of South Australia</p>
              <p className="mt-1 leading-tight text-[var(--color-brand-700)]">Department for Environment and Water</p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 p-3">
            <div className="flex items-center gap-3">
              <Avatar initials="G" size="md" alt="Guest" />
              <span className="text-sm font-semibold">Guest</span>
            </div>
            <ChevronSelectorVertical className="size-4 text-white/70" />
          </div>
        </div>
      </aside>
    </Inspectable>
  );
}

function ProjectsList() {
  return (
    <Inspectable label="Input + composed projects list" source="components/base/input/input.tsx + app/pages/projects/page.tsx" tokens={listTokens} className="w-96 shrink-0">
      <section className="h-[1064px] w-96 border-r border-secondary bg-primary">
        <div className="border-b border-secondary px-3 py-7">
          <h2 className="mb-6 text-2xl font-semibold text-brand-secondary">Projects</h2>
          <div className="flex gap-2">
            <Input placeholder="Search by project ID or name" icon={SearchMd} />
            <button type="button" aria-label="Filter projects" className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-secondary bg-primary text-quaternary shadow-xs">
              <DotsGrid className="size-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-secondary px-3 py-2 text-xs text-tertiary">
          <span>128 Projects</span>
          <span className="flex items-center gap-1">Featured <ChevronDown className="size-3.5" /></span>
        </div>
        <div>
          {projects.map((project, index) => (
            <article key={project.id} className={`border-b border-secondary px-3 py-3 ${index === 0 ? "bg-brand-primary_alt" : ""}`}>
              <p className="mb-1 text-sm font-medium text-brand-secondary">{project.id}</p>
              <h3 className="truncate text-sm font-medium text-primary">{project.name}</h3>
              <p className="mt-1 truncate text-sm text-tertiary">{project.description}</p>
            </article>
          ))}
        </div>
      </section>
    </Inspectable>
  );
}

function ProjectHeader() {
  return (
    <Inspectable label="Composed project header + BadgeWithDot" source="components/base/badges/badges.tsx + app/pages/projects/page.tsx" tokens={headerTokens}>
      <header>
        <div className="bg-brand-solid px-4 py-4 text-white">
          <p className="mb-1 text-xs font-semibold uppercase">Project</p>
          <h2 className="text-lg font-medium">Kangaroo Island Wildlife Rehabilitation</h2>
        </div>
        <div className="grid h-16 grid-cols-[160px_150px_150px_120px_1fr] border-b border-brand bg-brand-primary_alt text-sm">
          <MetaTile label="Project ID" value="BD- 5034" />
          <MetaTile label="Start Date" value="12 Jul 2025" />
          <MetaTile label="End Date" value="-" />
          <div className="border-r border-brand px-4 py-3">
            <p className="mb-1 text-xs text-brand-secondary">Status</p>
            <BadgeWithDot type="pill-color" color="success" size="sm">Active</BadgeWithDot>
          </div>
          <MetaTile label="Published by" value="Department of Environment and Water" last />
        </div>
      </header>
    </Inspectable>
  );
}

function MetaTile({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`px-4 py-3 ${last ? "" : "border-r border-brand"}`}>
      <p className="mb-1 text-xs text-brand-secondary">{label}</p>
      <p className="truncate text-sm font-medium text-primary">{value}</p>
    </div>
  );
}

function TreeView() {
  return (
    <Inspectable label="Composed hierarchical tree shell" source="app/pages/projects/page.tsx" tokens={treeTokens} className="w-96 shrink-0">
      <section className="h-[892px] w-96 border-r border-secondary bg-primary p-2">
        {treeRows.map((row) => {
          const Icon = row.icon;
          return (
            <div
              key={`${row.label}-${row.depth}`}
              className={`relative flex h-9 items-center gap-2 rounded-md pr-2 text-sm ${row.selected ? "bg-brand-primary_alt text-primary" : row.muted ? "bg-secondary text-tertiary" : "text-secondary"}`}
              style={{ paddingLeft: `${12 + row.depth * 24}px` }}
            >
              {row.depth > 0 && <span className="absolute top-0 bottom-0 w-px bg-secondary" style={{ left: `${10 + row.depth * 24}px` }} />}
              <ChevronDown className="size-3.5 shrink-0 text-quaternary" />
              <Icon className={`size-4 shrink-0 ${row.depth === 0 ? "text-brand-secondary" : "text-quaternary"}`} />
              <span className="truncate">{row.label}</span>
            </div>
          );
        })}
      </section>
    </Inspectable>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-6 text-sm">
      <dt className="text-tertiary">{label}</dt>
      <dd className="text-secondary">{children}</dd>
    </div>
  );
}

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded-lg border border-brand bg-primary">
      <div className="flex h-12 items-center justify-between border-b border-brand px-4">
        <h3 className="text-sm font-semibold text-brand-secondary">{title}</h3>
        <ChevronUp className="size-4 text-brand-secondary" />
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function ProjectDetails() {
  return (
    <Inspectable label="Composed accordion/detail shell" source="app/pages/projects/page.tsx" tokens={panelTokens} className="flex-1">
      <section className="h-[892px] flex-1 overflow-hidden bg-primary p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inspectable label="Badge" source="components/base/badges/badges.tsx" tokens={badgeTokens}>
              <Badge type="pill-color" color="brand" size="sm">BD - 5034</Badge>
            </Inspectable>
            <h2 className="text-md font-semibold text-primary">Kangaroo Island Wildlife Rehabilitation</h2>
          </div>
          <Button color="secondary" size="sm" iconLeading={X} />
        </div>

        <div className="flex flex-col gap-4">
          <AccordionSection title="Project Details">
            <dl className="flex flex-col gap-4">
              <FieldRow label="Project No">BD - 5034</FieldRow>
              <FieldRow label="Short Title (Display Name)">Kangaroo Island Wildlife Rehabilitation</FieldRow>
              <FieldRow label="Full Project Name">Undertaking a comprehensive rodents survey of the Fleurieu Coast, South Australia, to identify rare rodents.</FieldRow>
              <FieldRow label="Start Date">-</FieldRow>
              <FieldRow label="End Date">-</FieldRow>
              <FieldRow label="Attached Resources"><span className="font-semibold text-brand-secondary">04</span></FieldRow>
              <FieldRow label="Nested Records">
                <div className="grid grid-cols-3 gap-6">
                  <span>Events<br /><span className="text-tertiary">--</span></span>
                  <span>Occurrences<br /><span className="text-tertiary">--</span></span>
                  <span>Observations<br /><span className="text-tertiary">--</span></span>
                </div>
              </FieldRow>
            </dl>
          </AccordionSection>

          <AccordionSection title="Overview">
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="mb-4 text-sm font-medium text-primary">Abstract</h4>
                <p className="max-w-3xl text-sm leading-6 text-tertiary">
                  The Rare Rodents project is a collaborative biodiversity initiative that takes a community-centred approach to improving knowledge and conservation outcomes for South Australia&apos;s rare and threatened rodent species. The project brings together ecologists, conservation biologists, land managers, government agencies, researchers, Traditional Owners, and community members to collect, manage, and share valuable information about rodent populations.
                </p>
                <button type="button" className="mt-2 text-sm font-semibold text-brand-secondary">Read more</button>
              </div>
              <div className="border-t border-secondary pt-4">
                <h4 className="mb-4 text-sm font-medium text-primary">Geographic scope</h4>
                <div className="h-[220px] overflow-hidden rounded-md bg-brand-primary_alt">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/pages/projects/geographic-scope.png" alt="Map showing the geographic scope for the Kangaroo Island Wildlife Rehabilitation project" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </AccordionSection>

          <AccordionSection title="Data owner">
            <div className="grid grid-cols-[320px_1fr] gap-8">
              <div className="flex flex-col items-center">
                <div className="mb-3 h-36 w-full rounded-md bg-secondary" />
                <p className="text-lg font-medium text-primary">Organisation</p>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <ContactBlock title="Data custodian" />
                <ContactBlock title="Project contact" />
              </div>
            </div>
          </AccordionSection>
        </div>
      </section>
    </Inspectable>
  );
}

function ContactBlock({ title }: { title: string }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-tertiary">{title}</p>
      <p className="mb-2 text-sm font-medium text-primary">Olivia Wyatt</p>
      <p className="mb-2 flex items-center gap-2 text-sm text-tertiary"><Mail01 className="size-4" />olivia@example.sa.gov.au</p>
      <p className="flex items-center gap-2 text-sm text-tertiary"><Phone01 className="size-4" />08 8204 1910</p>
    </div>
  );
}

export default function ProjectsPage() {
  const [showMapping, setShowMapping] = useState(true);

  return (
    <InspectorProvider>
      <div className="font-barlow min-h-screen bg-primary">
        <div className="flex min-w-[1600px]">
          <SidebarNav />
          <ProjectsList />
          <main className="flex h-[1064px] flex-1 flex-col overflow-hidden">
            <ProjectHeader />
            <div className="flex h-10 items-center justify-between border-b border-brand bg-brand-primary_alt px-3 text-sm text-secondary">
              <div className="flex items-center gap-2">
                <Folder className="size-5 text-secondary" />
                <span>Kangaroo Island Wildlife Rehabilitation</span>
                <BadgeWithIcon type="pill-color" color="brand" size="sm">Project</BadgeWithIcon>
              </div>
              <div className="flex items-center gap-2">
                <Button color="secondary" size="sm" iconLeading={Share03} />
                <Button color="secondary" size="sm" iconLeading={Grid03} />
              </div>
            </div>
            <div className="flex flex-1">
              <TreeView />
              <ProjectDetails />
            </div>
          </main>
        </div>

        <div className="mx-auto max-w-5xl px-8 py-12">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-xl font-semibold text-primary">Component mapping</h2>
              <p className="text-sm text-tertiary">
                Every visible major Figma layer in node 1885:6177 is mapped to a real DEW component or a documented composed shell.
              </p>
            </div>
            <Button color="secondary" size="sm" onClick={() => setShowMapping(!showMapping)}>
              {showMapping ? "Hide mapping" : "Show mapping"}
            </Button>
          </div>
          {showMapping && (
            <div className="overflow-hidden rounded-lg border border-secondary">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary text-xs text-quaternary">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Figma layer</th>
                    <th className="px-3 py-2 font-semibold">Figma spec</th>
                    <th className="px-3 py-2 font-semibold">DEW mapping</th>
                    <th className="px-3 py-2 font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {mapping.map((m) => (
                    <tr key={m.layer} className="border-t border-secondary align-top">
                      <td className="px-3 py-2 font-medium text-primary">{m.layer}</td>
                      <td className="px-3 py-2 text-tertiary">{m.figma}</td>
                      <td className="px-3 py-2"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs">{m.dew}</code></td>
                      <td className="px-3 py-2 text-tertiary">{m.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <h2 className="mt-8 mb-2 text-xl font-semibold text-primary">New components identified</h2>
          <p className="mb-4 text-sm text-tertiary">
            Accordion, data tree, app sidebar, project list, and icon-only control patterns are structural shells here. They should become real DEW components before production screens depend on them.
          </p>
        </div>
      </div>
    </InspectorProvider>
  );
}
