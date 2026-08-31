"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Home01, Bell01, SearchLg } from "@untitledui/icons";
import * as UntitledIcons from "@untitledui/icons";

const sizeDemo = [
  { name: "xs", size: 12, token: "size-3" },
  { name: "sm", size: 16, token: "size-4" },
  { name: "md", size: 20, token: "size-5" },
  { name: "lg", size: 24, token: "size-6" },
  { name: "xl", size: 32, token: "size-8" },
];

const strokeDemo = [
  { name: "Thin",     stroke: 1,    note: "Display / decorative" },
  { name: "Regular",  stroke: 1.5,  note: "Default for UI icons" },
  { name: "Medium",   stroke: 2,    note: "Emphasis, small sizes" },
];

const allIcons = Object.entries(UntitledIcons)
  .filter(([, value]) => typeof value === "function")
  .map(([name, Icon]) => ({ name, Icon: Icon as React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }> }))
  .sort((a, b) => a.name.localeCompare(b.name));

const PAGE_SIZE = 120;

export default function IconsPage() {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allIcons;
    return allIcons.filter((i) => i.name.toLowerCase().includes(q));
  }, [query]);

  // Only mount `visibleCount` icons at a time — rendering all 1,179 SVGs
  // up front adds real hydration weight for no benefit until searched/scrolled to.
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleSearch = (value: string) => {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  };

  const handleCopy = (name: string) => {
    const snippet = `import { ${name} } from "@untitledui/icons";`;
    navigator.clipboard?.writeText(snippet);
    setCopied(name);
    setTimeout(() => setCopied((current) => (current === name ? null : current)), 1200);
  };

  return (
    <div className="prose-doc">
      <PageHeader
        section="Primitives"
        title="Icons"
        description="DEW uses Untitled UI Icons — the same set every pulled component (Button, Badge, Checkbox, Input) draws from. All icons share the same geometric foundation, stroke weight, and optical sizing."
      />

      <h2>Sizes</h2>
      <p>Match icon size to text size. A 14px label pairs with a 16px (sm) icon; a 16px label with a 20px (md) icon.</p>

      <div className="flex items-end gap-8 mt-6 p-6 rounded-xl"
        style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-25)" }}
      >
        {sizeDemo.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-3">
            <Home01 size={s.size} style={{ color: "var(--color-gray-700)" }} />
            <div className="text-center">
              <p className="text-xs font-medium" style={{ color: "var(--color-gray-700)" }}>{s.name}</p>
              <code className="text-xs">{s.size}px</code>
            </div>
          </div>
        ))}
      </div>

      <h2>Stroke weight</h2>
      <p>Default stroke is 1.5. Use 1 for decorative/display contexts, 2 for small sizes or emphasis.</p>

      <div className="flex gap-10 mt-6 p-6 rounded-xl"
        style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-25)" }}
      >
        {strokeDemo.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-3">
            <Bell01 size={24} strokeWidth={s.stroke} style={{ color: "var(--color-gray-700)" }} />
            <div className="text-center">
              <p className="text-xs font-medium" style={{ color: "var(--color-gray-700)" }}>{s.name}</p>
              <code className="text-xs">{s.stroke}</code>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-gray-400)" }}>{s.note}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Icon library</h2>
      <p>
        All {allIcons.length.toLocaleString()} icons from <code>@untitledui/icons</code>. Search by name, click any icon to copy its import statement.
      </p>

      {/* Search */}
      <div className="sticky top-0 z-10 mt-4 mb-4 py-3" style={{ background: "var(--bg-page)" }}>
        <div className="relative max-w-sm">
          <SearchLg
            size={16}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-gray-400)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search icons…"
            style={{
              width: "100%",
              height: 40,
              paddingLeft: 38,
              paddingRight: 12,
              fontSize: 14,
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-gray-300)",
              background: "white",
              color: "var(--color-gray-900)",
              outline: "none",
              boxShadow: "var(--shadow-xs)",
              fontFamily: "inherit",
            }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--color-gray-400)" }}>
          Showing {visible.length.toLocaleString()} of {filtered.length.toLocaleString()} icons
          {filtered.length !== allIcons.length && ` (filtered from ${allIcons.length.toLocaleString()})`}
        </p>
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(84px, 1fr))",
            gap: "8px",
          }}
        >
          {visible.map(({ name, Icon }) => (
            <button
              key={name}
              onClick={() => handleCopy(name)}
              title={`Copy: import { ${name} } from "@untitledui/icons";`}
              className="flex flex-col items-center gap-1.5 p-3 rounded-lg cursor-pointer transition-colors"
              style={{
                border: "1px solid var(--color-gray-200)",
                background: copied === name ? "var(--color-brand-50)" : "var(--color-gray-25)",
              }}
            >
              <Icon size={20} strokeWidth={1.5} style={{ color: copied === name ? "var(--color-brand-600)" : "var(--color-gray-600)" }} />
              <code
                className="text-xs text-center"
                style={{
                  color: copied === name ? "var(--color-brand-600)" : "var(--color-gray-400)",
                  fontSize: "10px",
                  wordBreak: "break-word",
                  lineHeight: 1.3,
                }}
              >
                {copied === name ? "Copied!" : name}
              </code>
            </button>
          ))}
        </div>
      ) : null}

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="cursor-pointer"
            style={{
              padding: "8px 16px",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-gray-300)",
              background: "white",
              color: "var(--color-gray-700)",
              boxShadow: "var(--shadow-xs)",
              fontFamily: "inherit",
            }}
          >
            Load {Math.min(PAGE_SIZE, filtered.length - visibleCount).toLocaleString()} more
            <span style={{ color: "var(--color-gray-400)" }}> · {(filtered.length - visibleCount).toLocaleString()} remaining</span>
          </button>
        </div>
      )}

      {visible.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-xl"
          style={{ border: "1.5px dashed var(--color-gray-300)", background: "var(--color-gray-50)" }}
        >
          <p className="text-sm font-medium" style={{ color: "var(--color-gray-500)" }}>
            No icons match &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
