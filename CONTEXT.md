# DEW Design System - working context

This file documents how components get added to this site and the
conventions that came out of building the first one (Avatar) end-to-end.
Read it before ingesting a new component or touching the doc-page template.

## Final check - non-negotiable contracts

Before calling any task finished (not just a new component ingest - any change to
`components/base/**`, a doc page, a token, or a `/test-*` screen), re-read the diff against this
list. These are contracts, not preferences - a task that violates one of these is not done, no
matter how complete it otherwise looks.

- **Sidebar/config slotting is alphabetical, always.** A new entry in `lib/nav.ts`'s `Components`
  array and a new top-level key in `config/design-system.config.ts` both get inserted in strict
  A-Z order by title/key - never appended at the end because that was faster. If either file is
  ever found out of order (including entries that predate this rule), fix the whole list while
  you're there, not just the new entry - a partially-sorted list is worse than an honestly
  unsorted one, because it looks intentional. (`Primitives` and `Patterns` in `lib/nav.ts` are
  deliberately *not* alphabetical - they follow a foundations-first narrative order - this rule is
  scoped to `Components` only.)
- **The DEW/Scaffold line holds.** No real component under `components/base/**` was patched to
  serve a doc-only or Scaffold-only need. See "DEW vs. Scaffold" below.
- **Figma is the source of truth wherever a frame exists.** No colour, spacing, or state was
  invented or left un-checked against Figma when a reference frame was available. See below.
- **Component-level changes flow through to every `/test-*` page that uses that component, same
  session.** A resolved `?` gap gets its placeholder swapped, its gap table updated, and its
  mapping table updated together. See "Generated screens" below.
- **No em-dashes** in this file or in any doc-page/component copy - hyphens only.
- **Geist stays Geist, Barlow stays Barlow** - Scaffold text never borrows `font-barlow` to match
  a DEW neighbour, and vice versa, except inside a generated screen where everything is Barlow.
- **No fabricated Figma links, no fabricated icons/assets, no invented props.** An honest "not
  linked yet" / `?` placeholder beats a plausible-looking fake every time.
- **The placeholder person is Olivia Wyatt** (plus Phoenix Baker / Lana Steiner for multi-person
  demos) - never the current user's real name or email.

If a check on this list fails, fix it before reporting the task done - don't note it as a loose
end and move on, unless it's a genuinely separate, larger piece of work (in which case say so
explicitly and log it under "Known gaps" below, the same way the gray-scale primitive audit and
the File Type Icon set were).

## Figma is the source of truth

When a Figma frame documents a component DEW has already ingested, Figma wins - full stop.
Apply every trim this section calls for directly, in the same pass as the audit - don't flag an
undocumented variant and wait for a decision, the same way a font-barlow regression or a wrong
token value gets fixed on sight, not logged as an open question. The entire point of a Figma
cross-check is narrow: confirm the shipped styling matches the brand guide. It is not licence to
add scope, invent variants, or judge whether an undocumented type/colour might be intentional -
if Figma doesn't show it, it doesn't get demonstrated, and that's the whole decision.
That means, whenever a Figma reference is available for a component:

- **Check every variant DEW demonstrates against what Figma actually defines** - sizes, types,
  states. If DEW shows a variant Figma doesn't document (e.g. a size that exists in the
  component's TS type because Untitled UI ships it, but was never given a Figma variant), don't
  demonstrate it in the Variants/Sizes sections - trim it to match. The API table is the one
  exception: it documents the real prop signature regardless of what's demoed, per "never invent
  or drop a prop" below.
- **Colours, spacing, and states documented in Figma override whatever's already in code.**
  Precedent: `Select`'s Figma documentation frame (node 65:1317) showed every field-style
  component's Focused state using a 2px `border-brand` (`#2A667C`, brand-500) - a strong,
  saturated ring - while DEW's shipped `ring-brand` token was brand-300 (a pale tint) on
  `Input`, `Select`, `ComboBox`, `MultiSelect`, `TagSelect`, and `PinInput` alike. Fixed by
  changing the semantic token (`--ui-ring-brand` and `--ui-ring-border-brand` in `globals.css`),
  not by patching each component - one token, every consumer corrected at once.
- **A missing Figma swatch for a state doesn't mean delete the state.** Figma has to draw
  Default/Hover/Focused/Open as separate static swatches because it's static; DEW's doc pages are
  live, so hovering/clicking/tabbing a real component already demonstrates every state - there's
  no need to build a matching static "Focused" section just because Figma has one. Only the
  sizes/types/props actually differ in kind between the two; states are just interaction, and
  interaction is free on a live page.
- **An implementation that can't be drawn in Figma (a real `<select>`, native OS-rendered UI)
  isn't automatically "not needed."** `NativeSelect` has no Figma swatch - browsers render
  `<select>` themselves, so there's nothing to mock - but it's still a real, CLI-ingested
  component serving a real technical need (native form behaviour, e.g. inside an `InputGroup`).
  Absence from a Figma page only means "trim this" when the thing itself is drawable and Figma
  chose not to draw it (a size, a type). Don't confuse "un-drawable" with "unwanted."

## DEW vs. Scaffold - the one rule

Every doc page mixes two different kinds of UI, and they must never be confused for each other.

