"use client";

import { useState } from "react";
import type React from "react";
import { Star01 } from "@untitledui/icons";
import { PageHeader } from "@/components/PageHeader";
import { Avatar, type AvatarProps } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { AvatarAddButton, AvatarCompanyIcon } from "@/components/base/avatar/base-components";
import { ContextualConfigPanel } from "@/components/ContextualConfigPanel";
import {
  ScaffoldCheckbox,
  ScaffoldLabel,
  ScaffoldNumberInput,
  ScaffoldTextInput,
  SegmentedControl,
} from "@/components/scaffold/controls";
import { enabledVariants, isFeatureEnabled } from "@/config/design-system.config";
import { useConfig } from "@/lib/config-context";

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-wrap items-end gap-5 rounded-xl border border-secondary bg-secondary p-6">
    <p className="mb-1 w-full text-xs font-semibold text-quaternary uppercase tracking-widest text-balance">
      {label}
    </p>
    {children}
  </div>
);

const sizePx: Record<NonNullable<AvatarProps["size"]>, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  "2xl": 64,
};

const sectionToggles = [
  { key: "playground", label: "Component Playground" },
  { key: "fallback", label: "Fallback content" },
  { key: "border", label: "Border" },
  { key: "status", label: "Status indicator" },
  { key: "verified", label: "Verified" },
  { key: "count", label: "Count badge" },
  { key: "companyIcon", label: "Company icon" },
  { key: "addButton", label: "Add button" },
  { key: "labelGroup", label: "Avatar label group" },
  { key: "profilePhoto", label: "Profile photo" },
  { key: "group", label: "Avatar group" },
  { key: "usage", label: "Usage" },
  { key: "figma", label: "Figma" },
];

const statusOptions: { key: "none" | "online" | "offline"; label: string }[] = [
  { key: "none", label: "None" },
  { key: "online", label: "Online" },
  { key: "offline", label: "Offline" },
];

const companyLogo =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><rect width="32" height="32" rx="8" fill="#7F56D9"/><text x="16" y="21" font-family="sans-serif" font-size="14" font-weight="600" fill="white" text-anchor="middle">D</text></svg>',
  );

