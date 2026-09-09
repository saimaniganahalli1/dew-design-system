"use client";

import type React from "react";
import { PageHeader } from "@/components/PageHeader";
import { DateRangeControl } from "@/components/custom/date-range/date-range-control";

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-wrap items-center gap-6 rounded-xl border border-secondary bg-secondary p-6">
    <p className="mb-1 w-full text-xs font-semibold text-quaternary uppercase tracking-widest text-balance">
      {label}
    </p>
    {children}
  </div>
);

const props = [
  { name: "defaultValue", type: "DateRange", default: "last 5 days" },
  { name: "value", type: "DateRange", default: "-" },
  { name: "onChange", type: "(value: DateRange) => void", default: "-" },
  { name: "className", type: "string", default: "-" },
];

export default function CustomDateRangePage() {
  return (
    <div className="prose-doc">
      <PageHeader
        section="Custom Components"
        title="Date range"
        description="A prev-arrow / calendar / range-text / next-arrow control, styled like an Input. Not yet part of the design system - documented here until a stakeholder decides where (or whether) it belongs."
      />

      {/* ── What "Custom Components" means ── */}
      <div className="mb-2 flex gap-3 rounded-xl border border-secondary bg-secondary p-5">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-secondary text-balance">What lives in this section</p>
          <p className="text-sm text-tertiary text-balance" style={{ lineHeight: "1.7" }}>
            Components built for a specific screen because nothing in <code>components/base/**</code> or{" "}
            <code>components/application/**</code> covers the pattern - real and working, not a{" "}
            <code>?</code> placeholder, but not yet reviewed or adopted as part of the design system either.
            Once a stakeholder picks a direction for a given pattern, it moves out of{" "}
            <code>components/custom/**</code> and into <code>components/base</code> or{" "}
            <code>components/application</code> (with a real entry in the Components section) - or gets
            replaced entirely if the direction changes. Nothing here should be treated as a locked API yet.
          </p>
        </div>
      </div>

      {/* ── Live example ── */}
      <h2 className="text-balance">Live example</h2>
      <p className="text-balance">
        Fully working, not a static mock - click the centre to open the range calendar, or the outer arrows
        to step the whole range forward/back by its own length.
      </p>
      <Section label="Default">
        <DateRangeControl />
      </Section>

      {/* ── Why custom ── */}
      <h2 className="text-balance">Why this is custom, not real DEW</h2>
      <p className="text-balance">
        <code>components/base/input/input-date.tsx</code> (<code>InputDate</code>) is a single-value{" "}
        <code>DateField</code> driven by react-aria <code>DateSegment</code>s - it has no prev/range-text/
        next composition, and no notion of a range at all. This control needs both, so no existing DEW
        component matches it. It&apos;s built from real primitives rather than invented from scratch though:
        react-aria&apos;s <code>RangeCalendar</code>/<code>DialogTrigger</code> for the interaction, and
        the real DEW <code>Popover</code> (<code>components/base/select/popover.tsx</code>) for the
        overlay shell - so promoting it later is mostly a matter of relocating the file and settling on an
        API, not rebuilding it.
      </p>

      {/* ── Behaviour ── */}
      <h2 className="text-balance">Behaviour</h2>
      <Section label="Interactions">
        <ul className="w-full list-disc pl-5 text-sm text-secondary" style={{ lineHeight: "1.9" }}>
          <li>Centre (calendar icon + range text) opens a popover with a two-week-style month range calendar.</li>
          <li>Selecting a new start/end date in the calendar updates the trigger text and closes on completion.</li>
          <li>The outer chevrons step the whole range forward/back by its own length (e.g. a 5-day range steps by 5 days) without opening the popover.</li>
          <li>Uncontrolled by default (defaults to the last 5 days) - pass <code>value</code>/<code>onChange</code> to own the state.</li>
        </ul>
      </Section>

      {/* ── API ── */}
      <h2 className="text-balance">API</h2>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name}>
              <td><code>{p.name}</code></td>
              <td><code style={{ fontSize: "11px" }}>{p.type}</code></td>
              <td><code>{p.default}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-balance">
        <code>DateRange</code> is <code>{"{ start: DateValue; end: DateValue }"}</code>, both re-exported
        from <code>react-aria-components</code>.
      </p>

      {/* ── Usage ── */}
      <h2 className="text-balance">Usage</h2>
      <pre className="overflow-x-auto rounded-xl border border-secondary bg-secondary p-5">
        <code className="font-mono text-[13px] text-secondary">
{`import { DateRangeControl } from "@/components/custom/date-range/date-range-control";

<DateRangeControl />

// Controlled
<DateRangeControl value={range} onChange={setRange} />`}
        </code>
      </pre>

      {/* ── Where it's used ── */}
      <h2 className="text-balance">Where it&apos;s used</h2>
      <p className="text-balance">
        <code>app/pages/dashboard/option-1/page.tsx</code> - the registered-user dashboard exploration.
        Previously a <code>?</code>-blocked gap marker there; replaced with this once its shape was clear
        enough to build for real.
      </p>
    </div>
  );
}