**Mental model: Storybook.** Storybook has its own UI (sidebar, toolbar, the Controls addon
that lets you tweak a story's args) which is entirely Storybook's, styled Storybook's way,
regardless of which design system is being previewed inside the canvas. Storybook's Controls
addon is never assembled from the hosted library's own Button/Input/Checkbox - it's the host's
tooling, not the thing being hosted. In this repo: Scaffold is Storybook. DEW is whatever's
being previewed. A component is DEW only when it's the thing being demonstrated. The moment a
component is being used to operate a demo (a control, a toggle, a trigger button) it is
Scaffold, even if it looks like a form field and even if a real DEW equivalent of that field
exists elsewhere in the library.

- **DEW** - the real, installed product component library, `components/base/**`, pulled in via
  the Untitled UI CLI and styled entirely through the `--ui-*` semantic token layer in
  `app/globals.css`. This is what ships in an actual product, and it only counts as DEW when
  it's the subject being demonstrated. On the Avatar page, the only DEW element is `Avatar`
  itself (plus its own family: `AvatarLabelGroup`, `AvatarProfilePhoto`, `AvatarAddButton`,
  `AvatarCompanyIcon`) rendered live in the Playground's canvas and throughout the Variants
  sections below it.
- **Scaffold** - everything the doc site built for itself that is *not* the component being
  demonstrated, including things that reuse DEW's visual tokens or even resemble real DEW
  components: `PageHeader`, `Section`, `ContextualConfigPanel`, the Playground's canvas/card
  chrome, and every control in `components/scaffold/controls.tsx`
  (`ScaffoldButton`, `ScaffoldTextInput`, `ScaffoldNumberInput`, `ScaffoldCheckbox`,
  `SegmentedControl`, `ScaffoldLabel`). These exist either because a DEW primitive doesn't exist
  yet (no `Select`/`Toggle`, so `SegmentedControl` stands in) or because the doc site needs its
  own tooling that was never meant to ship in a product, even where a shipped DEW equivalent
  exists (the Playground's "Count" stepper is Scaffold, not the real `InputNumber`, even though
  `InputNumber` exists and would render fine there).

The rule, in one direction only:

- **Scaffold may inherit from DEW.** Reach for the same `--ui-*`-backed utility classes
  (`bg-primary`, `text-secondary`, `border-secondary`, `shadow-xs`, …) instead of inventing a
  parallel palette or falling back to raw inline `var(--color-*)` primitives. This is why
  `SegmentedControl` and the Playground chrome were rebuilt to use those classes - same token
  vocabulary as the real components sitting next to them.
- **Scaffold's design *style* stays independent of DEW's.** A `SegmentedControl` pill doesn't
  need to look like it belongs to any real product component - it only needs to be built from
  the same token vocabulary as one. Sharing tokens ≠ sharing visual identity.
- **DEW must never overlap with Scaffold, in the other direction, ever.** Never patch a real
  component under `components/base/**` to satisfy a doc-page-only need. If the Playground needs
  behaviour a real component doesn't have, that need gets solved in Scaffold code (the page
  itself, or a doc-chrome helper in `components/`) - never by adding doc-specific props,
  classNames, or variants to `Avatar`, `Checkbox`, etc.
- **Never build a Scaffold control from a real DEW component import, even when a matching one
  exists.** This was gotten wrong once: the Playground's Size/Initials/Status/Count/Border/
  Verified controls were originally built from the real `Checkbox`/`Input`/`InputNumber`, on
  the reasoning that reusing real components was good dogfooding. Per the Storybook model
  above, that was backwards, those controls operate a demo, they are not the demo, so they were
  rebuilt as `ScaffoldTextInput`/`ScaffoldNumberInput`/`ScaffoldCheckbox`. Likewise
  `ContextualConfigPanel`'s trigger button and its show/hide checkboxes were rebuilt from
  `ScaffoldButton`/`ScaffoldCheckbox`, not the real DEW `Button`/`Checkbox`.
- **The DEW/Scaffold line should always be answerable by one check: role, not import path.**
  Is this element the thing being demonstrated, or is it operating/wrapping the demonstration?
  The first is DEW, the second is Scaffold, regardless of whether a DEW component of the same
  shape exists. If that's ever ambiguous for a given element, that's a bug in how the page was
  built, not a grey area.
