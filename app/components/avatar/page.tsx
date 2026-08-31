import { PageHeader } from "@/components/PageHeader";

const sizes = [
  { name: "xs",  px: 24,  font: 10, initials: "SA" },
  { name: "sm",  px: 32,  font: 12, initials: "SA" },
  { name: "md",  px: 40,  font: 14, initials: "SA" },
  { name: "lg",  px: 48,  font: 16, initials: "SA" },
  { name: "xl",  px: 56,  font: 20, initials: "SA" },
  { name: "2xl", px: 64,  font: 22, initials: "SA" },
];

const avatarColors = [
  { bg: "var(--color-brand-100)", color: "var(--color-brand-700)" },
  { bg: "var(--color-success-100)", color: "var(--color-success-700)" },
  { bg: "var(--color-warning-100)", color: "var(--color-warning-700)" },
  { bg: "var(--color-error-100)", color: "var(--color-error-700)" },
  { bg: "var(--color-gray-100)", color: "var(--color-gray-700)" },
];

export default function AvatarPage() {
  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Avatar"
        description="User representation. Supports an image, initials fallback, and an icon fallback. Always circular."
      />

      <h2>Sizes</h2>
      <div className="flex flex-wrap items-end gap-5 mt-4 p-6 rounded-xl"
        style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
      >
        {sizes.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-2">
            <div
              style={{
                width: s.px,
                height: s.px,
                borderRadius: "50%",
                background: "var(--color-brand-100)",
                color: "var(--color-brand-700)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: s.font,
                fontWeight: 600,
                letterSpacing: "0.01em",
                border: "1.5px solid var(--color-brand-200)",
              }}
            >
              {s.initials}
            </div>
            <code className="text-xs">{s.name}</code>
          </div>
        ))}
      </div>

      <h2>Colour variants</h2>
      <p>When generating avatars from initials, assign a colour deterministically from the user&apos;s name or ID. Never random.</p>
      <div className="flex flex-wrap gap-3 mt-4 p-6 rounded-xl"
        style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
      >
        {avatarColors.map((c, i) => (
          <div
            key={i}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: c.bg,
              color: c.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            SA
          </div>
        ))}
      </div>

      <h2>Avatar group</h2>
      <p>Stack avatars with a –8px overlap and a count badge when the list exceeds the max.</p>
      <div className="flex items-center mt-4 p-6 rounded-xl"
        style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
      >
        <div className="flex">
          {[
            { bg: "var(--color-brand-100)", color: "var(--color-brand-700)", label: "SA" },
            { bg: "var(--color-success-100)", color: "var(--color-success-700)", label: "JD" },
            { bg: "var(--color-warning-100)", color: "var(--color-warning-700)", label: "MK" },
            { bg: "var(--color-error-100)", color: "var(--color-error-700)", label: "PL" },
          ].map((a, i) => (
            <div
              key={i}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: a.bg,
                color: a.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 600,
                marginLeft: i === 0 ? 0 : -8,
                border: "2px solid var(--color-gray-50)",
              }}
            >
              {a.label}
            </div>
          ))}
          <div style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "var(--color-gray-100)",
            color: "var(--color-gray-600)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 600,
            marginLeft: -8,
            border: "2px solid var(--color-gray-50)",
          }}>
            +4
          </div>
        </div>
      </div>
    </div>
  );
}
