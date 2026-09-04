"use client";

/**
 * Scaffold-native controls - documentation UI, not DEW.
 *
 * These exist for manipulating a live demo (e.g. the Component Playground's
 * "Controls" panel, the Contextual config panel's show/hide toggles) and
 * intentionally do not import from components/base/**. Per CONTEXT.md's
 * "DEW vs. Scaffold" rule: Scaffold may inherit DEW's `--ui-*` tokens (see
 * the utility classes below) but must never be built from real DEW component
 * instances - documentation tooling is not "used to build and design
 * screens," the same way Storybook's own Controls addon is never assembled
 * from the library it's hosting.
 *
 * Text stays Geist (the doc site's body font) by not setting any font class -
 * never add font-barlow here.
 */

import type { ComponentType, ReactNode } from "react";
import { Check, ChevronDown, ChevronUp } from "@untitledui/icons";

export function ScaffoldLabel({ children }: { children: ReactNode }) {
  return <p className="text-sm font-medium text-secondary">{children}</p>;
}

export function ScaffoldButton({
  onClick,
  disabled,
  iconLeading: IconLeading,
  children,
  className = "",
}: {
  onClick?: () => void;
  disabled?: boolean;
  iconLeading?: ComponentType<{ className?: string }>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-secondary bg-primary px-3 py-2 text-sm font-medium text-secondary shadow-xs transition-colors active:scale-[0.98] hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {IconLeading && <IconLeading className="size-4" />}
      {children}
    </button>
  );
}

export function ScaffoldTextInput({
  label,
  value,
  onChange,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <ScaffoldLabel>{label}</ScaffoldLabel>
      <input
        type="text"
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-secondary bg-primary px-3 py-2 text-sm text-primary outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-focus-ring"
      />
    </div>
  );
}

export function ScaffoldNumberInput({
  label,
  value,
  onChange,
  min = 0,
  max = 99,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  return (
    <div className="flex flex-col gap-1.5">
      <ScaffoldLabel>{label}</ScaffoldLabel>
      <div className="flex items-stretch rounded-lg border border-secondary bg-primary">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(clamp(Number(e.target.value) || 0))}
          className="w-full rounded-l-lg bg-transparent px-3 py-2 text-sm text-primary outline-none [appearance:textfield] focus-visible:ring-2 focus-visible:ring-focus-ring [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <div className="flex flex-col border-l border-secondary">
          <button
            type="button"
            aria-label="Increment"
            onClick={() => onChange(clamp(value + 1))}
            className="flex flex-1 items-center justify-center px-2 text-quaternary transition-colors hover:bg-secondary"
          >
            <ChevronUp className="size-3" />
          </button>
          <button
            type="button"
            aria-label="Decrement"
            onClick={() => onChange(clamp(value - 1))}
            className="flex flex-1 items-center justify-center border-t border-secondary px-2 text-quaternary transition-colors hover:bg-secondary"
          >
            <ChevronDown className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ScaffoldCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 text-sm font-medium text-secondary"
    >
      <span
        className={`flex size-4 shrink-0 items-center justify-center rounded ring-1 ring-inset transition-colors ${
          checked ? "bg-brand-solid ring-brand-solid" : "bg-primary ring-secondary"
        }`}
      >
        {checked && <Check className="size-3 text-white" strokeWidth={3} />}
      </span>
      {label}
    </button>
  );
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div role="group" className="inline-flex flex-wrap gap-0.5 rounded-lg bg-tertiary p-0.5">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          aria-pressed={value === o.key}
          onClick={() => onChange(o.key)}
          className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-150 ease-out active:scale-[0.96] ${
            value === o.key ? "bg-primary text-primary shadow-xs" : "text-quaternary"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
