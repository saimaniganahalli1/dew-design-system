"use client";

import { useState } from "react";
import type React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Badge, BadgeWithDot, BadgeWithIcon, BadgeWithButton, BadgeIcon } from "@/components/base/badges/badges";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { ContextualConfigPanel } from "@/components/ContextualConfigPanel";
import { Star01, Check, Zap } from "@untitledui/icons";
import type { BadgeColors, BadgeTypes, Sizes } from "@/components/base/badges/badge-types";
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
  { key: "withDot", label: "With dot" },
  { key: "withIcon", label: "With icon" },
  { key: "iconOnly", label: "Icon only" },
  { key: "withButton", label: "With dismiss button" },
  { key: "group", label: "Badge group" },
  { key: "usage", label: "Usage" },
  { key: "figma", label: "Figma" },
];

const props = [
  { name: "type",     type: '"pill-color" | "color" | "modern"', default: '"pill-color"' },
  { name: "size",     type: '"sm" | "md" | "lg"',                default: '"md"' },
  { name: "color",    type: "BadgeColors (12 options)",          default: '"gray"' },
  { name: "background", type: "boolean (BadgeWithDot pill-color)", default: "true" },
  { name: "children", type: "ReactNode",                          default: "-" },
];

type PlaygroundStyle = "plain" | "dot" | "icon" | "button";

