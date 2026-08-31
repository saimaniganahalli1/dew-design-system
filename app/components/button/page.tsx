"use client";

import type React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button, styles as buttonStyles } from "@/components/base/buttons/button";
import { Plus, ArrowRight, ArrowLeft, Download01, Trash01, Edit01, Send01, ChevronDown } from "@untitledui/icons";
import { enabledVariants, isFeatureEnabled } from "@/config/design-system.config";
import { useConfig } from "@/lib/config-context";

type ButtonColor = keyof typeof buttonStyles.colors;
type ButtonSize = keyof typeof buttonStyles.sizes;

/* ── Helpers ── */
const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div
    className="rounded-xl p-6 flex flex-wrap items-center gap-3"
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
  { name: "color",               type: "\"primary\" | \"secondary\" | \"tertiary\" | \"link-color\" | \"link-gray\" | \"primary-destructive\" | \"secondary-destructive\" | \"tertiary-destructive\" | \"link-destructive\"", default: "\"primary\"" },
  { name: "size",                type: "\"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\"",  default: "\"sm\"" },
  { name: "iconLeading",         type: "FC | ReactNode",  default: "—" },
  { name: "iconTrailing",        type: "FC | ReactNode",  default: "—" },
  { name: "isDisabled",          type: "boolean",          default: "false" },
  { name: "isLoading",           type: "boolean",          default: "false" },
  { name: "showTextWhileLoading",type: "boolean",          default: "false" },
  { name: "href",                type: "string",           default: "— (renders <a>)" },
];

