"use client";

import { useState } from "react";
import type React from "react";
import { PageHeader } from "@/components/PageHeader";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
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
  { key: "withHint", label: "With hint text" },
  { key: "disabled", label: "Disabled" },
  { key: "orientation", label: "Orientation" },
  { key: "group", label: "Group" },
  { key: "usage", label: "Usage" },
  { key: "figma", label: "Figma" },
];

// Pulled directly from RadioGroupProps/RadioButtonProps in components/base/radio-buttons/radio-buttons.tsx
// (plus the react-aria-components AriaRadioGroupProps/AriaRadioProps they extend)
const groupProps = [
  { name: "size",         type: '"sm" | "md"',                default: '"sm"' },
  { name: "value",        type: "string",                     default: "-" },
  { name: "defaultValue", type: "string",                     default: "-" },
  { name: "onChange",     type: "(value: string) => void",    default: "-" },
  { name: "orientation",  type: '"horizontal" | "vertical"',  default: '"vertical"' },
  { name: "isDisabled",   type: "boolean",                    default: "false" },
  { name: "isRequired",   type: "boolean",                    default: "false" },
  { name: "name",         type: "string",                     default: "-" },
  { name: "className",    type: "string",                     default: "-" },
  { name: "children",     type: "ReactNode",                  default: "-" },
];

const buttonProps = [
  { name: "value",      type: "string",    default: "-" },
  { name: "size",       type: '"sm" | "md"', default: "inherited from RadioGroup" },
  { name: "label",      type: "ReactNode", default: "-" },
  { name: "hint",       type: "ReactNode", default: "-" },
  { name: "isDisabled", type: "boolean",   default: "false" },
  { name: "className",  type: "string",    default: "-" },
];

const planOptions = [
  { value: "starter", label: "Starter" },
  { value: "growth", label: "Growth" },
  { value: "scale", label: "Scale" },
];

