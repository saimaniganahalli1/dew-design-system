"use client";

import { useState } from "react";
import type React from "react";
import { PageHeader } from "@/components/PageHeader";
import { AlertFloating, AlertFullWidth } from "@/components/application/alerts/alerts";
import { ContextualConfigPanel } from "@/components/ContextualConfigPanel";
import {
  ScaffoldCheckbox,
  ScaffoldLabel,
  ScaffoldTextInput,
  SegmentedControl,
} from "@/components/scaffold/controls";
import { enabledVariants, isFeatureEnabled } from "@/config/design-system.config";
import { useConfig } from "@/lib/config-context";

type AlertColor = "default" | "brand" | "gray" | "error" | "warning" | "success";
type AlertType = "floating" | "full-width";
type ActionType = "button" | "link";

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
  { key: "linkActions", label: "Link actions" },
  { key: "withConfirm", label: "With confirm" },
  { key: "withDismiss", label: "With dismiss" },
  { key: "usage", label: "Usage" },
  { key: "figma", label: "Figma" },
];

// Pulled directly from AlertFloatingProps in components/application/alerts/alerts.tsx
const floatingProps = [
  { name: "title",        type: "string",                                                  default: "-" },
  { name: "description",  type: "ReactNode",                                                default: "-" },
  { name: "confirmLabel", type: "string",                                                   default: "-" },
  { name: "dismissLabel", type: "string",                                                   default: '"Dismiss"' },
  { name: "color",        type: '"default" | "brand" | "gray" | "error" | "warning" | "success"', default: '"default"' },
  { name: "onClose",      type: "() => void",                                               default: "-" },
  { name: "onConfirm",    type: "() => void",                                               default: "-" },
];

// Pulled directly from AlertFullWidthProps in components/application/alerts/alerts.tsx
const fullWidthProps = [
  { name: "title",        type: "string",                                                  default: "-" },
  { name: "description",  type: "ReactNode",                                                default: "-" },
  { name: "confirmLabel", type: "string",                                                   default: "-" },
  { name: "dismissLabel", type: "string",                                                   default: '"Dismiss"' },
  { name: "actionType",   type: '"button" | "link"',                                        default: '"button"' },
  { name: "color",        type: '"default" | "brand" | "gray" | "error" | "warning" | "success"', default: '"default"' },
  { name: "onClose",      type: "() => void",                                               default: "-" },
  { name: "onConfirm",    type: "() => void",                                               default: "-" },
];