// Pulled directly from AvatarProps in components/base/avatar/avatar.tsx
const props = [
  { name: "size",             type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"', default: '"md"' },
  { name: "src",               type: "string | null",                          default: "-" },
  { name: "alt",                type: "string",                                 default: "-" },
  { name: "initials",           type: "string",                                 default: "-" },
  { name: "placeholderIcon",    type: "FC<{ className?: string }>",             default: "-" },
  { name: "placeholder",        type: "ReactNode",                              default: "-" },
  { name: "border",             type: "boolean",                                default: "false" },
  { name: "contrastBorder",     type: "boolean",                                default: "false" },
  { name: "badge",              type: "ReactNode",                              default: "-" },
  { name: "status",             type: '"online" | "offline"',                   default: "-" },
  { name: "verified",           type: "boolean",                                default: "false" },
  { name: "count",              type: "number",                                 default: "-" },
  { name: "rounded",            type: "boolean",                                default: "true" },
  { name: "focusable",          type: "boolean",                                default: "false" },
  { name: "className",          type: "string",                                 default: "-" },
  { name: "contentClassName",   type: "string",                                 default: "-" },
];

const stack = [
  { initials: "OW" },
  { initials: "JD" },
  { initials: "MK" },
  { initials: "PL" },
];

export default function AvatarPage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig.avatar;
  const sizes = enabledVariants(config.sizes);

  const defaults = {
    size: "md" as NonNullable<AvatarProps["size"]>,
    initials: "OW",
    border: false,
    status: "none" as "none" | "online" | "offline",
    verified: false,
    count: 0,
  };

  const [previewSize, setPreviewSize] = useState(defaults.size);
  const [previewInitials, setPreviewInitials] = useState(defaults.initials);
  const [previewBorder, setPreviewBorder] = useState(defaults.border);
  const [previewStatus, setPreviewStatus] = useState(defaults.status);
  const [previewVerified, setPreviewVerified] = useState(defaults.verified);
  const [previewCount, setPreviewCount] = useState(defaults.count);

  const isDefault =
    previewSize === defaults.size &&
    previewInitials === defaults.initials &&
    previewBorder === defaults.border &&
    previewStatus === defaults.status &&
    previewVerified === defaults.verified &&
    previewCount === defaults.count;

  const resetPreview = () => {
    setPreviewSize(defaults.size);
    setPreviewInitials(defaults.initials);
    setPreviewBorder(defaults.border);
    setPreviewStatus(defaults.status);
    setPreviewVerified(defaults.verified);
    setPreviewCount(defaults.count);
  };

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Avatar"
        description="User representation. Supports an image, initials fallback, and an icon fallback. Sizes and demo sections are driven from config/design-system.config.ts."
        actions={<ContextualConfigPanel slug="avatar" title="Avatar" sections={sectionToggles} />}
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
                <div className="flex size-32 items-center justify-center rounded-full bg-primary shadow-md">
                  <Avatar
                    size={previewSize}
                    initials={previewInitials || undefined}
                    border={previewBorder}
                    status={previewStatus === "none" ? undefined : previewStatus}
                    verified={previewVerified}
                    count={previewCount > 0 ? previewCount : undefined}
                  />
                </div>
                <code className="text-xs text-quaternary">
                  {previewSize} · {sizePx[previewSize]}px
                </code>
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
                    options={sizes.map((s) => ({ key: s.key as NonNullable<AvatarProps["size"]>, label: s.key }))}
                    value={previewSize}
                    onChange={setPreviewSize}
                  />
                </div>

                <ScaffoldTextInput label="Initials" value={previewInitials} onChange={setPreviewInitials} maxLength={2} />

                <div className="flex flex-col gap-1.5">
                  <ScaffoldLabel>Status</ScaffoldLabel>
                  <SegmentedControl options={statusOptions} value={previewStatus} onChange={setPreviewStatus} />
                </div>

                <ScaffoldNumberInput label="Count" value={previewCount} onChange={setPreviewCount} min={0} max={99} />

                <div className="flex flex-row gap-6">
                  <ScaffoldCheckbox label="Border" checked={previewBorder} onChange={setPreviewBorder} />
                  <ScaffoldCheckbox label="Verified" checked={previewVerified} onChange={setPreviewVerified} />
                </div>

                <p className="text-xs leading-normal text-quaternary text-balance">
                  Badge priority: status › verified › count - only one shows at a time.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Sizes ── */}
      {sizes.length > 0 && (
        <>
          <h2 className="text-balance">Sizes</h2>
          <Section label={sizes.map((s) => s.label).join(" / ")}>
            {sizes.map((s) => (
              <div key={s.key} className="flex flex-col items-center gap-2">
                <Avatar size={s.key as AvatarProps["size"]} initials="OW" />
                <code className="text-xs">{s.key}</code>
              </div>
            ))}
          </Section>
        </>
      )}

      {/* ── Fallback content ── */}
      {isFeatureEnabled(config, "fallback") && (
        <>
          <h2 className="text-balance">Fallback content</h2>
          <p className="text-balance">
            Falls back in order: <code>src</code> image → <code>initials</code> → <code>placeholderIcon</code> →{" "}
            <code>placeholder</code> → default <code>User01</code> icon.
          </p>
          <Section label="Initials / custom icon / default">
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg" initials="OW" />
              <code className="text-xs">initials</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg" placeholderIcon={Star01} />
              <code className="text-xs">placeholderIcon</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg" />
              <code className="text-xs">default (User01)</code>
            </div>
          </Section>
        </>
      )}

      {/* ── Border ── */}
      {isFeatureEnabled(config, "border") && (
        <>
          <h2 className="text-balance">Border</h2>
          <p className="text-balance">An inner contrast ring around the avatar - used when the background behind the avatar is unpredictable.</p>
          <Section label="border">
            <Avatar size="lg" initials="OW" border />
          </Section>
        </>
      )}

      {/* ── Status ── */}
      {isFeatureEnabled(config, "status") && (
        <>
          <h2 className="text-balance">Status indicator</h2>
          <Section label="online / offline">
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg" initials="OW" status="online" />
              <code className="text-xs">online</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg" initials="OW" status="offline" />
              <code className="text-xs">offline</code>
            </div>
          </Section>
        </>
      )}

      {/* ── Verified ── */}
      {isFeatureEnabled(config, "verified") && (
        <>
          <h2 className="text-balance">Verified</h2>
          <Section label="verified">
            <Avatar size="lg" initials="OW" verified />
          </Section>
        </>
      )}

      {/* ── Count ── */}
      {isFeatureEnabled(config, "count") && (
        <>
          <h2 className="text-balance">Count badge</h2>
          <p className="text-balance">Displays an unread/notification count on the badge corner.</p>
          <Section label="count">
            <Avatar size="lg" initials="OW" count={4} />
          </Section>
        </>
      )}

      {/* ── Company icon ── */}
      {isFeatureEnabled(config, "companyIcon") && (
        <>
          <h2 className="text-balance">Company icon</h2>
          <p className="text-balance">Pass a custom <code>badge</code> node - e.g. a company logo - when status/verified/count aren&apos;t in use.</p>
          <Section label="badge">
            <Avatar size="lg" initials="OW" badge={<AvatarCompanyIcon size="lg" src={companyLogo} alt="Company" />} />
          </Section>
        </>
      )}

      {/* ── Add button ── */}
      {isFeatureEnabled(config, "addButton") && (
        <>
          <h2 className="text-balance">Add button</h2>
          <p className="text-balance">A dashed placeholder used at the end of an avatar stack to add another user.</p>
          <Section label="AvatarAddButton">
            <AvatarAddButton size="md" />
          </Section>
        </>
      )}

      {/* ── Label group ── */}
      {isFeatureEnabled(config, "labelGroup") && (
        <>
          <h2 className="text-balance">Avatar label group</h2>
          <p className="text-balance">An avatar paired with a title and subtitle - used in lists, tables, and comments.</p>
          <Section label="AvatarLabelGroup">
            <AvatarLabelGroup size="md" initials="OW" title="Olivia Wyatt" subtitle="olivia@dew.design" status="online" />
          </Section>
        </>
      )}

      {/* ── Profile photo ── */}
      {isFeatureEnabled(config, "profilePhoto") && (
        <>
          <h2 className="text-balance">Profile photo</h2>
          <p className="text-balance">A larger presentation used on profile headers and settings pages.</p>
          <Section label="sm / md / lg">
            {(["sm", "md", "lg"] as const).map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <AvatarProfilePhoto size={s} initials="OW" status="online" />
                <code className="text-xs">{s}</code>
              </div>
            ))}
          </Section>
        </>
      )}

      {/* ── Group ── */}
      {isFeatureEnabled(config, "group") && (
        <>
          <h2 className="text-balance">Avatar group</h2>
          <p className="text-balance">Stack avatars with border and a –8px overlap, ending in an <code>AvatarAddButton</code> or a count avatar when the list exceeds the max.</p>
          <Section label="stack">
            <div className="flex">
              {stack.map((a, i) => (
                <Avatar
                  key={a.initials}
                  size="md"
                  initials={a.initials}
                  border
                  className={i === 0 ? "" : "-ml-2"}
                />
              ))}
              <Avatar size="md" initials="+4" border className="-ml-2" />
            </div>
          </Section>
        </>
      )}

      {/* ── API ── */}
      <h2 className="text-balance">API</h2>
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

      {/* ── Usage ── */}
      {isFeatureEnabled(config, "usage") && (
        <>
          <h2 className="text-balance">Usage</h2>
          <pre className="overflow-x-auto rounded-xl border border-secondary bg-secondary p-5">
            <code className="font-mono text-[13px] text-secondary">
{`import { Avatar } from "@/components/base/avatar/avatar";

<Avatar size="md" initials="OW" status="online" />`}
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
