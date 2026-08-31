"use client";

import type React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Badge, BadgeWithDot, BadgeWithIcon, BadgeWithButton, BadgeIcon } from "@/components/base/badges/badges";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Star01, Check, Zap } from "@untitledui/icons";
import type { BadgeColors, BadgeTypes } from "@/components/base/badges/badge-types";
import { enabledVariants, isFeatureEnabled } from "@/config/design-system.config";
import { useConfig } from "@/lib/config-context";

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div
    className="rounded-xl p-6 flex flex-wrap items-center gap-2.5"
    style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
  >
    <p className="w-full text-xs font-semibold uppercase tracking-widest mb-1"
      style={{ color: "var(--color-gray-400)" }}
    >
      {label}
    </p>
    {children}
  </div>
);

const props = [
  { name: "type",     type: '"pill-color" | "color" | "modern"', default: '"pill-color"' },
  { name: "size",     type: '"sm" | "md" | "lg"',                default: '"md"' },
  { name: "color",    type: "BadgeColors (12 options)",          default: '"gray"' },
  { name: "children", type: "ReactNode",                          default: "—" },
];

export default function BadgePage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig.badge;
  const types = enabledVariants(config.types);
  const colors = enabledVariants(config.colors);
  const sizes = enabledVariants(config.sizes);

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Badge"
        description="A compact, non-interactive status label. Types, colours, sizes, and demo sections are all driven from config/design-system.config.ts."
      />

      {/* ── Types ── */}
      {types.length > 0 && (
        <>
          <h2>Types</h2>
          <p>Three shapes: <code>pill-color</code> (fully rounded), <code>color</code> (soft rounded rectangle), and <code>modern</code> (neutral surface with a shadow, colour carried by the addon only).</p>

          <div className="flex flex-col gap-4 mt-4">
            {types.map((t) => (
              <Section key={t.key} label={t.label}>
                {t.key === "modern" ? (
                  <>
                    <Badge type="modern" color="gray">Modern</Badge>
                    <BadgeWithDot type="modern" color="brand">In progress</BadgeWithDot>
                    <BadgeWithDot type="modern" color="success">Complete</BadgeWithDot>
                  </>
                ) : (
                  <>
                    <Badge type={t.key as BadgeTypes} color="brand">Badge</Badge>
                    <Badge type={t.key as BadgeTypes} color="success">Active</Badge>
                    <Badge type={t.key as BadgeTypes} color="error">Failed</Badge>
                  </>
                )}
              </Section>
            ))}
          </div>
        </>
      )}

      {/* ── Colours ── */}
      {colors.length > 0 && (
        <>
          <h2>Colours</h2>
          <p>Use <code>gray</code>, <code>brand</code>, <code>error</code>, <code>warning</code>, and <code>success</code> for status; the rest for categorisation and tagging.</p>

          <Section label="All colours — pill-color">
            {colors.map((c) => (
              <Badge key={c.key} type="pill-color" color={c.key as BadgeColors}>{c.label}</Badge>
            ))}
          </Section>
        </>
      )}

      {/* ── Sizes ── */}
      {sizes.length > 0 && (
        <>
          <h2>Sizes</h2>
          <Section label={sizes.map((s) => s.label).join(" / ")}>
            {sizes.map((s) => (
              <Badge key={s.key} size={s.key as "sm" | "md" | "lg"} color="brand">{s.label}</Badge>
            ))}
          </Section>
        </>
      )}

      {/* ── With dot ── */}
      {isFeatureEnabled(config, "withDot") && (
        <>
          <h2>With dot</h2>
          <p>A leading status dot — most common for live/active states.</p>
          <Section label="Dot indicator">
            <BadgeWithDot color="success">Online</BadgeWithDot>
            <BadgeWithDot color="gray">Offline</BadgeWithDot>
            <BadgeWithDot color="warning">Away</BadgeWithDot>
            <BadgeWithDot color="error">Do not disturb</BadgeWithDot>
          </Section>
        </>
      )}

      {/* ── With icon ── */}
      {isFeatureEnabled(config, "withIcon") && (
        <>
          <h2>With icon</h2>
          <p>Leading or trailing icon, passed as an <code>@untitledui/icons</code> component.</p>
          <Section label="Icon leading / trailing">
            <BadgeWithIcon color="brand" iconLeading={Star01}>Featured</BadgeWithIcon>
            <BadgeWithIcon color="success" iconLeading={Check}>Verified</BadgeWithIcon>
            <BadgeWithIcon color="warning" iconTrailing={Zap}>Boosted</BadgeWithIcon>
          </Section>
        </>
      )}

      {/* ── Icon only ── */}
      {isFeatureEnabled(config, "iconOnly") && (
        <>
          <h2>Icon only</h2>
          <Section label="No label">
            <BadgeIcon color="brand" icon={Star01} />
            <BadgeIcon color="success" icon={Check} />
            <BadgeIcon color="gray" icon={Zap} />
          </Section>
        </>
      )}

      {/* ── With dismiss button ── */}
      {isFeatureEnabled(config, "withButton") && (
        <>
          <h2>With dismiss button</h2>
          <p>An inline close button — used for removable filters and selected tags.</p>
          <Section label="Dismissible">
            <BadgeWithButton color="brand" buttonLabel="Remove">Design</BadgeWithButton>
            <BadgeWithButton color="gray" buttonLabel="Remove">Engineering</BadgeWithButton>
            <BadgeWithButton color="error" buttonLabel="Remove">Urgent</BadgeWithButton>
          </Section>
        </>
      )}

      {/* ── Badge group ── */}
      {isFeatureEnabled(config, "group") && (
        <>
          <h2>Badge group</h2>
          <p>A badge with an attached addon label — used to pair a metric with its context, e.g. a trend value next to a description.</p>
          <Section label="Leading / trailing addon">
            <BadgeGroup addonText="New" color="brand">12 updates</BadgeGroup>
            <BadgeGroup addonText="+40%" color="success" align="trailing">Conversion rate</BadgeGroup>
            <BadgeGroup addonText="Live" color="error" theme="modern">3 issues</BadgeGroup>
          </Section>
        </>
      )}

      {/* ── API ── */}
      <h2>API</h2>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name}>
              <td><code>{p.name}</code></td>
              <td><code style={{ fontSize: "11px" }}>{p.type}</code></td>
              <td><code>{p.default}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Token anatomy ── */}
      <h2>Token anatomy</h2>
      <p>Badge colours pull from a separate <strong>utility colour</strong> scale (distinct from the primitive Brand/Error/Warning/Success palette) — a wider set of 50/100/200/500/700 steps built for badges, tags, and avatars.</p>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Colour</th>
            <th>Background</th>
            <th>Text</th>
            <th>Ring</th>
          </tr>
        </thead>
        <tbody>
          {[
            { c: "gray",   bg: "utility-neutral-50", text: "utility-neutral-700", ring: "utility-neutral-200" },
            { c: "brand",  bg: "utility-brand-50",   text: "utility-brand-700",   ring: "utility-brand-200" },
            { c: "error",  bg: "utility-red-50",     text: "utility-red-700",     ring: "utility-red-200" },
            { c: "warning",bg: "utility-yellow-50",  text: "utility-yellow-700",  ring: "utility-yellow-200" },
            { c: "success",bg: "utility-green-50",   text: "utility-green-700",   ring: "utility-green-200" },
          ].map((r) => (
            <tr key={r.c}>
              <td style={{ color: "var(--ui-text-secondary)" }}>{r.c}</td>
              <td><code>{r.bg}</code></td>
              <td><code>{r.text}</code></td>
              <td><code>{r.ring}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