export default function ButtonPage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig.button;
  const colors = enabledVariants(config.colors);
  const standardColors = colors.filter((c) => c.group === "standard");
  const destructiveColors = colors.filter((c) => c.group === "destructive");
  const sizes = enabledVariants(config.sizes);

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Button"
        description="The primary action trigger. Built on React Aria for full keyboard and screen-reader support. Colour, size, icon, and state variants are all driven from config/design-system.config.ts."
      />

      {/* ── Colour variants ── */}
      {colors.length > 0 && (
        <>
          <h2>Variants</h2>
          <p>Choose a colour based on the action&apos;s visual weight and context. Destructive variants are for irreversible actions.</p>

          <div className="flex flex-col gap-4 mt-4">
            {standardColors.length > 0 && (
              <Section label="Standard">
                {standardColors.map((c) => (
                  <Button key={c.key} color={c.key as ButtonColor}>{c.label}</Button>
                ))}
              </Section>
            )}

            {destructiveColors.length > 0 && (
              <Section label="Destructive">
                {destructiveColors.map((c) => (
                  <Button key={c.key} color={c.key as ButtonColor}>{c.label}</Button>
                ))}
              </Section>
            )}
          </div>
        </>
      )}

      {/* ── Sizes ── */}
      {sizes.length > 0 && (
        <>
          <h2>Sizes</h2>
          <p>Size affects padding, font-size, and icon dimensions.</p>

          <Section label="All sizes — primary">
            {sizes.map((s) => (
              <Button key={s.key} size={s.key as ButtonSize}>{s.label}</Button>
            ))}
          </Section>
        </>
      )}

      {/* ── With icons ── */}
      {(isFeatureEnabled(config, "iconLeading") || isFeatureEnabled(config, "iconTrailing") || isFeatureEnabled(config, "iconBoth") || isFeatureEnabled(config, "iconOnly")) && (
        <>
          <h2>With icons</h2>
          <p>Pass any <code>@untitledui/icons</code> component as <code>iconLeading</code> or <code>iconTrailing</code>. Pass <em>only</em> an icon (no children) for an icon-only button.</p>

          <div className="flex flex-col gap-4 mt-4">
            {isFeatureEnabled(config, "iconLeading") && (
              <Section label="Leading icon">
                <Button color="primary" iconLeading={Plus}>Add item</Button>
                <Button color="secondary" iconLeading={Download01}>Download</Button>
                <Button color="tertiary" iconLeading={Edit01}>Edit</Button>
              </Section>
            )}

            {isFeatureEnabled(config, "iconTrailing") && (
              <Section label="Trailing icon">
                <Button color="primary" iconTrailing={ArrowRight}>Continue</Button>
                <Button color="secondary" iconTrailing={ChevronDown}>Options</Button>
                <Button color="link-color" iconTrailing={ArrowRight}>Learn more</Button>
              </Section>
            )}

            {isFeatureEnabled(config, "iconBoth") && (
              <Section label="Both icons">
                <Button color="primary" iconLeading={ArrowLeft} iconTrailing={ArrowRight}>
                  Navigate
                </Button>
                <Button color="secondary" iconLeading={Send01} iconTrailing={ChevronDown}>
                  Send
                </Button>
              </Section>
            )}

            {isFeatureEnabled(config, "iconOnly") && (
              <Section label="Icon only">
                <Button color="primary" iconLeading={Plus} size="xs" />
                <Button color="primary" iconLeading={Plus} size="sm" />
                <Button color="primary" iconLeading={Plus} size="md" />
                <Button color="secondary" iconLeading={Download01} size="md" />
                <Button color="secondary" iconLeading={Edit01} size="md" />
                <Button color="tertiary-destructive" iconLeading={Trash01} size="md" />
              </Section>
            )}
          </div>
        </>
      )}

      {/* ── States ── */}
      {(isFeatureEnabled(config, "disabled") || isFeatureEnabled(config, "loading") || isFeatureEnabled(config, "loadingWithText")) && (
        <>
          <h2>States</h2>
          <p>Disabled dims the button and prevents interaction. Loading shows a spinner and sets <code>isPending</code> on the underlying React Aria button.</p>

          <div className="flex flex-col gap-4 mt-4">
            {isFeatureEnabled(config, "disabled") && (
              <Section label="Disabled">
                <Button color="primary" isDisabled>Primary</Button>
                <Button color="secondary" isDisabled>Secondary</Button>
                <Button color="tertiary" isDisabled>Tertiary</Button>
                <Button color="primary-destructive" isDisabled>Destructive</Button>
              </Section>
            )}

            {isFeatureEnabled(config, "loading") && (
              <Section label="Loading — spinner only">
                <Button color="primary" isLoading>Primary</Button>
                <Button color="secondary" isLoading>Secondary</Button>
                <Button color="tertiary" isLoading>Tertiary</Button>
              </Section>
            )}

            {isFeatureEnabled(config, "loadingWithText") && (
              <Section label="Loading — spinner + text">
                <Button color="primary" isLoading showTextWhileLoading iconLeading={Send01}>
                  Sending…
                </Button>
                <Button color="secondary" isLoading showTextWhileLoading>
                  Saving…
                </Button>
              </Section>
            )}
          </div>
        </>
      )}

      {/* ── As link ── */}
      {isFeatureEnabled(config, "asLink") && (
        <>
          <h2>As link</h2>
          <p>Pass an <code>href</code> prop and the button renders as an <code>&lt;a&gt;</code> tag (via React Aria <code>Link</code>). All variants and sizes work the same.</p>

          <Section label="Link buttons">
            <Button color="primary" href="#">Go somewhere</Button>
            <Button color="secondary" href="#" iconTrailing={ArrowRight}>View docs</Button>
            <Button color="link-color" href="#" iconTrailing={ArrowRight}>Learn more</Button>
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
      <p>Each colour variant maps directly to Untitled UI semantic tokens defined in <code>globals.css</code>. Swap the <code>--ui-bg-brand-*</code> variables to make every primary button DEW-branded.</p>

      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Variant</th>
            <th>Background token</th>
            <th>Text token</th>
            <th>Ring token</th>
          </tr>
        </thead>
        <tbody>
          {[
            { v: "primary",              bg: "bg-brand-solid",   text: "text-white",          ring: "ring-transparent" },
            { v: "secondary",            bg: "bg-primary",       text: "text-secondary",       ring: "ring-primary" },
            { v: "tertiary",             bg: "transparent",      text: "text-tertiary",        ring: "none" },
            { v: "primary-destructive",  bg: "bg-error-solid",   text: "text-white",          ring: "ring-transparent" },
            { v: "secondary-destructive",bg: "bg-primary",       text: "text-error-primary",   ring: "ring-error_subtle" },
            { v: "tertiary-destructive", bg: "transparent",      text: "text-error-primary",   ring: "none" },
          ].map((r) => (
            <tr key={r.v}>
              <td style={{ color: "var(--ui-text-secondary)" }}>{r.v}</td>
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
