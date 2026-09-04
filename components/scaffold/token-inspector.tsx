"use client";

/**
 * Scaffold-native hover inspector for generated screens (see CONTEXT.md,
 * "Generated screens"). Lets a reviewer hover any element on a reconstructed
 * screen and see exactly which DEW component rendered it and which
 * `--ui-*`/`--color-*` tokens it resolved to - a manual cross-check that
 * nothing was hardcoded outside the token chain.
 *
 * Standard infrastructure for every `/test-*` generated screen (see
 * CONTEXT.md, "Generated screens - hover inspector convention") - wrap the
 * page in `<InspectorProvider>` and wrap each element you want inspectable
 * in `<Inspectable>`. The floating toggle button it renders lets a reviewer
 * turn the overlay off entirely to see the screen clean.
 *
 * Pure CSS hover for the show-on-hover interaction (named `group/inspect` so
 * it never collides with a wrapped DEW component's own internal
 * `group-invalid/input` etc. hooks) - only the on/off toggle itself is JS
 * state. The wrapper `<div>` and its `className` (e.g. a `w-full` needed for
 * layout) always render, on or off, so toggling never shifts layout - only
 * the ring+tooltip overlay nodes are added/removed.
 */

import { createContext, useContext, useState, type ReactNode } from "react";

const InspectorContext = createContext<{ enabled: boolean; setEnabled: (v: boolean) => void }>({
  enabled: true,
  setEnabled: () => {},
});

export function InspectorProvider({ children, defaultEnabled = true }: { children: ReactNode; defaultEnabled?: boolean }) {
  const [enabled, setEnabled] = useState(defaultEnabled);
  return (
    <InspectorContext.Provider value={{ enabled, setEnabled }}>
      {children}
      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className="fixed right-6 bottom-24 z-50 flex items-center gap-2 rounded-full border border-secondary bg-primary px-4 py-2 font-mono text-xs font-medium text-secondary shadow-lg transition-colors hover:bg-secondary"
      >
        <span className={`size-2 rounded-full ${enabled ? "bg-success-solid" : "bg-tertiary"}`} />
        Inspector: {enabled ? "On" : "Off"}
      </button>
    </InspectorContext.Provider>
  );
}

function useInspectorEnabled() {
  return useContext(InspectorContext).enabled;
}

export interface InspectableToken {
  /** The Tailwind utility class actually applied, e.g. "bg-brand-solid". */
  cls: string;
  /** The semantic variable it resolves through, e.g. "--ui-bg-brand-solid". */
  cssVar: string;
  /** The resolved value, e.g. "#185E74" or "Barlow". */
  value: string;
  /** Render a colour swatch next to the value - only set for real colour tokens. */
  swatch?: boolean;
}

export function Inspectable({
  label,
  source,
  tokens,
  children,
  className = "",
}: {
  label: string;
  source?: string;
  tokens: InspectableToken[];
  children: ReactNode;
  className?: string;
}) {
  const enabled = useInspectorEnabled();
  return (
    <div className={`${enabled ? "group/inspect relative" : ""} ${className}`}>
      {children}
      {enabled && (
        <>
          <div className="pointer-events-none absolute -inset-1 rounded-lg opacity-0 ring-2 ring-accent transition-opacity duration-100 group-hover/inspect:opacity-100" />
          <div
            className="pointer-events-none absolute top-full left-1/2 z-50 mt-2 w-80 -translate-x-1/2 rounded-lg p-3 opacity-0 shadow-lg transition-opacity duration-100 group-hover/inspect:opacity-100"
            style={{ background: "var(--ui-bg-primary-solid)" }}
          >
            <p className="font-mono text-xs font-semibold text-white">{label}</p>
            {source && <p className="font-mono text-[10px] text-gray-400">{source}</p>}
            <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-2">
              {tokens.map((t) => (
                <div key={t.cls} className="flex items-center justify-between gap-3 font-mono text-[11px]">
                  <span className="min-w-0">
                    <span className="block truncate text-gray-200">{t.cls}</span>
                    <span className="block truncate text-[10px] text-gray-500">{t.cssVar}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-white">
                    {t.swatch && <span className="size-2.5 shrink-0 rounded-full ring-1 ring-white/20" style={{ background: t.value }} />}
                    {t.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
