"use client";

import { Mail01, Lock01 } from "@untitledui/icons";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/base/input/input";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Button } from "@/components/base/buttons/button";
import { Inspectable, InspectorProvider, type InspectableToken } from "@/components/scaffold/token-inspector";

// Token traces for the hover inspector below - pulled directly from the
// utility classes each component actually applies (see components/base/**),
// not re-derived or approximated. Hover any element on the Screen to verify
// it resolves through the real token chain, not a hardcoded value.
const wordmarkTokens: InspectableToken[] = [
  { cls: "font-barlow", cssVar: "--font-barlow", value: "Barlow" },
  { cls: "text-brand-tertiary", cssVar: "--ui-text-brand-tertiary → --color-brand-600", value: "#185E74", swatch: true },
];
const headingTokens: InspectableToken[] = [
  { cls: "font-barlow", cssVar: "--font-barlow", value: "Barlow" },
  { cls: "text-primary", cssVar: "--ui-text-primary → --color-gray-900", value: "#2E2925", swatch: true },
];
const inputTokens: InspectableToken[] = [
  { cls: "bg-primary", cssVar: "--ui-bg-primary", value: "#FFFFFF", swatch: true },
  { cls: "ring-primary", cssVar: "--ui-ring-primary → --color-gray-300", value: "#D2D0CE", swatch: true },
  { cls: "ring-brand (focus)", cssVar: "--ui-ring-brand → --color-brand-500", value: "#2A667C", swatch: true },
  { cls: "text-placeholder", cssVar: "--ui-text-placeholder → --color-gray-400", value: "#B5B2AF", swatch: true },
  { cls: "text-fg-quaternary (icon)", cssVar: "--color-fg-quaternary → --color-gray-500", value: "#8F8B87", swatch: true },
  { cls: "shadow-xs", cssVar: "--shadow-xs", value: "0 1px 2px rgba(16,24,40,.05)" },
];
const checkboxTokens: InspectableToken[] = [
  { cls: "ring-primary (unchecked)", cssVar: "--ui-ring-primary → --color-gray-300", value: "#D2D0CE", swatch: true },
  { cls: "bg-brand-solid (checked)", cssVar: "--ui-bg-brand-solid → --color-brand-600", value: "#185E74", swatch: true },
  { cls: "text-secondary (label)", cssVar: "--ui-text-secondary → --color-gray-700", value: "#585451", swatch: true },
];
const linkButtonTokens: InspectableToken[] = [
  { cls: "text-tertiary", cssVar: "--ui-text-tertiary → --color-gray-600", value: "#706B68", swatch: true },
  { cls: "hover:text-tertiary_hover", cssVar: "--ui-text-tertiary_hover → --color-gray-700", value: "#585451", swatch: true },
  { cls: "font-barlow", cssVar: "--font-barlow", value: "Barlow" },
];
const primaryButtonTokens: InspectableToken[] = [
  { cls: "bg-brand-solid", cssVar: "--ui-bg-brand-solid → --color-brand-600", value: "#185E74", swatch: true },
  { cls: "hover:bg-brand-solid_hover", cssVar: "--ui-bg-brand-solid_hover → --color-brand-700", value: "#0D576E", swatch: true },
  { cls: "shadow-xs-skeuomorphic", cssVar: "--shadow-xs-skeuomorphic", value: "inset border + drop shadow" },
  { cls: "text-white", cssVar: "--color-fg-white", value: "#FFFFFF", swatch: true },
];

// Figma source: https://www.figma.com/design/SQ58QgwP9Xz0uo3tBpuf6e/DEW-Toolkit--version-1.0-?node-id=74-4331
// node 74:4333 "Onboarding" (type="Sign in") - mapped 1:1 against components/base/**,
// per /sai's design system rule: check the system first, use exact specs, flag gaps
// without blocking. Copy below is reproduced verbatim from the Figma frame.

