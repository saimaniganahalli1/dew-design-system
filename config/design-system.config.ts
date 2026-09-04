/**
 * DEW Design System - component/variant configuration.
 *
 * This is the single source of truth for which components and which
 * variants of each component appear in the documentation site. Doc pages
 * read from here instead of hardcoding their own colour/size/type lists,
 * so adding, hiding, or reordering a variant is a data change - not a
 * JSX change.
 *
 * To hide a whole component from the sidebar/overview: set `enabled: false`.
 * To hide one colour/size/type: set that option's `enabled: false`.
 * To hide a whole demo section (e.g. "With icon"): set the matching
 * `features` flag to `false`.
 */

/** A single selectable variant - a colour, size, or type - shown in the docs. */
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
  /** Whole documentation sections - e.g. "With icon", "States", "As link". Defaults to visible if unset. */
  features?: Record<string, boolean>;
}

export type DesignSystemConfig = Record<string, ComponentConfig>;

export const designSystemConfig: DesignSystemConfig = {
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
      playground: true,
      withDismiss: true,
      withConfirm: true,
      linkActions: true,
      usage: true,
      figma: true,
    },
  },

  avatar: {
    title: "Avatar",
    enabled: true,
    sizes: [
      { key: "xs",  label: "Extra small", enabled: true },
      { key: "sm",  label: "Small",       enabled: true },
      { key: "md",  label: "Medium",      enabled: true },
      { key: "lg",  label: "Large",       enabled: true },
      { key: "xl",  label: "Extra large", enabled: true },
      { key: "2xl", label: "2X large",    enabled: true },
    ],
    features: {
      playground: true,
      fallback: true,
      border: true,
      status: true,
      verified: true,
      count: true,
      companyIcon: true,
      addButton: true,
      labelGroup: true,
      profilePhoto: true,
      group: true,
      usage: true,
      figma: true,
    },
  },

  badge: {
    title: "Badge",
    enabled: true,
    // Figma's "Badge" component set (node 19066:23221) defines "Pill color" and "Badge
    // Color" across five colours (Brand/Warning/Success/Error/Gray), with dot variants for
    // filled, backgroundless pill, and square badge-colour styles. The component's broader
    // Untitled UI values still work in badges.tsx/badge-types.ts; only the Figma-documented
    // subset is demonstrated here.
    types: [
      { key: "pill-color", label: "Pill colour", enabled: true },
      { key: "color",      label: "Badge colour", enabled: true },
    ],
    colors: [
      { key: "gray",    label: "Gray",    enabled: true },
      { key: "brand",   label: "Brand",   enabled: true },
      { key: "error",   label: "Error",   enabled: true },
      { key: "warning", label: "Warning", enabled: true },
      { key: "success", label: "Success", enabled: true },
    ],
    sizes: [
      { key: "sm", label: "Small",  enabled: true },
      { key: "md", label: "Medium", enabled: true },
      { key: "lg", label: "Large",  enabled: true },
    ],
    features: {
      playground: true,
      withDot: true,
      withIcon: true,
      iconOnly: true,
      withButton: true,
      group: true,
      usage: true,
      figma: true,
    },
  },

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
    // Figma's "Buttons/Button" documentation frame (node 101:20844) only defines sm/md/lg/xl -
    // no "xs" symbol anywhere in it, across any hierarchy or state. "xs" exists in the
    // component's real type signature (Untitled UI ships it, and it still works if you pass it -
    // see the API table) but isn't a documented Figma variant, so it isn't demonstrated here.
    // Same precedent as Select's "lg" (see that entry below).
    sizes: [
      { key: "sm", label: "Small",       enabled: true },
      { key: "md", label: "Medium",      enabled: true },
      { key: "lg", label: "Large",       enabled: true },
      { key: "xl", label: "Extra large", enabled: true },
    ],
    features: {
      playground: true,
      iconLeading: true,
      iconTrailing: true,
      iconBoth: true,
      iconOnly: true,
      disabled: true,
      loading: true,
      loadingWithText: true,
      asLink: true,
      usage: true,
      figma: true,
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
      playground: true,
      states: true,
      disabled: true,
      withLabel: true,
      withHint: true,
      group: true,
      usage: true,
      figma: true,
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
      playground: true,
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
      usage: true,
      figma: true,
    },
  },

  "radio-buttons": {
    title: "Radio buttons",
    enabled: true,
    sizes: [
      { key: "sm", label: "Small",  enabled: true },
      { key: "md", label: "Medium", enabled: true },
    ],
    features: {
      playground: true,
      withHint: true,
      disabled: true,
      orientation: true,
      group: true,
      usage: true,
      figma: true,
    },
  },

  "radio-groups": {
    title: "Radio groups",
    enabled: true,
    // Six card-style selection layouts, each wrapping a real DEW control (CheckboxBase,
    // RadioButtonBase, Avatar, FeaturedIcon) inside a react-aria RadioGroup/Radio pair.
    types: [
      { key: "icon-simple",  label: "Icon simple",  enabled: true },
      { key: "icon-card",    label: "Icon card",    enabled: true },
      { key: "avatar",       label: "Avatar",       enabled: true },
      { key: "payment-icon", label: "Payment icon", enabled: true },
      { key: "radio-button", label: "Radio button", enabled: true },
      { key: "checkbox",     label: "Checkbox",     enabled: true },
    ],
    sizes: [
      { key: "sm", label: "Small",  enabled: true },
      { key: "md", label: "Medium", enabled: true },
    ],
    features: {
      playground: true,
      disabled: true,
      usage: true,
      figma: true,
    },
  },

  select: {
    title: "Select",
    enabled: true,
    // Figma's "Select" documentation frame (node 65:1317) only defines sm/md for
    // the base Select/ComboBox/TagSelect - "lg" exists in the component's type
    // signature (Untitled UI ships it) but isn't a documented Figma variant, so
    // it's not demonstrated here. MultiSelect is a separate Figma component that
    // does define lg - see its own demo below, which doesn't use this sizes list.
    sizes: [
      { key: "sm", label: "Small",  enabled: true },
      { key: "md", label: "Medium", enabled: true },
    ],
    features: {
      playground: true,
      withIcon: true,
      withAvatar: true,
      supportingText: true,
      disabled: true,
      comboBox: true,
      multiSelect: true,
      tagSelect: true,
      nativeSelect: true,
      usage: true,
      figma: true,
    },
  },

  toast: {
    title: "Toast",
    enabled: true,
    colors: [
      { key: "default", label: "Default", enabled: true },
      { key: "brand",   label: "Brand",   enabled: true },
      { key: "gray",    label: "Gray",    enabled: true },
      { key: "error",   label: "Error",   enabled: true },
      { key: "warning", label: "Warning", enabled: true },
      { key: "success", label: "Success", enabled: true },
    ],
    features: {
      playground: true,
      withDescription: true,
      withAction: true,
      dismiss: true,
      usage: true,
      figma: true,
    },
  },

  toggle: {
    title: "Toggle",
    enabled: true,
    sizes: [
      { key: "sm", label: "Small",  enabled: true },
      { key: "md", label: "Medium", enabled: true },
    ],
    features: {
      playground: true,
      slim: true,
      withLabel: true,
      withHint: true,
      disabled: true,
      group: true,
      usage: true,
      figma: true,
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
      playground: true,
      description: true,
      arrow: true,
      delay: true,
      disabled: true,
      usage: true,
      figma: true,
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
