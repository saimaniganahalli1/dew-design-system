"use client";

import { RefreshCcw01 } from "@untitledui/icons";

// The Home section's second tab (see app/projects/_shared/home-dashboard.tsx for the first) -
// org-wide accountability numbers and the map, restored verbatim from before the task-first
// dashboard redesign rather than re-invented, since this is exactly the content that redesign
// moved out of "My Dashboard" and into its own tab instead of deleting. Still static placeholder
// content - real charts (species-over-time, records growth) are a separate follow-up via
// TanStack Charts once real chart data/shapes are scoped, not part of this pass.
//
// Header row matches "My Dashboard"'s layout style (a bordered title row, content below) rather
// than starting straight into the metric grid - flagged directly by the user: this tab had no
// title at all. The sync timestamp lives in that same row, same "note" placement as a KpiStat's
// supporting text - this is aggregate org-wide data, refreshed on a schedule rather than reflecting
// live user actions the way "Needs your attention" does, so it needs to say when it's from.

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-secondary p-6">
      <p className="text-4xl font-normal text-primary tabular-nums">{value}</p>
      <p className="text-xs font-semibold tracking-wide text-quaternary uppercase">{label}</p>
    </div>
  );
}

export function DataOverviewContent() {
  return (
    <>
      <div className="flex flex-col gap-4 border-b border-secondary p-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="text-2xl font-medium text-primary">Data Overview</p>
          <div className="flex items-center gap-1.5 text-sm text-tertiary">
            <RefreshCcw01 className="size-3.5 text-quaternary" />
            <span>Last synced 2 hours ago</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard value="6,850,250" label="Records" />
          <MetricCard value="9,064" label="Flora Species" />
          <MetricCard value="4,170" label="Fauna Species" />
          <MetricCard value="1,435" label="Projects across SA" />
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex w-full flex-col gap-3 rounded-lg bg-secondary p-4 lg:w-[280px] lg:shrink-0">
            <p className="text-sm text-primary">Taxon filter - Flora, Fauna, All</p>
            <p className="text-sm text-primary">Taxon filter - Flora, Fauna, All</p>
          </div>

          <div className="relative flex min-h-[460px] w-full flex-1 flex-col gap-1 rounded-lg bg-secondary p-4">
            <p className="text-sm text-primary">Title</p>
            <p className="text-xs text-tertiary">Sub-title</p>
            <div className="h-9 w-40 self-end rounded" style={{ background: "var(--color-gray-400)" }} />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-primary">Map view</p>
          </div>
        </div>
      </div>
    </>
  );
}
