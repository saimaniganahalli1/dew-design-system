"use client";

import type React from "react";
import { PageHeader } from "@/components/PageHeader";
import { AlertFloating, AlertFullWidth } from "@/components/application/alerts/alerts";
import { enabledVariants, isFeatureEnabled } from "@/config/design-system.config";
import { useConfig } from "@/lib/config-context";

type AlertColor = "default" | "brand" | "gray" | "error" | "warning" | "success";

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div
    className="rounded-xl p-6 flex flex-col gap-4"
    style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
  >
    <p className="text-xs font-semibold uppercase tracking-widest"
      style={{ color: "var(--color-gray-400)" }}
    >
      {label}
    </p>
    {children}
  </div>
);

const floatingProps = [
  { name: "title",        type: "string",                                                  default: "—" },
  { name: "description",  type: "ReactNode",                                                default: "—" },
  { name: "confirmLabel", type: "string",                                                   default: "—" },
  { name: "dismissLabel", type: "string",                                                   default: '"Dismiss"' },
  { name: "color",        type: '"default" | "brand" | "gray" | "error" | "warning" | "success"', default: '"default"' },
  { name: "onConfirm",    type: "() => void",                                               default: "—" },
  { name: "onClose",      type: "() => void",                                               default: "—" },
];

const fullWidthProps = [
  ...floatingProps,
  { name: "actionType", type: '"button" | "link"', default: '"button"' },
];

export default function AlertPage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig.alert;
  const colors = enabledVariants(config.colors);
  const types = enabledVariants(config.types);

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Alert"
        description="A dismissible, actionable banner for system-level messages. Two layouts — floating and full-width — composed from Button, CloseButton, and FeaturedIcon. Colours and demo sections are driven from config/design-system.config.ts."
      />

      {/* ── Floating ── */}
      {types.some((t) => t.key === "floating") && (
        <>
          <h2>Floating</h2>
          <p>A self-contained card — for toasts, in-page notices, or anywhere the alert sits among other content rather than spanning the viewport.</p>
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
          <h2>Colours</h2>
          <p>Six colours, each pairing a <code>FeaturedIcon</code> tint with a matching icon (info/alert/check).</p>
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
          <h2>Full width</h2>
          <p>Spans its container edge-to-edge — for top-of-page announcement bars. Shown here inside a clipped preview frame.</p>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--color-gray-200)" }}>
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
              <p className="mt-4">Set <code>actionType=&quot;link&quot;</code> for text-link actions instead of buttons — lower visual weight for less urgent banners.</p>
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--color-gray-200)" }}>
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
          <h2>Action combinations</h2>
          <p>Both action handlers are optional — the button row only renders for whichever ones you pass.</p>
          <div className="flex flex-col gap-4 mt-2">
            {isFeatureEnabled(config, "withConfirm") && (
              <AlertFloating
                title="Confirm only"
                description="No onClose handler passed — no dismiss button, no close X."
                confirmLabel="Got it"
                color="success"
                onConfirm={() => {}}
              />
            )}
            {isFeatureEnabled(config, "withDismiss") && (
              <AlertFloating
                title="Dismiss only"
                description="No onConfirm handler passed — no confirm action, just a close X."
                confirmLabel="Confirm"
                color="gray"
                onClose={() => {}}
              />
            )}
          </div>
        </>
      )}

      {/* ── API ── */}
      <h2>API — AlertFloating</h2>
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

      <h2>API — AlertFullWidth</h2>
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
      <h2>Composition</h2>
      <p>
        Alert doesn&apos;t define its own visual primitives — it composes three components that already exist in this design system: <code>Button</code> for its actions, <code>CloseButton</code> for dismissal, and <code>FeaturedIcon</code> for the coloured icon badge. Components inherit from other components, not just from primitives — this is why Alert took no new base-level styling work, only the tokens <code>FeaturedIcon</code> needed.
      </p>

      <h2>Token anatomy</h2>
      <p>Each colour maps to a <code>FeaturedIcon</code> theme + colour pair. <code>default</code> uses the <code>modern</code> theme (neutral surface, no tint); every other colour uses <code>outline</code> (a soft ring in that colour, no fill).</p>
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
    </div>
  );
}
