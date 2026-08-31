"use client";

import type React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { enabledVariants, isFeatureEnabled } from "@/config/design-system.config";
import { useConfig } from "@/lib/config-context";

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div
    className="rounded-xl p-6 flex flex-wrap items-start gap-6"
    style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
  >
    <p className="w-full text-xs font-semibold uppercase tracking-widest mb-1"
      style={{ color: "var(--color-gray-400)" }}
    >
      {label}
    </p>
    {children}
  </div>
);

const props = [
  { name: "size",            type: '"sm" | "md"',   default: '"sm"' },
  { name: "label",           type: "ReactNode",      default: "—" },
  { name: "hint",            type: "ReactNode",      default: "—" },
  { name: "isSelected",      type: "boolean",        default: "—" },
  { name: "defaultSelected", type: "boolean",        default: "false" },
  { name: "isIndeterminate", type: "boolean",        default: "false" },
  { name: "isDisabled",      type: "boolean",        default: "false" },
  { name: "onChange",        type: "(isSelected: boolean) => void", default: "—" },
];

export default function CheckboxPage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig.checkbox;
  const sizes = enabledVariants(config.sizes);

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Checkbox"
        description="A binary selection control built on React Aria. Supports an indeterminate state, optional label/hint text, and two sizes — driven from config/design-system.config.ts."
      />

      {/* ── States ── */}
      {isFeatureEnabled(config, "states") && (
        <>
          <h2>States</h2>
          <p>Unchecked, checked, and indeterminate — used for a parent checkbox representing a partially-selected group.</p>
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
          <h2>Sizes</h2>
          <p>Two sizes — <code>sm</code> (default) and <code>md</code>.</p>
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
          <h2>Disabled</h2>
          <p>Disabled dims the control and prevents interaction, in both the unchecked and checked states.</p>
          <Section label="Disabled — unchecked / checked / indeterminate">
            <Checkbox aria-label="Disabled unchecked" isDisabled />
            <Checkbox aria-label="Disabled checked" isDisabled defaultSelected />
            <Checkbox aria-label="Disabled indeterminate" isDisabled isIndeterminate />
          </Section>
        </>
      )}

      {/* ── With label ── */}
      {isFeatureEnabled(config, "withLabel") && (
        <>
          <h2>With label</h2>
          <p>Pass a <code>label</code> to pair the control with descriptive text. The whole row becomes clickable.</p>
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
          <h2>With hint text</h2>
          <p>Add a <code>hint</code> for supporting detail beneath the label.</p>
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
          <h2>Group</h2>
          <p>A stacked list of checkboxes — the common pattern for multi-select filters and settings lists.</p>
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
      <p>Checked and indeterminate share the same brand-filled treatment. Swap <code>--ui-bg-brand-solid</code> to rebrand every checked control at once.</p>
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
            { state: "Focus-visible outline", bg: "—",             ring: "outline-focus-ring" },
          ].map((r) => (
            <tr key={r.state}>
              <td style={{ color: "var(--ui-text-secondary)" }}>{r.state}</td>
              <td><code>{r.bg}</code></td>
              <td><code>{r.ring}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