- **Scaffold labels are Geist. DEW components are Barlow. Full stop, no exceptions.** Because
  Scaffold controls in the Playground no longer import real DEW components (see above), the
  whole Playground reads in Geist end to end, canvas caption and controls alike, and the only
  Barlow on the page is the live `Avatar`/`AvatarLabelGroup`/`AvatarProfilePhoto`/
  `AvatarAddButton` instances rendered in the canvas and the Variants sections below. Their
  Scaffold `Section` labels (e.g. "ADD BUTTON") stay Geist right next to them. Never add
  `font-barlow` to a Scaffold label to match a DEW neighbour, never strip `font-barlow` from a
  real DEW component to match a Scaffold neighbour. Token colours are shared (Scaffold may
  inherit DEW's `--ui-*` palette, see above); typefaces are not. (Verified live:
  `getComputedStyle` on a `Section` label returns `Geist, ui-sans-serif, ...`; the DEW form
  components under `components/base/**`, e.g. `Input`, still bake in
  `Barlow, "Barlow Fallback", ...` wherever they're actually used to demonstrate themselves.)

## New component workflow

```
Ingest component props        Attach primitives        Check simple           Create component        Create
from Untitled UI          →   (styled)             →    or complex        →   playground          →   documentation
(unstyled)                                              (strict)
```

1. **Ingest** - install via the Untitled UI CLI (`npx untitledui-cli@latest add <component>` or
   equivalent). This drops raw, unstyled-in-our-system component files into `components/base/<name>/`.
2. **Attach primitives** - verify every class the installed component uses resolves through
   this repo's token chain: `--ui-*` semantic vars in `app/globals.css` → `--color-*` primitives.
   Grep the new files for hardcoded hex/rgba - there should be none. If a utility class
   (`bg-tertiary`, `text-fg-quaternary`, `ring-secondary_alt`, …) doesn't exist yet in
   `globals.css`, add it there rather than inlining a colour in the component.
3. **Check simple or complex**:
   - **Simple** - a single primitive, forms the basis for complex components, inherits
     tokens directly. Example: `Avatar`.
   - **Complex** - a combination of 2+ simple components (including primitives).
     Example: `AvatarLabelGroup` (Avatar + text), `AvatarProfilePhoto` (Avatar variant + status/verified badges).
   - This classification doesn't change how the component is documented, but it changes
     what the "Usage" snippet should show - a complex component's snippet should compose
     from the simple one, not duplicate its internals.
4. **Create component playground** - an interactive live instance at the top of the doc
   page. See "Playground pattern" below.
5. **Create documentation** - Variants (config-driven, see below), API table (pulled from
   the real prop interface, never invented), Usage snippet, Figma link. This is also what
   "forms basis for creating prototypes" refers to in the source workflow diagram - the
   playground + docs together are the reference a prototype gets built from.
6. **Slot it in, alphabetically.** Add the route folder, a `config/design-system.config.ts`
   entry, and a `lib/nav.ts` entry - each inserted in strict A-Z order among the existing
   `Components`, not appended at the end. See "Final check" above.

## Doc page template (established on `app/components/avatar/page.tsx`)

Every component page follows this order:

1. `PageHeader` (title, description, and a `Config` action button - see Contextual config below)
2. **Component Playground** - live instance + controls
3. **Variants** - one `<h2>` + `Section` per demonstrable prop/state, each gated by
   `isFeatureEnabled(config, "<key>")` so it can be hidden from `config/design-system.config.ts`
   or the live `/config` page
4. **API** - props table sourced directly from the component's TS interface. Never invent a
   prop or drop one because it's inconvenient to demo - see "Known gaps" below for what to do
   when a documented prop doesn't actually do anything.
5. **Usage** - a real import + minimal JSX snippet
6. **Figma** - link if one exists, otherwise an honest placeholder (most components installed
   via the CLI don't have one yet - don't fabricate a link)

`Sizes` and `API` are always visible (foundational reference, not optional). Everything else
is a "section" and gets a `features` key.

### Config-driven variants

Doc pages never hardcode which colours/sizes/types/sections appear - they read from
`config/design-system.config.ts` via `enabledVariants()` / `isFeatureEnabled()`, and that config
is live-editable through `useConfig()` (`lib/config-context.tsx`), persisted to `localStorage`.
Adding a new demo section to a page means adding a `features` key in the config first, then
gating the JSX with `isFeatureEnabled(config, "thatKey")` - not the other way round.

### Contextual config panel

Each component page also exposes a per-page "show/hide sections" panel (`components/ContextualConfigPanel.tsx`),
triggered by the `Config` button in the page header (`PageHeader`'s `actions` slot). It lists
every `features` key for that component slug and toggles it through the same `setFeatureEnabled`
used by the global `/config` page - it's a scoped shortcut, not a separate state model. This means:
**every `features` key doubles as a panel toggle automatically** - name the key to match the
section's heading (e.g. `companyIcon` → "Company icon") so the panel reads sensibly with no
extra mapping table.

### Playground pattern

A single bordered card, split into a dot-grid canvas (left, the live DEW component) and a
controls panel (right, ~300px). The canvas is the only DEW surface in the whole card - the
controls panel is entirely built from `components/scaffold/controls.tsx`
(`ScaffoldTextInput`, `ScaffoldNumberInput`, `ScaffoldCheckbox`, `SegmentedControl`,
`ScaffoldLabel`, `ScaffoldButton`), never from real `Input`/`InputNumber`/`Checkbox`/`Button`,
per "DEW vs. Scaffold" above: a control that operates the demo is Scaffold even when a matching
DEW component exists. `SegmentedControl` additionally stands in for size/status selection until
a real DEW `Select`/`Toggle` exists (see Known gaps). Preview state is local `useState` in the
page, seeded from sensible defaults, with a `Reset` action; the *options* the controls offer
(e.g. which sizes are selectable) come from the config, not local hardcoding, so the playground
and the Variants section below it never drift apart. The canvas styling (dot-grid, card shell)
still lives inline in `avatar/page.tsx` - when rolling this template out past Avatar, extract it
into `components/scaffold/` alongside the controls rather than re-pasting.

## Generated screens (Figma → code mapping)

A generated screen (e.g. `/test-page`, built by mapping a Figma test frame to real components) is
a different animal from a doc page - it's neither a Playground's DEW-only canvas nor Scaffold
tooling, it's a reconstruction of an actual product screen. Two rules specific to this workflow:

- **No match, no substitute - and no silent drop either.** Map every Figma layer against the
  installed component library first (`components/base/**`, `components/application/**`,
  `components/foundations/**`). If a real match exists, use its exact API - no improvising. If no
  DEW component exists for a given Figma layer (a searchable select, a stepper, anything that
  isn't shipped yet), do **not** fake it with a lookalike built from a different component, and do
  **not** quietly omit it from the screen either. Render a visible `?` placeholder in the screen at
  that exact position, so the gap is obvious in the rendered UI itself, not just buried in a table
  underneath it. Then also log it in a mapping/gap table below the screen - the placeholder answers
  "where," the table answers "what" and "why it's missing." Development of the rest of the screen
  continues regardless; a gap is flagged, never a blocker.
  - This only applies to actual UI elements/controls. Plain, non-interactive Figma text layers
    (a heading, a wordmark, helper copy) were never components to begin with - render those as
    text, they don't need a `?`.
  - **Contained widget vs. structural shell - the `?` only replaces the former.** A missing
    *contained* control (a Radio, a Textarea - one field among many) gets the `?` treatment above.
    A missing *structural* pattern that organizes the whole screen (an Accordion wrapping every
    section) does not - `?`-blocking it would swallow everything inside it, defeating the point of
    building the screen at all. Compose the structural shell from real tokens instead (e.g.
    `border-brand-100` / `text-brand-tertiary` for an Accordion), keep every real DEW component
    inside it working normally, and log the shell itself in the mapping table as "composed, not a
    real component" - a candidate for future ingest, not a blocker. Precedent: `/test-site-details`
    (Figma node 88:11339) - Accordion is used identically 5× across the frame; Radio and Textarea
    are single fields within it and got the `?` marker as normal (Radio has since been resolved -
    see the flow-through rule below; Textarea is still open).
- **A `?` gap is not "done" once flagged - it's done once replaced, and that has to happen the
  moment the missing component lands, not eventually.** Whenever a component gets newly ingested
  into `components/base/**` (or any other DEW layer), immediately grep every `/test-*` page for a
  gap marker it resolves (`GapRadio`-style local components, `?` placeholder cards, "Still open" /
  "not blocking" gap tables) and swap the placeholder for the real component in the same pass -
  don't wait to be asked per screen. Update three things together, not just the visible markup:
  the gap summary table/cards (move the entry from "open" to resolved, or remove it), the
  `mapping` table (add a row documenting the real component, same as any other matched layer), and
  `CONTEXT.md`'s own gap log if the ingest was recorded there. Precedent: `/test-site-details`'s
  Radio field was `?`-blocked (`GapRadio`, a local dashed-circle placeholder driving real
  `locationMode` state) until `components/base/radio-buttons/**` was ingested this session - the
  placeholder was replaced with the real `RadioButton`/`RadioGroup` (wrapped in `Inspectable`, same
  as every other real component on that screen), the gap-cards list dropped Radio, and the mapping
  table gained a row for it. More generally: **any component-level change** (a prop added, a token
  fixed, a visual bug corrected - not just a brand-new ingest) must flow through to every `/test-*`
  page using that component, the same session it's made, not as a follow-up. A `/test-*` page is a
  live reconstruction of a product screen, not a snapshot - it has to stay honest about the design
  system's current state, or the whole point of the token-inspector cross-check breaks.
- **A generated screen's own content is Barlow end to end, including its plain text.** The
  "Scaffold labels are Geist, DEW components are Barlow" rule above is about doc-page chrome vs.
  the component being demonstrated. A generated screen is neither - it's real product-screen
  content, so every text node inside it (including plain text that isn't rendered by a DEW
  component, e.g. a page heading or a wordmark sitting next to a real `Input`) should carry
  `font-barlow`, to match what the product typeface would actually look like. Only the *doc
  page's own* chrome around the screen (its `PageHeader`, its mapping table, its prose) stays
  Geist. Caught once already: `/test-page`'s "Sign in to your account" heading and its footer
  helper text rendered in Geist because they had no explicit font, inherited the site default,
  and visibly mismatched the Figma spec (all-Barlow) even though every DEW component on the same
  screen was already correct.
- **Every `/test-*` generated screen ships the hover token-inspector, togglable.** This is
  standing infrastructure, not a one-off - `components/scaffold/token-inspector.tsx` exports
  `InspectorProvider` (wrap the whole page in it) and `Inspectable` (wrap each element you want
  inspectable in it, with a `label`/`source`/`tokens` trace pulled from the real component
  source - never approximated). Hovering an inspectable element rings it and shows a tooltip of
  every utility class it applies, the semantic variable each resolves through, and the resolved
  value - a live cross-check that the screen isn't hardcoding anything outside the token chain.
  `InspectorProvider` renders a floating "Inspector: On/Off" button (bottom-right) that toggles
  the overlay for the whole page, so a reviewer can see the screen clean when they want to. The
  wrapper `<div>` around each `Inspectable` child (and its `className`, e.g. a layout-critical
  `w-full`) always renders regardless of the toggle state - only the ring+tooltip overlay nodes
  are added/removed - so toggling the inspector off never shifts layout. Any new `/test-*` page
  must be built with this from the start, not bolted on after.

## Known gaps / loose ends (as of the Avatar build)

- **Avatar's whole family shipped without `font-barlow` - fixed, all 4 files.** Flagged by the
  user directly off a screenshot of the Avatar Playground: the "OW" fallback initials were
  rendering in Geist, not Barlow. `components/base/avatar/avatar.tsx` never had `font-barlow` on
  its root div - every other DEW component (`button.tsx`, `badges.tsx`, `checkbox.tsx`,
  `tooltip.tsx`) bakes it into the root className, this one was simply missed at ingest time.
  Checked the rest of the Avatar family for the same gap rather than stopping at the one file the
  screenshot pointed at: `avatar-label-group.tsx` (title/subtitle text, fixed on the `<figure>`
  root), `avatar-profile-photo.tsx` (its own separate initials fallback, fixed on its root),
  and `base-components/avatar-count.tsx` (the numeric count badge, fixed). Left untouched:
  `avatar-company-icon.tsx`, `avatar-add-button.tsx`, `verified-tick.tsx`,
  `avatar-online-indicator.tsx` - all icon/image-only, no rendered text to mis-font. Verified
  `tsc`/`eslint` clean. This is the second time a `font-barlow` gap has surfaced after the fact
  (Button/Checkbox/Tooltip during the 7-page rollout, now Avatar) - worth a deliberate sweep of
  every `components/base/**` and `components/application/**` root for the class next time a
  batch of components is touched, rather than waiting for it to be spotted per-component.
- **Button audited against Figma (node 101:22618 "Buttons", frames "Buttons/Button" 101:20844
  and "Buttons/Button destructive" 101:21443) - one variant trimmed, one focus-ring token fixed,
  everything else already correct.**
  - **Sizing was already exact.** sm/md/lg/xl compute to 36/40/44/48px (padding + text
    line-height) and match Figma's fixed symbol heights precisely - no fix needed. Padding
    (px-3.5/py-2.5 for md) matches Figma's `px-[14px] py-[10px]` exactly too.
  - **`xs` isn't a documented Figma variant, anywhere, for any hierarchy or state** - only
    sm/md/lg/xl symbols exist in the frame. Same situation as Select's `lg` (already trimmed,
    see "Figma is the source of truth" above): kept in the real component's type signature and
    the API table (`"xs" | "sm" | "md" | "lg" | "xl"`, still a real, working prop), but removed
    from `config/design-system.config.ts`'s `button.sizes` array and from the hardcoded
    `size="xs"` instance in the "Icon only" Variants section - it no longer appears in the
    Playground, the Sizes grid, or anywhere else it would be presented as a demonstrated option.
  - **`--ui-outline-error` / `--ui-outline-error_subtle` were still error-200/100** - the
    sibling tokens `--ui-ring-error` / `--ui-ring-border-error` were fixed to error-500/300
    earlier this session (see the destructive text-field border entry below), but `outline-error`
    - used by all four destructive `Button` colour variants' focus-visible ring, and by
    `InputNumber`'s invalid+focused outline - was missed at the time. Confirmed via this frame's
    `Focus rings/focus-ring-error` = `#F04438` (error-500). Fixed both to match the same
    subtle/full split already established (300/500). A reminder that a token fix found via one
    component's Figma frame doesn't automatically catch every sibling token with a similar name -
    grep for other tokens in the same family (`ring-error*` vs `outline-error*` here) when fixing
    one of them, not just the one the current audit happened to be looking at.
  - Two more gray-scale anchors surfaced incidentally while reading this frame's token dump:
    `text-secondary_hover` = `#423e3b` (maps to the previously-unconfirmed gray-800) and
    `bg-primary_hover` = `#fcfcfc` (maps to gray-25, also previously unconfirmed) - both added to
    the gray-scale evidence entry below. That leaves the full `--color-gray-*` scale at 10 of 12
    (or 11, depending how `bg-primary_hover`'s exact step is read) steps confirmed - still not
    applied, still the same pending decision.
- **Avatar and Badge audited against Figma (nodes 100:20529 "Avatars" and 100:20835 "Badges") -
  three real bugs found and fixed, one systemic colour gap partially closed, one open question
  raised.**
  - **`Avatar`'s fallback border was the wrong mechanism.** Figma's "Avatar" frame (node
    99:18380) confirmed two distinct, deliberate border treatments: a real image gets
    `border: rgba(0,0,0,0.08)` (verified on node 99:18516); a fallback (initials, node 99:18405,
    or icon, node 99:18453) gets a real `border-secondary` token border, not a black-alpha one.
    Code applied `outline-black/16` unconditionally to both cases - 2x too strong for images, and
    the wrong colour entirely for fallbacks. Fixed in `components/base/avatar/avatar.tsx`,
    keeping the existing `outline` mechanism (zero layout risk) but making the colour
    conditional: `canShowImage ? "outline-black/8" : "outline-[var(--ui-border-secondary)]"`.
    Note: the fallback case's *exact* pixel colour won't be correct until `--color-gray-200`
    itself is fixed (see the gray-scale entry below) - the token reference is correct now, the
    primitive it points to isn't yet.
  - **Badge's vertical padding was roughly a third of spec, sitewide, across every sub-component.**
    Figma's "Badge" frame (node 100:20530) confirmed `py` per size: sm = `spacing-sm` (6px), md =
    `spacing-lg` (8px), lg = also 8px (same as md - only horizontal padding and font-size grow
    from md to lg, not vertical) - checked against 3 separate symbols (sm/md/lg "Pill color").
    Code had `py-0.5` (2px) for sm/md and `py-1` (4px) for lg, uniformly, across `Badge`,
    `BadgeWithDot`, `BadgeWithIcon`, `BadgeWithFlag`, `BadgeWithImage`, and `BadgeWithButton` (42
    lines). Fixed to `py-1.5`(sm)/`py-2`(md)/`py-2`(lg) throughout. `BadgeIcon` (the icon-only,
    no-text variant) was independently verified correct already - its padding math already
    matched Figma's fixed pixel sizes (22/24/28px) exactly, nothing to fix there.
  - **Badge's `lg` size used `text-sm` (14px) where Figma specifies `text-md` (16px).** Confirmed
    on both "Pill color" (node 100:20591) and "Badge Color" (node 100:20593) lg symbols - font
    size scales sm→md→lg (12/14/16px) even though vertical padding doesn't. Fixed all 10
    occurrences, including the two easy-to-miss ones nested under `BadgeWithIcon`'s
    `lg: { trailing, leading }` object (a flat `grep -n 'lg:.*text-sm'` doesn't catch nested keys
    - check structurally, not just by line prefix, next time a similar sweep is needed). Not
    fixed: Figma's lg line-height is 20px (text-sm's line-height) paired with the 16px font-size,
    not text-md's native 24px - a genuine but sub-4px, likely-imperceptible mismatch, left alone
    rather than adding 10 arbitrary `leading-[20px]` overrides for it.
  - **`--color-utility-neutral-*` (Badge/Tag's "gray") was Untitled UI's stock cool palette,
    while the sibling utility scales (brand/warning→yellow/success→green/error→red) were already
    exactly correct.** Confirmed directly against Figma's "Badge" frame variable dump
    (`Component colors/Utility/Gray/utility-gray-700` = `#585451`, `-500` = `#8f8b87`, `-200` =
    `#e5e4e2`) - the same three values independently confirmed via the Input, Checkbox/Radio, and
    Avatar frames too (four-way agreement). Fixed the four steps Badge actually consumes
    (50/200/500/700) in `app/globals.css`; left `-300` untouched since nothing in this codebase
    reads `utility-neutral-300`. This is a *separate, smaller* fix from the still-pending full
    `--color-gray-*` primitive rewrite below - contained to Badge/Tag's own utility namespace, not
    the sitewide text/border/background scale.
  - **Badge's `modern` type and 7 of its 12 colours were undocumented in Figma - trimmed.**
    Figma's "Badge" frame (node 100:20530) only documents two types - "Pill color" and "Badge
    Color" - across 5 colours (Brand/Warning/Success/Error/Gray). There is no "Modern" type symbol
    anywhere in this frame, and no swatches for the other 7 colours (slate/sky/blue/indigo/purple/
    pink/orange) `Badge`'s config previously offered. Per "Figma is the source of truth", trimmed
    `modern` and the 7 extra colours out of `config/design-system.config.ts`'s `badge.types`/
    `badge.colors` (both stay real, working values in `badges.tsx`/`badge-types.ts` and in the API
    table - never invent or drop a prop, just don't demonstrate what isn't documented), and removed
    the now-dead `isModernPlain` branching in `app/components/badge/page.tsx`'s Playground and
    Types section. Verified via `tsc`/`eslint` clean and a full-page screenshot. This had briefly
    been raised as an open question instead of acted on directly - corrected: "trim to match Figma"
    is a non-negotiable contract, not something to flag and wait on. These checks exist for one
    reason - confirm the shipped styling matches the brand guide - not to weigh whether an
    undocumented variant might be intentional.
- **Figma's "ICONS / Supporting Icons" section (node 97:17449) has two families, not one.**
  "Featured icon" (node 97:16118) + "Featured icon outline" (node 97:16339) are a real, already-
  ingested DEW component - `FeaturedIcon` in `components/foundations/featured-icon/featured-icon.tsx`
  - and match Figma exactly (sizes 32/40/48/56 for sm/md/lg/xl, themes light/gradient/dark/modern/
  modern-neue plus `outline` as its own frame, colours brand/gray/error/warning/success). Documented
  on `/primitives/icons` under a new "Featured icons" section per the user's request to add
  supporting icons there, rather than spinning up a separate `/components/featured-icon` page - it
  hadn't had any doc page before this (only used internally by `Alert`/`Toast`).
  **The demo glyph must be Figma's actual one, not a convenient substitute.** First pass used
  `Bell01` for every swatch - wrong, and caught immediately: `get_design_context` on the frame's
  own example (node 97:16119) shows Figma's real default is `check-circle` (Untitled UI's
  `CheckCircle`, already in `@untitledui/icons` - no new asset needed), with an explicit
  `iconSwap` prop documenting that the container is icon-agnostic but the *reference example* is
  not arbitrary. Swapped to `CheckCircle` across all three Featured Icon demo blocks. This
  generalises: **when documenting any component that wraps or is documented alongside a specific
  Figma-chosen glyph, pull the exact icon Figma used via `get_design_context`/screenshot before
  writing the demo - never default to whatever icon happens to already be imported on the page.**
  These demo choices get treated as canon and inherited by other components/screens that copy the
  pattern, so a wrong default doesn't stay contained to one page.
  "File type icon" (node 97:16420) is a *different* thing entirely: ~100+ real exported SVG assets
  (a coloured "page" shape per format/type, e.g. Image/JPG/PNG/SVG, Document/PDF/DOCX/XLSX,
  Design/FIG/PSD/AI, Media/MP3/MP4, Archive/ZIP, Development/HTML/JS/JSON, …, each in Default/Gray/
  Solid) with a baked-in text label (confirmed via `get_design_context` on node 97:16796 - a real
  `<img src=".../asset/....svg">`, not something drawable from a token). No component exists for
  this yet. Per the Figma-to-code rule "never hand-write or inline `<svg>`/`<path>`, you don't have
  the real vector data" - this was **not** built as part of this pass; it needs its own ingest
  (download and commit every real asset, build a `FileTypeIcon` component with `fileType`/`type`
  props) which is a meaningfully larger, separate task from "add supporting icons to the Icons
  page." Flagged here rather than faked or silently skipped.
- **`--ui-ring-focus-ring` / `--ui-outline-focus-ring` were brand-300 - now fixed to brand-500.**
  This was flagged as "unaudited against Figma" in a `globals.css` comment when the brand text-field
  ring was first fixed; confirmed and closed via Figma's "Checkbox" frame (node 95:15178, also
  documents Radio - both types share one frame). Its focus-ring effect on a focused control (e.g.
  node 95:15375) is a two-layer shadow: `0 0 0 2px bg-primary` (the white gap) then
  `0 0 0 4px Colors/Effects/Focus rings/focus-ring` (`#2A667C`, brand-500) - same colour as the
  text-field ring, just a different token because it's applied via `outline`/`ring` box-shadow on
  discrete controls rather than the text-field's own ring. The 2px-gap-then-2px-ring *width* was
  already correct (`outline-2 outline-offset-2` numerically matches spread 2 -> spread 4); only the
  colour was wrong. Fixed at the token level, so it corrected every consumer at once: `Checkbox`,
  `RadioButton`, `Toggle`, `CloseButton`, `SelectItem`, `Tags`/`TagCheckbox`/`TagCloseX`,
  `AvatarAddButton`, `Badges`, `InputTags`, and `components/scaffold/controls.tsx`. Verified live
  via `getComputedStyle` on a keyboard-focused Radio (`rgb(42, 102, 124)` = `#2a667c`, exact match).
  Also checked while there: Figma's Default vs. Hover states for both Checkbox and Radio (nodes
  74:573/74:579) are visually identical except for `cursor-pointer` - no hover-specific colour
  change needed, and the shipped components already have `cursor-pointer` unconditionally, so
  there was nothing to fix on that front.
