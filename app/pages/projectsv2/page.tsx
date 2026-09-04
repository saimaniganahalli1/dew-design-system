"use client";

import { useMemo, useState, type ComponentType, type SVGProps } from "react";
import {
  BarChartSquare02,
  BookOpen01,
  CheckCircle,
  ChevronDown,
  ChevronLeftDouble,
  ChevronSelectorVertical,
  ChevronUp,
  Circle,
  Dataflow02,
  DotsGrid,
  Eye,
  Folder,
  Grid03,
  HelpCircle,
  MarkerPin06,
  Rows01,
  SearchLg,
  Share03,
  Sliders02,
  Table,
  Target01,
  X,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const projects = [
  ["BD- 5038", "Kangaroo Island Wildlife Rehabilitation", "Providing care and rehabilitation for injured and orphaned wildlife on Kangaroo Island."],
  ["BD- 5039", "Adelaide Festival of Arts", "An annual celebration of arts and culture showcasing local and international talents."],
  ["BD- 5040", "Flinders Ranges Geological Survey", "Exploring and documenting the unique geological features of Flinders Ranges."],
  ["BD- 5041", "Murray River Eco-Tourism Initiative", "Promoting sustainable tourism along the Murray River while protecting local ecosystems."],
  ["BD- 5042", "Port Adelaide Historical Preservation", "Restoring and preserving historical sites in Port Adelaide to maintain cultural heritage."],
  ["BD- 5043", "Barossa Valley Sustainable Farming", "Implementing eco-friendly farming practices to protect the Barossa Valley wine heritage."],
  ["BD- 5044", "Tjilbruke Dreaming Trail", "Developing a walking trail that highlights the Indigenous stories of Tjilbruke along the coast."],
  ["BD- 5045", "Flora and Fauna of Yorke Peninsula", "Researching and documenting the unique plant and animal species of Yorke Peninsula."],
  ["BD- 5046", "Adelaide Solar Energy Project", "Expanding solar energy use across Adelaide to promote renewable energy sources."],
  ["BD- 5047", "Coober Pedy Opal Mining Education", "Providing educational workshops about opal mining and geology in Coober Pedy."],
  ["BD- 5048", "Kangaroo Island Marine Conservation", "Protecting marine ecosystems around Kangaroo Island through conservation efforts."],
  ["BD- 5049", "Adelaide Zoo Biodiversity Program", "Enhancing biodiversity through breeding programs and conservation education at the zoo."],
] as const;

const treeRows: Array<{ label: string; icon: Icon; depth: number; branch?: boolean }> = [
  { label: "Kangaroo Island Wildlife Rehabilitation", icon: Folder, depth: 0, branch: true },
  { label: "2.1KM NNE of Yalata", icon: MarkerPin06, depth: 1, branch: true },
  { label: "Site SU00501", icon: MarkerPin06, depth: 2, branch: true },
  { label: "Observation Nonbiotic OBS094", icon: Eye, depth: 3 },
  { label: "Observation Community OBS094", icon: Eye, depth: 3 },
  { label: "Observation OBS094", icon: Eye, depth: 3 },
  { label: "Occurrence Individual OBS094", icon: Target01, depth: 2 },
  { label: "Occurrence Population OBS094", icon: Target01, depth: 2 },
  { label: "Visit VU00501", icon: Share03, depth: 2, branch: true },
  { label: "Observation OBS095", icon: Eye, depth: 3 },
  { label: "Transect TR00501", icon: DotsGrid, depth: 2 },
  { label: "Quadrat QR00501", icon: Grid03, depth: 2 },
  { label: "Block BK00501", icon: Target01, depth: 2 },
  { label: "Ramble RMB00501", icon: Dataflow02, depth: 2 },
  { label: "Trap TRP00501", icon: Target01, depth: 2 },
  { label: "Custom Event", icon: Circle, depth: 2 },
];

function IconButton({ label, icon: Icon, active = false, onClick }: { label: string; icon: Icon; active?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`flex size-7 shrink-0 items-center justify-center rounded-md border shadow-xs transition-colors ${active ? "border-brand-100 bg-primary text-brand-secondary" : "border-transparent text-quaternary hover:bg-secondary"}`}
    >
      <Icon className="size-4" />
    </button>
  );
}

