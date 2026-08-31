import { PageHeader } from "@/components/PageHeader";

const shadows = [
  {
    name: "xs",
    token: "--shadow-xs",
    value: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
    usage: "Subtle lift, input focus rings",
  },
  {
    name: "sm",
    token: "--shadow-sm",
    value: "0 1px 3px rgba(16,24,40,.10), 0 1px 2px rgba(16,24,40,.06)",
    usage: "Buttons, small cards, chips",
  },
  {
    name: "md",
    token: "--shadow-md",
    value: "0 4px 8px -2px rgba(16,24,40,.10), 0 2px 4px -2px rgba(16,24,40,.06)",
    usage: "Dropdowns, popovers, select menus",
  },
  {
    name: "lg",
    token: "--shadow-lg",
    value: "0 12px 16px -4px rgba(16,24,40,.08), 0 4px 6px -2px rgba(16,24,40,.03)",
    usage: "Cards, panels, date pickers",
  },
  {
    name: "xl",
    token: "--shadow-xl",
    value: "0 20px 24px -4px rgba(16,24,40,.08), 0 8px 8px -4px rgba(16,24,40,.03)",
    usage: "Modals, side sheets",
  },
  {
    name: "2xl",
    token: "--shadow-2xl",
    value: "0 24px 48px -12px rgba(16,24,40,.18)",
    usage: "Prominent modals, command palettes",
  },
  {
    name: "3xl",
    token: "--shadow-3xl",
    value: "0 32px 64px -12px rgba(16,24,40,.14)",
    usage: "App-level overlays, full-screen sheets",
  },
];

export default function ShadowsPage() {
  return (
    <div className="prose-doc">
      <PageHeader
        section="Primitives"
        title="Shadows"
        description="Seven elevation levels. Shadows use a single consistent light source at top-centre, matching how Untitled UI models physical depth."
      />

      <h2>Scale</h2>

      <div className="grid grid-cols-4 gap-6 mt-6">
        {shadows.map((s) => (
          <div key={s.name} className="flex flex-col gap-4">
            <div
              className="rounded-xl bg-white"
              style={{
                height: "80px",
                boxShadow: s.value,
              }}
            />
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--color-gray-800)" }}>
                {s.name}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-gray-400)" }}>
                {s.usage}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h2>Token reference</h2>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Token</th>
            <th>Typical usage</th>
          </tr>
        </thead>
        <tbody>
          {shadows.map((s) => (
            <tr key={s.name}>
              <td><code>{s.token}</code></td>
              <td style={{ color: "var(--color-gray-500)" }}>{s.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Usage principles</h2>
      <p>
        Elevation implies interactivity and hierarchy. Higher shadows signal more modal or overlay-like behaviour. Don&apos;t stack shadows — pick one level per surface.
      </p>
    </div>
  );
}