- **`Avatar`'s `contrastBorder` prop is dead.** It's declared in `AvatarProps` but never
  destructured or used in `components/base/avatar/avatar.tsx`. It's documented in the API
  table for accuracy (that's the real type signature), but don't build a Playground control
  or Variants demo around it - it currently does nothing. Worth reporting upstream or wiring
  up if it's ever needed.
- **No real Figma links exist for any installed component yet.** The Figma section on every
  page should ship as an honest "not linked yet" placeholder until real file/frame URLs are
  available - never fabricate one.
- **`Select` and `Toggle` are both installed now** - `SegmentedControl` in
  `components/scaffold/controls.tsx` still stands in for the *Playground's own* size/status
  controls (per "DEW vs. Scaffold": a control that operates a demo is Scaffold even once a real
  DEW equivalent ships), but every doc page's own Variants sections now use the real components.
- **`Select`'s ingest (`components/base/select/**`) fixed two unresolved tokens copy-pasted from
  Input's pattern:** `to-bg-primary` (a gradient-stop utility - `bg-primary` isn't a `--color-*`
  theme entry, so `to-*` can never resolve it) and `caret-alpha-black/90` (no `alpha-black` token
  exists anywhere in this system). Both were rewritten as arbitrary-value token references -
  `to-[var(--ui-bg-primary)]` and `caret-[var(--ui-text-primary)]` - in `combobox.tsx`,
  `tag-select.tsx`, and `multi-select.tsx`. The identical pattern still exists, unfixed, in
  `components/base/input/input.tsx`, `input-date.tsx`, and `input-tags.tsx` (that's where Select's
  copy came from) - low visual impact (the effect just silently no-ops rather than breaking
  anything) but worth the same fix next time one of those files is touched.
