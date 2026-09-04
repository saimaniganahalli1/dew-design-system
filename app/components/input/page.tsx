"use client";

import { useState } from "react";
import type React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { InputBase } from "@/components/base/input/input";
import { InputDate } from "@/components/base/input/input-date";
import { InputNumber } from "@/components/base/input/input-number";
import { PaymentInput } from "@/components/base/input/input-payment";
import { InputTags } from "@/components/base/input/input-tags";
import { InputTagsOuter } from "@/components/base/input/input-tags-outer";
import { InputFile } from "@/components/base/input/input-file";
import { PinInput } from "@/components/base/input/pin-input";
import { ContextualConfigPanel } from "@/components/ContextualConfigPanel";
import {
  ScaffoldCheckbox,
  ScaffoldLabel,
  ScaffoldTextInput,
  SegmentedControl,
} from "@/components/scaffold/controls";
import { Mail01, Lock01, SearchMd } from "@untitledui/icons";
import { enabledVariants, isFeatureEnabled } from "@/config/design-system.config";
import { useConfig } from "@/lib/config-context";

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-wrap items-center gap-6 rounded-xl border border-secondary bg-secondary p-6">
    <p className="mb-1 w-full text-xs font-semibold text-quaternary uppercase tracking-widest text-balance">
      {label}
    </p>
    {children}
  </div>
);

const sectionToggles = [
  { key: "playground", label: "Component Playground" },
  { key: "states", label: "States" },
  { key: "icons", label: "With icons" },
  { key: "password", label: "Password" },
  { key: "tooltip", label: "With tooltip" },
  { key: "shortcut", label: "With shortcut" },
  { key: "group", label: "Input group" },
  { key: "date", label: "Date input" },
  { key: "number", label: "Number input" },
  { key: "payment", label: "Payment input" },
  { key: "tags", label: "Tag input" },
  { key: "fileUpload", label: "File upload" },
  { key: "pin", label: "PIN input" },
  { key: "usage", label: "Usage" },
  { key: "figma", label: "Figma" },
];

// Pulled directly from InputProps in components/base/input/input.tsx (plus the Pick<InputBaseProps, ...> and react-aria-components TextFieldProps it extends)
const props = [
  { name: "label",                type: "string",               default: "-" },
  { name: "hint",                 type: "ReactNode",            default: "-" },
  { name: "placeholder",         type: "string",               default: "-" },
  { name: "size",                 type: '"sm" | "md" | "lg"',  default: '"md"' },
  { name: "icon",                 type: "ComponentType",        default: "-" },
  { name: "tooltip",              type: "string",               default: "-" },
  { name: "shortcut",            type: "string | boolean",     default: "false" },
  { name: "isInvalid",           type: "boolean",              default: "false" },
  { name: "isDisabled",          type: "boolean",              default: "false" },
  { name: "isRequired",          type: "boolean",              default: "false" },
  { name: "hideRequiredIndicator", type: "boolean",            default: "false" },
  { name: "type",                 type: "HTMLInputTypeAttribute", default: '"text"' },
];

