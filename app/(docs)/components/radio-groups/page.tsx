"use client";

import { useState } from "react";
import type React from "react";
import { Building07, Rocket02, Zap } from "@untitledui/icons";
import { PageHeader } from "@/components/PageHeader";
import {
  IconSimple as RgIconSimple,
  IconCard as RgIconCard,
  Avatar as RgAvatar,
  PaymentIcon as RgPaymentIcon,
  RadioButton as RgRadioButton,
  Checkbox as RgCheckbox,
} from "@/components/base/radio-groups/radio-groups";
import { MastercardIcon, PayPalIcon, VisaIcon } from "@/components/foundations/payment-icons";
import { ContextualConfigPanel } from "@/components/ContextualConfigPanel";
import { ScaffoldCheckbox, ScaffoldLabel, SegmentedControl } from "@/components/scaffold/controls";
import { enabledVariants, isFeatureEnabled } from "@/config/design-system.config";
import { useConfig } from "@/lib/config-context";

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col items-start gap-4 rounded-xl border border-secondary bg-secondary p-6">
    <p className="mb-1 w-full text-xs font-semibold text-quaternary uppercase tracking-widest text-balance">
      {label}
    </p>
    {children}
  </div>
);

type RgType = "icon-simple" | "icon-card" | "avatar" | "payment-icon" | "radio-button" | "checkbox";

// Demo data - the fictional Olivia Wyatt / Phoenix Baker / Lana Steiner personas per CONTEXT.md's
// placeholder-person convention, plan-selector copy reused from the Radio buttons page for
// consistency across the two related components.
const planItems = [
  { value: "starter", title: "Starter", secondaryTitle: "Free", description: "1 user, community support.", icon: Zap },
  { value: "growth", title: "Growth", secondaryTitle: "$29/mo", description: "Up to 10 users, priority support.", icon: Rocket02 },
  { value: "scale", title: "Scale", secondaryTitle: "$99/mo", description: "Unlimited users, dedicated support.", icon: Building07 },
];
const planCardItems = [
  { value: "starter", title: "Starter", price: "$9", secondaryTitle: "/month", description: "1 user, community support.", icon: Zap },
  { value: "growth", title: "Growth", price: "$29", secondaryTitle: "/month", description: "Up to 10 users, priority support.", icon: Rocket02, badge: "Popular" },
  { value: "scale", title: "Scale", price: "$99", secondaryTitle: "/month", description: "Unlimited users, dedicated support.", icon: Building07 },
];
const peopleItems = [
  { id: "olivia", name: "Olivia Wyatt", username: "@olivia", title: "Product Designer", avatarUrl: "" },
  { id: "phoenix", name: "Phoenix Baker", username: "@phoenix", title: "Engineering Lead", avatarUrl: "" },
  { id: "lana", name: "Lana Steiner", username: "@lana", title: "Data Analyst", avatarUrl: "" },
];
const paymentItems = [
  { value: "visa", title: "Visa ending in 4242", description: "Expires 04/2027", logo: <VisaIcon /> },
  { value: "mastercard", title: "Mastercard ending in 8210", description: "Expires 11/2026", logo: <MastercardIcon /> },
  { value: "paypal", title: "PayPal", description: "olivia@dew.design", logo: <PayPalIcon /> },
];

const typeDefaults: Record<RgType, string> = {
  "icon-simple": "growth",
  "icon-card": "growth",
  avatar: "phoenix",
  "payment-icon": "mastercard",
  "radio-button": "growth",
  checkbox: "growth",
};

function RgPreview({ type, size, disabled }: { type: RgType; size: "sm" | "md"; disabled: boolean }) {
  switch (type) {
    case "icon-simple":
      return <RgIconSimple items={planItems} size={size} isDisabled={disabled} defaultValue={typeDefaults[type]} aria-label="Plan" />;
    case "icon-card":
      return <RgIconCard items={planCardItems} size={size} isDisabled={disabled} defaultValue={typeDefaults[type]} aria-label="Plan" />;
    case "avatar":
      return <RgAvatar items={peopleItems} size={size} isDisabled={disabled} defaultValue={typeDefaults[type]} aria-label="Assignee" />;
    case "payment-icon":
      return <RgPaymentIcon items={paymentItems} size={size} isDisabled={disabled} defaultValue={typeDefaults[type]} aria-label="Payment method" />;
    case "radio-button":
      return <RgRadioButton items={planItems} size={size} isDisabled={disabled} defaultValue={typeDefaults[type]} aria-label="Plan" />;
    case "checkbox":
      return <RgCheckbox items={planItems} size={size} isDisabled={disabled} defaultValue={typeDefaults[type]} aria-label="Plan" />;
  }
}