function Sidebar() {
  const nav = [
    { label: "Dashboard", icon: BarChartSquare02 },
    { label: "Projects", icon: Rows01, active: true },
    { label: "Occurrences", icon: MarkerPin06, help: true },
  ];

  return (
    <aside className="flex h-full w-[296px] shrink-0 flex-col justify-between bg-brand-800 px-3 pb-6 pt-6 text-white shadow-[32px_32px_64px_rgba(10,13,18,0.08)]">
      <div>
        <div className="px-1">
          <div className="flex h-[38px] items-center justify-between">
            <h1 className="text-[30px] font-bold leading-[38px]">Biodata SA</h1>
            <button type="button" aria-label="Collapse navigation" title="Collapse navigation" className="flex size-7 items-center justify-center rounded-md text-white/70 hover:bg-white/10">
              <ChevronLeftDouble className="size-4" />
            </button>
          </div>
          <div className="mt-5 flex h-10 items-center gap-2 rounded-lg border border-white/20 bg-white/[0.01] px-3 text-white/50 shadow-xs">
            <SearchLg className="size-5" />
            <input aria-label="Search navigation" placeholder="Search" className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-white/50" />
          </div>
        </div>

        <nav aria-label="Primary" className="mt-4 flex flex-col">
          {nav.map(({ label, icon: NavIcon, active, help }) => (
            <button key={label} type="button" className="py-0.5 text-left">
              <span className={`flex h-10 items-center gap-3 rounded-md border px-3 text-base font-semibold ${active ? "border-white/20 bg-white/10 text-white" : "border-transparent text-white/70 hover:bg-white/5"}`}>
                <NavIcon className="size-5" />
                <span className="flex-1">{label}</span>
                {help && <HelpCircle className="size-4" />}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div>
        <div className="mb-4 space-y-0.5 text-sm font-semibold text-white/70">
          <button type="button" className="flex h-10 w-full items-center gap-3 rounded-md px-3 hover:bg-white/5"><BookOpen01 className="size-5" />Help and Documentation</button>
          <button type="button" className="flex h-10 w-full items-center gap-3 rounded-md px-3 hover:bg-white/5"><Folder className="size-5" />Templates and Resources</button>
        </div>

        <div className="mb-4 h-[78px] overflow-hidden rounded-lg bg-white px-2 py-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/pages/dashboard/gov-sa-dew-logo.png" alt="Government of South Australia, Department for Environment and Water" className="h-full w-full object-contain" />
        </div>

        <button type="button" className="flex h-16 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.01] px-3 text-left">
          <Avatar initials="G" size="md" alt="Guest" />
          <span className="flex-1 text-sm font-semibold">Guest</span>
          <ChevronSelectorVertical className="size-4 text-white/70" />
        </button>
      </div>
    </aside>
  );
}

function ProjectList({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => projects.filter(([id, name]) => `${id} ${name}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <section className="flex h-full w-96 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="h-[132px] shrink-0 px-3 py-5">
        <h2 className="text-2xl font-semibold leading-8 text-brand-700">Projects</h2>
        <div className="mt-6 flex h-10 gap-1">
          <Input value={query} onChange={setQuery} placeholder="Search by project ID or name" icon={SearchLg} className="h-10" />
          <button type="button" aria-label="Advanced search" title="Advanced search" className="flex size-10 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 shadow-xs hover:bg-gray-50">
            <Sliders02 className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex h-[30px] shrink-0 items-center justify-between border-y border-gray-200 bg-gray-25 px-3 text-xs font-medium text-gray-700">
        <span>128 Projects</span>
        <button type="button" className="flex items-center gap-1 text-gray-600">Featured <ChevronDown className="size-4" /></button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {filtered.map(([id, name, description]) => {
          const current = selected === id;
          return (
            <button
              type="button"
              key={id}
              onClick={() => onSelect(id)}
              className={`block h-[85px] w-full border-b px-4 py-2 text-left ${current ? "border-brand-100 bg-gradient-to-r from-brand-25 via-brand-50 to-brand-50" : "border-gray-200 bg-white hover:bg-gray-25"}`}
            >
              <span className={`block text-sm font-medium leading-5 ${current ? "text-brand-700" : "text-gray-600"}`}>{id}</span>
              <span className="mt-0.5 block truncate text-sm font-medium leading-5 text-gray-900">{name}</span>
              <span className="mt-1 block truncate text-sm leading-5 text-gray-600">{description}</span>
            </button>
          );
        })}
        {filtered.length === 0 && <p className="px-4 py-8 text-center text-sm text-gray-600">No projects found</p>}
      </div>
    </section>
  );
}

function ProjectHeader({ name, view, setView }: { name: string; view: "tree" | "table"; setView: (view: "tree" | "table") => void }) {
  return (
    <header className="h-[172px] shrink-0 border-b border-brand-100 bg-brand-50">
      <div className="h-[53px] bg-brand-800 px-4 py-2 text-white">
        <p className="text-xs font-medium uppercase leading-[18px]">Project</p>
        <h2 className="truncate text-base font-medium leading-6">{name}</h2>
      </div>

      <div className="grid h-[51px] grid-cols-[125px_125px_125px_125px_1fr] items-center border-b border-brand-100 px-3">
        <Meta label="Project ID" value="BD- 5034" />
        <Meta label="Start Date" value="12 Jul 2025" />
        <Meta label="End Date" value="-" />
        <div className="h-8 border-l border-brand-200 px-3">
          <p className="text-xs leading-[18px] text-brand-600">Status</p>
          <BadgeWithDot type="pill-color" color="success" size="sm">Active</BadgeWithDot>
        </div>
        <Meta label="Published by" value="Department of Environment and Water" />
      </div>

      <div className="flex h-[67px] items-center justify-between px-3">
        <div className="flex min-w-0 items-center gap-2 text-sm text-gray-700">
          <Folder className="size-5 shrink-0" />
          <span className="truncate">{name}</span>
          <Badge type="pill-color" color="brand" size="sm">Project</Badge>
        </div>
        <div className="flex items-center rounded-lg bg-brand-100/70 p-1">
          <IconButton label="Tree view" icon={Dataflow02} active={view === "tree"} onClick={() => setView("tree")} />
          <IconButton label="Table view" icon={Table} active={view === "table"} onClick={() => setView("table")} />
        </div>
      </div>
    </header>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="h-8 border-l border-brand-200 px-3 first:border-l-0 first:pl-0">
      <p className="text-xs leading-[18px] text-brand-600">{label}</p>
      <p className="truncate text-xs font-medium leading-[18px] text-brand-950">{value}</p>
    </div>
  );
}

function RecordTree({ selected, onSelect }: { selected: string; onSelect: (label: string) => void }) {
  return (
    <section aria-label="Project record tree" className="h-full w-96 shrink-0 overflow-y-auto border-r border-gray-200 bg-white p-2">
      {treeRows.map(({ label, icon: RowIcon, depth, branch }, index) => (
        <button
          type="button"
          key={`${label}-${index}`}
          onClick={() => onSelect(label)}
          style={{ paddingLeft: 8 + depth * 24 }}
          className={`relative flex h-11 w-full items-center gap-2 rounded-md pr-2 text-left text-sm ${selected === label ? "bg-brand-50 text-gray-900" : "text-gray-700 hover:bg-gray-25"}`}
        >
          {depth > 0 && <span aria-hidden className="absolute bottom-1/2 h-[calc(100%+1px)] w-px bg-gray-200" style={{ left: 15 + depth * 24 }} />}
          {depth > 0 && <span aria-hidden className="absolute h-px w-3 bg-gray-200" style={{ left: 15 + depth * 24, top: 22 }} />}
          <span className="relative z-10 flex size-4 shrink-0 items-center justify-center bg-white text-gray-400">
            {branch ? <ChevronDown className="size-4" /> : <span className="size-4" />}
          </span>
          <RowIcon className={`relative z-10 size-4 shrink-0 ${depth === 0 ? "text-brand-700" : "text-gray-400"}`} />
          <span className="relative z-10 truncate">{label}</span>
        </button>
      ))}
    </section>
  );
}

function Accordion({ title, children, initiallyOpen = true, icon: SectionIcon = CheckCircle }: { title: string; children?: React.ReactNode; initiallyOpen?: boolean; icon?: Icon }) {
  const [open, setOpen] = useState(initiallyOpen);
  return (
    <section className="overflow-hidden rounded-lg border border-brand-100 bg-white">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className={`flex h-12 w-full items-center gap-3 px-4 text-left ${open ? "border-b border-brand-100" : ""}`}>
        <span className="flex size-8 items-center justify-center rounded-full bg-brand-50 text-brand-600"><SectionIcon className="size-4" /></span>
        <span className="flex-1 text-base font-medium text-brand-600">{title}</span>
        {open ? <ChevronUp className="size-5 text-brand-600" /> : <ChevronDown className="size-5 text-brand-600" />}
      </button>
      {open && <div className="p-4">{children}</div>}
    </section>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[180px_minmax(0,1fr)] gap-12 text-sm leading-5">
      <dt className="text-gray-600">{label}</dt>
      <dd className="text-gray-700">{children}</dd>
    </div>
  );
}

function ProjectDetails({ name }: { name: string }) {
  return (
    <section className="h-full min-w-0 flex-1 overflow-y-auto bg-gray-25">
      <div className="sticky top-0 z-10 flex h-[45px] items-center justify-between border-b border-gray-200 bg-white px-4">
        <div className="flex min-w-0 items-center gap-2">
          <Badge type="pill-color" color="brand" size="sm">BD - 5034</Badge>
          <h2 className="truncate text-base font-semibold text-gray-900">{name}</h2>
        </div>
        <IconButton label="Close project details" icon={X} />
      </div>

      <div className="space-y-4 p-4">
        <Accordion title="Project Details">
          <dl className="space-y-3">
            <DetailRow label="Project No">BD - 5034</DetailRow>
            <DetailRow label="Short Title (Display Name)">{name}</DetailRow>
            <DetailRow label="Full Project Name">Undertaking a comprehensive rodents survey of the Fleurieu Coast, South Australia, to identify rare rodents.</DetailRow>
            <DetailRow label="Start Date">-</DetailRow>
            <DetailRow label="End Date">-</DetailRow>
            <DetailRow label="Attached Resources"><button type="button" className="font-semibold text-brand-700 hover:underline">04</button></DetailRow>
            <DetailRow label="Nested Records">
              <div className="grid grid-cols-3">
                <span>Events<br /><span className="text-gray-500">--</span></span>
                <span>Occurrences<br /><span className="text-gray-500">--</span></span>
                <span>Observations<br /><span className="text-gray-500">--</span></span>
              </div>
            </DetailRow>
          </dl>
        </Accordion>

        <Accordion title="Overview">
          <div>
            <h3 className="text-base font-medium text-gray-700">Abstract</h3>
            <p className="mt-3 line-clamp-4 text-base leading-6 text-gray-600">
              The Rare Rodents project is a collaborative biodiversity initiative that takes a community-centred approach to improving knowledge and conservation outcomes for South Australia&apos;s rare and threatened rodent species. The project brings together ecologists, conservation biologists, land managers, government agencies, researchers, Traditional Owners, and community members to collect, manage, and share valuable information about rodent populations.
            </p>
            <button type="button" className="mt-2 text-sm font-semibold text-brand-700 hover:underline">Read more</button>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h3 className="mb-4 text-base font-medium text-gray-700">Geographic scope</h3>
              <div className="h-[219px] overflow-hidden rounded-lg bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/pages/projects/geographic-scope.png" alt="Map of the project geographic scope" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </Accordion>

        <Accordion title="Data owner" initiallyOpen={false} />
        <Accordion title="Project contacts" initiallyOpen={false} />
        <Accordion title="Methods" initiallyOpen={false} />
      </div>
    </section>
  );
}

function TableView() {
  return (
    <section className="flex h-full flex-1 flex-col bg-gray-25 p-4">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="grid h-10 grid-cols-[160px_1fr_180px_160px] items-center bg-gray-50 px-4 text-xs font-semibold text-gray-600">
          <span>Record type</span><span>Name</span><span>Identifier</span><span>Status</span>
        </div>
        {treeRows.slice(1).map((row, index) => (
          <div key={`${row.label}-${index}`} className="grid h-12 grid-cols-[160px_1fr_180px_160px] items-center border-t border-gray-200 px-4 text-sm text-gray-700">
            <span>{row.label.split(" ")[0]}</span><span>{row.label}</span><span>BD-{5034 + index}</span><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-success-500" />Active</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ProjectsV2Page() {
  const [projectId, setProjectId] = useState<string>(projects[0][0]);
  const [selectedRecord, setSelectedRecord] = useState(treeRows[0].label);
  const [view, setView] = useState<"tree" | "table">("tree");
  const project = projects.find(([id]) => id === projectId) ?? projects[0];

  return (
    <div className="h-screen min-h-[720px] min-w-[1440px] overflow-hidden bg-white font-barlow">
      <div className="flex h-full">
        <Sidebar />
        <ProjectList selected={projectId} onSelect={setProjectId} />
        <main className="flex min-w-0 flex-1 flex-col">
          <ProjectHeader name={project[1]} view={view} setView={setView} />
          <div className="min-h-0 flex flex-1">
            {view === "tree" ? (
              <>
                <RecordTree selected={selectedRecord} onSelect={setSelectedRecord} />
                <ProjectDetails name={project[1]} />
              </>
            ) : <TableView />}
          </div>
        </main>
      </div>
    </div>
  );
}