export default function BadgePage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig.badge;
  const types = enabledVariants(config.types);
  const colors = enabledVariants(config.colors);
  const sizes = enabledVariants(config.sizes);

  const defaults = {
    type: "pill-color" as BadgeTypes,
    color: "brand" as BadgeColors,
    size: "md" as Sizes,
    label: "Badge",
    style: "plain" as PlaygroundStyle,
    background: true,
  };

  const [previewType, setPreviewType] = useState(defaults.type);
  const [previewColor, setPreviewColor] = useState(defaults.color);
  const [previewSize, setPreviewSize] = useState(defaults.size);
  const [previewLabel, setPreviewLabel] = useState(defaults.label);
  const [previewStyle, setPreviewStyle] = useState(defaults.style);
  const [previewBackground, setPreviewBackground] = useState(defaults.background);

  const isDefault =
    previewType === defaults.type &&
    previewColor === defaults.color &&
    previewSize === defaults.size &&
    previewLabel === defaults.label &&
    previewStyle === defaults.style &&
    previewBackground === defaults.background;

  const resetPreview = () => {
    setPreviewType(defaults.type);
    setPreviewColor(defaults.color);
    setPreviewSize(defaults.size);
    setPreviewLabel(defaults.label);
    setPreviewStyle(defaults.style);
    setPreviewBackground(defaults.background);
  };

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Badge"
        description="A compact, non-interactive status label. Types, colours, sizes, and demo sections are all driven from config/design-system.config.ts."
        actions={<ContextualConfigPanel slug="badge" title="Badge" sections={sectionToggles} />}
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
                  {previewStyle === "dot" && (
                    <BadgeWithDot type={previewType} color={previewColor} size={previewSize} background={previewBackground}>
                      {previewLabel}
                    </BadgeWithDot>
                  )}
                  {previewStyle === "icon" && (
                    <BadgeWithIcon type={previewType} color={previewColor} size={previewSize} iconLeading={Star01}>
                      {previewLabel}
                    </BadgeWithIcon>
                  )}
                  {previewStyle === "button" && (
                    <BadgeWithButton type={previewType} color={previewColor} size={previewSize} buttonLabel="Remove">
                      {previewLabel}
                    </BadgeWithButton>
                  )}
                  {previewStyle === "plain" && (
                    <Badge type={previewType} color={previewColor} size={previewSize}>
                      {previewLabel}
                    </Badge>
                  )}
                </div>
                <code className="text-xs text-quaternary">
                  {previewType} · {previewColor} · {previewSize}
                  {previewStyle === "dot" && previewType === "pill-color" && ` · ${previewBackground ? "background" : "no background"}`}
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
                  <SegmentedControl
                    options={types.map((t) => ({ key: t.key as BadgeTypes, label: t.label }))}
                    value={previewType}
                    onChange={setPreviewType}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <ScaffoldLabel>Style</ScaffoldLabel>
                  <SegmentedControl
                    options={[
                      { key: "plain" as const, label: "Plain" },
                      { key: "dot" as const, label: "Dot" },
                      { key: "icon" as const, label: "Icon" },
                      { key: "button" as const, label: "Button" },
                    ]}
                    value={previewStyle}
                    onChange={setPreviewStyle}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <ScaffoldLabel>Size</ScaffoldLabel>
                  <SegmentedControl
                    options={sizes.map((s) => ({ key: s.key as Sizes, label: s.key }))}
                    value={previewSize}
                    onChange={setPreviewSize}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <ScaffoldLabel>Colour</ScaffoldLabel>
                  <SegmentedControl
                    options={colors.map((c) => ({ key: c.key as BadgeColors, label: c.label }))}
                    value={previewColor}
                    onChange={setPreviewColor}
                  />
                </div>

                <ScaffoldTextInput label="Label" value={previewLabel} onChange={setPreviewLabel} />

                {previewStyle === "dot" && previewType === "pill-color" && (
                  <ScaffoldCheckbox label="Background" checked={previewBackground} onChange={setPreviewBackground} />
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Types ── */}
      {types.length > 0 && (
        <>
          <h2 className="text-balance">Types</h2>
          <p className="text-balance">Two shapes: <code>pill-color</code> (fully rounded) and <code>color</code> (soft rounded rectangle).</p>

          <div className="flex flex-col gap-4 mt-4">
            {types.map((t) => (
              <Section key={t.key} label={t.label}>
                <Badge type={t.key as BadgeTypes} color="brand">Badge</Badge>
                <Badge type={t.key as BadgeTypes} color="success">Active</Badge>
                <Badge type={t.key as BadgeTypes} color="error">Failed</Badge>
              </Section>
            ))}
          </div>
        </>
      )}

      {/* ── Colours ── */}
      {colors.length > 0 && (
        <>
          <h2 className="text-balance">Colours</h2>
          <p className="text-balance">Use <code>gray</code> for neutral status, <code>brand</code> for informational, and <code>error</code>/<code>warning</code>/<code>success</code> for outcome status.</p>

          <Section label="All colours - pill-color">
            {colors.map((c) => (
              <Badge key={c.key} type="pill-color" color={c.key as BadgeColors}>{c.label}</Badge>
            ))}
          </Section>
        </>
      )}

      {/* ── Sizes ── */}
      {sizes.length > 0 && (
        <>
          <h2 className="text-balance">Sizes</h2>
          <Section label={sizes.map((s) => s.label).join(" / ")}>
            {sizes.map((s) => (
              <Badge key={s.key} size={s.key as Sizes} color="brand">{s.label}</Badge>
            ))}
          </Section>
        </>
      )}

      {/* ── With dot ── */}
      {isFeatureEnabled(config, "withDot") && (
        <>
          <h2 className="text-balance">With dot</h2>
          <p className="text-balance">A leading status dot - most common for live/active states. Figma defines filled, backgroundless, and square badge-colour dot styles.</p>
          <div className="flex flex-col gap-4 mt-4">
            <Section label="Filled pill">
              <BadgeWithDot color="success">Online</BadgeWithDot>
              <BadgeWithDot color="gray">Offline</BadgeWithDot>
              <BadgeWithDot color="warning">Away</BadgeWithDot>
              <BadgeWithDot color="error">Do not disturb</BadgeWithDot>
            </Section>
            <Section label="No background">
              <BadgeWithDot type="pill-color" color="success" background={false}>Online</BadgeWithDot>
              <BadgeWithDot type="pill-color" color="gray" background={false}>Offline</BadgeWithDot>
              <BadgeWithDot type="pill-color" color="warning" background={false}>Away</BadgeWithDot>
              <BadgeWithDot type="pill-color" color="error" background={false}>Do not disturb</BadgeWithDot>
            </Section>
            <Section label="Square colour">
              <BadgeWithDot type="color" color="brand">Brand</BadgeWithDot>
              <BadgeWithDot type="color" color="success">Success</BadgeWithDot>
              <BadgeWithDot type="color" color="warning">Warning</BadgeWithDot>
              <BadgeWithDot type="color" color="error">Error</BadgeWithDot>
            </Section>
          </div>
        </>
      )}

      {/* ── With icon ── */}
      {isFeatureEnabled(config, "withIcon") && (
        <>
          <h2 className="text-balance">With icon</h2>
          <p className="text-balance">Leading or trailing icon, passed as an <code>@untitledui/icons</code> component.</p>
          <Section label="Icon leading / trailing">
            <BadgeWithIcon color="brand" iconLeading={Star01}>Featured</BadgeWithIcon>
            <BadgeWithIcon color="success" iconLeading={Check}>Verified</BadgeWithIcon>
            <BadgeWithIcon color="warning" iconTrailing={Zap}>Boosted</BadgeWithIcon>
          </Section>
        </>
      )}

      {/* ── Icon only ── */}
      {isFeatureEnabled(config, "iconOnly") && (
        <>
          <h2 className="text-balance">Icon only</h2>
          <Section label="No label">
            <BadgeIcon color="brand" icon={Star01} />
            <BadgeIcon color="success" icon={Check} />
            <BadgeIcon color="gray" icon={Zap} />
          </Section>
        </>
      )}

      {/* ── With dismiss button ── */}
      {isFeatureEnabled(config, "withButton") && (
        <>
          <h2 className="text-balance">With dismiss button</h2>
          <p className="text-balance">An inline close button - used for removable filters and selected tags.</p>
          <Section label="Dismissible">
            <BadgeWithButton color="brand" buttonLabel="Remove">Design</BadgeWithButton>
            <BadgeWithButton color="gray" buttonLabel="Remove">Engineering</BadgeWithButton>
            <BadgeWithButton color="error" buttonLabel="Remove">Urgent</BadgeWithButton>
          </Section>
        </>
      )}

      {/* ── Badge group ── */}
      {isFeatureEnabled(config, "group") && (
        <>
          <h2 className="text-balance">Badge group</h2>
          <p className="text-balance">A badge with an attached addon label - used to pair a metric with its context, e.g. a trend value next to a description.</p>
          <Section label="Leading / trailing addon">
            <BadgeGroup addonText="New" color="brand">12 updates</BadgeGroup>
            <BadgeGroup addonText="+40%" color="success" align="trailing">Conversion rate</BadgeGroup>
            <BadgeGroup addonText="Live" color="error" theme="modern">3 issues</BadgeGroup>
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
      <p className="text-balance">Badge colours pull from a separate <strong>utility colour</strong> scale (distinct from the primitive Brand/Error/Warning/Success palette) - a wider set of 50/100/200/500/700 steps built for badges, tags, and avatars.</p>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Colour</th>
            <th>Background</th>
            <th>Text</th>
            <th>Ring</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "gray",   bg: "utility-neutral-50", text: "utility-neutral-700", ring: "utility-neutral-200" },
            { c: "brand",  bg: "utility-brand-50",   text: "utility-brand-700",   ring: "utility-brand-200" },
            { c: "error",  bg: "utility-red-50",     text: "utility-red-700",     ring: "utility-red-200" },
            { c: "warning",bg: "utility-yellow-50",  text: "utility-yellow-700",  ring: "utility-yellow-200" },
            { c: "success",bg: "utility-green-50",   text: "utility-green-700",   ring: "utility-green-200" },
          ].map((r) => (
            <tr key={r.c}>
              <td style={{ color: "var(--ui-text-secondary)" }}>{r.c}</td>
              <td><code>{r.bg}</code></td>
              <td><code>{r.text}</code></td>
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
{`import { Badge } from "@/components/base/badges/badges";

<Badge type="pill-color" color="success">Active</Badge>`}
            </code>
          </pre>
        </>
      )}

      {/* ── Figma ── */}
      {isFeatureEnabled(config, "figma") && (
        <>
          <h2 className="text-balance">Figma</h2>
          <p className="text-balance">Source: <a href="https://www.figma.com/design/llQ4DndM7U0la4qg6MttC5/DS---Foundations?node-id=19066-23220&p=f&t=9IGWUEb0S5F9VJDU-11">DS - Foundations / Badges</a>. The documented set now includes the Figma backgroundless dot pill variation.</p>
        </>
      )}
    </div>
  );
}
