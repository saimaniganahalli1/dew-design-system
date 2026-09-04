"use client";

import { useState } from "react";
import type React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Toggle } from "@/components/base/toggle/toggle";
import { ContextualConfigPanel } from "@/components/ContextualConfigPanel";
import {
  ScaffoldCheckbox,
  ScaffoldLabel,
  ScaffoldTextInput,
  SegmentedControl,
} from "@/components/scaffold/controls";
import { enabledVariants, isFeatureEnabled } from "@/config/design-system.config";
import { useConfig } from "@/lib/config-context";

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
  { key: "slim", label: "Slim" },
  { key: "withLabel", label: "With label" },
  { key: "withHint", label: "With hint text" },
  { key: "disabled", label: "Disabled" },
  { key: "group", label: "Group" },
  { key: "usage", label: "Usage" },
  { key: "figma", label: "Figma" },
];

// Pulled directly from ToggleProps in components/base/toggle/toggle.tsx (plus the react-aria-components SwitchProps it extends)
const props = [
  { name: "size",            type: '"sm" | "md"', default: '"sm"' },
  { name: "slim",             type: "boolean",      default: "false" },
  { name: "label",            type: "ReactNode",    default: "-" },
  { name: "hint",             type: "ReactNode",    default: "-" },
  { name: "isSelected",       type: "boolean",      default: "-" },
  { name: "defaultSelected",  type: "boolean",      default: "false" },
  { name: "isDisabled",       type: "boolean",      default: "false" },
  { name: "onChange",         type: "(isSelected: boolean) => void", default: "-" },
  { name: "className",        type: "string",       default: "-" },
];