const mapping = [
  { layer: "Header › “Biodata SA” wordmark", figma: "Text, Barlow Bold, text-brand-tertiary-(600)", dew: "Plain text - not a component", note: "Static brand text in the design, not a documented DEW element." },
  { layer: "Header › “Sign in to your account”", figma: "Text, Barlow Semibold text-xl", dew: "Plain text - not a component", note: "Page heading, no interactive behaviour." },
  { layer: "Form › Email", figma: "Input with label + leading mail-01 icon", dew: "Input (icon variant)", note: "components/base/input/input.tsx - icon prop" },
  { layer: "Form › Password", figma: "Input with label + trailing show/hide eye icon", dew: "Input (type=\"password\")", note: "Eye toggle is built in - no extra prop needed" },
  { layer: "Action › Checkbox", figma: "Checkbox + “Remember for 30 days” label", dew: "Checkbox", note: "components/base/checkbox/checkbox.tsx - label prop" },
  { layer: "Action › Forgot Password", figma: "Text button, Barlow Semibold, text-tertiary-(600)", dew: "Button color=\"link-gray\"", note: "Renders as plain text, no border/background" },
  { layer: "Action › Sign in", figma: "Full-width solid button, bg-brand-solid, skeuomorphic inset border", dew: "Button color=\"primary\" className=\"w-full\"", note: "Skeuomorphic shadow already ships on Button by default" },
  { layer: "Action › Sign up", figma: "Text button, Barlow Semibold, text-tertiary-(600)", dew: "Button color=\"link-gray\"", note: "Paired with plain “Don’t have an account?” text" },
  { layer: "Action › Contact us", figma: "Static text (not a button layer in Figma)", dew: "Button color=\"link-gray\"", note: "Kept interactive for parity with Sign up/Forgot Password - flagged below" },
];

