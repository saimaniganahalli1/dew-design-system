"use client";

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
import { Mail01, Lock01, SearchMd } from "@untitledui/icons";
import { enabledVariants, isFeatureEnabled } from "@/config/design-system.config";
import { useConfig } from "@/lib/config-context";

const props = [
  { name: "label",                type: "string",               default: "—" },
  { name: "hint",                 type: "ReactNode",            default: "—" },
  { name: "placeholder",         type: "string",               default: "—" },
  { name: "size",                 type: '"sm" | "md" | "lg"',  default: '"md"' },
  { name: "icon",                 type: "ComponentType",        default: "—" },
  { name: "tooltip",              type: "string",               default: "—" },
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

  return (
    <div className="prose-doc">
      <PageHeader
        section="Components"
        title="Input"
        description="Single-line text field built on React Aria for full accessibility. Sizes and demo sections are driven from config/design-system.config.ts."
      />

      {/* ── Default ── */}
      <h2>Default</h2>
      <p>Label, placeholder, and hint text — the anatomy of a complete input field.</p>
      <div className="mt-4 p-8 rounded-xl max-w-sm"
        style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
      >
        <Input
          label="Email address"
          placeholder="olivia@untitledui.com"
          hint="This is a hint text to help user."
        />
      </div>

      {/* ── States ── */}
      {isFeatureEnabled(config, "states") && (
        <>
          <h2>States</h2>
          <p>All states: default, focused (click into it), disabled, error with hint text, and required.</p>
          <div className="mt-4 p-8 rounded-xl flex flex-col gap-5 max-w-sm"
            style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
          >
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
        </>
      )}

      {/* ── With icons ── */}
      {isFeatureEnabled(config, "icons") && (
        <>
          <h2>With icons</h2>
          <p>Pass any <code>@untitledui/icons</code> component as the <code>icon</code> prop to add a leading icon.</p>
          <div className="mt-4 p-8 rounded-xl flex flex-col gap-5 max-w-sm"
            style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
          >
            <Input label="Email" placeholder="you@example.com" icon={Mail01} />
            <Input label="Search" placeholder="Search..." icon={SearchMd} />
            <Input label="Password" placeholder="Enter password" type="password" icon={Lock01} />
          </div>
        </>
      )}

      {/* ── Password ── */}
      {isFeatureEnabled(config, "password") && (
        <>
          <h2>Password</h2>
          <p>Pass <code>type=&quot;password&quot;</code> and a built-in show/hide toggle appears automatically — no extra prop needed.</p>
          <div className="mt-4 p-8 rounded-xl flex flex-col gap-5 max-w-sm"
            style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
          >
            <Input
              label="Password"
              type="password"
              icon={Lock01}
              placeholder="Enter password"
              hint="Must be at least 8 characters."
            />
          </div>
        </>
      )}

      {/* ── With tooltip / shortcut ── */}
      {(isFeatureEnabled(config, "tooltip") || isFeatureEnabled(config, "shortcut")) && (
        <>
          <h2>With tooltip</h2>
          <p>Use the <code>tooltip</code> prop to show a help tooltip on the trailing icon.</p>
          <div className="mt-4 p-8 rounded-xl flex flex-col gap-5 max-w-sm"
            style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
          >
            {isFeatureEnabled(config, "tooltip") && (
              <Input
                label="Company name"
                placeholder="Acme Inc."
                tooltip="This will appear on your invoice and receipts."
              />
            )}
            {isFeatureEnabled(config, "shortcut") && (
              <Input
                label="API key"
                placeholder="sk-..."
                shortcut="⌘K"
              />
            )}
          </div>
        </>
      )}

      {/* ── Sizes ── */}
      {sizes.length > 0 && (
        <>
          <h2>Sizes</h2>
          <p>Size affects padding, font-size, and icon sizing.</p>
          <div className="mt-4 p-8 rounded-xl flex flex-col gap-5 max-w-sm"
            style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
          >
            {sizes.map((s) => (
              <Input key={s.key} size={s.key as "sm" | "md" | "lg"} label={s.label} placeholder="Placeholder" hint={`size='${s.key}'`} />
            ))}
          </div>
        </>
      )}

      {/* ── Input Group ── */}
      {isFeatureEnabled(config, "group") && (
        <>
          <h2>Input group</h2>
          <p>Attach prefix text or addon elements (dropdowns, buttons) to create compound inputs.</p>
          <div className="mt-4 p-8 rounded-xl flex flex-col gap-5 max-w-sm"
            style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
          >
            <InputGroup label="Website" hint="Include the full URL." prefix="https://">
              <InputBase placeholder="www.example.com" />
            </InputGroup>
            <InputGroup
              label="Company"
              leadingAddon={
                <InputGroup.Prefix position="leading">
                  <span style={{ color: "var(--ui-text-tertiary)", fontSize: 14 }}>@</span>
                </InputGroup.Prefix>
              }
            >
              <InputBase placeholder="acme" />
            </InputGroup>
          </div>
        </>
      )}

      {/* ── Date input ── */}
      {isFeatureEnabled(config, "date") && (
        <>
          <h2>Date input</h2>
          <p>A segmented date field — each part (day/month/year) is independently focusable and typeable, built on React Aria&apos;s <code>DateField</code>.</p>
          <div className="mt-4 p-8 rounded-xl flex flex-col gap-5 max-w-sm"
            style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
          >
            <InputDate label="Date of birth" hint="DD / MM / YYYY" />
          </div>
        </>
      )}

      {/* ── Number input ── */}
      {isFeatureEnabled(config, "number") && (
        <>
          <h2>Number input</h2>
          <p>Increment/decrement controls in two layouts: stacked <code>vertical</code> (default) or split <code>horizontal</code>.</p>
          <div className="mt-4 p-8 rounded-xl flex flex-col gap-5 max-w-sm"
            style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
          >
            <InputNumber label="Quantity" defaultValue={1} minValue={0} hint="orientation='vertical' — default" />
            <InputNumber label="Seats" defaultValue={4} minValue={0} orientation="horizontal" hint="orientation='horizontal'" />
          </div>
        </>
      )}

      {/* ── Payment input ── */}
      {isFeatureEnabled(config, "payment") && (
        <>
          <h2>Payment input</h2>
          <p>Auto-formats digits into groups of four and swaps the leading icon to match the detected card network (Visa, Mastercard, Amex, Discover, UnionPay).</p>
          <div className="mt-4 p-8 rounded-xl flex flex-col gap-5 max-w-sm"
            style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
          >
            <PaymentInput label="Card number" placeholder="1234 1234 1234 1234" defaultValue="4242424242424242" hint="We accept all major cards." />
          </div>
        </>
      )}

      {/* ── Tag input ── */}
      {isFeatureEnabled(config, "tags") && (
        <>
          <h2>Tag input</h2>
          <p>Type and press <code>Enter</code> to add a tag; <code>Backspace</code> on an empty field to focus the last tag. Two layouts: tags inline with the field, or in a separate row beneath it.</p>
          <div className="mt-4 p-8 rounded-xl flex flex-col gap-5 max-w-sm"
            style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
          >
            <InputTags label="Skills (inline)" defaultValue={["Design", "Engineering"]} placeholder="Add a skill…" hint="Press Enter to add." />
            <InputTagsOuter label="Skills (outer)" defaultValue={["Design", "Engineering"]} placeholder="Add a skill…" hint="Press Enter to add." />
          </div>
        </>
      )}

      {/* ── File upload ── */}
      {isFeatureEnabled(config, "fileUpload") && (
        <>
          <h2>File upload</h2>
          <p>Combines an <code>InputGroup</code> read-only field with a trailing <code>Upload</code> button that opens the native file picker.</p>
          <div className="mt-4 p-8 rounded-xl flex flex-col gap-5 max-w-sm"
            style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
          >
            <InputFile label="Resume" hint="PDF, DOC up to 10MB." acceptedFileTypes={[".pdf", ".doc", ".docx"]} />
          </div>
        </>
      )}

      {/* ── PIN input ── */}
      {isFeatureEnabled(config, "pin") && (
        <>
          <h2>PIN input</h2>
          <p>One-time-passcode style entry — each digit is its own slot, auto-advancing focus as the user types.</p>
          <div className="mt-4 p-8 rounded-xl flex flex-col gap-5"
            style={{ border: "1px solid var(--color-gray-200)", background: "var(--color-gray-50)" }}
          >
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
          </div>
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
      <p>The visual decisions Untitled UI encodes into the input. All values come from DEW tokens in <code>globals.css</code>.</p>
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
            { state: "Default", ring: "ring-primary", value: "gray-300 (#D0D5DD)" },
            { state: "Focused", ring: "ring-brand", value: "brand-300 (#84ADFF)" },
            { state: "Error",   ring: "ring-error_subtle", value: "error-200 (#FECDCA)" },
            { state: "Error + focused", ring: "ring-error", value: "error-300 (#FDA29B)" },
            { state: "Disabled", ring: "ring-primary + opacity-50", value: "same, dimmed" },
          ].map((r) => (
            <tr key={r.state}>
              <td style={{ color: "var(--ui-text-secondary)" }}>{r.state}</td>
              <td><code>{r.ring}</code></td>
              <td><code>{r.value}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