- **No em-dashes in this file or in doc-page copy.** Use a hyphen (`-`) instead. Applies to
  prose written here and in component pages alike.
- **Placeholder person convention:** use the fictional **Olivia Wyatt** / initials **OW** for
  any demo that needs a single person's name, email, or initials - never the current user's real
  identity. This was fixed once already (an avatar demo leaked a real name/email) - don't
  reintroduce it when building new components that need a "user" example. For a demo that needs
  *multiple* distinct people (a multi-select, an assignee list), pair Olivia Wyatt with other
  Untitled UI's own established placeholder personas - e.g. **Phoenix Baker**, **Lana Steiner** -
  rather than inventing new fictional names; they're already the recognisable, unambiguously-fake
  identities this whole component library is built on (see `Select`'s "with avatar"/multi-select/
  tag-select demos).
- **Dev server terminal noise:** `next.config.ts` sets `logging.incomingRequests: false` and
  `logging.browserToTerminal: false` to keep `next dev` output readable. If you're debugging
  something that needs those (e.g. chasing a specific request or a browser console error),
  temporarily re-enable rather than assuming they're unavailable.
- **Playground/panel rollout is complete for every built component page.** Avatar, Toggle,
  Select, and Radio buttons had it first; Alert, Avatar, Badge, Button, Checkbox, Input, Toast,
  and Tooltip got it in one batched pass (built in parallel by separate agents, one page each,
  each independently verified against "DEW vs. Scaffold" and the rest of the "Final check"
  contract). Only `Modal` remains Variants-only, since it has no real content yet at all
  ("Documentation coming soon" placeholder) - give it the full pattern from the start once it's
  actually built, don't build it Variants-only and roll Playground in later.
  - **Two DEW/Scaffold violations survived the parallel build and had to be caught in a manual
    sweep afterward**, both the same shape: a real `Button` used as a Tooltip/Toast trigger
    inside *pre-existing, preserved* Variants content (not the new Playground, which both pages
    got right) - a demo-operating trigger is Scaffold even when it's wrapped by a real DEW
    component that functionally requires a focusable child (`Tooltip` needs its own
    `TooltipTrigger` export to wire up hover/focus correctly - the fix was `TooltipTrigger` with
    Scaffold-only visual classes, not a bare Scaffold button, and not a real `Button`). Toast's
    fix was simpler (`ScaffoldButton` slots in directly, no functional dependency). **When
    rolling this pattern out to a page with pre-existing content, grep the finished file for
    every real component import used as a trigger/operator, not just the new Playground section**
    - "preserve existing content" is not the same as "existing content was already correct."
  - **A parallel batch is exactly where a stray regression hides.** A `font-barlow` fix
    surfaced independently in `Button`, `Checkbox`, and `Tooltip`'s real components (all three
    were missing it in the working tree relative to the last commit, restored to match HEAD
    exactly - confirmed via empty `git diff` afterward). The first two were caught and fixed by
    the agents that touched those pages; the third (`components/base/tooltip/tooltip.tsx`) was
    missed by its own agent's report and only surfaced in the human's post-batch `git status`/
    `eslint` sweep. Always run that sweep after a parallel batch, even when every individual
    agent self-reports clean - "I didn't touch that file" is a claim to verify, not trust.