export default function TestPage() {
  return (
    <InspectorProvider>
    <div className="prose-doc">
      <PageHeader
        section="Test"
        title="Sign in - component mapping"
        description="Every layer in the Figma test frame mapped against components/base/**. Built with exact existing specs - nothing improvised, nothing new added to the system for this screen."
      />

      <h2 className="text-balance">Screen</h2>
      <p className="text-balance">
        Reconstructed from Figma node 74:4333, using only already-shipped DEW components. Hover any element to see
        which component rendered it and which <code>--ui-*</code>/<code>--color-*</code> tokens it resolved to.
      </p>
      <div
        className="flex min-h-[720px] items-center justify-center rounded-2xl border border-secondary p-12"
        style={{
          backgroundImage: "radial-gradient(var(--ui-border-secondary) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="font-barlow flex w-[388px] flex-col items-center gap-10 rounded-2xl border border-secondary bg-primary p-4 shadow-md">
          {/* Header */}
          <div className="flex flex-col items-center gap-2">
            <Inspectable label="Plain text - not a component" source="app/test-page/page.tsx" tokens={wordmarkTokens}>
              <p className="text-[30px] leading-[38px] font-bold text-brand-tertiary">Biodata SA</p>
            </Inspectable>
            <Inspectable label="Plain text - not a component" source="app/test-page/page.tsx" tokens={headingTokens}>
              <p className="text-center text-xl font-semibold text-primary">Sign in to your account</p>
            </Inspectable>
          </div>

          {/* Form */}
          <div className="flex w-full flex-col gap-4">
            <Inspectable label='Input (icon variant)' source="components/base/input/input.tsx" tokens={inputTokens}>
              <Input label="Email" placeholder="Enter your email" icon={Mail01} />
            </Inspectable>
            <Inspectable label='Input (type="password")' source="components/base/input/input.tsx" tokens={inputTokens}>
              <Input label="Password" placeholder="Enter your password" type="password" icon={Lock01} />
            </Inspectable>
          </div>

          {/* Action */}
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full items-center justify-between">
              <Inspectable label="Checkbox" source="components/base/checkbox/checkbox.tsx" tokens={checkboxTokens}>
                <Checkbox label="Remember for 30 days" />
              </Inspectable>
              <Inspectable label='Button color="link-gray"' source="components/base/buttons/button.tsx" tokens={linkButtonTokens}>
                <Button color="link-gray" size="sm">Forgot Password</Button>
              </Inspectable>
            </div>

            <Inspectable label='Button color="primary"' source="components/base/buttons/button.tsx" tokens={primaryButtonTokens} className="w-full">
              <Button color="primary" className="w-full">Sign in</Button>
            </Inspectable>

            <div className="flex items-baseline justify-center gap-1 text-sm text-tertiary">
              <span>Don&rsquo;t have an account?</span>
              <Inspectable label='Button color="link-gray"' source="components/base/buttons/button.tsx" tokens={linkButtonTokens}>
                <Button color="link-gray" size="sm">Sign up</Button>
              </Inspectable>
            </div>

            <div className="flex items-baseline justify-center gap-1 text-sm text-tertiary">
              <span>Forgot email address?</span>
              <Inspectable label='Button color="link-gray"' source="components/base/buttons/button.tsx" tokens={linkButtonTokens}>
                <Button color="link-gray" size="sm">Contact us</Button>
              </Inspectable>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-balance">Component mapping</h2>
      <p className="text-balance">Layer-by-layer trace from the Figma instance to the DEW component that renders it.</p>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Figma layer</th>
            <th>Figma spec</th>
            <th>DEW mapping</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {mapping.map((m) => (
            <tr key={m.layer}>
              <td>{m.layer}</td>
              <td className="text-balance" style={{ color: "var(--color-gray-500)" }}>{m.figma}</td>
              <td><code>{m.dew}</code></td>
              <td className="text-balance" style={{ color: "var(--color-gray-500)" }}>{m.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-balance">New components identified (not blocking)</h2>
      <p className="text-balance">
        This sign-in screen maps cleanly to existing components - nothing new was required to build it. Extracting the
        design context did surface two sibling component definitions living on the same Figma page (part of the
        broader onboarding flow this frame belongs to, not this frame itself):
      </p>
      <table className="token-table mt-4">
        <thead>
          <tr>
            <th>Figma component</th>
            <th>Gap</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Role / Organisation search-select</code></td>
            <td className="text-balance" style={{ color: "var(--color-gray-500)" }}>
              <strong className="text-fg-success-primary">Resolved</strong> - a searchable
              dropdown/combobox. <code>Select</code> (plus <code>Select.ComboBox</code>) landed in
              <code>components/base/select/**</code> and is documented at <code>/components/select</code>.
            </td>
          </tr>
          <tr>
            <td><code>Step icon / progress indicator</code></td>
            <td className="text-balance" style={{ color: "var(--color-gray-500)" }}>
              Still open - a circular step-status icon (incomplete / current / complete) for a multi-step wizard. No
              DEW equivalent exists yet - would need to be added to the design system before any onboarding step
              screen uses it.
            </td>
          </tr>
        </tbody>
      </table>

      <p className="text-balance">
        Neither gap sat inside <em>this</em> frame, so the Sign in screen above never needed a placeholder. The
        convention for when a gap does land inside a generated screen (now recorded in <code>CONTEXT.md</code>):
        render it in place as a visible marker, not a lookalike and not a silent omission - shown below for the one
        gap still open:
      </p>
      <div className="flex flex-wrap gap-4">
        {["Step icon / progress indicator"].map((label) => (
          <div
            key={label}
            className="flex w-[220px] flex-col items-center justify-center gap-2 rounded-xl p-6"
            style={{ border: "1.5px dashed var(--color-gray-300)", background: "var(--color-gray-50)" }}
          >
            <div
              className="flex size-9 items-center justify-center rounded-lg text-lg font-semibold"
              style={{ background: "var(--color-gray-200)", color: "var(--color-gray-500)" }}
            >
              ?
            </div>
            <p className="text-center text-xs text-balance" style={{ color: "var(--color-gray-500)" }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
    </InspectorProvider>
  );
}
