import { staticNav } from "@/lib/nav";

// Static: the nav/config it reads from only changes at build time.
export const dynamic = "force-static";

/**
 * Serves /llms.txt — a machine-readable summary for AI agents, following
 * the llms.txt convention (llmstxt.org). Generated from `lib/nav.ts` so it
 * never drifts from the sidebar: add/hide a component in
 * `config/design-system.config.ts` and this file updates with it.
 */
export async function GET() {
  const lines: string[] = [
    "# DEW Design System",
    "",
    "> Design tokens, components, and patterns for the DEW product experience — built on Untitled UI conventions, restyled to be DEW.",
    "",
    "DEW pairs primitive design tokens (colour, typography, spacing, radius, shadow, icon, motion) with production components pulled from Untitled UI's React library. Components inherit from primitives: every semantic token (button fills, input rings, badge colours) resolves back to a primitive value via CSS custom properties, so rebranding is a token edit, not a rewrite. Which variants of each component are documented is controlled by `config/design-system.config.ts` — a colour/size/type/feature not listed there simply isn't shown yet, not unsupported.",
    "",
  ];

  for (const section of staticNav()) {
    lines.push(`## ${section.title}`);
    lines.push("");
    for (const item of section.items) {
      lines.push(`- [${item.title}](${item.href}): ${item.description}`);
    }
    lines.push("");
  }

  lines.push("## Notes");
  lines.push("");
  lines.push("- Pages marked \"Documentation coming soon\" exist in navigation but have no content yet — don't cite them as a finished spec.");
  lines.push("- Icons are from `@untitledui/icons` (1,179 total), not Lucide.");
  lines.push("- Token source of truth: `app/globals.css`. Variant source of truth: `config/design-system.config.ts`.");

  const body = lines.join("\n").trimEnd() + "\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
