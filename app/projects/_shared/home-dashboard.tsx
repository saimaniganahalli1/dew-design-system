"use client";

import { TrendUp02, ArrowNarrowRight, Plus, Upload01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import type { BadgeColor } from "@/components/base/badges/badges";

// The real Home/BioData Dashboard content - the single source every option-1 sidebar shell
// (dashboard, project-list, project-detail) renders for the "Home" section, instead of the
// generic SectionPlaceholder. Home is real, built content, not an unscoped section - clicking the
// Home icon (or the Home breadcrumb) from any of those three screens must always show this exact
// content, not a "this lives on another page, go there" placeholder. Flagged directly by the user
// off a screenshot of this content, after a placeholder was shown instead on project-list/
// project-detail. Not shared with dashboard/option-2 (top-nav shell) - clicking Home there is a
// real page navigation to its own dashboard, which already renders this correctly; the bug this
// fixes is specific to option-1's in-place, no-navigation section switching.
//
// The "This is where alerts go" banner used to live here, with its own local dismiss state - moved
// out to app/projects/_shared/home-tab-panels.tsx instead, since it also needs to show on the Data
// Overview tab and dismissing it on either tab must dismiss it on both (one shared piece of state
// above both tab panels, not two independent copies) - flagged directly by the user.
//
// "Add project"/"Upload dataset" sit below the KPI row as quick actions - option-1's own original
// layout (restored after a detour through mirroring option-2's banner placement beside the
// greeting, corrected directly by the user: option-2 is a separate layout, not something option-1
// needs to visually match). Option-1 already has both as persistent header actions on every page
// (not just Home), so on this screen they appear twice - flagged, not hidden, since removing the
// header's copies would be a bigger, separately-scoped change (they're the only create/upload
// entry point on the other two screens this component is shared with). That button group's gap
// is `gap-2` (the 8px token), not `gap-3` (12px) - flagged directly by the user off a screenshot.
//
// TaskItem's action ("Continue", "Go to X") uses `iconTrailing={ArrowNarrowRight}`, not a literal
// "→" appended to the label text - Button already supports a trailing icon on every color variant
// including `link-color`, so the arrow is a real icon like everywhere else, not a text character
// standing in for one. See CONTEXT.md's "Final check" list.

function KpiStat({
  value,
  label,
  note,
  trend,
  action,
  last = false,
}: {
  value: string;
  label: string;
  note: string;
  trend?: boolean;
  action?: boolean;
  last?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-2 pr-6 ${last ? "" : "border-r border-secondary"}`}>
      <p className="text-2xl font-medium text-primary tabular-nums">{value}</p>
      <p className="text-md font-medium text-primary">{label}</p>
      <div className="flex items-center gap-1.5 text-sm text-tertiary">
        {trend && <TrendUp02 className="size-3.5 text-fg-success-primary" />}
        <span>{note}</span>
        {action && <ArrowNarrowRight className="size-3.5 text-quaternary" />}
      </div>
    </div>
  );
}

// One row in the "needs your attention" list. `actionHref` is only set when there's a real page
// behind it (project-list, project-detail); DLA requests and species nominations don't have one
// yet, so those rows are status-only, no fake link, same "honest, not a placeholder" convention as
// everywhere else in this build.
function TaskItem({
  title,
  detail,
  status,
  statusColor,
  actionLabel,
  actionHref,
}: {
  title: string;
  detail: string;
  status: string;
  statusColor: BadgeColor<"pill-color">;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-secondary p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-md font-medium text-primary">{title}</p>
          <Badge size="sm" color={statusColor}>{status}</Badge>
        </div>
        <p className="text-sm text-tertiary">{detail}</p>
      </div>
      {actionHref && actionLabel && (
        <Button color="link-color" size="sm" href={actionHref} iconTrailing={ArrowNarrowRight} className="shrink-0">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

// One array driving both the rendered list and its count badge, so the heading can never drift
// out of sync with what's actually shown.
const dashboardTasks: {
  title: string;
  detail: string;
  status: string;
  statusColor: BadgeColor<"pill-color">;
  actionLabel?: string;
  actionHref?: string;
}[] = [
  {
    title: "DLA request - Coorong Wetlands Bird Count",
    detail: "Submitted 5 days ago, awaiting DEW review.",
    status: "Awaiting review",
    statusColor: "gray",
  },
  {
    title: "Sensitive species nomination - Southern Bell Frog",
    detail: "Submitted 1 week ago, under review by the sensitive species panel.",
    status: "Under review",
    statusColor: "gray",
  },
  {
    title: "Flinders Ranges Reptile Atlas",
    detail: "Project draft - not yet submitted.",
    status: "Draft",
    statusColor: "gray",
    actionLabel: "Continue",
    actionHref: "/projects/project-detail/option-1",
  },
];

export function HomeDashboardContent() {
  return (
    <>
      <div className="flex flex-col gap-4 border-b border-secondary p-6">
        <p className="text-2xl font-medium text-primary">Hi, Olivia</p>
        <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
          <KpiStat value="15" label="Species Observed" note="3 up from last week" trend />
          <KpiStat value="3" label="Datasets contributed" note="1 dataset under review" />
          <KpiStat value="2" label="Completed Checklists" note="View all checklists" action last />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button color="secondary" iconLeading={Plus}>Add project</Button>
          <Button color="secondary" iconLeading={Upload01}>Upload dataset</Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-2">
          <p className="text-lg font-medium text-primary">Needs your attention</p>
          <Badge size="sm" color="gray">{dashboardTasks.length}</Badge>
        </div>
        <div className="flex flex-col gap-3">
          {dashboardTasks.map((task) => (
            <TaskItem key={task.title} {...task} />
          ))}
        </div>
      </div>
    </>
  );
}
