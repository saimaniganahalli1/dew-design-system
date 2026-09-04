"use client";

import { useState } from "react";
import { SearchMd, Upload01, ChevronSelectorVertical, TrendUp02, ArrowNarrowRight } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { Avatar } from "@/components/base/avatar/avatar";
import { AlertFullWidth } from "@/components/application/alerts/alerts";
import { Inspectable, InspectorProvider, type InspectableToken } from "@/components/scaffold/token-inspector";

// Figma source: https://www.figma.com/design/SQ58QgwP9Xz0uo3tBpuf6e/DEW-Toolkit--version-1.0-?node-id=103-105
// "SCREEN" (BioData SA dashboard shell, 1440px) - an exploratory /pages/dashboard layout per
// CONTEXT.md's "Exploratory page layouts (/pages/<page-name>)" section. Unlike a /test-*
// screen (a fixed, already-decided Figma frame), this explores what the dashboard could look
// like while the surrounding IA - primary icon rail, contextual sidebar, breadcrumb - is still
// undecided, so that chrome is built as simplified structural placeholder from real tokens
// rather than pixel-matched or ?-blocked. Every contained widget (search, buttons, avatar,
// alert, date range) still goes through the same "real DEW or honest ? gap" rule as a /test-*
// screen. Figma's yellow "GENERAL NOTES" sticky note (node 103:225, a designer's comment layer,
// not product UI) is excluded entirely - see the mapping table below.

// ─────────────────────────────────────────────────────────────────────────
// Local screen chrome - NOT real DEW components. Nav rail/sidebar/footer links
// are exempt from fidelity per CONTEXT.md (IA isn't decided yet); KPI row,
// metric cards, filter panel, and map panel are structural shells composed
// from real tokens because nothing under components/base|application/** models
// these patterns yet - logged in the mapping table as composed, not real.
// ─────────────────────────────────────────────────────────────────────────

