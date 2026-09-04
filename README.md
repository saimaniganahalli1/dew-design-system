# Dew Design System

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Requires Node.js 20+.

Clone the repo and install dependencies:

```bash
git clone https://github.com/saimaniganahalli1/dew-design-system.git
cd dew-design-system
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the home page by modifying `app/(docs)/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Design system

The docs site (`app/(docs)`) is organized into three sections: **primitives** (design tokens), **components** (UI building blocks), and **patterns** (composed page-level recipes). The list below is generated from `lib/nav.ts`, the single source of truth for site navigation - update that file when adding, removing, or renaming a page and this list will stay accurate.

### Primitives

| Primitive | Description |
| --- | --- |
| [Colours](/primitives/colours) | 12-step colour scale - Gray, Brand, Error, Warning, Success - plus semantic bg/text/ring tokens. |
| [Typography](/primitives/typography) | Type scale, font weights, and the Barlow display/text system. |
| [Spacing](/primitives/spacing) | 4px base grid from 0 to 128px. |
| [Border radius](/primitives/border-radius) | 10-step radius scale from sharp to fully rounded. |
| [Shadows](/primitives/shadows) | Seven elevation levels for cards, dropdowns, and modals. |
| [Icons](/primitives/icons) | All 1,179 Untitled UI icons, searchable, with size and stroke-weight guidance. |
| [Motion](/primitives/motion) | Duration and easing tokens for consistent, purposeful animation. |

### Components

| Component | Description |
| --- | --- |
| [Alert](/components/alert) | Dismissible banner - floating and full-width layouts, 6 colours, composed from Button/CloseButton/FeaturedIcon. |
| [Avatar](/components/avatar) | User representation - sizes, colour variants, and avatar groups. |
| [Badge](/components/badge) | Status labels - 3 types, 12 colours, dot/icon/dismiss variants. |
| [Button](/components/button) | Primary action trigger - 8 colour variants, 5 sizes, icon and loading states. |
| [Checkbox](/components/checkbox) | Binary selection control with an indeterminate state and two sizes. |
| [Input](/components/input) | Text field plus specialised variants - password, date, number, payment, tags, file upload, PIN. |
| [Modal](/components/modal) | 🚧 Documentation coming soon. |
| [Radio buttons](/components/radio-buttons) | Single-choice selection within a group - optional hint text, horizontal/vertical orientation, two sizes. |
| [Radio groups](/components/radio-groups) | Card-style single-choice selection - icon, avatar, payment, radio, and checkbox layouts, two sizes. |
| [Select](/components/select) | Dropdown selection - single select, searchable combobox, multi-select, tag select, and native select, in three sizes. |
| [Toast](/components/toast) | Transient corner notification powered by sonner - 6 colours, optional action, composed from Button/CloseButton/FeaturedIcon. |
| [Toggle](/components/toggle) | Binary switch control with an optional label/hint and a slim track variant, in two sizes. |
| [Tooltip](/components/tooltip) | Hover/focus overlay for supplementary context - 4 placements, description, arrow, delay. |

### Patterns

| Pattern | Description |
| --- | --- |
| [Forms](/patterns/forms) | 🚧 Documentation coming soon. |
| [Navigation](/patterns/navigation) | 🚧 Documentation coming soon. |
| [Empty states](/patterns/empty-states) | 🚧 Documentation coming soon. |
| [Loading states](/patterns/loading-states) | 🚧 Documentation coming soon. |
| [Feedback](/patterns/feedback) | 🚧 Documentation coming soon. |

Individual components/pages can be toggled on or off in the sidebar via `/config`, backed by `config/design-system.config.ts`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