// Pulled from RadioGroupProps (react-aria-components AriaRadioGroupProps, minus `children`
// which every variant replaces with a typed `items` array instead).
const commonProps = [
  { name: "items",        type: "ItemType[]",                default: "-  (see item shape per type below)" },
  { name: "size",         type: '"sm" | "md"',               default: '"sm"' },
  { name: "value",        type: "string",                    default: "-" },
  { name: "defaultValue", type: "string",                    default: "-" },
  { name: "onChange",     type: "(value: string) => void",   default: "-" },
  { name: "isDisabled",   type: "boolean",                   default: "false" },
  { name: "isRequired",   type: "boolean",                   default: "false" },
  { name: "name",         type: "string",                    default: "-" },
  { name: "className",    type: "string",                    default: "-" },
];

const itemShapes: { type: RgType; label: string; component: string; fields: { name: string; type: string }[] }[] = [
  {
    type: "icon-simple",
    label: "Icon simple",
    component: "IconSimple",
    fields: [
      { name: "value", type: "string" },
      { name: "title", type: "string" },
      { name: "secondaryTitle", type: "string" },
      { name: "description", type: "string" },
      { name: "icon", type: "FC<{ className?: string }>" },
      { name: "disabled", type: "boolean" },
    ],
  },
  {
    type: "icon-card",
    label: "Icon card",
    component: "IconCard",
    fields: [
      { name: "value", type: "string" },
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "secondaryTitle", type: "string" },
      { name: "price", type: "string" },
      { name: "badge", type: "ReactNode" },
      { name: "icon", type: "FC<{ className?: string }>" },
      { name: "disabled", type: "boolean" },
    ],
  },
  {
    type: "avatar",
    label: "Avatar",
    component: "Avatar",
    fields: [
      { name: "id", type: "string" },
      { name: "name", type: "string" },
      { name: "username", type: "string" },
      { name: "title", type: "string" },
      { name: "avatarUrl", type: "string" },
      { name: "disabled", type: "boolean" },
    ],
  },
  {
    type: "payment-icon",
    label: "Payment icon",
    component: "PaymentIcon",
    fields: [
      { name: "value", type: "string" },
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "logo", type: "ReactNode" },
      { name: "disabled", type: "boolean" },
    ],
  },
  {
    type: "radio-button",
    label: "Radio button",
    component: "RadioButton",
    fields: [
      { name: "value", type: "string" },
      { name: "title", type: "string" },
      { name: "secondaryTitle", type: "string" },
      { name: "description", type: "string" },
      { name: "icon", type: "FC<{ className?: string }>", },
      { name: "disabled", type: "boolean" },
    ],
  },
  {
    type: "checkbox",
    label: "Checkbox",
    component: "Checkbox",
    fields: [
      { name: "value", type: "string" },
      { name: "title", type: "string" },
      { name: "secondaryTitle", type: "string" },
      { name: "description", type: "string" },
      { name: "icon", type: "FC<{ className?: string }>" },
      { name: "disabled", type: "boolean" },
    ],
  },
];

const sectionToggles = [
  { key: "playground", label: "Component Playground" },
  { key: "disabled", label: "Disabled" },
  { key: "usage", label: "Usage" },
  { key: "figma", label: "Figma" },
];

