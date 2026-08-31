import { isComponentEnabled as isComponentEnabledStatic } from "@/config/design-system.config";

export type NavItem = {
  title: string;
  href: string;
  /** One-line summary — shown to AI agents via /llms.txt. Keep it accurate; mark unbuilt pages as such. */
  description: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const rawNav: NavSection[] = [
  {
    title: "Primitives",
    items: [
      { title: "Colours", href: "/primitives/colours", description: "12-step colour scale — Gray, Brand, Error, Warning, Success — plus semantic bg/text/ring tokens." },
      { title: "Typography", href: "/primitives/typography", description: "Type scale, font weights, and the Barlow display/text system." },
      { title: "Spacing", href: "/primitives/spacing", description: "4px base grid from 0 to 128px." },
      { title: "Border radius", href: "/primitives/border-radius", description: "10-step radius scale from sharp to fully rounded." },
      { title: "Shadows", href: "/primitives/shadows", description: "Seven elevation levels for cards, dropdowns, and modals." },
      { title: "Icons", href: "/primitives/icons", description: "All 1,179 Untitled UI icons, searchable, with size and stroke-weight guidance." },
      { title: "Motion", href: "/primitives/motion", description: "Duration and easing tokens for consistent, purposeful animation." },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Avatar", href: "/components/avatar", description: "User representation — sizes, colour variants, and avatar groups." },
      { title: "Badge", href: "/components/badge", description: "Status labels — 3 types, 12 colours, dot/icon/dismiss variants." },
      { title: "Button", href: "/components/button", description: "Primary action trigger — 8 colour variants, 5 sizes, icon and loading states." },
      { title: "Checkbox", href: "/components/checkbox", description: "Binary selection control with an indeterminate state and two sizes." },
      { title: "Input", href: "/components/input", description: "Text field plus specialised variants — password, date, number, payment, tags, file upload, PIN." },
      { title: "Select", href: "/components/select", description: "Documentation coming soon." },
      { title: "Toggle", href: "/components/toggle", description: "Documentation coming soon." },
      { title: "Tooltip", href: "/components/tooltip", description: "Hover/focus overlay for supplementary context — 4 placements, description, arrow, delay." },
      { title: "Alert", href: "/components/alert", description: "Dismissible banner — floating and full-width layouts, 6 colours, composed from Button/CloseButton/FeaturedIcon." },
      { title: "Modal", href: "/components/modal", description: "Documentation coming soon." },
    ],
  },
  {
    title: "Patterns",
    items: [
      { title: "Forms", href: "/patterns/forms", description: "Documentation coming soon." },
      { title: "Navigation", href: "/patterns/navigation", description: "Documentation coming soon." },
      { title: "Empty states", href: "/patterns/empty-states", description: "Documentation coming soon." },
      { title: "Loading states", href: "/patterns/loading-states", description: "Documentation coming soon." },
      { title: "Feedback", href: "/patterns/feedback", description: "Documentation coming soon." },
    ],
  },
];

/** Slug used to look up a nav item's entry in `designSystemConfig`, e.g. "/components/button" → "button". */
export function slugFor(href: string): string {
  return href.split("/").pop() ?? "";
}

export function filterNav(sections: NavSection[], isEnabled: (slug: string) => boolean): NavSection[] {
  return sections.map((section) => ({
    ...section,
    items: section.items.filter((item) => isEnabled(slugFor(item.href))),
  }));
}

/**
 * Nav filtered through the checked-in static config. Safe to call from
 * server contexts (Route Handlers, RSC) that have no React render tree —
 * used by /llms.txt. Doc pages/Sidebar should use `useNav()` from
 * `lib/use-nav.ts` instead, which reflects live /config overrides too.
 */
export function staticNav(): NavSection[] {
  return filterNav(rawNav, isComponentEnabledStatic);
}