- **`Radio buttons`' ingest (`components/base/radio-buttons/radio-buttons.tsx`) fixed two gaps:**
  the root `AriaRadio` className was missing `font-barlow` (every other DEW form component -
  `Checkbox`, `Input`, `InputNumber` - carries it; this one shipped without it), and `RadioGroup`
  accepted an `orientation` prop that reached react-aria's state correctly (keyboard nav, the
  `data-orientation` DOM attribute) but had no visual effect - its wrapper was hardcoded to
  `flex flex-col`, so `orientation="horizontal"` never actually laid options out in a row. Fixed
  by adding `data-[orientation=horizontal]:flex-row` alongside the existing `flex-col`. Caught by
  actually clicking the Playground's own Orientation control after building it, not by reading
  the source - a reminder to interact with every new Playground control at least once before
  calling an ingest done, the same way a dead prop like `Avatar`'s `contrastBorder` only shows up
  when something tries to use it.
- **No Figma frame found for Radio buttons.** The `get_metadata`/`get_design_context` MCP tools
  only see pages the Figma desktop app currently has loaded, not the whole file - "DS Sandbox"
  (node 65:1317, used for the Input/border-colour audits) doesn't contain a Radio frame, and a
  broader page-level search came up empty too. Shipped with an honest "not linked yet" Figma
  section rather than blocking the ingest on an unreliable search - revisit if a Radio frame
  turns out to exist elsewhere in the file.
