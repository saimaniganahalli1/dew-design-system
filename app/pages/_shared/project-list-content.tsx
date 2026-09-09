"use client";

import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import type { BadgeColor } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";

// The real Projects list content - shared by every option-1 sidebar shell (dashboard,
// project-list, project-detail) so clicking the Projects icon always shows this, the same
// "content is real, not a placeholder redirect" fix already applied to Home
// (see app/pages/_shared/home-dashboard.tsx). project-detail is the one exception: its
// "Projects" section shows one project's own detail (what the screen exists to do), not this list
// - that's a deliberate difference, not an oversight, since project-detail is reached by drilling
// into a specific project row, not by browsing the category.
//
// Same 4 example projects as project-list/option-1 and the header search - only "Adelaide Hills
// Bushland Survey" has a real detail page, so it's the only linked row/result, same "only wire
// what has a real page" convention used everywhere else.

function ProjectRow({
  name,
  href,
  org,
  status,
  statusColor,
  contributorInitials,
  contributorName,
  updated,
  description,
}: {
  name: string;
  href?: string;
  org: string;
  status: string;
  statusColor: BadgeColor<"pill-color">;
  contributorInitials: string;
  contributorName: string;
  updated: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-secondary p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          {href ? (
            <Button color="link-color" size="lg" href={href}>
              {name}
            </Button>
          ) : (
            <p className="text-md font-medium text-primary">{name}</p>
          )}
          <Badge size="sm" color={statusColor}>{status}</Badge>
        </div>
        <p className="text-sm text-tertiary">{org}</p>
        <p className="text-sm text-tertiary">{description}</p>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar size="xs" initials={contributorInitials} alt={contributorName} />
          <span className="text-sm text-secondary">{contributorName}</span>
        </div>
        <span className="text-xs whitespace-nowrap text-quaternary">{updated}</span>
      </div>
    </div>
  );
}

export function ProjectListContent() {
  return (
    <>
      <div className="flex flex-col items-start gap-6 border-b border-secondary p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-medium text-primary">Projects</p>
          <p className="text-sm text-tertiary">Everything you&apos;re contributing to, in one place</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <ProjectRow
          name="Adelaide Hills Bushland Survey"
          href="/pages/project-detail/option-1"
          org="Adelaide Hills Landcare"
          status="Active"
          statusColor="success"
          contributorInitials="OW"
          contributorName="Olivia Wyatt"
          updated="Updated 2 days ago"
          description="Ongoing flora and fauna monitoring across the Adelaide Hills reserve network."
        />
        <ProjectRow
          name="Coorong Wetlands Bird Count"
          org="Birds SA"
          status="Under review"
          statusColor="warning"
          contributorInitials="MD"
          contributorName="Maya Dewitt"
          updated="Updated 5 days ago"
          description="Seasonal waterbird survey data pending verification."
        />
        <ProjectRow
          name="Flinders Ranges Reptile Atlas"
          org="DEW Biodiversity Team"
          status="Draft"
          statusColor="gray"
          contributorInitials="OW"
          contributorName="Olivia Wyatt"
          updated="Updated 1 week ago"
          description="Draft submission, not yet published."
        />
        <ProjectRow
          name="Kangaroo Island Recovery Monitoring"
          org="Natural Resources KI"
          status="Completed"
          statusColor="blue"
          contributorInitials="MD"
          contributorName="Maya Dewitt"
          updated="Updated 3 weeks ago"
          description="Post-bushfire recovery tracking, final report submitted."
        />
      </div>
    </>
  );
}

// Same 4 example projects, exported so the global search (app/pages/_shared/global-search.tsx)
// can search against exactly this list rather than keeping its own separate copy.
export const searchableProjects = [
  { id: "adelaide-hills", label: "Adelaide Hills Bushland Survey", supportingText: "Adelaide Hills Landcare", href: "/pages/project-detail/option-1" },
  { id: "coorong", label: "Coorong Wetlands Bird Count", supportingText: "Birds SA" },
  { id: "flinders", label: "Flinders Ranges Reptile Atlas", supportingText: "DEW Biodiversity Team" },
  { id: "kangaroo-island", label: "Kangaroo Island Recovery Monitoring", supportingText: "Natural Resources KI" },
];
