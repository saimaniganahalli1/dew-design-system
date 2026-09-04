"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Home01, Bell01, SearchLg, CheckCircle } from "@untitledui/icons";
import * as UntitledIcons from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

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

// Pulled directly from FeaturedIconProps in components/foundations/featured-icon/featured-icon.tsx.
// Matches Figma's "Featured icon" frame (node 97:16118) exactly - sm/md/lg/xl at
// 32/40/48/56px, light/gradient/dark/modern/modern-neue themes, brand/gray/error/
// warning/success colours - plus the separate "Featured icon outline" frame
// (node 97:16339), which is FeaturedIcon's own `outline` theme.
const featuredIconThemes = [
  { key: "light", label: "Light" },
  { key: "gradient", label: "Gradient" },
  { key: "dark", label: "Dark" },
  { key: "modern", label: "Modern" },
  { key: "modern-neue", label: "Modern neue" },
] as const;

const featuredIconColors = [
  { key: "brand", label: "Brand" },
  { key: "gray", label: "Gray" },
  { key: "error", label: "Error" },
  { key: "warning", label: "Warning" },
  { key: "success", label: "Success" },
] as const;

const featuredIconSizes = [
  { key: "sm", label: "sm", px: 32 },
  { key: "md", label: "md", px: 40 },
  { key: "lg", label: "lg", px: 48 },
  { key: "xl", label: "xl", px: 56 },
] as const;

