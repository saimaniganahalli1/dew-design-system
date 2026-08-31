import { PageHeader } from "@/components/PageHeader";

const durations = [
  { name: "fast",   token: "--duration-fast",   value: "100ms", usage: "Micro-interactions, hover states, colour transitions" },
  { name: "normal", token: "--duration-normal",  value: "200ms", usage: "Appear/disappear, scale, height transitions (default)" },
  { name: "slow",   token: "--duration-slow",    value: "300ms", usage: "Slide-in panels, modals, page transitions" },
  { name: "slower", token: "--duration-slower",  value: "500ms", usage: "Complex sequences, orchestrated reveals" },
];

const easings = [
  {
    name: "Default",
    token: "--ease-default",
    value: "cubic-bezier(0.16, 1, 0.3, 1)",
    note: "Snappy ease-out. Use for most UI transitions.",
    curve: "M0,100 C16,100 30,0 100,0",
  },
  {
    name: "In",
    token: "--ease-in",
    value: "cubic-bezier(0.4, 0, 1, 1)",
    note: "Accelerating. Use for exits — elements leaving the screen.",
    curve: "M0,100 C40,100 100,0 100,0",
  },
  {
    name: "Out",
    token: "--ease-out",
    value: "cubic-bezier(0, 0, 0.2, 1)",
    note: "Decelerating. Use for entrances — elements entering the screen.",
    curve: "M0,100 C0,100 20,0 100,0",
  },
  {
    name: "In-Out",
    token: "--ease-in-out",
    value: "cubic-bezier(0.4, 0, 0.2, 1)",
    note: "Symmetric. Use for layout shifts and position changes.",
    curve: "M0,100 C40,100 60,0 100,0",
  },
  {
    name: "Spring",
    token: "--ease-spring",
    value: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    note: "Overshoot bounce. Use sparingly for playful interactions.",
    curve: "M0,100 C34,100 64,-56 100,0",
  },
];

const principles = [
  {
    title: "Motion has purpose",
    body: "Every animation should help the user understand what changed and why. Avoid motion for decoration alone.",
  },
  {
    title: "Enter slowly, exit fast",
    body: "Elements entering the viewport should ease-out and take a little longer. Exits should be quick — users have already made a decision.",
  },
  {
    title: "Reduce for accessibility",
    body: "Wrap non-essential animations in @media (prefers-reduced-motion: reduce). Motion should never obstruct usability.",
  },
];

export default function MotionPage() {
  return (
    <div className="prose-doc">
      <PageHeader
        section="Primitives"
        title="Motion"
        description="Duration and easing tokens that define how DEW components move. Purposeful, fast, and respectful of accessibility preferences."
      />

      <h2>Duration</h2>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Token</th>
            <th>Value</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          {durations.map((d) => (
            <tr key={d.name}>
              <td style={{ color: "var(--color-gray-700)", fontWeight: 500 }}>{d.name}</td>
              <td><code>{d.token}</code></td>
              <td><code>{d.value}</code></td>
              <td style={{ color: "var(--color-gray-500)" }}>{d.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Easing</h2>
      <p>All curves are defined as CSS cubic-bezier functions. Use the named token, not raw values in component code.</p>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {easings.map((e) => (
          <div key={e.name} className="rounded-xl p-4"
            style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-25)" }}
          >
            {/* Curve visualization */}
            <svg viewBox="0 0 100 100" className="w-full h-16 mb-3">
              <path
                d={e.curve}
                fill="none"
                stroke="var(--color-brand-400)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line x1="0" y1="100" x2="100" y2="100"
                stroke="var(--color-gray-200)" strokeWidth="1" />
              <line x1="0" y1="0" x2="0" y2="100"
                stroke="var(--color-gray-200)" strokeWidth="1" />
            </svg>
            <p className="text-sm font-medium mb-0.5" style={{ color: "var(--color-gray-800)" }}>
              {e.name}
            </p>
            <code className="text-xs block mb-1">{e.token}</code>
            <p className="text-xs" style={{ color: "var(--color-gray-400)", lineHeight: "1.5" }}>
              {e.note}
            </p>
          </div>
        ))}
      </div>

      <h2>Principles</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {principles.map((p) => (
          <div key={p.title} className="rounded-xl p-4"
            style={{ border: "1px solid var(--color-gray-200)" }}
          >
            <p className="text-sm font-semibold mb-1.5" style={{ color: "var(--color-gray-800)" }}>
              {p.title}
            </p>
            <p className="text-xs" style={{ color: "var(--color-gray-500)", lineHeight: "1.6" }}>
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
