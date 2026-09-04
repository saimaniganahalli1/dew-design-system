"use client";

import { useState } from "react";
import type React from "react";
import { Building07 } from "@untitledui/icons";
import type { Selection } from "react-aria-components";
import { useListData } from "react-stately";
import { PageHeader } from "@/components/PageHeader";
import { ContextualConfigPanel } from "@/components/ContextualConfigPanel";
import { Select } from "@/components/base/select/select";
import { MultiSelect } from "@/components/base/select/multi-select";
import { TagSelect } from "@/components/base/select/tag-select";
import { NativeSelect } from "@/components/base/select/select-native";
import type { SelectItemType } from "@/components/base/select/select-shared";
import {
  ScaffoldCheckbox,
  ScaffoldLabel,
  ScaffoldTextInput,
  SegmentedControl,
} from "@/components/scaffold/controls";
import { enabledVariants, isFeatureEnabled } from "@/config/design-system.config";
import { useConfig } from "@/lib/config-context";

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-wrap items-start gap-6 rounded-xl border border-secondary bg-secondary p-6">
    <p className="mb-1 w-full text-xs font-semibold text-quaternary uppercase tracking-widest text-balance">
      {label}
    </p>
    {children}
  </div>
);

const sectionToggles = [
  { key: "playground", label: "Component Playground" },
  { key: "withIcon", label: "With icon" },
  { key: "withAvatar", label: "With avatar" },
  { key: "supportingText", label: "Supporting text" },
  { key: "disabled", label: "Disabled" },
  { key: "comboBox", label: "Combobox" },
  { key: "multiSelect", label: "Multi-select" },
  { key: "tagSelect", label: "Tag select" },
  { key: "nativeSelect", label: "Native select" },
  { key: "usage", label: "Usage" },
  { key: "figma", label: "Figma" },
];

// Pulled directly from SelectProps in components/base/select/select.tsx (+ the CommonProps and AriaSelectProps it extends)
const props = [
  { name: "size",                  type: '"sm" | "md" | "lg"',        default: '"md"' },
  { name: "label",                 type: "string",                    default: "-" },
  { name: "placeholder",           type: "string",                    default: '"Select"' },
  { name: "hint",                  type: "string",                    default: "-" },
  { name: "tooltip",               type: "string",                    default: "-" },
  { name: "icon",                  type: "FC | ReactNode",            default: "-" },
  { name: "items",                 type: "SelectItemType[]",          default: "-" },
  { name: "hideRequiredIndicator", type: "boolean",                   default: "false" },
  { name: "isDisabled",            type: "boolean",                   default: "false" },
  { name: "isRequired",            type: "boolean",                   default: "false" },
  { name: "isInvalid",             type: "boolean",                   default: "false" },
  { name: "selectedKey",           type: "Key | null",                default: "-" },
  { name: "defaultSelectedKey",    type: "Key | null",                default: "-" },
  { name: "onSelectionChange",     type: "(key: Key | null) => void", default: "-" },
  { name: "popoverClassName",      type: "string",                    default: "-" },
];

// Pulled directly from SelectItemType in select-shared.tsx + SelectItem's own props in select-item.tsx
const itemProps = [
  { name: "id",                      type: "string | number",                   default: "-" },
  { name: "label",                   type: "string",                            default: "-" },
  { name: "avatarUrl",               type: "string",                            default: "-" },
  { name: "icon",                    type: "FC | ReactNode",                    default: "-" },
  { name: "supportingText",          type: "string",                            default: "-" },
  { name: "isDisabled",              type: "boolean",                           default: "false" },
  { name: "selectionIndicator",      type: '"checkmark" | "checkbox" | "none"', default: '"checkmark"' },
  { name: "selectionIndicatorAlign", type: '"left" | "right"',                  default: '"right"' },
];

const roleItems: SelectItemType[] = [
  { id: "designer", label: "Product Designer" },
  { id: "pm", label: "Product Manager" },
  { id: "lead", label: "Engineering Lead" },
  { id: "frontend", label: "Frontend Engineer", isDisabled: true },
];

