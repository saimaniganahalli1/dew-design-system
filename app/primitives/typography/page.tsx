import { PageHeader } from "@/components/PageHeader";

const typeScale = [
  { name: "Display 2xl", token: "text-display-2xl", size: "72px", lineHeight: "90px", weight: "600", tracking: "-2%" },
  { name: "Display xl",  token: "text-display-xl",  size: "60px", lineHeight: "72px", weight: "600", tracking: "-2%" },
  { name: "Display lg",  token: "text-display-lg",  size: "48px", lineHeight: "60px", weight: "600", tracking: "-2%" },
  { name: "Display md",  token: "text-display-md",  size: "36px", lineHeight: "44px", weight: "600", tracking: "-2%" },
  { name: "Display sm",  token: "text-display-sm",  size: "30px", lineHeight: "38px", weight: "600", tracking: "-1%" },
  { name: "Display xs",  token: "text-display-xs",  size: "24px", lineHeight: "32px", weight: "600", tracking: "-1%" },
  { name: "Text xl",     token: "text-xl",           size: "20px", lineHeight: "30px", weight: "400–600", tracking: "0%" },
  { name: "Text lg",     token: "text-lg",           size: "18px", lineHeight: "28px", weight: "400–600", tracking: "0%" },
  { name: "Text md",     token: "text-md",           size: "16px", lineHeight: "24px", weight: "400–600", tracking: "0%" },
  { name: "Text sm",     token: "text-sm",           size: "14px", lineHeight: "20px", weight: "400–600", tracking: "0%" },
  { name: "Text xs",     token: "text-xs",           size: "12px", lineHeight: "18px", weight: "400–600", tracking: "0%" },
];

const fontWeights = [
  { name: "Regular", value: "400", usage: "Body copy, descriptions" },
  { name: "Medium",  value: "500", usage: "Labels, nav items, captions" },
  { name: "Semibold",value: "600", usage: "Headings, button labels, emphasis" },
  { name: "Bold",    value: "700", usage: "Display type, marketing headers" },
];

export default function TypographyPage() {
  return (
    <div className="prose-doc">
      <PageHeader
        section="Primitives"
        title="Typography"
        description="Type scale and weight system based on Untitled UI conventions. Heading sizes use negative letter-spacing for optical tightening."
      />

      <h2>Type scale</h2>
      <p>Sizes follow a modular scale. Display sizes are used for headings; text sizes for body and UI copy.</p>

      <div className="flex flex-col gap-1 mt-6">
        {typeScale.map((t) => (
          <div
            key={t.token}
            className="flex items-baseline gap-8 py-3"
            style={{ borderBottom: "1px solid var(--color-gray-100)" }}
          >
            <div style={{ width: "200px", flexShrink: 0 }}>
              <p className="font-barlow" style={{
                fontSize: t.size,
                lineHeight: t.lineHeight,
                fontWeight: parseInt(t.weight) || 600,
                color: "var(--color-gray-900)",
                letterSpacing: t.tracking === "-2%" ? "-0.02em" : t.tracking === "-1%" ? "-0.01em" : "0",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                Dew
              </p>
            </div>
            <div className="flex-1 grid grid-cols-4 gap-4 items-center">
              <div>
                <p className="text-xs mb-0.5" style={{ color: "var(--color-gray-400)" }}>Name</p>
                <p className="text-sm font-medium" style={{ color: "var(--color-gray-700)" }}>{t.name}</p>
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: "var(--color-gray-400)" }}>Size</p>
                <code className="text-xs">{t.size}</code>
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: "var(--color-gray-400)" }}>Line height</p>
                <code className="text-xs">{t.lineHeight}</code>
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: "var(--color-gray-400)" }}>Tracking</p>
                <code className="text-xs">{t.tracking}</code>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Font weights</h2>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Example</th>
            <th>Name</th>
            <th>Value</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          {fontWeights.map((w) => (
            <tr key={w.name}>
              <td>
                <span className="font-barlow" style={{ fontWeight: parseInt(w.value), fontSize: "16px", color: "var(--color-gray-900)" }}>
                  The quick brown fox
                </span>
              </td>
              <td style={{ color: "var(--color-gray-700)" }}>{w.name}</td>
              <td><code>{w.value}</code></td>
              <td style={{ color: "var(--color-gray-500)" }}>{w.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Font family</h2>
      <p>
        <code>--font-barlow</code> is set to <strong>Barlow</strong> — the primary typeface of the DEW design system. The type scale above previews
        in Barlow, and it&apos;s applied directly on every component&apos;s root element (Button, Input, Badge, Checkbox, Tag, Tooltip…), so components
        inherit it wherever they&apos;re used, regardless of the surrounding page font.
      </p>
      <p>
        <code>--font-sans</code> is set to <strong>Geist</strong> and is scoped to this documentation site&apos;s own UI — sidebar, headings, body
        copy — not the design system itself.
      </p>
      <p>
        <code>--font-mono</code> is set to <strong>Geist Mono</strong> for code snippets and token values across the documentation UI.
      </p>
    </div>
  );
}