export default function InputPage() {
  const { config: liveConfig } = useConfig();
  const config = liveConfig.input;
  const sizes = enabledVariants(config.sizes);

  const defaults = {
    size: "md" as "sm" | "md" | "lg",
    label: "Email address",
    placeholder: "olivia@untitledui.com",
    hint: "This is a hint text to help user.",
    invalid: false,
    disabled: false,
    required: false,
  };

  const [previewSize, setPreviewSize] = useState(defaults.size);
  const [previewLabel, setPreviewLabel] = useState(defaults.label);
  const [previewPlaceholder, setPreviewPlaceholder] = useState(defaults.placeholder);
  const [previewHint, setPreviewHint] = useState(defaults.hint);
  const [previewInvalid, setPreviewInvalid] = useState(defaults.invalid);
  const [previewDisabled, setPreviewDisabled] = useState(defaults.disabled);
  const [previewRequired, setPreviewRequired] = useState(defaults.required);

  const isDefault =
    previewSize === defaults.size &&
    previewLabel === defaults.label &&
    previewPlaceholder === defaults.placeholder &&
    previewHint === defaults.hint &&
    previewInvalid === defaults.invalid &&
    previewDisabled === defaults.disabled &&
    previewRequired === defaults.required;

  const resetPreview = () => {
    setPreviewSize(defaults.size);
    setPreviewLabel(defaults.label);
    setPreviewPlaceholder(defaults.placeholder);
    setPreviewHint(defaults.hint);
    setPreviewInvalid(defaults.invalid);
    setPreviewDisabled(defaults.disabled);
    setPreviewRequired(defaults.required);
  };

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Input"
        description="Single-line text field built on React Aria for full accessibility. Sizes and demo sections are driven from config/design-system.config.ts."
        actions={<ContextualConfigPanel slug="input" title="Input" sections={sectionToggles} />}
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
                <div className="flex w-full max-w-sm items-center justify-center rounded-xl bg-primary px-8 py-6 shadow-md">
                  <Input
                    className="w-full"
                    size={previewSize}
                    label={previewLabel || undefined}
                    placeholder={previewPlaceholder || undefined}
                    hint={previewHint || undefined}
                    isInvalid={previewInvalid}
                    isDisabled={previewDisabled}
                    isRequired={previewRequired}
                  />
                </div>
                <code className="text-xs text-quaternary">
                  {previewSize}
                  {previewInvalid ? " · invalid" : ""}
                  {previewDisabled ? " · disabled" : ""}
                  {previewRequired ? " · required" : ""}
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
                    options={sizes.map((s) => ({ key: s.key as "sm" | "md" | "lg", label: s.key }))}
                    value={previewSize}
                    onChange={setPreviewSize}
                  />
                </div>

                <ScaffoldTextInput label="Label" value={previewLabel} onChange={setPreviewLabel} />
                <ScaffoldTextInput label="Placeholder" value={previewPlaceholder} onChange={setPreviewPlaceholder} />
                <ScaffoldTextInput label="Hint" value={previewHint} onChange={setPreviewHint} />

                <div className="flex flex-row flex-wrap gap-6">
                  <ScaffoldCheckbox label="Invalid" checked={previewInvalid} onChange={setPreviewInvalid} />
                  <ScaffoldCheckbox label="Disabled" checked={previewDisabled} onChange={setPreviewDisabled} />
                  <ScaffoldCheckbox label="Required" checked={previewRequired} onChange={setPreviewRequired} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Default ── */}
      <h2 className="text-balance">Default</h2>
      <p className="text-balance">Label, placeholder, and hint text - the anatomy of a complete input field.</p>
      <Section label="Default">
        <div className="max-w-sm flex-1">
          <Input
            label="Email address"
            placeholder="olivia@untitledui.com"
            hint="This is a hint text to help user."
          />
        </div>
      </Section>

      {/* ── States ── */}
      {isFeatureEnabled(config, "states") && (
        <>
          <h2 className="text-balance">States</h2>
          <p className="text-balance">All states: default, focused (click into it), disabled, error with hint text, and required.</p>
          <Section label="Default / disabled / error / required">
            <div className="flex max-w-sm flex-1 flex-col gap-5">
              <Input label="Default" placeholder="Placeholder" hint="Hint text." />
              <Input label="Disabled" placeholder="Placeholder" isDisabled hint="Hint text." />
              <Input
                label="Error"
                defaultValue="invalid-email@"
                isInvalid
                hint="This is an error message."
              />
              <Input label="Required" placeholder="Placeholder" isRequired hint="Hint text." />
            </div>
          </Section>
        </>
      )}

      {/* ── With icons ── */}
      {isFeatureEnabled(config, "icons") && (
        <>
          <h2 className="text-balance">With icons</h2>
          <p className="text-balance">Pass any <code>@untitledui/icons</code> component as the <code>icon</code> prop to add a leading icon.</p>
          <Section label="Leading icon">
            <div className="flex max-w-sm flex-1 flex-col gap-5">
              <Input label="Email" placeholder="you@example.com" icon={Mail01} />
              <Input label="Search" placeholder="Search..." icon={SearchMd} />
              <Input label="Password" placeholder="Enter password" type="password" icon={Lock01} />
            </div>
          </Section>
        </>
      )}

      {/* ── Password ── */}
      {isFeatureEnabled(config, "password") && (
        <>
          <h2 className="text-balance">Password</h2>
          <p className="text-balance">Pass <code>type=&quot;password&quot;</code> and a built-in show/hide toggle appears automatically - no extra prop needed.</p>
          <Section label="Password">
            <div className="max-w-sm flex-1">
              <Input
                label="Password"
                type="password"
                icon={Lock01}
                placeholder="Enter password"
                hint="Must be at least 8 characters."
              />
            </div>
          </Section>
        </>
      )}

      {/* ── With tooltip ── */}
      {isFeatureEnabled(config, "tooltip") && (
        <>
          <h2 className="text-balance">With tooltip</h2>
          <p className="text-balance">Use the <code>tooltip</code> prop to show a help tooltip on the trailing icon.</p>
          <Section label="Tooltip">
            <div className="max-w-sm flex-1">
              <Input
                label="Company name"
                placeholder="Acme Inc."
                tooltip="This will appear on your invoice and receipts."
              />
            </div>
          </Section>
        </>
      )}

      {/* ── With shortcut ── */}
      {isFeatureEnabled(config, "shortcut") && (
        <>
          <h2 className="text-balance">With shortcut</h2>
          <p className="text-balance">Use the <code>shortcut</code> prop to display a keyboard shortcut hint inside the field.</p>
          <Section label="Shortcut">
            <div className="max-w-sm flex-1">
              <Input
                label="API key"
                placeholder="sk-..."
                shortcut="⌘K"
              />
            </div>
          </Section>
        </>
      )}

      {/* ── Sizes ── */}
      {sizes.length > 0 && (
        <>
          <h2 className="text-balance">Sizes</h2>
          <p className="text-balance">Size affects padding, font-size, and icon sizing.</p>
          <Section label={sizes.map((s) => s.label).join(" / ")}>
            <div className="flex max-w-sm flex-1 flex-col gap-5">
              {sizes.map((s) => (
                <Input key={s.key} size={s.key as "sm" | "md" | "lg"} label={s.label} placeholder="Placeholder" hint={`size='${s.key}'`} />
              ))}
            </div>
          </Section>
        </>
      )}

      {/* ── Input Group ── */}
      {isFeatureEnabled(config, "group") && (
        <>
          <h2 className="text-balance">Input group</h2>
          <p className="text-balance">Attach prefix text or addon elements (dropdowns, buttons) to create compound inputs.</p>
          <Section label="Prefix / leading addon">
            <div className="flex max-w-sm flex-1 flex-col gap-5">
              <InputGroup label="Website" hint="Include the full URL." prefix="https://">
                <InputBase placeholder="www.example.com" />
              </InputGroup>
              <InputGroup
                label="Company"
                leadingAddon={
                  <InputGroup.Prefix position="leading">
                    <span className="text-sm text-tertiary">@</span>
                  </InputGroup.Prefix>
                }
              >
                <InputBase placeholder="acme" />
              </InputGroup>
            </div>
          </Section>
        </>
      )}

      {/* ── Date input ── */}
      {isFeatureEnabled(config, "date") && (
        <>
          <h2 className="text-balance">Date input</h2>
          <p className="text-balance">A segmented date field - each part (day/month/year) is independently focusable and typeable, built on React Aria&apos;s <code>DateField</code>.</p>
          <Section label="Date field">
            <div className="max-w-sm flex-1">
              <InputDate label="Date of birth" hint="DD / MM / YYYY" />
            </div>
          </Section>
        </>
      )}

      {/* ── Number input ── */}
      {isFeatureEnabled(config, "number") && (
        <>
          <h2 className="text-balance">Number input</h2>
          <p className="text-balance">Increment/decrement controls in two layouts: stacked <code>vertical</code> (default) or split <code>horizontal</code>.</p>
          <Section label="Vertical / horizontal">
            <div className="flex max-w-sm flex-1 flex-col gap-5">
              <InputNumber label="Quantity" defaultValue={1} minValue={0} hint="orientation='vertical' - default" />
              <InputNumber label="Seats" defaultValue={4} minValue={0} orientation="horizontal" hint="orientation='horizontal'" />
            </div>
          </Section>
        </>
      )}

      {/* ── Payment input ── */}
      {isFeatureEnabled(config, "payment") && (
        <>
          <h2 className="text-balance">Payment input</h2>
          <p className="text-balance">Auto-formats digits into groups of four and swaps the leading icon to match the detected card network (Visa, Mastercard, Amex, Discover, UnionPay).</p>
          <Section label="Card number">
            <div className="max-w-sm flex-1">
              <PaymentInput label="Card number" placeholder="1234 1234 1234 1234" defaultValue="4242424242424242" hint="We accept all major cards." />
            </div>
          </Section>
        </>
      )}

      {/* ── Tag input ── */}
      {isFeatureEnabled(config, "tags") && (
        <>
          <h2 className="text-balance">Tag input</h2>
          <p className="text-balance">Type and press <code>Enter</code> to add a tag; <code>Backspace</code> on an empty field to focus the last tag. Two layouts: tags inline with the field, or in a separate row beneath it.</p>
          <Section label="Inline / outer">
            <div className="flex max-w-sm flex-1 flex-col gap-5">
              <InputTags label="Skills (inline)" defaultValue={["Design", "Engineering"]} placeholder="Add a skill…" hint="Press Enter to add." />
              <InputTagsOuter label="Skills (outer)" defaultValue={["Design", "Engineering"]} placeholder="Add a skill…" hint="Press Enter to add." />
            </div>
          </Section>
        </>
      )}

      {/* ── File upload ── */}
      {isFeatureEnabled(config, "fileUpload") && (
        <>
          <h2 className="text-balance">File upload</h2>
          <p className="text-balance">Combines an <code>InputGroup</code> read-only field with a trailing <code>Upload</code> button that opens the native file picker.</p>
          <Section label="File picker">
            <div className="max-w-sm flex-1">
              <InputFile label="Resume" hint="PDF, DOC up to 10MB." acceptedFileTypes={[".pdf", ".doc", ".docx"]} />
            </div>
          </Section>
        </>
      )}

      {/* ── PIN input ── */}
      {isFeatureEnabled(config, "pin") && (
        <>
          <h2 className="text-balance">PIN input</h2>
          <p className="text-balance">One-time-passcode style entry - each digit is its own slot, auto-advancing focus as the user types.</p>
          <Section label="4-digit code">
            <PinInput size="xs">
              <PinInput.Label>Verification code</PinInput.Label>
              <PinInput.Group maxLength={4}>
                <PinInput.Slot index={0} />
                <PinInput.Slot index={1} />
                <PinInput.Slot index={2} />
                <PinInput.Slot index={3} />
              </PinInput.Group>
              <PinInput.Description>Enter the 4-digit code sent to your phone.</PinInput.Description>
            </PinInput>
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

      {/* ── Token anatomy ── */}
      <h2 className="text-balance">Token anatomy</h2>
      <p className="text-balance">The visual decisions Untitled UI encodes into the input. All values come from DEW tokens in <code>globals.css</code>.</p>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>State</th>
            <th>Ring token</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {[
            { state: "Default", ring: "ring-primary", value: "gray-300 (#D2D0CE)" },
            { state: "Focused", ring: "ring-brand", value: "brand-500 (#2A667C)" },
            { state: "Error",   ring: "ring-error_subtle", value: "error-300 (#FDA29B)" },
            { state: "Error + focused", ring: "ring-error", value: "error-500 (#F04438)" },
            { state: "Disabled", ring: "ring-primary + opacity-50", value: "same, dimmed" },
          ].map((r) => (
            <tr key={r.state}>
              <td className="text-secondary">{r.state}</td>
              <td><code>{r.ring}</code></td>
              <td><code>{r.value}</code></td>
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
{`import { Input } from "@/components/base/input/input";

<Input
  label="Email address"
  placeholder="olivia@untitledui.com"
  hint="This is a hint text to help user."
/>`}
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