export default function RadioGroupsPage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig["radio-groups"];
  const sizes = enabledVariants(config.sizes);
  const types = enabledVariants(config.types) as { key: RgType; label: string }[];

  const defaults = {
    type: "icon-simple" as RgType,
    size: "sm" as "sm" | "md",
    disabled: false,
  };

  const [previewType, setPreviewType] = useState<RgType>(defaults.type);
  const [previewSize, setPreviewSize] = useState(defaults.size);
  const [previewDisabled, setPreviewDisabled] = useState(defaults.disabled);

  const isDefault = previewType === defaults.type && previewSize === defaults.size && previewDisabled === defaults.disabled;

  const resetPreview = () => {
    setPreviewType(defaults.type);
    setPreviewSize(defaults.size);
    setPreviewDisabled(defaults.disabled);
  };

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Radio groups"
        description="Card-style single-choice selection, built on React Aria. Six layouts - icon, icon card, avatar, payment icon, radio button, and checkbox - each driven by a typed items array, in two sizes."
        actions={<ContextualConfigPanel slug="radio-groups" title="Radio groups" sections={sectionToggles} />}
      />

      {/* ── Component Playground ── */}
      {isFeatureEnabled(config, "playground") && (
        <>
          <h2 className="text-balance">Component Playground</h2>
          <p className="text-balance">Live instance - the controls read their options from the same config that drives the Types/Sizes sections below.</p>
          <div className="overflow-hidden rounded-2xl border border-secondary shadow-xs">
            <div className="grid md:grid-cols-[1fr_300px]">
              <div
                className="relative flex min-h-[420px] flex-col items-center justify-center gap-3 bg-primary_alt p-12"
                style={{
                  backgroundImage: "radial-gradient(var(--ui-border-secondary) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                <div className="w-full max-w-sm rounded-xl bg-primary p-6 shadow-md">
                  <RgPreview key={previewType} type={previewType} size={previewSize} disabled={previewDisabled} />
                </div>
                <code className="text-xs text-quaternary">
                  {previewType} · {previewSize}
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
                  <ScaffoldLabel>Type</ScaffoldLabel>
                  <SegmentedControl options={types.map((t) => ({ key: t.key, label: t.label }))} value={previewType} onChange={setPreviewType} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <ScaffoldLabel>Size</ScaffoldLabel>
                  <SegmentedControl
                    options={sizes.map((s) => ({ key: s.key as "sm" | "md", label: s.key }))}
                    value={previewSize}
                    onChange={setPreviewSize}
                  />
                </div>

                <ScaffoldCheckbox label="Disabled" checked={previewDisabled} onChange={setPreviewDisabled} />
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Types ── */}
      {types.length > 0 && (
        <>
          <h2 className="text-balance">Types</h2>
          <p className="text-balance">
            Six layouts, all driven by the same <code>items</code>/<code>size</code>/<code>isDisabled</code> shape - swap the component to change
            the card content, not the group behaviour.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Section label="Icon simple">
              <div className="w-full max-w-xs"><RgIconSimple items={planItems} defaultValue="growth" aria-label="Plan" /></div>
            </Section>
            <Section label="Icon card">
              <div className="w-full max-w-xs"><RgIconCard items={planCardItems} defaultValue="growth" aria-label="Plan" /></div>
            </Section>
            <Section label="Avatar">
              <div className="w-full max-w-xs"><RgAvatar items={peopleItems} defaultValue="phoenix" aria-label="Assignee" /></div>
            </Section>
            <Section label="Payment icon">
              <div className="w-full max-w-xs"><RgPaymentIcon items={paymentItems} defaultValue="mastercard" aria-label="Payment method" /></div>
            </Section>
            <Section label="Radio button">
              <div className="w-full max-w-xs"><RgRadioButton items={planItems} defaultValue="growth" aria-label="Plan" /></div>
            </Section>
            <Section label="Checkbox">
              <div className="w-full max-w-xs"><RgCheckbox items={planItems} defaultValue="growth" aria-label="Plan" /></div>
            </Section>
          </div>
        </>
      )}

      {/* ── Sizes ── */}
      {sizes.length > 0 && (
        <>
          <h2 className="text-balance">Sizes</h2>
          <p className="text-balance">Two sizes - <code>sm</code> (default) and <code>md</code> - shown here on the icon-simple layout.</p>
          <Section label={sizes.map((s) => s.label).join(" / ")}>
            <div className="flex w-full flex-col gap-6 sm:flex-row">
              {sizes.map((s) => (
                <div key={s.key} className="flex w-full max-w-xs flex-col items-center gap-2">
                  <div className="w-full">
                    <RgIconSimple items={planItems} size={s.key as "sm" | "md"} defaultValue="growth" aria-label={s.label} />
                  </div>
                  <code className="text-xs">{s.key}</code>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* ── Disabled ── */}
      {isFeatureEnabled(config, "disabled") && (
        <>
          <h2 className="text-balance">Disabled</h2>
          <p className="text-balance">
            <code>isDisabled</code> on the group dims and disables every card. Set <code>disabled</code> on a single item instead to disable just
            that option.
          </p>
          <Section label="Group disabled">
            <div className="w-full max-w-xs"><RgIconSimple items={planItems} defaultValue="growth" isDisabled aria-label="Plan" /></div>
          </Section>
        </>
      )}

      {/* ── API ── */}
      <h2 className="text-balance">API</h2>
      <p className="text-balance">Every variant shares the same group-level props - only the shape of each <code>items</code> entry differs.</p>
      <h3 className="text-balance">Common props</h3>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {commonProps.map((p) => (
            <tr key={p.name}>
              <td><code>{p.name}</code></td>
              <td><code style={{ fontSize: "11px" }}>{p.type}</code></td>
              <td><code>{p.default}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      {itemShapes.map((shape) => (
        <div key={shape.type}>
          <h3 className="mt-8 text-balance">{shape.label} - item shape</h3>
          <table className="token-table mt-4">
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {shape.fields.map((f) => (
                <tr key={f.name}>
                  <td><code>{f.name}</code></td>
                  <td><code style={{ fontSize: "11px" }}>{f.type}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
          {(shape.type === "radio-button" || shape.type === "checkbox") && (
            <p className="mt-2 text-xs text-tertiary">
              <code>icon</code> is declared on this item type but never rendered by the component - same as{" "}
              <code>Avatar</code>&apos;s dead <code>contrastBorder</code> prop, documented here for accuracy rather than silently dropped.
            </p>
          )}
        </div>
      ))}

      {/* ── Usage ── */}
      {isFeatureEnabled(config, "usage") && (
        <>
          <h2 className="text-balance">Usage</h2>
          <pre className="overflow-x-auto rounded-xl border border-secondary bg-secondary p-5">
            <code className="font-mono text-[13px] text-secondary">
{`import { IconSimple } from "@/components/base/radio-groups/radio-groups";

<IconSimple
  aria-label="Plan"
  defaultValue="growth"
  items={[
    { value: "starter", title: "Starter", secondaryTitle: "Free", description: "1 user.", icon: Zap },
    { value: "growth", title: "Growth", secondaryTitle: "$29/mo", description: "Up to 10 users.", icon: Rocket02 },
  ]}
/>`}
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
