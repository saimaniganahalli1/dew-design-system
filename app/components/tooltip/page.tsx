"use client";

import type React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { Button } from "@/components/base/buttons/button";
import { HelpCircle, InfoCircle } from "@untitledui/icons";
import { enabledVariants, isFeatureEnabled } from "@/config/design-system.config";
import { useConfig } from "@/lib/config-context";

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div
    className="rounded-xl p-10 flex flex-wrap items-center justify-center gap-8"
    style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
  >
    <p className="w-full text-xs font-semibold uppercase tracking-widest mb-1 text-center"
      style={{ color: "var(--color-gray-400)" }}
    >
      {label}
    </p>
    {children}
  </div>
);

const props = [
  { name: "title",       type: "ReactNode",                              default: "—" },
  { name: "description", type: "ReactNode",                              default: "—" },
  { name: "placement",   type: '"top" | "right" | "bottom" | "left" | …', default: '"top"' },
  { name: "arrow",       type: "boolean",                                default: "false" },
  { name: "delay",       type: "number (ms)",                            default: "300" },
  { name: "closeDelay",  type: "number (ms)",                            default: "0" },
  { name: "isDisabled",  type: "boolean",                                default: "false" },
  { name: "trigger",     type: '"focus" | "hover"',                      default: "—" },
];

export default function TooltipPage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig.tooltip;
  const placements = enabledVariants(config.types);

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Tooltip"
        description="A hover/focus-triggered overlay for supplementary context. Built on React Aria's TooltipTrigger for correct keyboard and hover-intent behaviour. Placements and demo sections are driven from config/design-system.config.ts."
      />

      {/* ── Default ── */}
      <h2>Default</h2>
      <p>Wrap any focusable trigger — a button, an icon, a piece of text — in <code>&lt;Tooltip&gt;</code>.</p>
      <Section label="Hover or focus the button">
        <Tooltip title="Save changes">
          <Button size="sm" color="secondary">Hover me</Button>
        </Tooltip>
      </Section>

      {/* ── Placements ── */}
      {placements.length > 0 && (
        <>
          <h2>Placements</h2>
          <p>Four base placements. Each direction slides in from the opposite edge on enter.</p>
          <Section label={placements.map((p) => p.label).join(" / ")}>
            {placements.map((p) => (
              <Tooltip key={p.key} title={p.label} placement={p.key as "top" | "right" | "bottom" | "left"}>
                <Button size="sm" color="secondary">{p.label}</Button>
              </Tooltip>
            ))}
          </Section>
        </>
      )}

      {/* ── With description ── */}
      {isFeatureEnabled(config, "description") && (
        <>
          <h2>With description</h2>
          <p>Add a <code>description</code> for a two-line tooltip — a bold title plus supporting detail.</p>
          <Section label="Title + description">
            <Tooltip title="Keyboard shortcut" description="Press ⌘K to open the command palette.">
              <Button size="sm" color="secondary">Command palette</Button>
            </Tooltip>
          </Section>
        </>
      )}

      {/* ── With arrow ── */}
      {isFeatureEnabled(config, "arrow") && (
        <>
          <h2>With arrow</h2>
          <p>Set <code>arrow</code> to point the tooltip back at its trigger.</p>
          <Section label="arrow={true}">
            <Tooltip title="This has an arrow" arrow>
              <Button size="sm" color="secondary">Hover me</Button>
            </Tooltip>
          </Section>
        </>
      )}

      {/* ── Icon trigger ── */}
      <h2>Icon trigger</h2>
      <p>Use <code>TooltipTrigger</code> to wrap a bare icon — this is exactly how the <code>Input</code> and <code>Label</code> components show their help/tooltip icons.</p>
      <Section label="Help icon">
        <Tooltip title="Your API key is only shown once." arrow>
          <TooltipTrigger className="cursor-pointer" style={{ color: "var(--color-gray-400)" }}>
            <HelpCircle size={18} />
          </TooltipTrigger>
        </Tooltip>
        <Tooltip title="This field is required." description="You won't be able to submit the form without it." arrow>
          <TooltipTrigger className="cursor-pointer" style={{ color: "var(--color-error-500)" }}>
            <InfoCircle size={18} />
          </TooltipTrigger>
        </Tooltip>
      </Section>

      {/* ── Delay ── */}
      {isFeatureEnabled(config, "delay") && (
        <>
          <h2>Delay</h2>
          <p>Control how long a hover must be sustained before the tooltip opens with <code>delay</code> (default 300ms). <code>closeDelay</code> controls the hide delay (default 0ms).</p>
          <Section label="delay=0 / delay=300 (default) / delay=1000">
            <Tooltip title="Opens instantly" delay={0}>
              <Button size="sm" color="secondary">Instant</Button>
            </Tooltip>
            <Tooltip title="Opens after 300ms">
              <Button size="sm" color="secondary">Default</Button>
            </Tooltip>
            <Tooltip title="Opens after 1 second" delay={1000}>
              <Button size="sm" color="secondary">Slow</Button>
            </Tooltip>
          </Section>
        </>
      )}

      {/* ── Disabled ── */}
      {isFeatureEnabled(config, "disabled") && (
        <>
          <h2>Disabled</h2>
          <p>Set <code>isDisabled</code> on the tooltip to suppress it entirely — useful when the tip only applies conditionally.</p>
          <Section label="isDisabled={true}">
            <Tooltip title="You will never see this" isDisabled>
              <Button size="sm" color="secondary">Nothing happens on hover</Button>
            </Tooltip>
          </Section>
        </>
      )}

      {/* ── API ── */}
      <h2>API</h2>
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

      {/* ── Token anatomy ── */}
      <h2>Token anatomy</h2>
      <p>The tooltip surface is always the dark, high-contrast solid — the one place in the system where the background inverts regardless of light/dark mode.</p>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Part</th>
            <th>Token</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {[
            { part: "Surface",          token: "bg-primary-solid",             value: "gray-950 (#0C111D)" },
            { part: "Title text",       token: "text-white",                   value: "#ffffff" },
            { part: "Description text", token: "text-tooltip-supporting-text", value: "gray-400 (#98A2B3)" },
            { part: "Arrow fill",       token: "fill-bg-primary-solid",        value: "gray-950 (#0C111D)" },
          ].map((r) => (
            <tr key={r.part}>
              <td style={{ color: "var(--ui-text-secondary)" }}>{r.part}</td>
              <td><code>{r.token}</code></td>
              <td><code>{r.value}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Animation</h2>
      <p>
        Enter/exit uses <code>tailwindcss-animate</code> plus four Untitled UI custom variants —{" "}
        <code>placement-top</code>, <code>placement-right</code>, <code>placement-bottom</code>, <code>placement-left</code> — registered in{" "}
        <code>globals.css</code>. React Aria sets <code>data-placement</code> on the tooltip&apos;s overlay wrapper; the inner content slides in from the edge opposite its placement using the <code>in-placement-*</code> ancestor variant.
      </p>
    </div>
  );
}
