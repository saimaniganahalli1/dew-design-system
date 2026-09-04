"use client";

import { useState } from "react";
import type React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button, styles as buttonStyles } from "@/components/base/buttons/button";
import { ContextualConfigPanel } from "@/components/ContextualConfigPanel";
import {
  ScaffoldCheckbox,
  ScaffoldLabel,
  ScaffoldTextInput,
  SegmentedControl,
} from "@/components/scaffold/controls";
import { Plus, ArrowRight, ArrowLeft, Download01, Trash01, Edit01, Send01, ChevronDown } from "@untitledui/icons";
import { enabledVariants, isFeatureEnabled } from "@/config/design-system.config";
import { useConfig } from "@/lib/config-context";

type ButtonColor = keyof typeof buttonStyles.colors;
type ButtonSize = keyof typeof buttonStyles.sizes;

/* ── Helpers ── */
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
  { key: "iconLeading", label: "Leading icon" },
  { key: "iconTrailing", label: "Trailing icon" },
  { key: "iconBoth", label: "Both icons" },
  { key: "iconOnly", label: "Icon only" },
  { key: "disabled", label: "Disabled" },
  { key: "loading", label: "Loading - spinner only" },
  { key: "loadingWithText", label: "Loading - spinner + text" },
  { key: "asLink", label: "As link" },
  { key: "usage", label: "Usage" },
  { key: "figma", label: "Figma" },
];

const props = [
  { name: "color",               type: "\"primary\" | \"secondary\" | \"tertiary\" | \"link-color\" | \"link-gray\" | \"primary-destructive\" | \"secondary-destructive\" | \"tertiary-destructive\" | \"link-destructive\"", default: "\"primary\"" },
  { name: "size",                type: "\"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\"",  default: "\"sm\"" },
  { name: "iconLeading",         type: "FC | ReactNode",  default: "-" },
  { name: "iconTrailing",        type: "FC | ReactNode",  default: "-" },
  { name: "isDisabled",          type: "boolean",          default: "false" },
  { name: "isLoading",           type: "boolean",          default: "false" },
  { name: "showTextWhileLoading",type: "boolean",          default: "false" },
  { name: "href",                type: "string",           default: "- (renders <a>)" },
];