const avatarDataUri = (initials: string, hex: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><rect width="32" height="32" rx="16" fill="${hex}"/><text x="16" y="21" font-family="sans-serif" font-size="12" font-weight="600" fill="white" text-anchor="middle">${initials}</text></svg>`,
  );

// Olivia Wyatt is this site's standing placeholder person (see CONTEXT.md); Phoenix Baker and
// Lana Steiner are Untitled UI's own established placeholder personas - fictional, never a real identity.
const teamItems: SelectItemType[] = [
  { id: "olivia", label: "Olivia Wyatt", supportingText: "olivia@dew.design", avatarUrl: avatarDataUri("OW", "#185E74") },
  { id: "phoenix", label: "Phoenix Baker", supportingText: "phoenix@dew.design", avatarUrl: avatarDataUri("PB", "#568F8F") },
  { id: "lana", label: "Lana Steiner", supportingText: "lana@dew.design", avatarUrl: avatarDataUri("LS", "#475467") },
];

const nativeOptions = [
  { label: "Product Designer", value: "designer" },
  { label: "Product Manager", value: "pm" },
  { label: "Engineering Lead", value: "lead" },
];

export default function SelectPage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig.select;
  const sizes = enabledVariants(config.sizes);

  const defaults = {
    size: "md" as "sm" | "md" | "lg",
    placeholder: "Select a role",
    withIcon: false,
    disabled: false,
  };

  const [previewSize, setPreviewSize] = useState(defaults.size);
  const [previewPlaceholder, setPreviewPlaceholder] = useState(defaults.placeholder);
  const [previewIcon, setPreviewIcon] = useState(defaults.withIcon);
  const [previewDisabled, setPreviewDisabled] = useState(defaults.disabled);

  const isDefault =
    previewSize === defaults.size &&
    previewPlaceholder === defaults.placeholder &&
    previewIcon === defaults.withIcon &&
    previewDisabled === defaults.disabled;

  const resetPreview = () => {
    setPreviewSize(defaults.size);
    setPreviewPlaceholder(defaults.placeholder);
    setPreviewIcon(defaults.withIcon);
    setPreviewDisabled(defaults.disabled);
  };

  const [multiSelected, setMultiSelected] = useState<Selection>(new Set(["olivia"]));
  const tagSelected = useListData<SelectItemType>({ initialItems: [teamItems[0]] });

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Select"
        description="Dropdown selection built on React Aria - a base Select plus ComboBox, MultiSelect, TagSelect, and NativeSelect variants - driven from config/design-system.config.ts."
        actions={<ContextualConfigPanel slug="select" title="Select" sections={sectionToggles} />}
      />

      {/* ── Component Playground ── */}
      {isFeatureEnabled(config, "playground") && (
        <>
          <h2 className="text-balance">Component Playground</h2>
          <p className="text-balance">Live instance - the controls read their options from the same config that drives the Variants section below.</p>
          <div className="overflow-hidden rounded-2xl border border-secondary shadow-xs">
            <div className="grid md:grid-cols-[1fr_300px]">
              <div
                className="relative flex min-h-[320px] flex-col items-center justify-center gap-3 bg-primary_alt p-12"
                style={{
                  backgroundImage: "radial-gradient(var(--ui-border-secondary) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                <div className="w-64">
                  <Select
                    label="Role"
                    size={previewSize}
                    placeholder={previewPlaceholder}
                    icon={previewIcon ? Building07 : undefined}
                    isDisabled={previewDisabled}
                    items={roleItems}
                  >
                    {(item) => <Select.Item {...item}>{item.label}</Select.Item>}
                  </Select>
                </div>
                <code className="text-xs text-quaternary">{previewSize}</code>
              </div>

              <div className="flex flex-col gap-5 border-l border-secondary bg-primary p-6">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-semibold text-quaternary uppercase tracking-widest text-balance">
                    Controls
                  </p>
                  <button
                    type="button"
                    onClick={resetPreview}
                    disabled={isDefault}
                    className="text-xs font-medium text-brand-secondary transition-opacity hover:text-brand-secondary_hover disabled:opacity-40"
                  >
                    Reset
                  </button>
                </div>

                <div className="flex flex-col gap-1.5">
                  <ScaffoldLabel>Size</ScaffoldLabel>
                  <SegmentedControl
                    options={sizes.map((s) => ({ key: s.key as "sm" | "md" | "lg", label: s.key }))}
                    value={previewSize}
                    onChange={setPreviewSize}
                  />
                </div>

                <ScaffoldTextInput label="Placeholder" value={previewPlaceholder} onChange={setPreviewPlaceholder} />

                <div className="flex flex-row gap-6">
                  <ScaffoldCheckbox label="Icon" checked={previewIcon} onChange={setPreviewIcon} />
                  <ScaffoldCheckbox label="Disabled" checked={previewDisabled} onChange={setPreviewDisabled} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Sizes ── */}
      {sizes.length > 0 && (
        <>
          <h2 className="text-balance">Sizes</h2>
          <p className="text-balance">Two sizes - <code>sm</code> and <code>md</code> (default). <code>lg</code> exists on the type (Untitled UI ships it) but isn&rsquo;t a documented Figma variant for the base Select, so it isn&rsquo;t demonstrated here - see Multi-select below, which does define <code>lg</code>.</p>
          <Section label={sizes.map((s) => s.label).join(" / ")}>
            {sizes.map((s) => (
              <div key={s.key} className="flex w-56 flex-col items-center gap-2">
                <Select label={s.label} size={s.key as "sm" | "md" | "lg"} items={roleItems} className="w-full">
                  {(item) => <Select.Item {...item}>{item.label}</Select.Item>}
                </Select>
                <code className="text-xs">{s.key}</code>
              </div>
            ))}
          </Section>
        </>
      )}

      {/* ── With icon ── */}
      {isFeatureEnabled(config, "withIcon") && (
        <>
          <h2 className="text-balance">With icon</h2>
          <p className="text-balance">Pass an <code>icon</code> to show a leading icon on the closed trigger.</p>
          <Section label="icon">
            <div className="w-64">
              <Select label="Department" placeholder="Select department" icon={Building07} items={roleItems} className="w-full">
                {(item) => <Select.Item {...item}>{item.label}</Select.Item>}
              </Select>
            </div>
          </Section>
        </>
      )}

      {/* ── With avatar ── */}
      {isFeatureEnabled(config, "withAvatar") && (
        <>
          <h2 className="text-balance">With avatar</h2>
          <p className="text-balance">Pass <code>avatarUrl</code> on an item - it replaces the icon slot with a real <code>Avatar</code>.</p>
          <Section label="avatarUrl">
            <div className="w-64">
              <Select label="Assign to" placeholder="Assign to" items={teamItems} className="w-full">
                {(item) => <Select.Item {...item}>{item.label}</Select.Item>}
              </Select>
            </div>
          </Section>
        </>
      )}

      {/* ── Supporting text ── */}
      {isFeatureEnabled(config, "supportingText") && (
        <>
          <h2 className="text-balance">Supporting text</h2>
          <p className="text-balance">Add <code>supportingText</code> to an item for secondary detail next to the label - here, an email address.</p>
          <Section label="supportingText">
            <div className="w-72">
              <Select label="Assign to" placeholder="Assign to" items={teamItems} className="w-full">
                {(item) => <Select.Item {...item}>{item.label}</Select.Item>}
              </Select>
            </div>
          </Section>
        </>
      )}

      {/* ── Disabled ── */}
      {isFeatureEnabled(config, "disabled") && (
        <>
          <h2 className="text-balance">Disabled</h2>
          <p className="text-balance">Disable the whole control with <code>isDisabled</code>, or a single item with <code>isDisabled</code> on that item - see &ldquo;Frontend Engineer&rdquo; above.</p>
          <Section label="isDisabled">
            <div className="w-64">
              <Select label="Role" placeholder="Select a role" isDisabled items={roleItems} className="w-full">
                {(item) => <Select.Item {...item}>{item.label}</Select.Item>}
              </Select>
            </div>
          </Section>
        </>
      )}

      {/* ── Combobox ── */}
      {isFeatureEnabled(config, "comboBox") && (
        <>
          <h2 className="text-balance">Combobox</h2>
          <p className="text-balance"><code>Select.ComboBox</code> - a searchable variant with a text input instead of a static trigger.</p>
          <Section label="Select">
            <div className="w-64">
              <Select.ComboBox label="Role" placeholder="Search roles" items={roleItems} shortcut={false}>
                {(item) => <Select.Item {...item}>{item.label}</Select.Item>}
              </Select.ComboBox>
            </div>
          </Section>
        </>
      )}

      {/* ── Multi-select ── */}
      {isFeatureEnabled(config, "multiSelect") && (
        <>
          <h2 className="text-balance">Multi-select</h2>
          <p className="text-balance"><code>MultiSelect</code> - checkbox-style multiple selection, with a search field and a Reset/Select all footer.</p>
          <Section label="MultiSelect">
            <div className="w-72">
              <MultiSelect
                label="Assign to"
                placeholder="Assign to"
                items={teamItems}
                selectedKeys={multiSelected}
                onSelectionChange={setMultiSelected}
                onReset={() => setMultiSelected(new Set())}
                onSelectAll={() => setMultiSelected(new Set(teamItems.map((i) => i.id)))}
              >
                {(item) => <MultiSelect.Item {...item} selectionIndicator="checkbox" selectionIndicatorAlign="left" />}
              </MultiSelect>
            </div>
          </Section>
        </>
      )}

      {/* ── Tag select ── */}
      {isFeatureEnabled(config, "tagSelect") && (
        <>
          <h2 className="text-balance">Tag select</h2>
          <p className="text-balance"><code>TagSelect</code> - selected items render as removable tags inside the trigger itself.</p>
          <Section label="TagSelect">
            <div className="w-80">
              <TagSelect label="Assign to" placeholder="Add people" items={teamItems} selectedItems={tagSelected} shortcut={false}>
                {(item) => <TagSelect.Item {...item}>{item.label}</TagSelect.Item>}
              </TagSelect>
            </div>
          </Section>
        </>
      )}

      {/* ── Native select ── */}
      {isFeatureEnabled(config, "nativeSelect") && (
        <>
          <h2 className="text-balance">Native select</h2>
          <p className="text-balance"><code>NativeSelect</code> - renders a real <code>&lt;select&gt;</code>, for contexts (e.g. inside an <code>InputGroup</code>) that need native form behaviour over React Aria&rsquo;s.</p>
          <Section label="NativeSelect">
            <div className="w-64">
              <NativeSelect label="Role" options={nativeOptions} />
            </div>
          </Section>
        </>
      )}

      {/* ── API ── */}
      <h2 className="text-balance">API</h2>
      <p className="text-balance">Props for the base <code>Select</code>. <code>Select.ComboBox</code>, <code>MultiSelect</code>, and <code>TagSelect</code> share the same <code>size</code>/<code>label</code>/<code>hint</code>/<code>tooltip</code>/<code>placeholder</code> shape, each with its own selection model on top - see the sections above for the exact API each one adds.</p>
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

      <h3 className="text-balance">Select.Item</h3>
      <p className="text-balance">One entry in <code>items</code>/<code>children</code> - shared by every Select variant.</p>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {itemProps.map((p) => (
            <tr key={p.name}>
              <td><code>{p.name}</code></td>
              <td><code style={{ fontSize: "11px" }}>{p.type}</code></td>
              <td><code>{p.default}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Usage ── */}
      {isFeatureEnabled(config, "usage") && (
        <>
          <h2 className="text-balance">Usage</h2>
          <pre className="overflow-x-auto rounded-xl border border-secondary bg-secondary p-5">
            <code className="font-mono text-[13px] text-secondary">
{`import { Select } from "@/components/base/select/select";

const roles = [
  { id: "designer", label: "Product Designer" },
  { id: "pm", label: "Product Manager" },
];

<Select label="Role" placeholder="Select a role" items={roles}>
  {(item) => <Select.Item {...item}>{item.label}</Select.Item>}
</Select>`}
            </code>
          </pre>
        </>
      )}

      {/* ── Figma ── */}
      {isFeatureEnabled(config, "figma") && (
        <>
          <h2 className="text-balance">Figma</h2>
          <p className="text-balance">No linked Figma file yet - this component was pulled in via the Untitled UI CLI, not designed in Figma first.</p>
        </>
      )}
    </div>
  );
}
