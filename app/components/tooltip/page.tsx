"use client";

import { useState } from "react";
import type React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { ContextualConfigPanel } from "@/components/ContextualConfigPanel";
import {
  ScaffoldCheckbox,
  ScaffoldLabel,
  ScaffoldNumberInput,
  ScaffoldTextInput,
  SegmentedControl,
} from "@/components/scaffold/controls";
import { HelpCircle, InfoCircle } from "@untitledui/icons";
import { enabledVariants, isFeatureEnabled } from "@/config/design-system.config";
import { useConfig } from "@/lib/config-context";

// Scaffold-styled trigger content for Tooltip demos - reuses the real `TooltipTrigger`
// (needed for correct hover/focus wiring per react-aria) but with Scaffold's own visual
// classes, not a real DEW `Button`, per CONTEXT.md's "DEW vs. Scaffold" rule: a trigger
// used to operate a demo is Scaffold even though a real Button component exists.
const scaffoldTriggerClass =
  "inline-flex h-max w-max cursor-pointer items-center gap-1.5 rounded-lg border border-secondary bg-primary px-3 py-2 text-sm font-medium text-secondary shadow-xs transition-colors active:scale-[0.98] hover:bg-secondary";

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-wrap items-center gap-6 rounded-xl border border-secondary bg-secondary p-6">
    <p className="mb-1 w-full text-xs font-semibold text-quaternary uppercase tracking-widest text-balance">
      {label}
    </p>
    {children}
  </div>
);

const sectionToggles = [
  { key: "playground", label: "Component Playground" },
  { key: "description", label: "With description" },
  { key: "arrow", label: "With arrow" },
  { key: "delay", label: "Delay" },
  { key: "disabled", label: "Disabled" },
  { key: "usage", label: "Usage" },
  { key: "figma", label: "Figma" },
];

const props = [
  { name: "title",       type: "ReactNode",                              default: "-" },
  { name: "description", type: "ReactNode",                              default: "-" },
  { name: "placement",   type: '"top" | "right" | "bottom" | "left" | …', default: '"top"' },
  { name: "arrow",       type: "boolean",                                default: "false" },
  { name: "delay",       type: "number (ms)",                            default: "300" },
  { name: "closeDelay",  type: "number (ms)",                            default: "0" },
  { name: "isDisabled",  type: "boolean",                                default: "false" },
  { name: "trigger",     type: '"focus" | "hover"',                      default: "-" },
];

