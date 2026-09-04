"use client";

import { useState } from "react";
import type React from "react";
import { PageHeader } from "@/components/PageHeader";
import { ContextualConfigPanel } from "@/components/ContextualConfigPanel";
import { ToastCard, toast, type ToastColor } from "@/components/application/toast/toast";
import {
  ScaffoldButton,
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
  { key: "withAction", label: "With action" },
  { key: "dismiss", label: "Manual dismiss" },
  { key: "usage", label: "Usage" },
  { key: "figma", label: "Figma" },
];

const toastProps = [
  { name: "title",       type: "string",                                                  default: "-" },
  { name: "description", type: "ReactNode",                                                default: "-" },
  { name: "actionLabel", type: "string",                                                   default: "-" },
  { name: "onAction",    type: "() => void",                                               default: "-" },
  { name: "duration",    type: "number",                                                   default: "4000" },
];

export default function ToastPage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig.toast;
  const colors = enabledVariants(config.colors);

  const defaults = {
    color: "default" as ToastColor,
    title: "Saved to drafts",
    description: "You can find it later under Drafts.",
    actionLabel: "Undo",
  };

  const [previewColor, setPreviewColor] = useState<ToastColor>(defaults.color);
  const [previewTitle, setPreviewTitle] = useState(defaults.title);
  const [previewDescription, setPreviewDescription] = useState(defaults.description);
  const [previewActionLabel, setPreviewActionLabel] = useState(defaults.actionLabel);

  const isDefault =
    previewColor === defaults.color &&
    previewTitle === defaults.title &&
    previewDescription === defaults.description &&
    previewActionLabel === defaults.actionLabel;

  const resetPreview = () => {
    setPreviewColor(defaults.color);
    setPreviewTitle(defaults.title);
    setPreviewDescription(defaults.description);
    setPreviewActionLabel(defaults.actionLabel);
  };

  const fireToast = () => {
    toast[previewColor](previewTitle || "Untitled toast", {
      description: previewDescription || undefined,
      actionLabel: previewActionLabel || undefined,
      onAction: previewActionLabel ? () => {} : undefined,
    });
  };

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Toast"
        description="A transient, self-dismissing notification anchored to a corner of the viewport. Built on sonner for stacking, swipe-to-dismiss, and timing - DEW only supplies the card, reusing Button, CloseButton, and FeaturedIcon from Alert. Colours and demo sections are driven from config/design-system.config.ts."
        actions={<ContextualConfigPanel slug="toast" title="Toast" sections={sectionToggles} />}
      />

      {/* ── Component Playground ── */}
      {isFeatureEnabled(config, "playground") && (
        <>
          <h2 className="text-balance">Component Playground</h2>
          <p className="text-balance">
            The canvas shows a static preview of <code>ToastCard</code> so the visual is always visible. Use{" "}
            <code>Fire toast</code> to trigger the real imperative <code>toast.*()</code> call and see the actual
            corner-notification behaviour, stacking, and auto-dismiss timing.
          </p>
          <div className="overflow-hidden rounded-2xl border border-secondary shadow-xs">
            <div className="grid md:grid-cols-[1fr_300px]">
              <div
                className="relative flex min-h-[320px] flex-col items-center justify-center gap-3 bg-primary_alt p-12"
                style={{
                  backgroundImage: "radial-gradient(var(--ui-border-secondary) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                <ToastCard
                  title={previewTitle || "Untitled toast"}
                  description={previewDescription || undefined}
                  color={previewColor}
                  actionLabel={previewActionLabel || undefined}
                  onAction={previewActionLabel ? () => {} : undefined}
                  onDismiss={() => {}}
                />
                <code className="text-xs text-quaternary">{previewColor}</code>
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
                  <ScaffoldLabel>Colour</ScaffoldLabel>
                  <SegmentedControl
                    options={colors.map((c) => ({ key: c.key as ToastColor, label: c.label }))}
                    value={previewColor}
                    onChange={setPreviewColor}
                  />
                </div>

                <ScaffoldTextInput label="Title" value={previewTitle} onChange={setPreviewTitle} />
                <ScaffoldTextInput label="Description" value={previewDescription} onChange={setPreviewDescription} />
                <ScaffoldTextInput label="Action label" value={previewActionLabel} onChange={setPreviewActionLabel} />

                <ScaffoldButton onClick={fireToast} className="justify-center">
                  Fire toast
                </ScaffoldButton>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Colours ── */}
      {colors.length > 0 && (
        <>
          <h2 className="text-balance">Colours</h2>
          <p className="text-balance">Same six colours as Alert - each pairs a <code>FeaturedIcon</code> tint with a matching icon (info/alert/check).</p>
          <Section label="Colours">
            <div className="flex flex-wrap gap-3">
              {colors.map((c) => (
                <ScaffoldButton
                  key={c.key}
                  onClick={() =>
                    toast[c.key as ToastColor](`${c.label} toast`, {
                      description: "This is what a message in this colour looks like.",
                    })
                  }
                >
                  {c.label}
                </ScaffoldButton>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* ── With action ── */}
      {isFeatureEnabled(config, "withAction") && (
        <>
          <h2 className="text-balance">With action</h2>
          <p className="text-balance">Pass <code>actionLabel</code> and <code>onAction</code> for an inline follow-up - rendered as a <code>link-color</code> Button, same as Alert&apos;s confirm action.</p>
          <Section label="With action">
            <div className="flex flex-wrap gap-3">
              <ScaffoldButton
                onClick={() =>
                  toast.brand("File deleted", {
                    description: "report.pdf was moved to Trash.",
                    actionLabel: "Undo",
                    onAction: () => toast.success("Restored", { description: "report.pdf is back in Files." }),
                  })
                }
              >
                Show undo toast
              </ScaffoldButton>
            </div>
          </Section>
        </>
      )}

      {/* ── Dismiss ── */}
      {isFeatureEnabled(config, "dismiss") && (
        <>
          <h2 className="text-balance">Manual dismiss</h2>
          <p className="text-balance">Pass <code>duration: Infinity</code> to require the reader to dismiss it via the close button rather than letting it time out.</p>
          <Section label="Persistent">
            <div className="flex flex-wrap gap-3">
              <ScaffoldButton
                onClick={() =>
                  toast.warning("Action required", {
                    description: "This toast stays until you close it.",
                    duration: Infinity,
                  })
                }
              >
                Show persistent toast
              </ScaffoldButton>
            </div>
          </Section>
        </>
      )}

      {/* ── API ── */}
      <h2 className="text-balance">API - toast.*(title, options)</h2>
      <p className="text-balance">
        <code>toast</code> exposes one function per colour - <code>toast.default</code>, <code>toast.brand</code>, <code>toast.gray</code>, <code>toast.error</code>, <code>toast.warning</code>, <code>toast.success</code> - plus <code>toast.dismiss(id)</code>. Each takes a <code>title</code> and an options bag:
      </p>
      <table className="token-table mt-4">
        <thead><tr><th>Option</th><th>Type</th><th>Default</th></tr></thead>
        <tbody>
          {toastProps.map((p) => (
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
        Toast doesn&apos;t introduce a new card shape - it reuses <code>Button</code>, <code>CloseButton</code>, and <code>FeaturedIcon</code>, the same primitives <code>AlertFloating</code> composes. The only new dependency is <code>sonner</code>, which owns stacking order, swipe gestures, and auto-dismiss timing; DEW supplies <code>toast.custom()</code> a plain React card (<code>ToastCard</code>) instead of sonner&apos;s default styling, so every toast matches the rest of the system.
      </p>

      <h2 className="text-balance">Token anatomy</h2>
      <p className="text-balance">Identical colour → icon → theme mapping to Alert.</p>
      <table className="token-table mt-4">
        <thead>
          <tr><th>Colour</th><th>Icon</th><th>FeaturedIcon theme</th><th>Icon colour token</th></tr>
        </thead>
        <tbody>
          {[
            { c: "default", icon: "InfoCircle",  theme: "modern",  token: "text-fg-secondary" },
            { c: "brand",   icon: "InfoCircle",  theme: "outline", token: "text-fg-brand-primary" },
            { c: "gray",    icon: "InfoCircle",  theme: "outline", token: "text-fg-tertiary" },
            { c: "error",   icon: "AlertCircle", theme: "outline", token: "text-fg-error-primary" },
            { c: "warning", icon: "AlertCircle", theme: "outline", token: "text-fg-warning-primary" },
            { c: "success", icon: "CheckCircle", theme: "outline", token: "text-fg-success-primary" },
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
{`import { toast } from "@/components/application/toast/toast";

toast.success("Saved to drafts", {
  description: "You can find it later under Drafts.",
});`}
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
