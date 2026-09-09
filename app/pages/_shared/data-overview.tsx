"use client";

import type { ReactNode } from "react";
import { RefreshCcw01 } from "@untitledui/icons";
import { Tab, TabList, TabPanel, Tabs } from "react-aria-components";
import { cx } from "@/utils/cx";
import { TaxonPieChart } from "@/app/pages/_shared/taxon-pie-chart";

// The Home section's second tab (see app/pages/_shared/home-dashboard.tsx for the first) -
// org-wide accountability numbers, not the signed-in user's own tasks. Restructured from a
// single "Data Overview" screen into "Data Dashboard": 4 sub-tabs (Overview/Flora/Fauna/
// Projects), matching the real SA Flora and Fauna dashboard the user shared as a reference.
// Only Overview is built this pass, per the user's explicit scoping ("Just do the overview
// tab") - Flora/Fauna/Projects render the same honest "hasn't been scoped yet" placeholder
// used for nav-chrome sections that don't have a page yet, rather than invented content.
//
// Sub-tabs reuse the underline-tab visual language already established for option-2's top nav
// (NavTopItem: active = font-medium text-brand-700 + a bg-brand-700 underline bar) instead of
// inventing a second tab style - this codebase doesn't have a wrapped Tabs component yet, so
// every Tabs usage hand-rolls its className off react-aria-components directly.

// The one card shell every bento data block on this tab shares - border, radius, and padding,
// so the metric tiles, the pie chart, and the map read as one consistent grid instead of each
// block inventing its own chrome (flagged directly by the user: normalise the bento blocks).
function BentoCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("flex flex-col gap-4 rounded-lg border border-secondary p-6", className)}>{children}</div>;
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <BentoCard className="flex-1 items-center justify-center gap-3 text-center">
      <p className="text-4xl font-normal text-primary tabular-nums">{value}</p>
      <p className="text-xs font-semibold tracking-wide text-quaternary uppercase">{label}</p>
    </BentoCard>
  );
}

function TabPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-secondary p-6 text-center">
      <p className="text-sm font-medium text-primary">{label}</p>
      <p className="text-sm text-tertiary">This tab hasn&apos;t been scoped yet.</p>
    </div>
  );
}

const dataDashboardTabs = [
  { id: "overview", label: "Overview" },
  { id: "flora", label: "Flora" },
  { id: "fauna", label: "Fauna" },
  { id: "projects", label: "Projects" },
];

export function DataOverviewContent() {
  return (
    <>
      <div className="flex flex-col gap-4 border-b border-secondary p-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="text-2xl font-medium text-primary">Data Dashboard</p>
          <div className="flex items-center gap-1.5 text-sm text-tertiary">
            <RefreshCcw01 className="size-3.5 text-quaternary" />
            <span>Last synced 2 hours ago</span>
          </div>
        </div>
      </div>

      <Tabs defaultSelectedKey="overview" className="flex flex-1 flex-col">
        <TabList aria-label="Data dashboard views" className="flex items-stretch gap-6 border-b border-secondary px-6">
          {dataDashboardTabs.map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              className={({ isSelected }) =>
                cx(
                  "relative flex cursor-pointer items-center px-1 py-3 text-sm outline-hidden",
                  isSelected ? "font-medium text-brand-700" : "text-tertiary hover:text-primary",
                )
              }
            >
              {({ isSelected }) => (
                <>
                  {tab.label}
                  {isSelected && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-700" />}
                </>
              )}
            </Tab>
          ))}
        </TabList>

        <TabPanel id="overview" className="flex flex-col gap-4 p-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <MetricCard value="6,860,942" label="Records" />
            <MetricCard value="9,064" label="Flora Species" />
            <MetricCard value="4,170" label="Fauna Species" />
            <MetricCard value="1,435" label="Projects across SA" />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            <BentoCard className="w-full lg:flex-1">
              <p className="text-sm font-medium text-primary">Records by taxonomic group</p>
              <TaxonPieChart />
            </BentoCard>

            <BentoCard className="w-full gap-1 lg:flex-1">
              <p className="text-sm font-medium text-primary">Number of flora and fauna records per mapsheet</p>
              <p className="text-xs text-tertiary">South Australia</p>
              <div className="relative mt-2 flex min-h-[380px] flex-1 items-center justify-center rounded-md bg-secondary">
                <p className="text-sm text-primary">Map view</p>
              </div>
            </BentoCard>
          </div>
        </TabPanel>

        <TabPanel id="flora" className="p-6">
          <TabPlaceholder label="Flora" />
        </TabPanel>
        <TabPanel id="fauna" className="p-6">
          <TabPlaceholder label="Fauna" />
        </TabPanel>
        <TabPanel id="projects" className="p-6">
          <TabPlaceholder label="Projects" />
        </TabPanel>
      </Tabs>
    </>
  );
}