- **`/test-site-details` has a `?`-blocked Radio field** (per "Generated screens" above, from
  before this component was ingested). Now that `components/base/radio-buttons/**` is real, that
  placeholder is a candidate to swap for the real component - not done as part of this ingest,
  since it's a separate screen with its own review cycle, but worth doing next time that screen
  is touched.
- **Gray/neutral primitive scale (`--color-gray-*`) was Untitled UI's stock cool palette, not
  DEW's real warm-gray one - now applied, 11 of 12 steps.** Confirmed via Figma's own resolved
  variables, independently, across five separate frames (Input's "Input field" sandbox node
  65:1317; Checkbox/Radio's "Checkbox" frame node 95:15178; Avatar's "Avatar" frame node
  99:18380; Badge's "Badge" frame node 100:20530; Button's "Buttons/Button" frame node
  101:20844) - the same agreement that made the `--color-utility-neutral-*` fix above safe to
  apply on its own. Applied directly in `app/globals.css`: 900 `#2e2925` (was `#101828`), 800
  `#423e3b` (was `#1D2939`), 700 `#585451` (was `#344054`), 600 `#706b68` (was `#475467`), 500
  `#8f8b87` (was `#667085`), 400 `#b5b2af` (was `#98A2B3`), 300 `#d2d0ce` (already correct,
  untouched), 200 `#e5e4e2` (was `#EAECF0`), 100 `#f2f2f1` (was `#F2F4F7`), 50 `#f8f8f7` (was
  `#F9FAFB`), 25 `#fcfcfc` (was `#FCFCFD`). 950 left untouched - unconfirmed, and nothing in this
  codebase reads it. Since every component's text/border/background reads through
  `--color-gray-*`, also swept the whole repo for hardcoded hex literals that had been documenting
  the old values (doc-only "value" columns in inspector/token tables, which duplicate a hex next
  to a token name rather than reading the CSS var live) and updated them to match: the primitives
  Gray swatch list (`app/primitives/colours/page.tsx`, which was already out of sync even on
  `gray-300` before this fix), Tooltip's token anatomy table, Input's focus-ring state table, and
  both `/test-*` pages' inspector token tables (including an unrelated stale `ring-brand` entry
  in `test-page` still showing the pre-fix `brand-300` value instead of the already-corrected
  `brand-500` - fixed in the same pass since it was found while sweeping). Verified with `tsc`
  clean, `eslint` clean, and every touched route returning 200 from a local dev server.
- **Destructive/error border tokens were one to two shades too pale - now fixed.** Same bug class
  as the brand-ring fix documented above, just missed for the error state at the time. Figma's
  resting-invalid Input (node 91:13669) uses `border-error_subtle` = `#fda29b` (error-300);
  focused-invalid (node 91:13879) uses `border-error` = `#f04438` (error-500). Code had
  `--ui-ring-error_subtle`/`--ui-ring-border-error_subtle` at error-200 and
  `--ui-ring-error`/`--ui-ring-border-error` at error-300 - both bumped up to match. Fixed at the
  token level in `globals.css`, so it corrected `Input`, `Select`, `ComboBox`, `MultiSelect`,
  `TagSelect`, `PinInput`, `InputDate`, `InputTags`, `InputGroup`, and the destructive `Button`
  variant all at once. Verified live via `getComputedStyle` on a rendered error input.
