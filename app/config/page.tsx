"use client";

import { PageHeader } from "@/components/PageHeader";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Button } from "@/components/base/buttons/button";
import { useConfig } from "@/lib/config-context";
import type { VariantOption } from "@/config/design-system.config";

const CATEGORY_LABEL: Record<"colors" | "sizes" | "types", string> = {
  colors: "Colours",
  sizes: "Sizes",
  types: "Types",
};

function VariantGroup({
  slug,
  category,
  options,
}: {
  slug: string;
  category: "colors" | "sizes" | "types";
  options: VariantOption[];
}) {
  const { setVariantEnabled } = useConfig();

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-balance" style={{ color: "var(--color-gray-400)" }}>
        {CATEGORY_LABEL[category]}
      </p>
      <div className="grid grid-cols-3 gap-x-4 gap-y-2">
        {options.map((option) => (
          <Checkbox
            key={option.key}
            size="sm"
            label={option.label}
            isSelected={option.enabled}
            onChange={(enabled) => setVariantEnabled(slug, category, option.key, enabled)}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureGroup({ slug, features }: { slug: string; features: Record<string, boolean> }) {
  const { setFeatureEnabled } = useConfig();
  const entries = Object.entries(features);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-balance" style={{ color: "var(--color-gray-400)" }}>
        Sections
      </p>
      <div className="grid grid-cols-3 gap-x-4 gap-y-2">
        {entries.map(([key, enabled]) => (
          <Checkbox
            key={key}
            size="sm"
            label={key}
            isSelected={enabled}
            onChange={(next) => setFeatureEnabled(slug, key, next)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ConfigPage() {
  const { config, setComponentEnabled, resetToDefaults } = useConfig();
  const entries = Object.entries(config);

  return (
    <div className="prose-doc">
      <PageHeader
        section="Settings"
        title="Config"
        description="Every checkbox here is config/design-system.config.ts, live. Toggle a colour, size, type, or section and it disappears from that component's doc page immediately - uncheck a component entirely and it drops out of the sidebar and overview too. Changes persist in this browser only; they don't edit the file on disk."
      />

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-balance" style={{ color: "var(--color-gray-500)" }}>
          {entries.length} configured component{entries.length === 1 ? "" : "s"}
        </p>
        <Button size="sm" color="secondary" onClick={resetToDefaults}>
          Reset to defaults
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {entries.map(([slug, componentConfig]) => (
          <div
            key={slug}
            className="rounded-xl p-5"
            style={{
              border: "1px solid var(--color-gray-200)",
              background: componentConfig.enabled ? "var(--color-gray-25)" : "var(--color-gray-50)",
              opacity: componentConfig.enabled ? 1 : 0.6,
            }}
          >
            <div className="flex items-center justify-between mb-4 pb-4" style={{ borderBottom: "1px solid var(--color-gray-200)" }}>
              <Checkbox
                size="md"
                label={componentConfig.title}
                hint={`/components/${slug}`}
                isSelected={componentConfig.enabled}
                onChange={(enabled) => setComponentEnabled(slug, enabled)}
              />
            </div>

            <div className="flex flex-col gap-4">
              {componentConfig.colors && componentConfig.colors.length > 0 && (
                <VariantGroup slug={slug} category="colors" options={componentConfig.colors} />
              )}
              {componentConfig.sizes && componentConfig.sizes.length > 0 && (
                <VariantGroup slug={slug} category="sizes" options={componentConfig.sizes} />
              )}
              {componentConfig.types && componentConfig.types.length > 0 && (
                <VariantGroup slug={slug} category="types" options={componentConfig.types} />
              )}
              {componentConfig.features && Object.keys(componentConfig.features).length > 0 && (
                <FeatureGroup slug={slug} features={componentConfig.features} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
