"use client";

import { useState } from "react";
import Link from "next/link";
import { Button as AriaButton, Dialog, DialogTrigger } from "react-aria-components";
import { Bell01, ChevronDown, Upload01, Plus } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Avatar } from "@/components/base/avatar/avatar";
import { Popover } from "@/components/base/select/popover";
import { Badge } from "@/components/base/badges/badges";
import type { BadgeColor } from "@/components/base/badges/badges";
import { registeredUserNav, registeredUserAccountMenu, registeredUserFooterLinks, type NavNode } from "@/lib/registered-user-nav";
import { cx } from "@/utils/cx";

// Option 2 of 2: the projects list on the top-nav shell (header + primary nav bar), reusing
// app/pages/dashboard/option-2's header/nav chrome verbatim - see that file's comment for the
// full rationale. See app/pages/project-list/option-1 for the same screen on the sidebar shell.
//
// No Figma frame yet for a Projects list screen, so - same as option-1 and the dashboard body's
// metric/filter/map panels - this is built structurally: every contained widget (button, avatar,
// badge) is a real DEW component used exactly, the project rows are a structural shell composed
// from real tokens. The primary nav renders the real Registered User IA
// (lib/registered-user-nav.ts) - same NavTopItem/NavDropdownItem/ProfileMenu treatment as
// dashboard/option-2, "Projects" active since that's the section here.

// This screen's own page key, so its own entry in the dropdown (Projects > Manage Project and
// Datasets) can show a selected state - same fix as dashboard/option-1's "BioData Dashboard" link.
const CURRENT_KEY = "project-list";

function NavDropdownItem({ node, depth = 0 }: { node: NavNode; depth?: number }) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!node.items?.length;
  const href = node.key ? `/pages/${node.key}/option-2` : undefined;
  const isCurrent = !!node.key && node.key === CURRENT_KEY;
  const indent = { paddingLeft: 12 + depth * 12 };

  if (!hasChildren) {
    return href ? (
      <Link
        href={href}
        style={indent}
        aria-current={isCurrent ? "page" : undefined}
        className={cx(
          "block rounded-md py-1.5 pr-3 text-sm",
          isCurrent ? "bg-secondary font-medium text-primary" : "text-primary hover:bg-secondary",
        )}
      >
        {node.label}
      </Link>
    ) : (
      <p style={indent} className="py-1.5 pr-3 text-sm text-tertiary">
        {node.label}
      </p>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={indent}
        className="flex w-full items-center justify-between gap-2 rounded-md py-1.5 pr-3 text-left text-sm font-medium text-primary hover:bg-secondary"
      >
        {node.label}
        <ChevronDown className={cx("size-3.5 shrink-0 text-quaternary transition-transform", !open && "-rotate-90")} />
      </button>
      {open && (
        <div className="flex flex-col">
          {node.items!.map((child) => (
            <NavDropdownItem key={child.label} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function NavTopItem({ node, active = false }: { node: NavNode; active?: boolean }) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!node.items?.length;
  const href = node.key ? `/pages/${node.key}/option-2` : undefined;
  const labelClassName = cx("relative flex items-center gap-1 px-4 text-sm", active ? "font-medium text-brand-700" : "text-primary");

  if (!hasChildren) {
    const content = (
      <span className={labelClassName}>
        {node.label}
        {active && <span className="absolute inset-x-4 bottom-0 h-0.5 bg-brand-700" />}
      </span>
    );
    return href ? (
      <Link href={href} className="flex items-stretch">
        {content}
      </Link>
    ) : (
      <div className="flex items-stretch">{content}</div>
    );
  }

  return (
    <DialogTrigger onOpenChange={setOpen}>
      <AriaButton className={cx(labelClassName, "outline-hidden")}>
        {node.label}
        <ChevronDown className={cx("size-3.5 text-quaternary transition-transform", open && "rotate-180")} />
        {active && <span className="absolute inset-x-4 bottom-0 h-0.5 bg-brand-700" />}
      </AriaButton>
      <Popover size="sm" className="w-72 p-2">
        <Dialog className="outline-hidden">
          {node.items!.map((child) => (
            <NavDropdownItem key={child.label} node={child} />
          ))}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}

function ProfileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <DialogTrigger onOpenChange={setOpen}>
      <AriaButton className="flex items-center gap-2 rounded-[10px] bg-secondary py-1 pr-3 pl-1 outline-hidden">
        <Avatar size="xs" initials="OW" alt="Maya Dewitt" />
        <span className="text-sm text-primary">Dewitt, Maya</span>
        <ChevronDown className={cx("size-3.5 text-quaternary transition-transform", open && "rotate-180")} />
      </AriaButton>
      <Popover size="sm" className="w-48 p-1">
        <Dialog className="outline-hidden">
          <p className="px-3 py-2 text-xs font-semibold tracking-wide text-quaternary uppercase">Profile</p>
          {registeredUserAccountMenu.map((item) => (
            <p key={item} className="cursor-pointer rounded-md px-3 py-2 text-sm text-secondary hover:bg-secondary">
              {item}
            </p>
          ))}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}

function ProjectRow({
  name,
  org,
  status,
  statusColor,
  contributorInitials,
  contributorName,
  updated,
  description,
}: {
  name: string;
  org: string;
  status: string;
  statusColor: BadgeColor<"pill-color">;
  contributorInitials: string;
  contributorName: string;
  updated: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-secondary bg-primary p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-md font-medium text-primary">{name}</p>
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

export default function ProjectListOption2Page() {
  return (
    <div className="font-barlow flex min-h-screen flex-col">
      {/* ── Header ── */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-secondary bg-primary pr-9 pl-6">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/pages/dashboard/gov-sa-dew-lockup.png"
            alt="Government of South Australia, Department for Environment and Water"
            className="h-[31px] w-auto"
          />
          <div className="h-6 w-px bg-secondary" />
          <p className="text-[17px] font-medium tracking-tight text-primary">BioData SA</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative shrink-0">
            <Button color="secondary" iconLeading={Bell01} />
            <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-error-solid text-[10px] font-semibold text-white">
              3
            </span>
          </div>
          <ProfileMenu />
        </div>
      </header>

      {/* ── Primary nav (nav chrome - not pixel-matched) ── */}
      <nav className="flex h-11 shrink-0 items-stretch border-b border-secondary bg-primary px-6" aria-label="Primary">
        {registeredUserNav.map((section) => (
          <NavTopItem key={section.label} node={section} active={section.label === "Projects"} />
        ))}
      </nav>

      {/* ── Page header ── */}
      <div className="flex flex-col items-start gap-6 bg-secondary px-9 pt-8 pb-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-medium text-primary">Projects</p>
          <p className="text-sm text-tertiary">Everything you&apos;re contributing to, in one place</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button color="secondary" iconLeading={Plus}>Add project</Button>
          <Button color="secondary" iconLeading={Upload01}>Upload dataset</Button>
        </div>
      </div>

      {/* ── Project rows: flex-1 fills remaining space so the footer sticks to the bottom of the
          viewport when content is short, same fix as dashboard/option-2 ── */}
      <div className="flex flex-1 flex-col gap-4 bg-secondary px-9 pt-6 pb-8">
        <ProjectRow
          name="Adelaide Hills Bushland Survey"
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

      {/* ── Footer (nav chrome - not pixel-matched) ── */}
      <footer className="flex flex-wrap items-center gap-6 border-t border-secondary bg-primary px-9 py-4 text-[10px] font-semibold tracking-wide text-quaternary uppercase">
        {registeredUserFooterLinks.map((link) => (
          <p key={link}>{link}</p>
        ))}
      </footer>
    </div>
  );
}