export default function TogglePage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig.toggle;
  const sizes = enabledVariants(config.sizes);

  const defaults = {
    size: "sm" as "sm" | "md",
    slim: false,
    selected: true,
    disabled: false,
    label: "Enable notifications",
    hint: "",
  };

  const [previewSize, setPreviewSize] = useState(defaults.size);
  const [previewSlim, setPreviewSlim] = useState(defaults.slim);
  const [previewSelected, setPreviewSelected] = useState(defaults.selected);
  const [previewDisabled, setPreviewDisabled] = useState(defaults.disabled);
  const [previewLabel, setPreviewLabel] = useState(defaults.label);
  const [previewHint, setPreviewHint] = useState(defaults.hint);

  const isDefault =
    previewSize === defaults.size &&
    previewSlim === defaults.slim &&
    previewSelected === defaults.selected &&
    previewDisabled === defaults.disabled &&
    previewLabel === defaults.label &&
    previewHint === defaults.hint;

  const resetPreview = () => {
    setPreviewSize(defaults.size);
    setPreviewSlim(defaults.slim);
    setPreviewSelected(defaults.selected);
    setPreviewDisabled(defaults.disabled);
    setPreviewLabel(defaults.label);
    setPreviewHint(defaults.hint);
  };

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Toggle"
        description="A binary switch control built on React Aria. Supports an optional label/hint, a slim track variant, and two sizes - driven from config/design-system.config.ts."
        actions={<ContextualConfigPanel slug="toggle" title="Toggle" sections={sectionToggles} />}
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
                  <Toggle
                    size={previewSize}
                    slim={previewSlim}
                    isSelected={previewSelected}
                    onChange={setPreviewSelected}
                    isDisabled={previewDisabled}
                    label={previewLabel || undefined}
                    hint={previewHint || undefined}
                  />
                </div>
                <code className="text-xs text-quaternary">
                  {previewSize} · {previewSlim ? "slim" : "default"}
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
                  <ScaffoldLabel>Size</ScaffoldLabel>
                  <SegmentedControl
                    options={sizes.map((s) => ({ key: s.key as "sm" | "md", label: s.key }))}
                    value={previewSize}
                    onChange={setPreviewSize}
                  />
                </div>

                <ScaffoldTextInput label="Label" value={previewLabel} onChange={setPreviewLabel} />
                <ScaffoldTextInput label="Hint" value={previewHint} onChange={setPreviewHint} />

                <div className="flex flex-row gap-6">
                  <ScaffoldCheckbox label="Selected" checked={previewSelected} onChange={setPreviewSelected} />
                  <ScaffoldCheckbox label="Slim" checked={previewSlim} onChange={setPreviewSlim} />
                  <ScaffoldCheckbox label="Disabled" checked={previewDisabled} onChange={setPreviewDisabled} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Sizes ── */}
      {sizes.length > 0 && (
        <>
          <h2 className="text-balance">Sizes</h2>
          <p className="text-balance">Two sizes - <code>sm</code> (default) and <code>md</code>.</p>
          <Section label={sizes.map((s) => s.label).join(" / ")}>
            {sizes.map((s) => (
              <div key={s.key} className="flex flex-col items-center gap-2">
                <Toggle size={s.key as "sm" | "md"} defaultSelected aria-label={s.label} />
                <code className="text-xs">{s.key}</code>
              </div>
            ))}
          </Section>
        </>
      )}

      {/* ── Slim ── */}
      {isFeatureEnabled(config, "slim") && (
        <>
          <h2 className="text-balance">Slim</h2>
          <p className="text-balance">A thinner track with a bordered knob, for denser settings lists - pass <code>slim</code>.</p>
          <Section label="Default / slim - off / on">
            <div className="flex flex-col items-center gap-2">
              <Toggle aria-label="Default off" />
              <code className="text-xs">default · off</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Toggle aria-label="Default on" defaultSelected />
              <code className="text-xs">default · on</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Toggle slim aria-label="Slim off" />
              <code className="text-xs">slim · off</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Toggle slim aria-label="Slim on" defaultSelected />
              <code className="text-xs">slim · on</code>
            </div>
          </Section>
        </>
      )}

      {/* ── With label ── */}
      {isFeatureEnabled(config, "withLabel") && (
        <>
          <h2 className="text-balance">With label</h2>
          <p className="text-balance">Pass a <code>label</code> to pair the control with descriptive text.</p>
          <Section label="Labelled">
            <div className="flex flex-col gap-3">
              <Toggle label="Remember me" />
              <Toggle label="Send me marketing emails" defaultSelected />
              <Toggle label="Accept the terms and conditions" isDisabled />
            </div>
          </Section>
        </>
      )}

      {/* ── With hint text ── */}
      {isFeatureEnabled(config, "withHint") && (
        <>
          <h2 className="text-balance">With hint text</h2>
          <p className="text-balance">Add a <code>hint</code> for supporting detail beneath the label.</p>
          <Section label="Labelled with hint">
            <Toggle
              size="md"
              label="Email notifications"
              hint="Get notified when someone mentions you in a comment."
              defaultSelected
            />
          </Section>
        </>
      )}

      {/* ── Disabled ── */}
      {isFeatureEnabled(config, "disabled") && (
        <>
          <h2 className="text-balance">Disabled</h2>
          <p className="text-balance">Disabled dims the control and prevents interaction, in both the off and on states.</p>
          <Section label="Disabled - off / on">
            <Toggle aria-label="Disabled off" isDisabled />
            <Toggle aria-label="Disabled on" isDisabled defaultSelected />
          </Section>
        </>
      )}

      {/* ── Group ── */}
      {isFeatureEnabled(config, "group") && (
        <>
          <h2 className="text-balance">Group</h2>
          <p className="text-balance">A stacked list of toggles - the common pattern for a settings page.</p>
          <Section label="Settings list">
            <div className="flex flex-col gap-4">
              <Toggle size="md" label="Desktop notifications" hint="Get notified when someone messages you." defaultSelected />
              <Toggle size="md" label="Weekly digest" hint="A summary of activity, every Monday." defaultSelected />
              <Toggle size="md" label="Product updates" hint="News about new features and improvements." />
              <Toggle size="md" label="Two-factor authentication" hint="Managed by your organisation." isDisabled defaultSelected />
            </div>
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
      <p className="text-balance">Swap <code>--ui-bg-brand-solid</code> to rebrand every selected track at once.</p>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>State</th>
            <th>Background token</th>
            <th>Ring / border token</th>
          </tr>
        </thead>
        <tbody>
          {[
            { state: "Off",                  bg: "bg-tertiary",         ring: "ring-secondary" },
            { state: "On",                    bg: "bg-brand-solid",      ring: "-" },
            { state: "On + hover",            bg: "bg-brand-solid_hover", ring: "-" },
            { state: "Slim knob - off / on",  bg: "bg-fg-white",         ring: "border-toggle-border / border-toggle-slim-border_pressed" },
            { state: "Disabled",              bg: "-",                   ring: "opacity-50" },
            { state: "Focus-visible outline", bg: "-",                   ring: "outline-focus-ring" },
          ].map((r) => (
            <tr key={r.state}>
              <td style={{ color: "var(--ui-text-secondary)" }}>{r.state}</td>
              <td><code>{r.bg}</code></td>
              <td><code>{r.ring}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Usage ── */}
      {isFeatureEnabled(config, "usage") && (
        <>
          <h2 className="text-balance">Usage</h2>
          <pre className="overflow-x-auto rounded-xl border border-secondary bg-secondary p-5">
            <code className="font-mono text-[13px] text-secondary">
{`import { Toggle } from "@/components/base/toggle/toggle";

<Toggle label="Enable notifications" defaultSelected />`}
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
