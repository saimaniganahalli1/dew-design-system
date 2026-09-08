// Registered User's real, decided IA - captured by the team ahead of the Sept 15 layout
// decision (see the "Registered User" nav tree brief). This is the one place the tree lives;
// app/projects/dashboard/option-{1,2} and app/projects/project-list/option-{1,2} each render it
// in their own shell's idiom (sidebar accordion vs. top-nav dropdown), but read from here so the
// four screens can't drift out of sync as the IA changes.
//
// `key` is set only on the two items with a real page today - each screen turns it into a
// same-variant href (`/projects/<key>/option-1` or `/projects/<key>/option-2`). Every other item
// has no page yet, so it renders as inert text, same "honest, not a placeholder link" convention
// used elsewhere for undecided content.

export interface NavNode {
  label: string;
  key?: "dashboard" | "project-list";
  items?: NavNode[];
}

export const registeredUserNav: NavNode[] = [
  // Home *is* the BioData Dashboard, not a group containing it - flagged directly by the user:
  // rendering it as "Home > BioData Dashboard" implied two things where there's only one. A leaf
  // with its own `key`, same as any other single-destination item.
  { label: "Home", key: "dashboard" },
  {
    label: "Projects",
    // The brief's other five "Projects" items (View Level 1/2, Create Project + its sub-steps,
    // Download Project Templates, Create/Upload Dataset) aren't nav destinations - flagged
    // directly by the user off this section's screenshot: they're actions/operations on the
    // Project resource (Create, Read at two access tiers, an upload), not sibling places to
    // navigate to. Collapsed to the one real destination; the rest are kept as data in
    // `projectActions` below so they're not lost, ready to become real buttons/filters/a wizard
    // inside that screen once that's scoped, rather than sit here as it were more sidebar links.
    items: [{ label: "Manage Project and Datasets", key: "project-list" }],
  },
  {
    label: "Observations",
    items: [{ label: "View Level 1 Public Observation Data" }, { label: "View Level 2 Observation Data (DLA Access)" }],
  },
  {
    label: "Data Licencing Agreement (DLA)",
    items: [{ label: "Request New DLA" }, { label: "Manage DLA" }],
  },
  {
    label: "Nominate Sensitive Species",
    items: [{ label: "Nominate Sensitive Species" }],
  },
  {
    label: "Reports (Own Submissions)",
    items: [{ label: "Application and System Reports" }],
  },
  {
    label: "Template Finder",
    items: [{ label: "Browse and Download Standard Dataset Templates" }],
  },
];

// The rest of the brief's "Projects" items - not nav destinations (see the comment on the
// `Projects` section above), but not dropped either. Real actions/operations on the Project
// resource, ready to become buttons/filters/a wizard inside project-list once that's scoped.
export interface ProjectAction {
  label: string;
  /** Wizard steps, for an action that's actually a multi-step flow (only Create Project today). */
  steps?: string[];
}

export const projectActions: ProjectAction[] = [
  { label: "View Level 1 Public Project Data" },
  { label: "View Level 2 Project Data (DLA Access)" },
  {
    label: "Create Project",
    steps: [
      "Add Project Details",
      "Privacy and Restrictions: Embargo",
      "Privacy and Restrictions: Sensitive Species and Location",
      "Privacy and Restrictions: Restrict Project Metadata",
      "Privacy and Restrictions: Request Other Restrictions",
    ],
  },
  { label: "Download Project Templates" },
  // Not a standalone flow - per CONTEXT.md's "BDBSA domain research", every dataset must be
  // assigned to a project number, so this can never be "upload, pick a project later." Whatever UI
  // eventually implements this must fold project selection/creation into the same step, not treat
  // an unassigned dataset as a valid, if incomplete, state. Flagged directly by the user after an
  // earlier dashboard draft showed a task implying the opposite.
  { label: "Create / Upload Dataset" },
];

/**
 * The top-level section a given nav `key` lives under - e.g. `findSection("project-list")` ->
 * the `Projects` node (its child "Manage Project and Datasets" is the one with the `key`, but the
 * breadcrumb shows the section, not the leaf - see `components/scaffold/breadcrumb.tsx`).
 * `findSection("dashboard")` returns the `Home` node itself, since that entry *is* its own
 * destination rather than a group. Same "one place, four-going-on-five screens read from it"
 * reasoning as the tree itself.
 */
export function findSection(key: NonNullable<NavNode["key"]>): NavNode | undefined {
  return registeredUserNav.find((section) => section.key === key || section.items?.some((item) => item.key === key));
}

// The screenshot's "Header" branch (Profile > Profile Settings, Logout) isn't a nav-tree entry -
// it's the account menu hung off the avatar. Kept separate so the tree above is just the
// sidebar/top-nav content.
export const registeredUserAccountMenu = ["Profile Settings", "Logout"];

// Same for "Footer" - Terms and Conditions, Privacy Policy, Help and Documentation, in the
// screenshot's order.
export const registeredUserFooterLinks = ["Terms and Conditions", "Privacy Policy", "Help and Documentation"];
