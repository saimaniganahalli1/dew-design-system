import { PageHeader } from "@/components/PageHeader";

type Swatch = { step: string; hex: string; textDark?: boolean };

const palettes: { name: string; description: string; swatches: Swatch[] }[] = [
  {
    name: "Gray",
    description: "Neutral scale used for text, borders, backgrounds, and surface layers.",
    swatches: [
      { step: "25",  hex: "#FCFCFD", textDark: true },
      { step: "50",  hex: "#F9FAFB", textDark: true },
      { step: "100", hex: "#F2F4F7", textDark: true },
      { step: "200", hex: "#EAECF0", textDark: true },
      { step: "300", hex: "#D0D5DD", textDark: true },
      { step: "400", hex: "#98A2B3", textDark: true },
      { step: "500", hex: "#667085" },
      { step: "600", hex: "#475467" },
      { step: "700", hex: "#344054" },
      { step: "800", hex: "#1D2939" },
      { step: "900", hex: "#101828" },
      { step: "950", hex: "#0C111D" },
    ],
  },
  {
    name: "Brand",
    description: "Primary brand colour. Replace with DEW's brand hex values.",
    swatches: [
      { step: "25",  hex: "#F5F8FF", textDark: true },
      { step: "50",  hex: "#EFF4FF", textDark: true },
      { step: "100", hex: "#D1E0FF", textDark: true },
      { step: "200", hex: "#B2CCFF", textDark: true },
      { step: "300", hex: "#84ADFF", textDark: true },
      { step: "400", hex: "#528BFF" },
      { step: "500", hex: "#2970FF" },
      { step: "600", hex: "#155EEF" },
      { step: "700", hex: "#004EEB" },
      { step: "800", hex: "#0040C1" },
      { step: "900", hex: "#00359E" },
      { step: "950", hex: "#002266" },
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
        description="A 12-step scale for each semantic role. Token names follow Untitled UI conventions — swap the CSS custom property values to establish DEW's colour identity."
      />

      {/* Palette grid */}
      {palettes.map((palette) => (
        <div key={palette.name} className="mb-12">
          <h2>{palette.name}</h2>
          <p>{palette.description}</p>
          <div className="grid grid-cols-12 gap-1.5 mt-4">
            {palette.swatches.map((s) => (
              <div key={s.step} className="flex flex-col gap-1.5">
                <div
                  className="h-12 w-full rounded-md"
                  style={{ background: s.hex }}
                />
                <p className="text-xs font-medium" style={{ color: "var(--color-gray-700)" }}>
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
      <h2>Semantic tokens</h2>
      <p>Aliases that map raw palette steps to UI roles. Use these in components — never raw palette values.</p>
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
              <td style={{ color: "var(--color-gray-500)" }}>{t.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