function KpiStat({
  value,
  label,
  note,
  trend,
  action,
  last = false,
}: {
  value: string;
  label: string;
  note: string;
  trend?: boolean;
  action?: boolean;
  last?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-2 pr-6 ${last ? "" : "border-r border-secondary"}`}>
      <p className="text-2xl font-medium text-primary tabular-nums">{value}</p>
      <p className="text-md font-medium text-primary">{label}</p>
      <div className="flex items-center gap-1.5 text-sm text-tertiary">
        {trend && <TrendUp02 className="size-3.5 text-fg-success-primary" />}
        <span>{note}</span>
        {action && <ArrowNarrowRight className="size-3.5 text-quaternary" />}
      </div>
    </div>
  );
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-secondary p-6">
      <p className="text-4xl font-normal text-primary tabular-nums">{value}</p>
      <p className="text-xs font-semibold tracking-wide text-quaternary uppercase">{label}</p>
    </div>
  );
}

// Gap marker - InputDate (components/base/input/input-date.tsx) is a single editable date
// value driven by react-aria DateSegments, it has no prev/range-text/next composition. This
// prev-arrow / calendar-icon / range-text / next-arrow control has no real DEW equivalent.
function GapDateRange() {
  return (
    <div className="flex w-[260px] items-center gap-2 rounded-lg border border-dashed p-3" style={{ borderColor: "var(--color-gray-300)" }}>
      <span
        className="flex size-5 shrink-0 items-center justify-center rounded text-xs font-semibold"
        style={{ background: "var(--color-gray-100)", color: "var(--color-gray-400)" }}
      >
        ?
      </span>
      <span className="text-sm text-quaternary">Date range control - not in DEW yet</span>
    </div>
  );
}

const searchTokens: InspectableToken[] = [
  { cls: "bg-primary", cssVar: "--ui-bg-primary", value: "#FFFFFF", swatch: true },
  { cls: "ring-primary", cssVar: "--ui-ring-primary → --color-gray-300", value: "#D2D0CE", swatch: true },
  { cls: "ring-brand (focus)", cssVar: "--ui-ring-brand → --color-brand-500", value: "#2A667C", swatch: true },
  { cls: "text-fg-quaternary (icon)", cssVar: "--color-fg-quaternary → --color-gray-500", value: "#8F8B87", swatch: true },
  { cls: "shadow-xs", cssVar: "--shadow-xs", value: "0 1px 2px rgba(16,24,40,.05)" },
];
const primaryButtonTokens: InspectableToken[] = [
  { cls: "bg-brand-solid", cssVar: "--ui-bg-brand-solid → --color-brand-600", value: "#185E74", swatch: true },
  { cls: "hover:bg-brand-solid_hover", cssVar: "--ui-bg-brand-solid_hover → --color-brand-700", value: "#0D576E", swatch: true },
  { cls: "shadow-xs-skeuomorphic", cssVar: "--shadow-xs-skeuomorphic", value: "inset border + drop shadow" },
  { cls: "text-white", cssVar: "--color-fg-white", value: "#FFFFFF", swatch: true },
];
const secondaryButtonTokens: InspectableToken[] = [
  { cls: "bg-primary", cssVar: "--ui-bg-primary", value: "#FFFFFF", swatch: true },
  { cls: "ring-primary", cssVar: "--ui-ring-primary → --color-gray-300", value: "#D2D0CE", swatch: true },
  { cls: "text-secondary", cssVar: "--ui-text-secondary → --color-gray-700", value: "#585451", swatch: true },
  { cls: "hover:bg-primary_hover", cssVar: "--ui-bg-primary_hover → --color-gray-50", value: "#F8F8F7", swatch: true },
];
const avatarTokens: InspectableToken[] = [
  { cls: "bg-tertiary (fallback)", cssVar: "--ui-bg-tertiary → --color-gray-100", value: "#F2F2F1", swatch: true },
  { cls: "text-quaternary (initials)", cssVar: "--ui-text-quaternary → --color-gray-500", value: "#8F8B87", swatch: true },
  { cls: "outline-[var(--ui-border-secondary)]", cssVar: "--ui-border-secondary → --color-gray-200", value: "#E5E4E2", swatch: true },
];
const alertTokens: InspectableToken[] = [
  { cls: "bg-secondary (root)", cssVar: "--ui-bg-secondary → --color-gray-50", value: "#F8F8F7", swatch: true },
  { cls: "text-secondary (title)", cssVar: "--ui-text-secondary → --color-gray-700", value: "#585451", swatch: true },
  { cls: "text-tertiary (description)", cssVar: "--ui-text-tertiary → --color-gray-600", value: "#706B68", swatch: true },
  { cls: "text-fg-secondary (icon, modern/gray)", cssVar: "--color-fg-secondary → --color-gray-700", value: "#585451", swatch: true },
];
const kpiShellTokens: InspectableToken[] = [
  { cls: "text-primary (value/label)", cssVar: "--ui-text-primary → --color-gray-900", value: "#2E2925", swatch: true },
  { cls: "text-tertiary (note)", cssVar: "--ui-text-tertiary → --color-gray-600", value: "#706B68", swatch: true },
  { cls: "border-secondary (divider)", cssVar: "--ui-border-secondary → --color-gray-200", value: "#E5E4E2", swatch: true },
];
const metricCardTokens: InspectableToken[] = [
  { cls: "border-secondary", cssVar: "--ui-border-secondary → --color-gray-200", value: "#E5E4E2", swatch: true },
  { cls: "text-primary (value)", cssVar: "--ui-text-primary → --color-gray-900", value: "#2E2925", swatch: true },
  { cls: "text-quaternary (label)", cssVar: "--ui-text-quaternary → --color-gray-500", value: "#8F8B87", swatch: true },
];
const panelTokens: InspectableToken[] = [
  { cls: "bg-secondary", cssVar: "--ui-bg-secondary → --color-gray-50", value: "#F8F8F7", swatch: true },
  { cls: "text-primary", cssVar: "--ui-text-primary → --color-gray-900", value: "#2E2925", swatch: true },
];
const navChromeTokens: InspectableToken[] = [
  { cls: "bg-secondary (rail/sidebar)", cssVar: "--ui-bg-secondary → --color-gray-50", value: "#F8F8F7", swatch: true },
  { cls: "border-secondary", cssVar: "--ui-border-secondary → --color-gray-200", value: "#E5E4E2", swatch: true },
  { cls: "text-quaternary (section labels)", cssVar: "--ui-text-quaternary → --color-gray-500", value: "#8F8B87", swatch: true },
];

const mapping = [
  { layer: "Header › “BioData SA” wordmark + gov logo", figma: "Text + image, Barlow Medium", dew: "Plain text + downloaded asset", note: "Wordmark is plain text, not a component. Gov crest image (node 103:108) has no DEW equivalent - downloaded and committed to public/pages/dashboard/gov-sa-dew-logo.png per the figma-design-to-code skill's asset rule, cropped to match Figma's own 44px sprite framing." },
  { layer: "Header › Breadcrumb (Home / ORG / Project / ... / [Location])", figma: "Text + pill + chevron-selector-vertical ×2", dew: "Nav chrome - structural placeholder", note: "Explicitly exempt from fidelity per CONTEXT.md's 'Exploratory page layouts' (IA not decided yet). [Location] rendered literally, same convention as test-site-details' [Custom field name]." },
  { layer: "Header › Search field", figma: "Input with leading search-refraction icon + trailing help-circle", dew: "Input (icon + tooltip props)", note: "components/base/input/input.tsx - icon renders the leading glyph, tooltip renders the trailing HelpCircle wrapped in a real Tooltip automatically. No separate Tooltip composition needed - Input already does this internally." },
  { layer: "Header › “Upload a dataset”", figma: "Solid button, bg-brand-solid, upload-01 icon", dew: 'Button color="primary" iconLeading={Upload01}', note: "components/base/buttons/button.tsx" },
  { layer: "Header › “Action 2”", figma: "Outline button, generic placeholder icon", dew: 'Button color="secondary"', note: "Figma's icon (node 19:4069) is itself literally named \"placeholder\" - a generic filler glyph, not a specified icon - so no iconLeading was invented for it." },
  { layer: "Header › Avatar", figma: "Circle placeholder", dew: "Avatar", note: 'components/base/avatar/avatar.tsx - initials="OW" (Olivia Wyatt), no src, matching the "Hi, Olivia" heading below.' },
  { layer: "Primary icon sidebar (80px)", figma: "6 plain icon squares, first active/darker", dew: "Nav chrome - structural placeholder", note: "Exempt from fidelity (icons/spacing not locked in) - rendered as plain token-coloured squares, not the specific Figma icons." },
  { layer: "Contextual sidebar (286px)", figma: "DASHBOARD + [CATEGORY] nav lists, footer links", dew: "Nav chrome - structural placeholder", note: "Same exemption. [CATEGORY] rendered literally." },
  { layer: "Info banner (\"This is where alerts go\")", figma: "Full-width bar, info-circle icon, text, x-close", dew: "AlertFullWidth", note: 'components/application/alerts/alerts.tsx - color="default" (renders InfoCircle via its own iconMap, no manual icon import needed). The banner text is itself a Figma placeholder instruction ("this is where alerts go"), not real copy - rendered verbatim as the title, same convention as test-site-details\' literal "[Custom field name]". description left empty since Figma only specifies one line of copy; confirmLabel is a required prop on the type but onConfirm is never wired, so no confirm button renders - same allowance CONTEXT.md gives AlertFloating/AlertFullWidth elsewhere. onClose is wired for real (dismisses the banner).' },
  { layer: "“Hi, Olivia” heading", figma: "Text, Barlow Medium 24px", dew: "Plain text - not a component", note: "Static heading, no interactive behaviour." },
  { layer: "KPI row (Species Observed / Datasets contributed / Data label)", figma: "3 stat groups with divider borders, trend/action sub-line", dew: "Composed - not a real component", note: "border-secondary dividers, text-primary/text-tertiary. No DEW \"stat\" component exists yet - candidate for future ingest." },
  { layer: "Quick actions row (×4)", figma: "4 outline buttons, generic placeholder icon", dew: 'Button color="secondary" ×4', note: "Same placeholder-icon situation as \"Action 2\" - no iconLeading invented." },
  { layer: "Date range control", figma: "chevron-left + calendar icon + range text + chevron-right, styled like an Input", dew: "? gap - GapDateRange", note: "input-date.tsx is a single-value DateField (react-aria DateSegments), not this prev/range-text/next composition. No real DEW match - flagged, not faked." },
  { layer: "4 metric cards (Records / Flora / Fauna / Projects)", figma: "Bordered cards, large number + uppercase label", dew: "Composed - not a real component", note: "border-secondary / text-primary / text-quaternary. Candidate for future ingest as a \"stat card\"." },
  { layer: "Filter panel (\"Taxon filter - Flora, Fauna, All\" ×2)", figma: "Gray box, 2 lines of placeholder text", dew: "Composed - not a real component", note: "Literal Figma placeholder copy rendered verbatim, same convention as test-site-details' bracketed placeholders." },
  { layer: "Map view panel (\"Title\" / \"Sub-title\" / \"Map view\" / gray rectangle)", figma: "Large gray panel, header text, unlabelled button-shaped rectangle", dew: "Composed - not a real component", note: "Title/Sub-title/Map view rendered verbatim as literal placeholder text. The gray rectangle carries no label or icon in Figma, so it's rendered as a plain placeholder shape rather than guessing what real Button it should be - fabricating a label would violate \"no invented props/content\"." },
  { layer: "Yellow \"GENERAL NOTES\" sticky note", figma: "Highlighter-yellow card, \"Patterns / ALA left filters\" list (node 103:225)", dew: "Excluded - not rendered", note: "A designer's comment layer (comment-style yellow card, \"NOTES\" label), not product UI, per CONTEXT.md's \"Exploratory page layouts\" annotation rule." },
];

export default function DashboardPage() {
  const [bannerOpen, setBannerOpen] = useState(true);

  return (
    <InspectorProvider>
      <div className="font-barlow flex min-h-screen flex-col">
        {/* ── Header ── */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-secondary bg-primary px-4">
          <div className="flex items-center gap-4">
            <div className="relative size-11 shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pages/dashboard/gov-sa-dew-logo.png"
                alt="Government of South Australia, Department for Environment and Water"
                className="absolute top-[-0.46%] left-0 w-[484%] max-w-none"
              />
            </div>
            <p className="text-[17px] font-medium tracking-tight text-primary">BioData SA</p>
            <nav className="flex items-center gap-2 text-sm text-tertiary" aria-label="Breadcrumb">
              <span>Home</span>
              <span className="flex items-center gap-1 rounded-full border border-secondary px-1.5 py-0.5 text-[10px] font-medium">
                ORG <ChevronSelectorVertical className="size-3" />
              </span>
              <span>/</span>
              <span className="flex items-center gap-1">
                Project <ChevronSelectorVertical className="size-3" />
              </span>
              <span>/</span>
              <span>...</span>
              <span>/</span>
              <span className="text-primary">[Location]</span>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-[395px]">
                <Inspectable label='Input (icon + tooltip)' source="components/base/input/input.tsx" tokens={searchTokens}>
                  <Input
                    placeholder="Search for species, projects or datasets ..."
                    icon={SearchMd}
                    tooltip="Search across species, project and dataset records"
                  />
                </Inspectable>
              </div>
              <Inspectable label='Button color="primary"' source="components/base/buttons/button.tsx" tokens={primaryButtonTokens}>
                <Button color="primary" iconLeading={Upload01}>Upload a dataset</Button>
              </Inspectable>
              <Inspectable label='Button color="secondary"' source="components/base/buttons/button.tsx" tokens={secondaryButtonTokens}>
                <Button color="secondary">Action 2</Button>
              </Inspectable>
            </div>
            <Inspectable label="Avatar" source="components/base/avatar/avatar.tsx" tokens={avatarTokens}>
              <Avatar size="md" initials="OW" alt="Olivia Wyatt" />
            </Inspectable>
          </div>
        </header>

        <div className="flex flex-1">
          {/* ── Primary icon sidebar (nav chrome - not pixel-matched) ── */}
          <Inspectable label="Nav chrome - structural placeholder (not pixel-matched)" source="app/pages/dashboard/page.tsx" tokens={navChromeTokens}>
            <aside className="flex w-20 shrink-0 flex-col items-center gap-3 border-r border-secondary bg-secondary py-4">
              <div className="size-12 rounded-lg" style={{ background: "var(--color-gray-400)" }} />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="size-12 rounded-lg bg-tertiary" />
              ))}
            </aside>
          </Inspectable>

          {/* ── Contextual sidebar (nav chrome - not pixel-matched) ── */}
          <Inspectable label="Nav chrome - structural placeholder (not pixel-matched)" source="app/pages/dashboard/page.tsx" tokens={navChromeTokens}>
            <aside className="flex w-[286px] shrink-0 flex-col justify-between border-r border-secondary bg-secondary p-4">
              <div className="flex flex-col gap-8">
                <div>
                  <p className="mb-3 text-xs font-semibold tracking-wide text-quaternary uppercase">Dashboard</p>
                  <ul className="flex flex-col gap-2 text-md text-primary">
                    <li>Overview</li>
                    <li>Track requests</li>
                    <li>Nav item 3</li>
                    <li>Nav item 4</li>
                  </ul>
                </div>
                <div className="border-t border-secondary pt-6">
                  <p className="mb-3 text-xs font-semibold tracking-wide text-quaternary uppercase">[CATEGORY]</p>
                  <ul className="flex flex-col gap-2 text-md text-primary">
                    <li>Nav item 1</li>
                    <li>Nav item 2</li>
                    <li>Nav item 3</li>
                    <li>Nav item 4</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 border-t border-secondary pt-4 text-[10px] font-semibold tracking-wide text-quaternary uppercase">
                <p>Privacy Policy</p>
                <p>Terms and Conditions</p>
                <p>Help and Documentation</p>
              </div>
            </aside>
          </Inspectable>

          {/* ── Main content ── */}
          <main className="flex flex-1 flex-col">
            {bannerOpen && (
              <Inspectable label="AlertFullWidth" source="components/application/alerts/alerts.tsx" tokens={alertTokens} className="w-full">
                <AlertFullWidth
                  title="This is where alerts go"
                  description=""
                  confirmLabel="Learn more"
                  onClose={() => setBannerOpen(false)}
                />
              </Inspectable>
            )}

            <div className="flex items-start justify-between gap-6 border-b border-secondary p-6">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <p className="text-2xl font-medium text-primary">Hi, Olivia</p>
                  <Inspectable label="Composed KPI shell (not a real component)" source="app/pages/dashboard/page.tsx" tokens={kpiShellTokens}>
                    <div className="flex items-start gap-6">
                      <KpiStat value="15" label="Species Observed" note="3 up from last week" trend />
                      <KpiStat value="3" label="Datasets contributed" note="1 dataset under review" />
                      <KpiStat value="0" label="Data label" note="Data label action" action last />
                    </div>
                  </Inspectable>
                </div>
                <div className="flex items-center gap-4">
                  <Inspectable label='Button color="secondary"' source="components/base/buttons/button.tsx" tokens={secondaryButtonTokens}>
                    <Button color="secondary">Upload a dataset</Button>
                  </Inspectable>
                  <Button color="secondary">Track requests</Button>
                  <Button color="secondary">Quick action 3</Button>
                  <Button color="secondary">Quick action 4</Button>
                </div>
              </div>
              <GapDateRange />
            </div>

            <div className="flex flex-col gap-6 p-6">
              <Inspectable label="Composed metric-card shell (not a real component)" source="app/pages/dashboard/page.tsx" tokens={metricCardTokens} className="flex gap-4">
                <div className="flex w-full gap-4">
                  <MetricCard value="6,850,250" label="Records" />
                  <MetricCard value="9,064" label="Flora Species" />
                  <MetricCard value="4,170" label="Fauna Species" />
                  <MetricCard value="1,435" label="Projects across SA" />
                </div>
              </Inspectable>

              <div className="flex gap-4">
                <Inspectable label="Composed filter panel (not a real component)" source="app/pages/dashboard/page.tsx" tokens={panelTokens} className="w-[280px] shrink-0">
                  <div className="flex w-full flex-col gap-3 rounded-lg bg-secondary p-4">
                    <p className="text-sm text-primary">Taxon filter - Flora, Fauna, All</p>
                    <p className="text-sm text-primary">Taxon filter - Flora, Fauna, All</p>
                  </div>
                </Inspectable>

                <Inspectable label="Composed map panel (not a real component)" source="app/pages/dashboard/page.tsx" tokens={panelTokens} className="flex-1">
                  <div className="relative flex min-h-[460px] w-full flex-col gap-1 rounded-lg bg-secondary p-4">
                    <p className="text-sm text-primary">Title</p>
                    <p className="text-xs text-tertiary">Sub-title</p>
                    <div className="h-9 w-40 self-end rounded" style={{ background: "var(--color-gray-400)" }} />
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-primary">Map view</p>
                  </div>
                </Inspectable>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ── Component mapping ── */}
      <div className="mx-auto max-w-5xl px-8 py-12">
        <h2 className="mb-2 text-xl font-semibold text-primary">Component mapping</h2>
        <p className="mb-4 text-sm text-tertiary">
          Every Figma layer in node 103:105 traced to the DEW component (or honest gap) that renders it. Nav chrome
          (icon rail, contextual sidebar, breadcrumb) is exempt from pixel fidelity per CONTEXT.md&apos;s
          &quot;Exploratory page layouts&quot; section, since the surrounding IA isn&apos;t decided yet.
        </p>
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

        <h2 className="mt-8 mb-2 text-xl font-semibold text-primary">New components identified (not blocking)</h2>
        <p className="mb-4 text-sm text-tertiary">
          One genuine gap remains open while mapping this screen - it doesn&apos;t block the rest of it. It&apos;s
          marked with a visible <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">?</code> in place of the
          date range control above, per the convention in <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">CONTEXT.md</code>.
          The KPI row, metric cards, filter panel, and map panel are structural shells (composed from tokens, not
          &quot;?&quot;-blocked) since blocking a whole section would swallow everything inside it - see the mapping
          table for each.
        </p>
        <div className="flex flex-wrap gap-4">
          {[{ label: "Date range control", note: "Prev-arrow / calendar / range-text / next-arrow composition - input-date.tsx only supports a single editable date value" }].map((g) => (
            <div key={g.label} className="flex w-56 flex-col items-center gap-2 rounded-xl p-6" style={{ border: "1.5px dashed var(--color-gray-300)", background: "var(--color-gray-50)" }}>
              <div className="flex size-9 items-center justify-center rounded-lg text-lg font-semibold" style={{ background: "var(--color-gray-200)", color: "var(--color-gray-500)" }}>
                ?
              </div>
              <p className="text-center text-xs text-quaternary">{g.label}</p>
              <p className="text-center text-[11px] text-quaternary">{g.note}</p>
            </div>
          ))}
        </div>
      </div>
    </InspectorProvider>
  );
}