export default function TooltipPage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig.tooltip;
  const placements = enabledVariants(config.types);

  const defaults = {
    placement: "top" as "top" | "right" | "bottom" | "left",
    title: "Save changes",
    description: "",
    arrow: false,
    disabled: false,
    delay: 300,
  };

  const [previewPlacement, setPreviewPlacement] = useState(defaults.placement);
  const [previewTitle, setPreviewTitle] = useState(defaults.title);
  const [previewDescription, setPreviewDescription] = useState(defaults.description);
  const [previewArrow, setPreviewArrow] = useState(defaults.arrow);
  const [previewDisabled, setPreviewDisabled] = useState(defaults.disabled);
  const [previewDelay, setPreviewDelay] = useState(defaults.delay);

  const isDefault =
    previewPlacement === defaults.placement &&
    previewTitle === defaults.title &&
    previewDescription === defaults.description &&
    previewArrow === defaults.arrow &&
    previewDisabled === defaults.disabled &&
    previewDelay === defaults.delay;

  const resetPreview = () => {
    setPreviewPlacement(defaults.placement);
    setPreviewTitle(defaults.title);
    setPreviewDescription(defaults.description);
    setPreviewArrow(defaults.arrow);
    setPreviewDisabled(defaults.disabled);
    setPreviewDelay(defaults.delay);
  };

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Tooltip"
        description="A hover/focus-triggered overlay for supplementary context. Built on React Aria's TooltipTrigger for correct keyboard and hover-intent behaviour. Placements and demo sections are driven from config/design-system.config.ts."
        actions={<ContextualConfigPanel slug="tooltip" title="Tooltip" sections={sectionToggles} />}
      />

      {/* ── Component Playground ── */}
      {isFeatureEnabled(config, "playground") && (
        <>
          <h2 className="text-balance">Component Playground</h2>
          <p className="text-balance">Live instance - the controls read their options from the same config that drives the Variants section below.</p>
          <div className="overflow-hidden rounded-2xl border border-secondary shadow-xs">
            <div className="grid md:grid-cols-[1fr_300px]">
              <div
                className="relative flex min-h-[320px] flex-col items-center justify-center gap-3 bg-primary_alt p-12"
                style={{
                  backgroundImage: "radial-gradient(var(--ui-border-secondary) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                <div className="flex min-h-16 items-center justify-center rounded-xl bg-primary px-8 py-6 shadow-md">
                  <Tooltip
                    title={previewTitle || "Tooltip"}
                    description={previewDescription || undefined}
                    placement={previewPlacement}
                    arrow={previewArrow}
                    delay={previewDelay}
                    isDisabled={previewDisabled}
                  >
                    <TooltipTrigger className={scaffoldTriggerClass}>Hover me</TooltipTrigger>
                  </Tooltip>
                </div>
                <code className="text-xs text-quaternary">
                  {previewPlacement} · {previewArrow ? "arrow" : "no arrow"} · {previewDelay}ms{previewDisabled ? " · disabled" : ""}
                </code>
              </div>

              <div className="flex flex-col gap-5 border-l border-secondary bg-primary p-6">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-semibold text-quaternary uppercase tracking-widest text-balance">
                    Controls
                  </p>
                  <button
                    type="button"
                    onClick={resetPreview}
                    disabled={isDefault}
                    className="text-xs font-medium text-brand-secondary transition-opacity hover:text-brand-secondary_hover disabled:opacity-40"
                  >
                    Reset
                  </button>
                </div>

                <div className="flex flex-col gap-1.5">
                  <ScaffoldLabel>Placement</ScaffoldLabel>
                  <SegmentedControl
                    options={placements.map((p) => ({ key: p.key as "top" | "right" | "bottom" | "left", label: p.key }))}
                    value={previewPlacement}
                    onChange={setPreviewPlacement}
                  />
                </div>

                <ScaffoldTextInput label="Title" value={previewTitle} onChange={setPreviewTitle} />
                <ScaffoldTextInput label="Description" value={previewDescription} onChange={setPreviewDescription} />
                <ScaffoldNumberInput label="Delay (ms)" value={previewDelay} onChange={setPreviewDelay} min={0} max={3000} />

                <div className="flex flex-row gap-6">
                  <ScaffoldCheckbox label="Arrow" checked={previewArrow} onChange={setPreviewArrow} />
                  <ScaffoldCheckbox label="Disabled" checked={previewDisabled} onChange={setPreviewDisabled} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Default ── */}
      <h2 className="text-balance">Default</h2>
      <p className="text-balance">Wrap any focusable trigger - a button, an icon, a piece of text - in <code>&lt;Tooltip&gt;</code>.</p>
      <Section label="Hover or focus the button">
        <Tooltip title="Save changes">
          <TooltipTrigger className={scaffoldTriggerClass}>Hover me</TooltipTrigger>
        </Tooltip>
      </Section>

      {/* ── Placements ── */}
      {placements.length > 0 && (
        <>
          <h2 className="text-balance">Placements</h2>
          <p className="text-balance">Four base placements. Each direction slides in from the opposite edge on enter.</p>
          <Section label={placements.map((p) => p.label).join(" / ")}>
            {placements.map((p) => (
              <Tooltip key={p.key} title={p.label} placement={p.key as "top" | "right" | "bottom" | "left"}>
                <TooltipTrigger className={scaffoldTriggerClass}>{p.label}</TooltipTrigger>
              </Tooltip>
            ))}
          </Section>
        </>
      )}

      {/* ── With description ── */}
      {isFeatureEnabled(config, "description") && (
        <>
          <h2 className="text-balance">With description</h2>
          <p className="text-balance">Add a <code>description</code> for a two-line tooltip - a bold title plus supporting detail.</p>
          <Section label="Title + description">
            <Tooltip title="Keyboard shortcut" description="Press ⌘K to open the command palette.">
              <TooltipTrigger className={scaffoldTriggerClass}>Command palette</TooltipTrigger>
            </Tooltip>
          </Section>
        </>
      )}

      {/* ── With arrow ── */}
      {isFeatureEnabled(config, "arrow") && (
        <>
          <h2 className="text-balance">With arrow</h2>
          <p className="text-balance">Set <code>arrow</code> to point the tooltip back at its trigger.</p>
          <Section label="arrow={true}">
            <Tooltip title="This has an arrow" arrow>
              <TooltipTrigger className={scaffoldTriggerClass}>Hover me</TooltipTrigger>
            </Tooltip>
          </Section>
        </>
      )}

      {/* ── Icon trigger ── */}
      <h2 className="text-balance">Icon trigger</h2>
      <p className="text-balance">Use <code>TooltipTrigger</code> to wrap a bare icon - this is exactly how the <code>Input</code> and <code>Label</code> components show their help/tooltip icons.</p>
      <Section label="Help icon">
        <Tooltip title="Your API key is only shown once." arrow>
          <TooltipTrigger className="cursor-pointer text-fg-quaternary">
            <HelpCircle size={18} />
          </TooltipTrigger>
        </Tooltip>
        <Tooltip title="This field is required." description="You won't be able to submit the form without it." arrow>
          <TooltipTrigger className="cursor-pointer text-fg-error-secondary">
            <InfoCircle size={18} />
          </TooltipTrigger>
        </Tooltip>
      </Section>

      {/* ── Delay ── */}
      {isFeatureEnabled(config, "delay") && (
        <>
          <h2 className="text-balance">Delay</h2>
          <p className="text-balance">Control how long a hover must be sustained before the tooltip opens with <code>delay</code> (default 300ms). <code>closeDelay</code> controls the hide delay (default 0ms).</p>
          <Section label="delay=0 / delay=300 (default) / delay=1000">
            <Tooltip title="Opens instantly" delay={0}>
              <TooltipTrigger className={scaffoldTriggerClass}>Instant</TooltipTrigger>
            </Tooltip>
            <Tooltip title="Opens after 300ms">
              <TooltipTrigger className={scaffoldTriggerClass}>Default</TooltipTrigger>
            </Tooltip>
            <Tooltip title="Opens after 1 second" delay={1000}>
              <TooltipTrigger className={scaffoldTriggerClass}>Slow</TooltipTrigger>
            </Tooltip>
          </Section>
        </>
      )}

      {/* ── Disabled ── */}
      {isFeatureEnabled(config, "disabled") && (
        <>
          <h2 className="text-balance">Disabled</h2>
          <p className="text-balance">Set <code>isDisabled</code> on the tooltip to suppress it entirely - useful when the tip only applies conditionally.</p>
          <Section label="isDisabled={true}">
            <Tooltip title="You will never see this" isDisabled>
              <TooltipTrigger className={scaffoldTriggerClass}>Nothing happens on hover</TooltipTrigger>
            </Tooltip>
          </Section>
        </>
      )}

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

      {/* ── Token anatomy ── */}
      <h2 className="text-balance">Token anatomy</h2>
      <p className="text-balance">The tooltip surface is always the dark, high-contrast solid - the one place in the system where the background inverts regardless of light/dark mode.</p>
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
            { part: "Description text", token: "text-tooltip-supporting-text", value: "gray-400 (#B5B2AF)" },
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

      <h2 className="text-balance">Animation</h2>
      <p className="text-balance">
        Enter/exit uses <code>tailwindcss-animate</code> plus four Untitled UI custom variants -{" "}
        <code>placement-top</code>, <code>placement-right</code>, <code>placement-bottom</code>, <code>placement-left</code> - registered in{" "}
        <code>globals.css</code>. React Aria sets <code>data-placement</code> on the tooltip&apos;s overlay wrapper; the inner content slides in from the edge opposite its placement using the <code>in-placement-*</code> ancestor variant.
      </p>

      {/* ── Usage ── */}
      {isFeatureEnabled(config, "usage") && (
        <>
          <h2 className="text-balance">Usage</h2>
          <pre className="overflow-x-auto rounded-xl border border-secondary bg-secondary p-5">
            <code className="font-mono text-[13px] text-secondary">
{`import { Tooltip } from "@/components/base/tooltip/tooltip";
import { Button } from "@/components/base/buttons/button";

<Tooltip title="Save changes">
  <Button size="sm" color="secondary">Hover me</Button>
</Tooltip>`}
            </code>
          </pre>
        </>
      )}

      {/* ── Figma ── */}
      {isFeatureEnabled(config, "figma") && (
        <>
          <h2 className="text-balance">Figma</h2>
          <p className="text-balance">No linked Figma file yet - this component was pulled in via the Untitled UI CLI, not designed in Figma first.</p>
        </>
      )}
    </div>
  );
}