export default function RadioButtonsPage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig["radio-buttons"];
  const sizes = enabledVariants(config.sizes);

  const defaults = {
    size: "sm" as "sm" | "md",
    orientation: "vertical" as "horizontal" | "vertical",
    disabled: false,
    hint: "",
    selected: "starter",
  };

  const [previewSize, setPreviewSize] = useState(defaults.size);
  const [previewOrientation, setPreviewOrientation] = useState(defaults.orientation);
  const [previewDisabled, setPreviewDisabled] = useState(defaults.disabled);
  const [previewHint, setPreviewHint] = useState(defaults.hint);
  const [previewSelected, setPreviewSelected] = useState(defaults.selected);

  const isDefault =
    previewSize === defaults.size &&
    previewOrientation === defaults.orientation &&
    previewDisabled === defaults.disabled &&
    previewHint === defaults.hint &&
    previewSelected === defaults.selected;

  const resetPreview = () => {
    setPreviewSize(defaults.size);
    setPreviewOrientation(defaults.orientation);
    setPreviewDisabled(defaults.disabled);
    setPreviewHint(defaults.hint);
    setPreviewSelected(defaults.selected);
  };

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Radio buttons"
        description="Single-choice selection within a group, built on React Aria. Supports an optional hint per option, horizontal/vertical orientation, and two sizes - driven from config/design-system.config.ts."
        actions={<ContextualConfigPanel slug="radio-buttons" title="Radio buttons" sections={sectionToggles} />}
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
                  <RadioGroup
                    size={previewSize}
                    orientation={previewOrientation}
                    isDisabled={previewDisabled}
                    value={previewSelected}
                    onChange={setPreviewSelected}
                    aria-label="Plan"
                  >
                    {planOptions.map((o) => (
                      <RadioButton key={o.value} value={o.value} label={o.label} hint={previewHint || undefined} />
                    ))}
                  </RadioGroup>
                </div>
                <code className="text-xs text-quaternary">
                  {previewSize} · {previewOrientation}
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

                <div className="flex flex-col gap-1.5">
                  <ScaffoldLabel>Orientation</ScaffoldLabel>
                  <SegmentedControl
                    options={[
                      { key: "vertical" as const, label: "Vertical" },
                      { key: "horizontal" as const, label: "Horizontal" },
                    ]}
                    value={previewOrientation}
                    onChange={setPreviewOrientation}
                  />
                </div>

                <ScaffoldTextInput label="Hint" value={previewHint} onChange={setPreviewHint} />

                <ScaffoldCheckbox label="Disabled" checked={previewDisabled} onChange={setPreviewDisabled} />
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
                <RadioGroup size={s.key as "sm" | "md"} defaultValue="a" aria-label={s.label}>
                  <RadioButton value="a" />
                </RadioGroup>
                <code className="text-xs">{s.key}</code>
              </div>
            ))}
          </Section>
        </>
      )}

      {/* ── With hint text ── */}
      {isFeatureEnabled(config, "withHint") && (
        <>
          <h2 className="text-balance">With hint text</h2>
          <p className="text-balance">Pass a <code>hint</code> to a <code>RadioButton</code> for supporting detail beneath its label.</p>
          <Section label="Labelled with hint">
            <RadioGroup size="md" defaultValue="growth" aria-label="Plan">
              <RadioButton value="starter" label="Starter" hint="For individuals trying things out." />
              <RadioButton value="growth" label="Growth" hint="For small teams that need more room." />
              <RadioButton value="scale" label="Scale" hint="For organisations with advanced needs." />
            </RadioGroup>
          </Section>
        </>
      )}

      {/* ── Disabled ── */}
      {isFeatureEnabled(config, "disabled") && (
        <>
          <h2 className="text-balance">Disabled</h2>
          <p className="text-balance">Disabled dims every option in the group and prevents interaction. Pass <code>isDisabled</code> on a single <code>RadioButton</code> to disable just that option instead.</p>
          <Section label="Group disabled">
            <RadioGroup size="md" defaultValue="growth" isDisabled aria-label="Plan">
              <RadioButton value="starter" label="Starter" />
              <RadioButton value="growth" label="Growth" />
              <RadioButton value="scale" label="Scale" />
            </RadioGroup>
          </Section>
        </>
      )}

      {/* ── Orientation ── */}
      {isFeatureEnabled(config, "orientation") && (
        <>
          <h2 className="text-balance">Orientation</h2>
          <p className="text-balance">Groups stack vertically by default - pass <code>orientation=&quot;horizontal&quot;</code> to lay options out in a row.</p>
          <Section label="Vertical / horizontal">
            <RadioGroup size="sm" defaultValue="a" aria-label="Vertical example">
              <RadioButton value="a" label="Option one" />
              <RadioButton value="b" label="Option two" />
              <RadioButton value="c" label="Option three" />
            </RadioGroup>
            <RadioGroup size="sm" orientation="horizontal" defaultValue="a" aria-label="Horizontal example">
              <RadioButton value="a" label="Option one" />
              <RadioButton value="b" label="Option two" />
              <RadioButton value="c" label="Option three" />
            </RadioGroup>
          </Section>
        </>
      )}

      {/* ── Group ── */}
      {isFeatureEnabled(config, "group") && (
        <>
          <h2 className="text-balance">Group</h2>
          <p className="text-balance">A real-world plan selector - the common pattern for pricing and settings pages.</p>
          <Section label="Plan selector">
            <RadioGroup size="md" defaultValue="growth" aria-label="Choose a plan">
              <RadioButton value="starter" label="Starter" hint="1 user, community support." />
              <RadioButton value="growth" label="Growth" hint="Up to 10 users, priority support." />
              <RadioButton value="scale" label="Scale" hint="Unlimited users, dedicated support." />
            </RadioGroup>
          </Section>
        </>
      )}

      {/* ── API ── */}
      <h2 className="text-balance">API</h2>
      <p className="text-balance"><code>RadioGroup</code> holds the selected value and orientation; each <code>RadioButton</code> inside it is one option.</p>
      <h3 className="text-balance">RadioGroup</h3>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {groupProps.map((p) => (
            <tr key={p.name}>
              <td><code>{p.name}</code></td>
              <td><code style={{ fontSize: "11px" }}>{p.type}</code></td>
              <td><code>{p.default}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="mt-8 text-balance">RadioButton</h3>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {buttonProps.map((p) => (
            <tr key={p.name}>
              <td><code>{p.name}</code></td>
              <td><code style={{ fontSize: "11px" }}>{p.type}</code></td>
              <td><code>{p.default}</code></td>
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
{`import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";

<RadioGroup defaultValue="growth" aria-label="Plan">
  <RadioButton value="starter" label="Starter" />
  <RadioButton value="growth" label="Growth" />
  <RadioButton value="scale" label="Scale" />
</RadioGroup>`}
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
