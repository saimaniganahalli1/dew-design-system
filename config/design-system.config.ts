/**
 * DEW Design System — component/variant configuration.
 *
 * This is the single source of truth for which components and which
 * variants of each component appear in the documentation site. Doc pages
 * read from here instead of hardcoding their own colour/size/type lists,
 * so adding, hiding, or reordering a variant is a data change — not a
 * JSX change.
 *
 * To hide a whole component from the sidebar/overview: set `enabled: false`.
 * To hide one colour/size/type: set that option's `enabled: false`.
 * To hide a whole demo section (e.g. "With icon"): set the matching
 * `features` flag to `false`.
 */

/** A single selectable variant — a colour, size, or type — shown in the docs. */
export interface VariantOption {
  /** The literal value passed to the component prop, e.g. "primary". */
  key: string;
  /** Human-readable label rendered in the docs, e.g. "Primary". */
  label: string;
  /** Uncheck to hide this variant from the design system site. */
  enabled: boolean;
  /** Optional grouping used to split a variant list into sub-sections (e.g. "standard" vs "destructive"). */
  group?: string;
}

/** Config for one documented component. */
export interface ComponentConfig {
  /** Display name shown on the /config settings page, e.g. "Button". */
  title: string;
  /** Uncheck to remove this component entirely from the sidebar, overview, and docs. */
  enabled: boolean;
  /** Colour variants (e.g. Button colours, Badge colours). */
  colors?: VariantOption[];
  /** Size variants. */
  sizes?: VariantOption[];
  /** Shape/type variants (e.g. Badge's pill-color / color / modern). */
  types?: VariantOption[];
  /** Whole documentation sections — e.g. "With icon", "States", "As link". Defaults to visible if unset. */
  features?: Record<string, boolean>;
}

export type DesignSystemConfig = Record<string, ComponentConfig>;

export const designSystemConfig: DesignSystemConfig = {
  button: {
    title: "Button",
    enabled: true,
    colors: [
      { key: "primary",              label: "Primary",   enabled: true, group: "standard" },
      { key: "secondary",            label: "Secondary", enabled: true, group: "standard" },
      { key: "tertiary",             label: "Tertiary",  enabled: true, group: "standard" },
      { key: "link-color",           label: "Link colour", enabled: true, group: "standard" },
      { key: "link-gray",            label: "Link grey",   enabled: true, group: "standard" },
      { key: "primary-destructive",   label: "Primary",   enabled: true, group: "destructive" },
      { key: "secondary-destructive", label: "Secondary", enabled: true, group: "destructive" },
      { key: "tertiary-destructive",  label: "Tertiary",  enabled: true, group: "destructive" },
      { key: "link-destructive",      label: "Link",      enabled: true, group: "destructive" },
    ],
    sizes: [
      { key: "xs", label: "Extra small", enabled: true },
      { key: "sm", label: "Small",       enabled: true },
      { key: "md", label: "Medium",      enabled: true },
      { key: "lg", label: "Large",       enabled: true },
      { key: "xl", label: "Extra large", enabled: true },
    ],
    features: {
      iconLeading: true,
      iconTrailing: true,
      iconBoth: true,
      iconOnly: true,
      disabled: true,
      loading: true,
      loadingWithText: true,
      asLink: true,
    },
  },

  badge: {
    title: "Badge",
    enabled: true,
    types: [
      { key: "pill-color", label: "Pill colour", enabled: true },
      { key: "color",      label: "Colour",      enabled: true },
      { key: "modern",     label: "Modern",      enabled: true },
    ],
    colors: [
      { key: "gray",    label: "Gray",    enabled: true },
      { key: "brand",   label: "Brand",   enabled: true },
      { key: "error",   label: "Error",   enabled: true },
      { key: "warning", label: "Warning", enabled: true },
      { key: "success", label: "Success", enabled: true },
      { key: "slate",   label: "Slate",   enabled: true },
      { key: "sky",     label: "Sky",     enabled: true },
      { key: "blue",    label: "Blue",    enabled: true },
      { key: "indigo",  label: "Indigo",  enabled: true },
      { key: "purple",  label: "Purple",  enabled: true },
      { key: "pink",    label: "Pink",    enabled: true },
      { key: "orange",  label: "Orange",  enabled: true },
    ],
    sizes: [
      { key: "sm", label: "Small",  enabled: true },
      { key: "md", label: "Medium", enabled: true },
      { key: "lg", label: "Large",  enabled: true },
    ],
    features: {
      withDot: true,
      withIcon: true,
      iconOnly: true,
      withButton: true,
      group: true,
    },
  },

  input: {
    title: "Input",
    enabled: true,
    sizes: [
      { key: "sm", label: "Small",  enabled: true },
      { key: "md", label: "Medium", enabled: true },
      { key: "lg", label: "Large",  enabled: true },
    ],
    features: {
      states: true,
      icons: true,
      tooltip: true,
      shortcut: true,
      group: true,
      password: true,
      date: true,
      number: true,
      payment: true,
      tags: true,
      fileUpload: true,
      pin: true,
    },
  },

  checkbox: {
    title: "Checkbox",
    enabled: true,
    sizes: [
      { key: "sm", label: "Small",  enabled: true },
      { key: "md", label: "Medium", enabled: true },
    ],
    features: {
      states: true,
      disabled: true,
      withLabel: true,
      withHint: true,
      group: true,
    },
  },

  tooltip: {
    title: "Tooltip",
    enabled: true,
    types: [
      { key: "top",    label: "Top",    enabled: true },
      { key: "right",  label: "Right",  enabled: true },
      { key: "bottom", label: "Bottom", enabled: true },
      { key: "left",   label: "Left",   enabled: true },
    ],
    features: {
      description: true,
      arrow: true,
      delay: true,
      disabled: true,
    },
  },

  alert: {
    title: "Alert",
    enabled: true,
    colors: [
      { key: "default", label: "Default", enabled: true },
      { key: "brand",   label: "Brand",   enabled: true },
      { key: "gray",    label: "Gray",    enabled: true },
      { key: "error",   label: "Error",   enabled: true },
      { key: "warning", label: "Warning", enabled: true },
      { key: "success", label: "Success", enabled: true },
    ],
    types: [
      { key: "floating",   label: "Floating",   enabled: true },
      { key: "full-width", label: "Full width", enabled: true },
    ],
    features: {
      withDismiss: true,
      withConfirm: true,
      linkActions: true,
    },
  },
};

/** Returns only the enabled variants from a list, preserving config order. */
export function enabledVariants(options?: VariantOption[]): VariantOption[] {
  return (options ?? []).filter((option) => option.enabled);
}

/** Returns whether a whole documentation section/feature is enabled. Defaults to `true` if unset. */
export function isFeatureEnabled(config: ComponentConfig | undefined, feature: string): boolean {
  return config?.features?.[feature] ?? true;
}

/** Returns whether a component should appear in the sidebar/overview at all. Defaults to `true` if unconfigured. */
export function isComponentEnabled(slug: string): boolean {
  return designSystemConfig[slug]?.enabled ?? true;
}