const allIcons = Object.entries(UntitledIcons)
  .filter(([, value]) => typeof value === "function")
  .map(([name, Icon]) => ({ name, Icon: Icon as React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }> }))
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

  // Only mount `visibleCount` icons at a time - rendering all 1,179 SVGs
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
        description="DEW uses Untitled UI Icons - the same set every pulled component (Button, Badge, Checkbox, Input) draws from. All icons share the same geometric foundation, stroke weight, and optical sizing."
      />

      <h2 className="text-balance">Sizes</h2>
      <p className="text-balance">Match icon size to text size. A 14px label pairs with a 16px (sm) icon; a 16px label with a 20px (md) icon.</p>

      <div className="mt-6 flex items-end gap-8 rounded-xl border border-secondary bg-primary_alt p-6">
        {sizeDemo.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-3">
            <Home01 size={s.size} className="text-secondary" />
            <div className="text-center">
              <p className="text-xs font-medium text-secondary text-balance">{s.name}</p>
              <code className="text-xs">{s.size}px</code>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-balance">Stroke weight</h2>
      <p className="text-balance">Default stroke is 1.5. Use 1 for decorative/display contexts, 2 for small sizes or emphasis.</p>

      <div className="mt-6 flex gap-10 rounded-xl border border-secondary bg-primary_alt p-6">
        {strokeDemo.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-3">
            <Bell01 size={24} strokeWidth={s.stroke} className="text-secondary" />
            <div className="text-center">
              <p className="text-xs font-medium text-secondary text-balance">{s.name}</p>
              <code className="text-xs">{s.stroke}</code>
              <p className="mt-0.5 text-xs text-quaternary text-balance">{s.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Featured icons ── */}
      <h2 className="text-balance">Featured icons</h2>
      <p className="text-balance">
        A glyph in a styled container - used for empty states, alerts, and onboarding. Real DEW component: <code>FeaturedIcon</code> from{" "}
        <code>components/foundations/featured-icon/featured-icon.tsx</code>. Matches Figma&apos;s &quot;Featured icon&quot; frame exactly.
      </p>

      <div className="mt-6 flex flex-col gap-4 rounded-xl border border-secondary bg-primary_alt p-6">
        <p className="text-xs font-semibold text-quaternary uppercase tracking-widest text-balance">Theme × colour (md)</p>
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${featuredIconColors.length}, minmax(0, 1fr))` }}>
          {featuredIconThemes.map((theme) => (
            <div key={theme.key} className="contents">
              {featuredIconColors.map((color) => (
                <div key={`${theme.key}-${color.key}`} className="flex flex-col items-center gap-2">
                  <FeaturedIcon theme={theme.key} color={color.key} size="md" icon={CheckCircle} />
                  {theme.key === "light" && <code className="text-xs text-quaternary">{color.label}</code>}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-2 grid gap-4 border-t border-secondary pt-4" style={{ gridTemplateColumns: `repeat(${featuredIconColors.length}, minmax(0, 1fr))` }}>
          {featuredIconThemes.map((theme) => (
            <code key={theme.key} className="text-center text-xs text-quaternary">{theme.label}</code>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-6 rounded-xl border border-secondary bg-primary_alt p-6">
        <p className="w-full text-xs font-semibold text-quaternary uppercase tracking-widest text-balance">Sizes (light / brand)</p>
        {featuredIconSizes.map((s) => (
          <div key={s.key} className="flex flex-col items-center gap-2">
            <FeaturedIcon theme="light" color="brand" size={s.key} icon={CheckCircle} />
            <code className="text-xs text-quaternary">{s.label} · {s.px}px</code>
          </div>
        ))}
      </div>

      <p className="mt-6 text-balance">The <code>outline</code> theme is its own frame in Figma (&quot;Featured icon outline&quot;) - no background, just a soft double ring.</p>
      <div className="mt-4 flex flex-wrap items-end gap-6 rounded-xl border border-secondary bg-primary_alt p-6">
        {featuredIconColors.map((color) => (
          <div key={color.key} className="flex flex-col items-center gap-2">
            <FeaturedIcon theme="outline" color={color.key} size="lg" icon={CheckCircle} />
            <code className="text-xs text-quaternary">{color.label}</code>
          </div>
        ))}
      </div>

      <h2 className="text-balance">Icon library</h2>
      <p className="text-balance">
        All {allIcons.length.toLocaleString()} icons from <code>@untitledui/icons</code>. Search by name, click any icon to copy its import statement.
      </p>

      {/* Search */}
      <div className="sticky top-0 z-10 mt-4 mb-4 bg-primary_alt py-3">
        <div className="relative max-w-sm">
          <SearchLg size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-quaternary" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search icons…"
            className="h-10 w-full rounded-lg border border-primary bg-primary pr-3 pl-9.5 text-sm text-primary shadow-xs outline-none"
          />
        </div>
        <p className="mt-2 text-xs text-quaternary text-balance">
          Showing {visible.length.toLocaleString()} of {filtered.length.toLocaleString()} icons
          {filtered.length !== allIcons.length && ` (filtered from ${allIcons.length.toLocaleString()})`}
        </p>
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(84px, 1fr))" }}>
          {visible.map(({ name, Icon }) => (
            <button
              key={name}
              onClick={() => handleCopy(name)}
              title={`Copy: import { ${name} } from "@untitledui/icons";`}
              className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border p-3 transition-colors ${
                copied === name ? "border-secondary bg-brand-secondary" : "border-secondary bg-primary_alt"
              }`}
            >
              <Icon size={20} strokeWidth={1.5} className={copied === name ? "text-brand-tertiary" : "text-tertiary"} />
              <code className={`text-center text-[10px] leading-tight break-words ${copied === name ? "text-brand-tertiary" : "text-quaternary"}`}>
                {copied === name ? "Copied!" : name}
              </code>
            </button>
          ))}
        </div>
      ) : null}

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="cursor-pointer rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-medium text-secondary shadow-xs text-balance"
          >
            Load {Math.min(PAGE_SIZE, filtered.length - visibleCount).toLocaleString()} more
            <span className="text-quaternary text-balance"> · {(filtered.length - visibleCount).toLocaleString()} remaining</span>
          </button>
        </div>
      )}

      {visible.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border-[1.5px] border-dashed border-primary bg-secondary py-16">
          <p className="text-sm font-medium text-quaternary text-balance">
            No icons match &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
