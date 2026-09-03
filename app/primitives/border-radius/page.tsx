import { PageHeader } from "@/components/PageHeader";

const radii = [
  { name: "none", token: "--radius-none", value: "0px",    usage: "Flat edges, tables, full-width elements" },
  { name: "xs",   token: "--radius-xs",   value: "2px",    usage: "Subtle rounding, checkboxes, small chips" },
  { name: "sm",   token: "--radius-sm",   value: "4px",    usage: "Inputs, small components, code blocks" },
  { name: "md",   token: "--radius-md",   value: "6px",    usage: "Buttons, tags, form controls" },
  { name: "lg",   token: "--radius-lg",   value: "8px",    usage: "Dropdowns, tooltips, small cards" },
  { name: "xl",   token: "--radius-xl",   value: "12px",   usage: "Cards, panels, modals" },
  { name: "2xl",  token: "--radius-2xl",  value: "16px",   usage: "Large cards, sheets, elevated surfaces" },
  { name: "3xl",  token: "--radius-3xl",  value: "20px",   usage: "Full-bleed containers, hero elements" },
  { name: "4xl",  token: "--radius-4xl",  value: "24px",   usage: "Feature cards, prominent UI blocks" },
  { name: "full", token: "--radius-full", value: "9999px", usage: "Pills, avatars, toggle switches" },
];

export default function BorderRadiusPage() {
  return (
    <div className="prose-doc">
      <PageHeader
        section="Primitives"
        title="Border radius"
        description="10 steps from flat to pill. Use CSS custom properties - never hardcode radius values in components."
      />

      <h2 className="text-balance">Scale</h2>

      <div className="grid grid-cols-5 gap-4 mt-6">
        {radii.map((r) => (
          <div key={r.name} className="flex flex-col items-start gap-3">
            <div
              className="w-full aspect-square"
              style={{
                borderRadius: r.value,
                background: "var(--color-brand-100)",
                border: "1.5px solid var(--color-brand-200)",
              }}
            />
            <div>
              <p className="text-sm font-medium text-balance" style={{ color: "var(--color-gray-800)" }}>
                {r.name}
              </p>
              <code className="text-xs">{r.value}</code>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-balance">Token reference</h2>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Typical usage</th>
          </tr>
        </thead>
        <tbody>
          {radii.map((r) => (
            <tr key={r.name}>
              <td><code>{r.token}</code></td>
              <td><code>{r.value}</code></td>
              <td className="text-balance" style={{ color: "var(--color-gray-500)" }}>{r.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
