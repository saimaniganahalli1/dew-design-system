"use client";

import { useState } from "react";
import type React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Checkbox } from "@/components/base/checkbox/checkbox";
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
  { key: "states", label: "States" },
  { key: "disabled", label: "Disabled" },
  { key: "withLabel", label: "With label" },
  { key: "withHint", label: "With hint text" },
  { key: "group", label: "Group" },
  { key: "usage", label: "Usage" },
  { key: "figma", label: "Figma" },
];

// Pulled directly from CheckboxProps in components/base/checkbox/checkbox.tsx (plus the react-aria-components CheckboxProps it extends)
const props = [
  { name: "size",            type: '"sm" | "md"',   default: '"sm"' },
  { name: "label",           type: "ReactNode",      default: "-" },
  { name: "hint",            type: "ReactNode",      default: "-" },
  { name: "isSelected",      type: "boolean",        default: "-" },
  { name: "defaultSelected", type: "boolean",        default: "false" },
  { name: "isIndeterminate", type: "boolean",        default: "false" },
  { name: "isDisabled",      type: "boolean",        default: "false" },
  { name: "onChange",        type: "(isSelected: boolean) => void", default: "-" },
  { name: "className",       type: "string",         default: "-" },
];

export default function CheckboxPage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig.checkbox;
  const sizes = enabledVariants(config.sizes);

  const defaults = {
    size: "sm" as "sm" | "md",
    selected: true,
    indeterminate: false,
    disabled: false,
    label: "Remember me",
    hint: "",
  };

  const [previewSize, setPreviewSize] = useState(defaults.size);
  const [previewSelected, setPreviewSelected] = useState(defaults.selected);
  const [previewIndeterminate, setPreviewIndeterminate] = useState(defaults.indeterminate);
  const [previewDisabled, setPreviewDisabled] = useState(defaults.disabled);
  const [previewLabel, setPreviewLabel] = useState(defaults.label);
  const [previewHint, setPreviewHint] = useState(defaults.hint);

  const isDefault =
    previewSize === defaults.size &&
    previewSelected === defaults.selected &&
    previewIndeterminate === defaults.indeterminate &&
    previewDisabled === defaults.disabled &&
    previewLabel === defaults.label &&
    previewHint === defaults.hint;

  const resetPreview = () => {
    setPreviewSize(defaults.size);
    setPreviewSelected(defaults.selected);
    setPreviewIndeterminate(defaults.indeterminate);
    setPreviewDisabled(defaults.disabled);
    setPreviewLabel(defaults.label);
    setPreviewHint(defaults.hint);
  };

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Checkbox"
        description="A binary selection control built on React Aria. Supports an indeterminate state, optional label/hint text, and two sizes - driven from config/design-system.config.ts."
        actions={<ContextualConfigPanel slug="checkbox" title="Checkbox" sections={sectionToggles} />}
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
                  <Checkbox
                    size={previewSize}
                    isSelected={previewSelected}
                    onChange={setPreviewSelected}
                    isIndeterminate={previewIndeterminate}
                    isDisabled={previewDisabled}
                    label={previewLabel || undefined}
                    hint={previewHint || undefined}
                  />
                </div>
                <code className="text-xs text-quaternary">
                  {previewSize} · {previewIndeterminate ? "indeterminate" : previewSelected ? "selected" : "unselected"}
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

                <div className="flex flex-row flex-wrap gap-x-6 gap-y-2">
                  <ScaffoldCheckbox label="Selected" checked={previewSelected} onChange={setPreviewSelected} />
                  <ScaffoldCheckbox label="Indeterminate" checked={previewIndeterminate} onChange={setPreviewIndeterminate} />
                  <ScaffoldCheckbox label="Disabled" checked={previewDisabled} onChange={setPreviewDisabled} />
                </div>
                {previewIndeterminate && previewSelected && (
                  <p className="text-xs leading-relaxed text-quaternary text-balance">
                    Both set - the real component always renders the indeterminate dash over the checkmark while <code>isIndeterminate</code> is true.
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── States ── */}
      {isFeatureEnabled(config, "states") && (
        <>
          <h2 className="text-balance">States</h2>
          <p className="text-balance">Unchecked, checked, and indeterminate - used for a parent checkbox representing a partially-selected group.</p>
          <Section label="Unchecked / checked / indeterminate">
            <Checkbox aria-label="Unchecked" />
            <Checkbox aria-label="Checked" defaultSelected />
            <Checkbox aria-label="Indeterminate" isIndeterminate />
          </Section>
        </>
      )}

      {/* ── Sizes ── */}
      {sizes.length > 0 && (
        <>
          <h2 className="text-balance">Sizes</h2>
          <p className="text-balance">Two sizes - <code>sm</code> (default) and <code>md</code>.</p>
          <Section label={sizes.map((s) => s.label).join(" / ")}>
            {sizes.map((s) => (
              <Checkbox key={s.key} size={s.key as "sm" | "md"} aria-label={s.label} defaultSelected />
            ))}
          </Section>
        </>
      )}

      {/* ── Disabled ── */}
      {isFeatureEnabled(config, "disabled") && (
        <>
          <h2 className="text-balance">Disabled</h2>
          <p className="text-balance">Disabled dims the control and prevents interaction, in both the unchecked and checked states.</p>
          <Section label="Disabled - unchecked / checked / indeterminate">
            <Checkbox aria-label="Disabled unchecked" isDisabled />
            <Checkbox aria-label="Disabled checked" isDisabled defaultSelected />
            <Checkbox aria-label="Disabled indeterminate" isDisabled isIndeterminate />
          </Section>
        </>
      )}

      {/* ── With label ── */}
      {isFeatureEnabled(config, "withLabel") && (
        <>
          <h2 className="text-balance">With label</h2>
          <p className="text-balance">Pass a <code>label</code> to pair the control with descriptive text. The whole row becomes clickable.</p>
          <Section label="Labelled">
            <div className="flex flex-col gap-3">
              <Checkbox label="Remember me" />
              <Checkbox label="Send me marketing emails" defaultSelected />
              <Checkbox label="Accept the terms and conditions" isDisabled />
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
            <Checkbox
              size="md"
              label="Email notifications"
              hint="Get notified when someone mentions you in a comment."
              defaultSelected
            />
          </Section>
        </>
      )}

      {/* ── Group ── */}
      {isFeatureEnabled(config, "group") && (
        <>
          <h2 className="text-balance">Group</h2>
          <p className="text-balance">A stacked list of checkboxes - the common pattern for multi-select filters and settings lists.</p>
          <Section label="Checkbox list">
            <div className="flex flex-col gap-4">
              <Checkbox size="md" label="Design" hint="12 open tasks" defaultSelected />
              <Checkbox size="md" label="Engineering" hint="34 open tasks" defaultSelected />
              <Checkbox size="md" label="Marketing" hint="4 open tasks" />
              <Checkbox size="md" label="Archived" hint="Not selectable" isDisabled />
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
      <p className="text-balance">Checked and indeterminate share the same brand-filled treatment. Swap <code>--ui-bg-brand-solid</code> to rebrand every checked control at once.</p>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>State</th>
            <th>Background token</th>
            <th>Ring token</th>
          </tr>
        </thead>
        <tbody>
          {[
            { state: "Unchecked",            bg: "bg-primary",     ring: "ring-primary" },
            { state: "Checked / indeterminate", bg: "bg-brand-solid", ring: "ring-brand-solid" },
            { state: "Disabled + unchecked", bg: "bg-tertiary",    ring: "ring-primary" },
            { state: "Focus-visible outline", bg: "-",             ring: "outline-focus-ring" },
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
{`import { Checkbox } from "@/components/base/checkbox/checkbox";

<Checkbox label="Remember me" defaultSelected />`}
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
