"use client";

import { defineChart } from "@tanstack/charts";
import { pie, polar, radialArc } from "@tanstack/charts/polar";
import { Chart } from "@tanstack/charts/react";

// Records-by-taxonomic-group breakdown from the SA Flora and Fauna dashboard reference
// screenshot (DEW manages 6,860,942 records). Real TanStack Charts grammar (`pie` +
// `radialArc` inside a `polar` mark), not a hand-rolled SVG - per the user's request to pull
// in TanStack Charts for this. Colors come from the design system's utility badge/tag
// palette (globals.css) rather than invented hex values, since that's the one place this
// codebase already declares a categorical color set.
interface TaxonSlice {
  taxon: string;
  percent: number;
}

const taxonBreakdown: TaxonSlice[] = [
  { taxon: "Vascular plants", percent: 45.6 },
  { taxon: "Birds", percent: 35.0 },
  { taxon: "Mammals", percent: 9.9 },
  { taxon: "Fish", percent: 3.9 },
  { taxon: "Reptiles", percent: 2.9 },
  { taxon: "Amphibians", percent: 1.2 },
  { taxon: "Invertebrates", percent: 0.7 },
  { taxon: "Algae", percent: 0.6 },
  { taxon: "Other", percent: 0.2 },
];

const taxonColors = [
  "var(--color-utility-brand-500)",
  "var(--color-utility-sky-500)",
  "var(--color-utility-purple-500)",
  "var(--color-utility-orange-500)",
  "var(--color-utility-pink-500)",
  "var(--color-utility-yellow-500)",
  "var(--color-utility-slate-500)",
  "var(--color-utility-green-500)",
  "var(--color-utility-red-500)",
];

const taxonNames = taxonBreakdown.map((slice) => slice.taxon);

const arcs = pie(taxonBreakdown, {
  value: "percent",
  startAngle: 0,
  endAngle: Math.PI * 2,
});

const definition = defineChart({
  marks: [
    polar({
      radiusRatio: 0.92,
      scales: { angle: null, radius: null },
      marks: [
        radialArc(arcs, {
          id: "taxon-slices",
          key: "taxon",
          color: "taxon",
          stroke: "var(--color-bg-primary)",
          strokeWidth: 1,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  color: { domain: taxonNames, range: taxonColors },
  margin: 0,
});

export function TaxonPieChart() {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="h-[200px] w-[200px] shrink-0">
        <Chart definition={definition} height={200} initialWidth={200} ariaLabel="Flora and fauna records by taxonomic group" />
      </div>
      <ul className="flex w-full flex-1 flex-col gap-1.5">
        {taxonBreakdown.map((slice, index) => (
          <li key={slice.taxon} className="flex items-center gap-2 text-sm">
            <span className="size-2.5 shrink-0 rounded-full" style={{ background: taxonColors[index] }} />
            <span className="flex-1 text-secondary">{slice.taxon}</span>
            <span className="tabular-nums text-tertiary">{slice.percent}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