export default function ButtonPage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig.button;
  const colors = enabledVariants(config.colors);
  const standardColors = colors.filter((c) => c.group === "standard");
  const destructiveColors = colors.filter((c) => c.group === "destructive");
  const sizes = enabledVariants(config.sizes);

  const defaults = {
    color: "primary" as ButtonColor,
    size: "sm" as ButtonSize,
    label: "Click me",
    disabled: false,
    loading: false,
    showIcon: false,
  };

  const [previewColor, setPreviewColor] = useState(defaults.color);
  const [previewSize, setPreviewSize] = useState(defaults.size);
  const [previewLabel, setPreviewLabel] = useState(defaults.label);
  const [previewDisabled, setPreviewDisabled] = useState(defaults.disabled);
  const [previewLoading, setPreviewLoading] = useState(defaults.loading);
  const [previewShowIcon, setPreviewShowIcon] = useState(defaults.showIcon);

  const isDefault =
    previewColor === defaults.color &&
    previewSize === defaults.size &&
    previewLabel === defaults.label &&
    previewDisabled === defaults.disabled &&
    previewLoading === defaults.loading &&
    previewShowIcon === defaults.showIcon;

  const resetPreview = () => {
    setPreviewColor(defaults.color);
    setPreviewSize(defaults.size);
    setPreviewLabel(defaults.label);
    setPreviewDisabled(defaults.disabled);
    setPreviewLoading(defaults.loading);
    setPreviewShowIcon(defaults.showIcon);
  };

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Button"
        description="The primary action trigger. Built on React Aria for full keyboard and screen-reader support. Colour, size, icon, and state variants are all driven from config/design-system.config.ts."
        actions={<ContextualConfigPanel slug="button" title="Button" sections={sectionToggles} />}
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
                  <Button
                    color={previewColor}
                    size={previewSize}
                    isDisabled={previewDisabled}
                    isLoading={previewLoading}
                    iconLeading={previewShowIcon ? Plus : undefined}
                  >
                    {previewLabel || undefined}
                  </Button>
                </div>
                <code className="text-xs text-quaternary">
                  {previewColor} · {previewSize}
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

                {standardColors.length > 0 && (
                  <div className="flex flex-col gap-1.5">
                    <ScaffoldLabel>Colour - standard</ScaffoldLabel>
                    <SegmentedControl
                      options={standardColors.map((c) => ({ key: c.key as ButtonColor, label: c.label }))}
                      value={previewColor}
                      onChange={setPreviewColor}
                    />
                  </div>
                )}

                {destructiveColors.length > 0 && (
                  <div className="flex flex-col gap-1.5">
                    <ScaffoldLabel>Colour - destructive</ScaffoldLabel>
                    <SegmentedControl
                      options={destructiveColors.map((c) => ({ key: c.key as ButtonColor, label: c.label }))}
                      value={previewColor}
                      onChange={setPreviewColor}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <ScaffoldLabel>Size</ScaffoldLabel>
                  <SegmentedControl
                    options={sizes.map((s) => ({ key: s.key as ButtonSize, label: s.key }))}
                    value={previewSize}
                    onChange={setPreviewSize}
                  />
                </div>

                <ScaffoldTextInput label="Label" value={previewLabel} onChange={setPreviewLabel} />

                <div className="flex flex-row flex-wrap gap-6">
                  <ScaffoldCheckbox label="Icon" checked={previewShowIcon} onChange={setPreviewShowIcon} />
                  <ScaffoldCheckbox label="Disabled" checked={previewDisabled} onChange={setPreviewDisabled} />
                  <ScaffoldCheckbox label="Loading" checked={previewLoading} onChange={setPreviewLoading} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Colour variants ── */}
      {colors.length > 0 && (
        <>
          <h2 className="text-balance">Variants</h2>
          <p className="text-balance">Choose a colour based on the action&apos;s visual weight and context. Destructive variants are for irreversible actions.</p>

          <div className="mt-4 flex flex-col gap-4">
            {standardColors.length > 0 && (
              <Section label="Standard">
                {standardColors.map((c) => (
                  <Button key={c.key} color={c.key as ButtonColor}>{c.label}</Button>
                ))}
              </Section>
            )}

            {destructiveColors.length > 0 && (
              <Section label="Destructive">
                {destructiveColors.map((c) => (
                  <Button key={c.key} color={c.key as ButtonColor}>{c.label}</Button>
                ))}
              </Section>
            )}
          </div>
        </>
      )}

      {/* ── Sizes ── */}
      {sizes.length > 0 && (
        <>
          <h2 className="text-balance">Sizes</h2>
          <p className="text-balance">Size affects padding, font-size, and icon dimensions.</p>

          <Section label="All sizes - primary">
            {sizes.map((s) => (
              <Button key={s.key} size={s.key as ButtonSize}>{s.label}</Button>
            ))}
          </Section>
        </>
      )}

      {/* ── With icons ── */}
      {(isFeatureEnabled(config, "iconLeading") || isFeatureEnabled(config, "iconTrailing") || isFeatureEnabled(config, "iconBoth") || isFeatureEnabled(config, "iconOnly")) && (
        <>
          <h2 className="text-balance">With icons</h2>
          <p className="text-balance">Pass any <code>@untitledui/icons</code> component as <code>iconLeading</code> or <code>iconTrailing</code>. Pass <em>only</em> an icon (no children) for an icon-only button.</p>

          <div className="mt-4 flex flex-col gap-4">
            {isFeatureEnabled(config, "iconLeading") && (
              <Section label="Leading icon">
                <Button color="primary" iconLeading={Plus}>Add item</Button>
                <Button color="secondary" iconLeading={Download01}>Download</Button>
                <Button color="tertiary" iconLeading={Edit01}>Edit</Button>
              </Section>
            )}

            {isFeatureEnabled(config, "iconTrailing") && (
              <Section label="Trailing icon">
                <Button color="primary" iconTrailing={ArrowRight}>Continue</Button>
                <Button color="secondary" iconTrailing={ChevronDown}>Options</Button>
                <Button color="link-color" iconTrailing={ArrowRight}>Learn more</Button>
              </Section>
            )}

            {isFeatureEnabled(config, "iconBoth") && (
              <Section label="Both icons">
                <Button color="primary" iconLeading={ArrowLeft} iconTrailing={ArrowRight}>
                  Navigate
                </Button>
                <Button color="secondary" iconLeading={Send01} iconTrailing={ChevronDown}>
                  Send
                </Button>
              </Section>
            )}

            {isFeatureEnabled(config, "iconOnly") && (
              <Section label="Icon only">
                <Button color="primary" iconLeading={Plus} size="sm" />
                <Button color="primary" iconLeading={Plus} size="md" />
                <Button color="secondary" iconLeading={Download01} size="md" />
                <Button color="secondary" iconLeading={Edit01} size="md" />
                <Button color="tertiary-destructive" iconLeading={Trash01} size="md" />
              </Section>
            )}
          </div>
        </>
      )}

      {/* ── States ── */}
      {(isFeatureEnabled(config, "disabled") || isFeatureEnabled(config, "loading") || isFeatureEnabled(config, "loadingWithText")) && (
        <>
          <h2 className="text-balance">States</h2>
          <p className="text-balance">Disabled dims the button and prevents interaction. Loading shows a spinner and sets <code>isPending</code> on the underlying React Aria button.</p>

          <div className="mt-4 flex flex-col gap-4">
            {isFeatureEnabled(config, "disabled") && (
              <Section label="Disabled">
                <Button color="primary" isDisabled>Primary</Button>
                <Button color="secondary" isDisabled>Secondary</Button>
                <Button color="tertiary" isDisabled>Tertiary</Button>
                <Button color="primary-destructive" isDisabled>Destructive</Button>
              </Section>
            )}

            {isFeatureEnabled(config, "loading") && (
              <Section label="Loading - spinner only">
                <Button color="primary" isLoading>Primary</Button>
                <Button color="secondary" isLoading>Secondary</Button>
                <Button color="tertiary" isLoading>Tertiary</Button>
              </Section>
            )}

            {isFeatureEnabled(config, "loadingWithText") && (
              <Section label="Loading - spinner + text">
                <Button color="primary" isLoading showTextWhileLoading iconLeading={Send01}>
                  Sending…
                </Button>
                <Button color="secondary" isLoading showTextWhileLoading>
                  Saving…
                </Button>
              </Section>
            )}
          </div>
        </>
      )}

      {/* ── As link ── */}
      {isFeatureEnabled(config, "asLink") && (
        <>
          <h2 className="text-balance">As link</h2>
          <p className="text-balance">Pass an <code>href</code> prop and the button renders as an <code>&lt;a&gt;</code> tag (via React Aria <code>Link</code>). All variants and sizes work the same.</p>

          <Section label="Link buttons">
            <Button color="primary" href="#">Go somewhere</Button>
            <Button color="secondary" href="#" iconTrailing={ArrowRight}>View docs</Button>
            <Button color="link-color" href="#" iconTrailing={ArrowRight}>Learn more</Button>
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
      <p className="text-balance">Each colour variant maps directly to Untitled UI semantic tokens defined in <code>globals.css</code>. Swap the <code>--ui-bg-brand-*</code> variables to make every primary button DEW-branded.</p>

      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Variant</th>
            <th>Background token</th>
            <th>Text token</th>
            <th>Ring token</th>
          </tr>
        </thead>
        <tbody>
          {[
            { v: "primary",              bg: "bg-brand-solid",   text: "text-white",          ring: "ring-transparent" },
            { v: "secondary",            bg: "bg-primary",       text: "text-secondary",       ring: "ring-primary" },
            { v: "tertiary",             bg: "transparent",      text: "text-tertiary",        ring: "none" },
            { v: "primary-destructive",  bg: "bg-error-solid",   text: "text-white",          ring: "ring-transparent" },
            { v: "secondary-destructive",bg: "bg-primary",       text: "text-error-primary",   ring: "ring-error_subtle" },
            { v: "tertiary-destructive", bg: "transparent",      text: "text-error-primary",   ring: "none" },
          ].map((r) => (
            <tr key={r.v}>
              <td className="text-secondary">{r.v}</td>
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
{`import { Button } from "@/components/base/buttons/button";

<Button color="primary" size="sm">
  Click me
</Button>`}
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