export default function AlertPage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig.alert;
  const colors = enabledVariants(config.colors);
  const types = enabledVariants(config.types);

  const defaults = {
    type: "floating" as AlertType,
    color: "default" as AlertColor,
    title: "Update available",
    description: "A new version of DEW is ready to install.",
    confirmLabel: "Update now",
    dismissLabel: "Dismiss",
    withConfirm: true,
    withDismiss: true,
    actionType: "button" as ActionType,
  };

  const [previewType, setPreviewType] = useState(defaults.type);
  const [previewColor, setPreviewColor] = useState(defaults.color);
  const [previewTitle, setPreviewTitle] = useState(defaults.title);
  const [previewDescription, setPreviewDescription] = useState(defaults.description);
  const [previewConfirmLabel, setPreviewConfirmLabel] = useState(defaults.confirmLabel);
  const [previewDismissLabel, setPreviewDismissLabel] = useState(defaults.dismissLabel);
  const [previewWithConfirm, setPreviewWithConfirm] = useState(defaults.withConfirm);
  const [previewWithDismiss, setPreviewWithDismiss] = useState(defaults.withDismiss);
  const [previewActionType, setPreviewActionType] = useState(defaults.actionType);

  const isDefault =
    previewType === defaults.type &&
    previewColor === defaults.color &&
    previewTitle === defaults.title &&
    previewDescription === defaults.description &&
    previewConfirmLabel === defaults.confirmLabel &&
    previewDismissLabel === defaults.dismissLabel &&
    previewWithConfirm === defaults.withConfirm &&
    previewWithDismiss === defaults.withDismiss &&
    previewActionType === defaults.actionType;

  const resetPreview = () => {
    setPreviewType(defaults.type);
    setPreviewColor(defaults.color);
    setPreviewTitle(defaults.title);
    setPreviewDescription(defaults.description);
    setPreviewConfirmLabel(defaults.confirmLabel);
    setPreviewDismissLabel(defaults.dismissLabel);
    setPreviewWithConfirm(defaults.withConfirm);
    setPreviewWithDismiss(defaults.withDismiss);
    setPreviewActionType(defaults.actionType);
  };

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Alert"
        description="A dismissible, actionable banner for system-level messages. Two layouts - floating and full-width - composed from Button, CloseButton, and FeaturedIcon. Colours and demo sections are driven from config/design-system.config.ts."
        actions={<ContextualConfigPanel slug="alert" title="Alert" sections={sectionToggles} />}
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
                {previewType === "floating" ? (
                  <div className="w-full max-w-md rounded-xl bg-primary shadow-md">
                    <AlertFloating
                      title={previewTitle}
                      description={previewDescription}
                      confirmLabel={previewConfirmLabel}
                      dismissLabel={previewDismissLabel}
                      color={previewColor}
                      onConfirm={previewWithConfirm ? () => {} : undefined}
                      onClose={previewWithDismiss ? () => {} : undefined}
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-lg overflow-hidden rounded-xl border border-secondary">
                    <AlertFullWidth
                      title={previewTitle}
                      description={previewDescription}
                      confirmLabel={previewConfirmLabel}
                      dismissLabel={previewDismissLabel}
                      color={previewColor}
                      actionType={previewActionType}
                      onConfirm={previewWithConfirm ? () => {} : undefined}
                      onClose={previewWithDismiss ? () => {} : undefined}
                    />
                  </div>
                )}
                <code className="text-xs text-quaternary">
                  {previewType} · {previewColor}
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
                    options={types.map((t) => ({ key: t.key as AlertType, label: t.label }))}
                    value={previewType}
                    onChange={setPreviewType}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <ScaffoldLabel>Colour</ScaffoldLabel>
                  <SegmentedControl
                    options={colors.map((c) => ({ key: c.key as AlertColor, label: c.key }))}
                    value={previewColor}
                    onChange={setPreviewColor}
                  />
                </div>

                <ScaffoldTextInput label="Title" value={previewTitle} onChange={setPreviewTitle} />
                <ScaffoldTextInput label="Description" value={previewDescription} onChange={setPreviewDescription} />
                <ScaffoldTextInput label="Confirm label" value={previewConfirmLabel} onChange={setPreviewConfirmLabel} />
                <ScaffoldTextInput label="Dismiss label" value={previewDismissLabel} onChange={setPreviewDismissLabel} />

                <div className="flex flex-row gap-6">
                  <ScaffoldCheckbox label="Confirm" checked={previewWithConfirm} onChange={setPreviewWithConfirm} />
                  <ScaffoldCheckbox label="Dismiss" checked={previewWithDismiss} onChange={setPreviewWithDismiss} />
                </div>

                {previewType === "full-width" && (
                  <ScaffoldCheckbox
                    label="Link style actions"
                    checked={previewActionType === "link"}
                    onChange={(checked) => setPreviewActionType(checked ? "link" : "button")}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Floating ── */}
      {types.some((t) => t.key === "floating") && (
        <>
          <h2 className="text-balance">Floating</h2>
          <p className="text-balance">A self-contained card - for toasts, in-page notices, or anywhere the alert sits among other content rather than spanning the viewport.</p>
          <Section label="Default">
            <AlertFloating
              title="Update available"
              description="A new version of DEW is ready to install."
              confirmLabel="Update now"
              dismissLabel="Later"
              onConfirm={() => {}}
              onClose={() => {}}
            />
          </Section>
        </>
      )}

      {/* ── Colours ── */}
      {colors.length > 0 && (
        <>
          <h2 className="text-balance">Colours</h2>
          <p className="text-balance">Six colours, each pairing a <code>FeaturedIcon</code> tint with a matching icon (info/alert/check).</p>
          <div className="flex flex-col gap-4 mt-2">
            {colors.map((c) => (
              <AlertFloating
                key={c.key}
                title={`${c.label} alert`}
                description="This is what a message in this colour looks like."
                confirmLabel="Confirm"
                dismissLabel="Dismiss"
                color={c.key as AlertColor}
                onConfirm={() => {}}
                onClose={() => {}}
              />
            ))}
          </div>
        </>
      )}

      {/* ── Full width ── */}
      {types.some((t) => t.key === "full-width") && (
        <>
          <h2 className="text-balance">Full width</h2>
          <p className="text-balance">Spans its container edge-to-edge - for top-of-page announcement bars. Shown here inside a clipped preview frame.</p>
          <div className="rounded-xl overflow-hidden border border-secondary">
            <AlertFullWidth
              title="Scheduled maintenance"
              description="DEW will be briefly unavailable this Sunday at 2am UTC."
              confirmLabel="Learn more"
              dismissLabel="Dismiss"
              color="warning"
              onConfirm={() => {}}
              onClose={() => {}}
            />
          </div>

          {isFeatureEnabled(config, "linkActions") && (
            <>
              <p className="mt-4 text-balance">Set <code>actionType=&quot;link&quot;</code> for text-link actions instead of buttons - lower visual weight for less urgent banners.</p>
              <div className="rounded-xl overflow-hidden border border-secondary">
                <AlertFullWidth
                  title="New feature: Dark mode"
                  description="Try it from your account settings."
                  confirmLabel="Try it now"
                  dismissLabel="Not now"
                  actionType="link"
                  color="brand"
                  onConfirm={() => {}}
                  onClose={() => {}}
                />
              </div>
            </>
          )}
        </>
      )}

      {/* ── Dismiss / confirm combinations ── */}
      {(isFeatureEnabled(config, "withDismiss") || isFeatureEnabled(config, "withConfirm")) && (
        <>
          <h2 className="text-balance">Action combinations</h2>
          <p className="text-balance">Both action handlers are optional - the button row only renders for whichever ones you pass.</p>
          <div className="flex flex-col gap-4 mt-2">
            {isFeatureEnabled(config, "withConfirm") && (
              <AlertFloating
                title="Confirm only"
                description="No onClose handler passed - no dismiss button, no close X."
                confirmLabel="Got it"
                color="success"
                onConfirm={() => {}}
              />
            )}
            {isFeatureEnabled(config, "withDismiss") && (
              <AlertFloating
                title="Dismiss only"
                description="No onConfirm handler passed - no confirm action, just a close X."
                confirmLabel="Confirm"
                color="gray"
                onClose={() => {}}
              />
            )}
          </div>
        </>
      )}

      {/* ── API ── */}
      <h2 className="text-balance">API - AlertFloating</h2>
      <table className="token-table mt-4">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th></tr></thead>
        <tbody>
          {floatingProps.map((p) => (
            <tr key={p.name}>
              <td><code>{p.name}</code></td>
              <td><code style={{ fontSize: "11px" }}>{p.type}</code></td>
              <td><code>{p.default}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-balance">API - AlertFullWidth</h2>
      <table className="token-table mt-4">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th></tr></thead>
        <tbody>
          {fullWidthProps.map((p) => (
            <tr key={p.name}>
              <td><code>{p.name}</code></td>
              <td><code style={{ fontSize: "11px" }}>{p.type}</code></td>
              <td><code>{p.default}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Composition ── */}
      <h2 className="text-balance">Composition</h2>
      <p className="text-balance">
        Alert doesn&apos;t define its own visual primitives - it composes three components that already exist in this design system: <code>Button</code> for its actions, <code>CloseButton</code> for dismissal, and <code>FeaturedIcon</code> for the coloured icon badge. Components inherit from other components, not just from primitives - this is why Alert took no new base-level styling work, only the tokens <code>FeaturedIcon</code> needed.
      </p>

      <h2 className="text-balance">Token anatomy</h2>
      <p className="text-balance">Each colour maps to a <code>FeaturedIcon</code> theme + colour pair. <code>default</code> uses the <code>modern</code> theme (neutral surface, no tint); every other colour uses <code>outline</code> (a soft ring in that colour, no fill).</p>
      <table className="token-table mt-4">
        <thead>
          <tr><th>Colour</th><th>Icon</th><th>FeaturedIcon theme</th><th>Icon colour token</th></tr>
        </thead>
        <tbody>
          {[
            { c: "default", icon: "InfoCircle",   theme: "modern",  token: "text-fg-secondary" },
            { c: "brand",   icon: "InfoCircle",   theme: "outline", token: "text-fg-brand-primary" },
            { c: "gray",    icon: "InfoCircle",   theme: "outline", token: "text-fg-tertiary" },
            { c: "error",   icon: "AlertCircle",  theme: "outline", token: "text-fg-error-primary" },
            { c: "warning", icon: "AlertCircle",  theme: "outline", token: "text-fg-warning-primary" },
            { c: "success", icon: "CheckCircle",  theme: "outline", token: "text-fg-success-primary" },
          ].map((r) => (
            <tr key={r.c}>
              <td style={{ color: "var(--ui-text-secondary)" }}>{r.c}</td>
              <td><code>{r.icon}</code></td>
              <td><code>{r.theme}</code></td>
              <td><code>{r.token}</code></td>
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
{`import { AlertFloating } from "@/components/application/alerts/alerts";

<AlertFloating
  title="Update available"
  description="A new version of DEW is ready to install."
  confirmLabel="Update now"
  onConfirm={() => {}}
  onClose={() => {}}
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
