"use client";

import { useEffect, useState } from "react";
import { Sliders04, XClose } from "@untitledui/icons";
import { ScaffoldButton, ScaffoldCheckbox } from "@/components/scaffold/controls";
import { useConfig } from "@/lib/config-context";

export interface ContextualConfigSection {
  /** Matches a key in this component's `features` map in design-system.config.ts. */
  key: string;
  label: string;
}

interface ContextualConfigPanelProps {
  /** Component slug, e.g. "avatar" - matches its key in design-system.config.ts. */
  slug: string;
  /** Display name shown in the panel header, e.g. "Avatar". */
  title: string;
  sections: ContextualConfigSection[];
}

/**
 * Per-page "show/hide sections" control - a lightweight, scoped alternative
 * to the full /config page for toggling this one component's documentation
 * sections while reading it.
 */
export function ContextualConfigPanel({ slug, title, sections }: ContextualConfigPanelProps) {
  const [open, setOpen] = useState(false);
  const { config, setFeatureEnabled } = useConfig();
  const features = config[slug]?.features ?? {};

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <ScaffoldButton iconLeading={Sliders04} onClick={() => setOpen(true)}>
        Config
      </ScaffoldButton>

      {/* Backdrop */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-40 transition-opacity duration-200 ease-out"
        style={{
          background: "rgba(16, 24, 40, 0.2)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Contextual config - ${title}`}
        inert={!open}
        className="fixed inset-y-0 right-0 z-50 flex w-[360px] max-w-[90vw] flex-col border-l border-secondary bg-primary transition-transform duration-300 ease-out"
        style={{
          boxShadow: "-8px 0 24px rgba(16, 24, 40, 0.08)",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-secondary p-5">
          <div>
            <p className="mb-1 text-xs font-semibold text-quaternary uppercase tracking-widest text-balance">
              Contextual config
            </p>
            <p className="text-sm font-semibold text-primary text-balance">{title} sections</p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-quaternary transition-colors hover:bg-primary_hover"
          >
            <XClose className="size-4.5" />
          </button>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto p-5">
          <p className="text-xs leading-relaxed text-quaternary text-balance">
            Show or hide documentation sections on this page. Changes apply immediately and persist across the site.
          </p>
          <div className="flex flex-col gap-3.5">
            {sections.map((s) => (
              <ScaffoldCheckbox
                key={s.key}
                label={s.label}
                checked={features[s.key] ?? true}
                onChange={(checked) => setFeatureEnabled(slug, s.key, checked)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
