import { PageHeader } from "@/components/PageHeader";

const spacingScale = [
  { step: "0",  px: "0px",   rem: "0rem" },
  { step: "0.5", px: "2px",  rem: "0.125rem" },
  { step: "1",  px: "4px",   rem: "0.25rem" },
  { step: "1.5", px: "6px",  rem: "0.375rem" },
  { step: "2",  px: "8px",   rem: "0.5rem" },
  { step: "2.5", px: "10px", rem: "0.625rem" },
  { step: "3",  px: "12px",  rem: "0.75rem" },
  { step: "3.5", px: "14px", rem: "0.875rem" },
  { step: "4",  px: "16px",  rem: "1rem" },
  { step: "5",  px: "20px",  rem: "1.25rem" },
  { step: "6",  px: "24px",  rem: "1.5rem" },
  { step: "7",  px: "28px",  rem: "1.75rem" },
  { step: "8",  px: "32px",  rem: "2rem" },
  { step: "9",  px: "36px",  rem: "2.25rem" },
  { step: "10", px: "40px",  rem: "2.5rem" },
  { step: "12", px: "48px",  rem: "3rem" },
  { step: "14", px: "56px",  rem: "3.5rem" },
  { step: "16", px: "64px",  rem: "4rem" },
  { step: "20", px: "80px",  rem: "5rem" },
  { step: "24", px: "96px",  rem: "6rem" },
  { step: "28", px: "112px", rem: "7rem" },
  { step: "32", px: "128px", rem: "8rem" },
];

export default function SpacingPage() {
  return (
    <div className="prose-doc">
      <PageHeader
        section="Primitives"
        title="Spacing"
        description="A 4px base grid. All padding, margin, and gap values should align to this scale. Tailwind utility classes map directly to these steps."
      />

      <h2 className="text-balance">Scale</h2>
      <p className="text-balance">Each step is a multiple of 4px. Decimals (0.5, 1.5, 2.5, 3.5) fill in the gaps for fine-grained component internals.</p>

      <div className="flex flex-col gap-0 mt-6">
        {spacingScale.map((s) => (
          <div
            key={s.step}
            className="flex items-center gap-6 py-2.5"
            style={{ borderBottom: "1px solid var(--color-gray-100)" }}
          >
            <div style={{ width: "32px", flexShrink: 0 }}>
              <code className="text-xs">{s.step}</code>
            </div>
            <div style={{ width: "64px", flexShrink: 0 }}>
              <code className="text-xs">{s.px}</code>
            </div>
            <div style={{ width: "72px", flexShrink: 0 }}>
              <code className="text-xs" style={{ color: "var(--color-gray-400)" }}>{s.rem}</code>
            </div>
            <div
              style={{
                width: s.px,
                height: "12px",
                background: "var(--color-brand-400)",
                borderRadius: "2px",
                minWidth: s.px === "0px" ? "1px" : undefined,
                opacity: s.px === "0px" ? 0.15 : 1,
              }}
            />
          </div>
        ))}
      </div>

      <h2 className="text-balance">Usage guidelines</h2>
      <p className="text-balance">Component internals (padding, icon gaps) typically use 1–6 (4px–24px). Layout spacing (section gaps, content margins) uses 8–32 (32px–128px).</p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {[
          { label: "Component padding", range: "3–6 (12–24px)", example: "Button, Input, Badge" },
          { label: "Component gap", range: "1–3 (4–12px)", example: "Icon + label, avatar + name" },
          { label: "Section spacing", range: "10–20 (40–80px)", example: "Page sections, cards" },
          { label: "Layout margin", range: "16–32 (64–128px)", example: "Page gutters, hero padding" },
        ].map((g) => (
          <div key={g.label} className="rounded-lg p-4"
            style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-25)" }}
          >
            <p className="text-sm font-medium mb-1 text-balance" style={{ color: "var(--color-gray-800)" }}>{g.label}</p>
            <code className="text-xs">{g.range}</code>
            <p className="text-xs mt-1 text-balance" style={{ color: "var(--color-gray-400)" }}>{g.example}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
