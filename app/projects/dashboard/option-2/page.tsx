"use client";

import { useState } from "react";
import Link from "next/link";
import { Button as AriaButton, Dialog, DialogTrigger } from "react-aria-components";
import { Bell01, ChevronDown, Upload01, Plus, TrendUp02, ArrowNarrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Avatar } from "@/components/base/avatar/avatar";
import { Popover } from "@/components/base/select/popover";
import { Badge } from "@/components/base/badges/badges";
import type { BadgeColor } from "@/components/base/badges/badges";
import { registeredUserNav, registeredUserAccountMenu, registeredUserFooterLinks, type NavNode } from "@/lib/registered-user-nav";
import { cx } from "@/utils/cx";

// Option 2 of 2: same task-first dashboard as option-1 (see that file's comment for the full
// rationale) on the top-nav shell instead of the sidebar shell. Personal activity stats (KPI row)
// stay in the greeting banner at the top - fixed convention - "Needs your attention" is the
// primary content below it.
//
// The two options are also a shell convention meant to carry over to future explorations of the
// same kind: option-1 is the sidebar-nav shell (primary icon rail + contextual sidebar), option-2
// is the top-nav shell (header + primary nav bar). Same underlying screen content, ported between
// both, just hung off a different chrome.
//
// Figma source: https://www.figma.com/design/bgksKvmSaVR7ZptB98LzGr/-HI-FI--Dashboard-Explorations?node-id=53-568
// "SCREEN" - per CONTEXT.md's "Exploratory page layouts (/pages/<page-name>,
// /projects/<page-name>/<variant>)" section. The Figma frame only specifies the header, primary
// nav, and greeting/KPI banner (nothing below y=473 is drawn) - the body below the banner was
// data-heavy metric cards ported from option-1 until the dashboard's actual goals got scoped (see
// CONTEXT.md's "Registered User dashboard scope"); now it's the task list instead.
//
// Note: the account menu in Figma reads "Dewitt, Maya" while the banner greets "Hi, Olivia" -
// an inconsistency in the source file, not something reconciled here; both are rendered verbatim,
// same convention as rendering "[Location]" literally elsewhere.
//
// The primary nav renders the real Registered User IA (lib/registered-user-nav.ts): each
// top-level section is a nav bar item, sections with children open a dropdown on click instead of
// option-1's sidebar accordion - same content, shell-appropriate idiom. Only the two items with a
// real page (`key` set) are actual links.

// This screen's own page key, so its own entry in the dropdown (Home > BioData Dashboard) can show
// a selected state - same fix as dashboard/option-1's "BioData Dashboard" link.
const CURRENT_KEY = "dashboard";

function NavDropdownItem({ node, depth = 0 }: { node: NavNode; depth?: number }) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!node.items?.length;
  const href = node.key ? `/projects/${node.key}/option-2` : undefined;
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
  const href = node.key ? `/projects/${node.key}/option-2` : undefined;
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

// Light-themed - this used to live inside the dark gradient banner, now it's secondary content
// White-on-dark - lives inside the gradient greeting banner at the top of the page, a fixed
// convention (personal stats stay at the top, "Needs your attention" is the primary content below
// it, not the other way around).
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
    <div className={`flex flex-col gap-2 pr-6 ${last ? "" : "border-r border-white/20"}`}>
      <p className="text-2xl font-medium text-white tabular-nums">{value}</p>
      <p className="text-md font-medium text-white">{label}</p>
      <div className="flex items-center gap-1.5 text-sm text-white/60">
        {trend && <TrendUp02 className="size-3.5 text-fg-success-primary" />}
        <span>{note}</span>
        {action && <ArrowNarrowRight className="size-3.5 text-white/60" />}
      </div>
    </div>
  );
}

// One row in the "needs your attention" list - the dashboard's primary content now. `actionHref`
// is only set when there's a real page behind it (project-list, project-detail); DLA requests and
// species nominations don't have one yet, so those rows are status-only, no fake link, same
// "honest, not a placeholder" convention as everywhere else in this build.
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
    <div className="flex flex-col gap-2 rounded-lg border border-secondary bg-primary p-4 sm:flex-row sm:items-center sm:justify-between">
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

// Same array as dashboard/option-1 - one source driving both the rendered list and its count
// badge, so the heading can't drift out of sync with what's shown.
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
  },
];

export default function DashboardOption2Page() {
  return (
    <div className="font-barlow flex min-h-screen flex-col">
      {/* ── Header ── */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-secondary bg-primary pr-9 pl-6">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/dashboard/gov-sa-dew-lockup.png"
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
          <NavTopItem key={section.label} node={section} active={section.label === "Home"} />
        ))}
      </nav>

      {/* ── Greeting/KPI banner: personal activity stats stay at the top, fixed convention - not
          the dashboard's primary content (that's "Needs your attention" below), but always first ── */}
      <div className="bg-secondary px-9 py-8">
        <div className="flex flex-col gap-10 rounded-2xl bg-gradient-to-b from-brand-900 via-brand-800 via-[63.942%] to-brand-700 p-6">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-medium text-white">Hi, Olivia</p>
              <p className="text-md text-white">Your activity at a glance</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button color="secondary" iconLeading={Plus}>Add project</Button>
              <Button color="secondary" iconLeading={Upload01}>Upload dataset</Button>
            </div>
          </div>
          <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
            <KpiStat value="15" label="Species Observed" note="3 up from last week" trend />
            <KpiStat value="3" label="Datasets contributed" note="1 dataset under review" />
            <KpiStat value="2" label="Completed Checklists" note="View all checklists" action last />
          </div>
        </div>
      </div>

      {/* ── Needs your attention: the dashboard's primary content (nav chrome - not pixel-matched).
          flex-1 fills remaining space so the footer sticks to the bottom of the viewport when
          content is short, instead of floating mid-page with dead space below it ── */}
      <div className="flex flex-1 flex-col gap-4 bg-secondary px-9 pb-8">
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

      {/* ── Footer (nav chrome - not pixel-matched) ── */}
      <footer className="flex flex-wrap items-center gap-6 border-t border-secondary bg-primary px-9 py-4 text-[10px] font-semibold tracking-wide text-quaternary uppercase">
        {registeredUserFooterLinks.map((link) => (
          <p key={link}>{link}</p>
        ))}
      </footer>
    </div>
  );
}
