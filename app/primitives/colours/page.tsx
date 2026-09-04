import { PageHeader } from "@/components/PageHeader";

type Swatch = { step: string; hex: string; textDark?: boolean };

const palettes: { name: string; description: string; swatches: Swatch[] }[] = [
  {
    name: "Gray",
    description: "Neutral scale used for text, borders, backgrounds, and surface layers.",
    swatches: [
      { step: "25",  hex: "#FCFCFC", textDark: true },
      { step: "50",  hex: "#F8F8F7", textDark: true },
      { step: "100", hex: "#F2F2F1", textDark: true },
      { step: "200", hex: "#E5E4E2", textDark: true },
      { step: "300", hex: "#D2D0CE", textDark: true },
      { step: "400", hex: "#B5B2AF", textDark: true },
      { step: "500", hex: "#8F8B87" },
      { step: "600", hex: "#706B68" },
      { step: "700", hex: "#585451" },
      { step: "800", hex: "#423E3B" },
      { step: "900", hex: "#2E2925" },
      { step: "950", hex: "#0C111D" },
    ],
  },
  {
    name: "Brand",
    description: "Primary brand colour - DEW Marine Teal.",
    swatches: [
      { step: "25",  hex: "#F6FBFC", textDark: true },
      { step: "50",  hex: "#EDF7F9", textDark: true },
      { step: "100", hex: "#DCECEF", textDark: true },
      { step: "200", hex: "#C3D9DF", textDark: true },
      { step: "300", hex: "#9CA9B3", textDark: true },
      { step: "400", hex: "#4D788A" },
      { step: "500", hex: "#2A667C" },
      { step: "600", hex: "#185E74" },
      { step: "700", hex: "#0D576E" },
      { step: "800", hex: "#0A485A" },
      { step: "900", hex: "#073542" },
      { step: "950", hex: "#041E27" },
    ],
  },
  {
    name: "Secondary",
    description: "Secondary brand colour - DEW Seagrass Green. Used sparingly, as an accent to Brand - pills, alerts, and labels. Coded as \"accent\" (--color-accent-*) to avoid colliding with the neutral bg-secondary/text-secondary hierarchy tokens below.",
    swatches: [
      { step: "25",  hex: "#F7FBFB", textDark: true },
      { step: "50",  hex: "#EEF6F6", textDark: true },
      { step: "100", hex: "#DEEAEA", textDark: true },
      { step: "200", hex: "#C9DBDB", textDark: true },
      { step: "300", hex: "#B6C7C7", textDark: true },
      { step: "400", hex: "#80A9A9", textDark: true },
      { step: "500", hex: "#649898" },
      { step: "600", hex: "#568F8F" },
      { step: "700", hex: "#4A8C8C" },
      { step: "800", hex: "#3B7272" },
      { step: "900", hex: "#2A5555" },
      { step: "950", hex: "#162D2D" },
    ],
  },
  {
    name: "Error",
    description: "Destructive actions, error states, and critical feedback.",
    swatches: [
      { step: "25",  hex: "#FFFBFA", textDark: true },
      { step: "50",  hex: "#FEF3F2", textDark: true },
      { step: "100", hex: "#FEE4E2", textDark: true },
      { step: "200", hex: "#FECDCA", textDark: true },
      { step: "300", hex: "#FDA29B", textDark: true },
      { step: "400", hex: "#F97066" },
      { step: "500", hex: "#F04438" },
      { step: "600", hex: "#D92D20" },
      { step: "700", hex: "#B42318" },
      { step: "800", hex: "#912018" },
      { step: "900", hex: "#7A271A" },
      { step: "950", hex: "#55160C" },
    ],
  },
  {
    name: "Warning",
    description: "Cautionary states and advisory feedback.",
    swatches: [
      { step: "25",  hex: "#FFFCF5", textDark: true },
      { step: "50",  hex: "#FFFAEB", textDark: true },
      { step: "100", hex: "#FEF0C7", textDark: true },
      { step: "200", hex: "#FEDF89", textDark: true },
      { step: "300", hex: "#FEC84B", textDark: true },
      { step: "400", hex: "#FDB022", textDark: true },
      { step: "500", hex: "#F79009" },
      { step: "600", hex: "#DC6803" },
      { step: "700", hex: "#B54708" },
      { step: "800", hex: "#93370D" },
      { step: "900", hex: "#7A2E0E" },
      { step: "950", hex: "#4E1D09" },
    ],
  },
  {
    name: "Success",
    description: "Positive outcomes, confirmations, and progress.",
    swatches: [
      { step: "25",  hex: "#F6FEF9", textDark: true },
      { step: "50",  hex: "#ECFDF3", textDark: true },
      { step: "100", hex: "#DCFAE6", textDark: true },
      { step: "200", hex: "#ABEFC6", textDark: true },
      { step: "300", hex: "#75E0A7", textDark: true },
      { step: "400", hex: "#47CD89", textDark: true },
      { step: "500", hex: "#17B26A" },
      { step: "600", hex: "#079455" },
      { step: "700", hex: "#067647" },
      { step: "800", hex: "#085D3A" },
      { step: "900", hex: "#074D31" },
      { step: "950", hex: "#053321" },
    ],
  },
];

const semanticTokens = [
  { token: "--bg-primary",     value: "gray-25",   usage: "Main app background" },
  { token: "--bg-secondary",   value: "gray-50",   usage: "Secondary surfaces, sidebars" },
  { token: "--bg-tertiary",    value: "gray-100",  usage: "Hover states, subtle fills" },
  { token: "--text-primary",   value: "gray-900",  usage: "Headings, primary text" },
  { token: "--text-secondary", value: "gray-600",  usage: "Body copy, descriptions" },
  { token: "--text-tertiary",  value: "gray-500",  usage: "Captions, hints, placeholders" },
  { token: "--border-default", value: "gray-200",  usage: "Default borders and dividers" },
  { token: "--border-strong",  value: "gray-300",  usage: "Focused or elevated borders" },
];

export default function ColorsPage() {
  return (
    <div className="prose-doc">
      <PageHeader
        section="Primitives"
        title="Colours"
        description="A 12-step scale for each semantic role. Token names follow Untitled UI conventions - swap the CSS custom property values to establish DEW's colour identity."
      />

      {/* Palette grid */}
      {palettes.map((palette) => (
        <div key={palette.name} className="mb-12">
          <h2 className="text-balance">{palette.name}</h2>
          <p className="text-balance">{palette.description}</p>
          <div className="grid grid-cols-12 gap-1.5 mt-4">
            {palette.swatches.map((s) => (
              <div key={s.step} className="flex flex-col gap-1.5">
                <div
                  className="h-12 w-full rounded-md"
                  style={{ background: s.hex }}
                />
                <p className="text-xs font-medium text-balance" style={{ color: "var(--color-gray-700)" }}>
                  {s.step}
                </p>
                <p className="text-xs font-mono" style={{ color: "var(--color-gray-400)" }}>
                  {s.hex}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Semantic tokens */}
      <h2 className="text-balance">Semantic tokens</h2>
      <p className="text-balance">Aliases that map raw palette steps to UI roles. Use these in components - never raw palette values.</p>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Token</th>
            <th>References</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          {semanticTokens.map((t) => (
            <tr key={t.token}>
              <td><code>{t.token}</code></td>
              <td><code>{t.value}</code></td>
              <td className="text-balance" style={{ color: "var(--color-gray-500)" }}>{t.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
