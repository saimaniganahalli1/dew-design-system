"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings01 } from "@untitledui/icons";
import { cn } from "@/lib/utils";
import { useNav } from "@/lib/use-nav";

export function Sidebar() {
  const pathname = usePathname();
  const nav = useNav();

  return (
    <aside className="fixed top-0 left-0 h-screen w-56 flex flex-col border-r overflow-y-auto"
      style={{
        borderColor: "var(--border-default)",
        background: "var(--bg-sidebar)",
      }}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-5"
        style={{ borderBottom: "1px solid var(--color-gray-200)" }}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white"
            style={{ background: "var(--color-brand-600)" }}
          >
            D
          </div>
          <span className="text-sm font-semibold tracking-tight"
            style={{ color: "var(--color-gray-900)" }}
          >
            DEW
          </span>
          <span className="text-xs px-1.5 py-0.5 rounded font-medium"
            style={{
              background: "var(--color-gray-100)",
              color: "var(--color-gray-500)",
            }}
          >
            v0.1
          </span>
        </Link>
      </div>

      {/* Overview / Config links */}
      <div className="px-3 pt-4 flex flex-col gap-0.5">
        <NavLink href="/" active={pathname === "/"} label="Overview" />
        <NavLink href="/config" active={pathname === "/config"} label="Config" icon={Settings01} />
      </div>

      {/* Sections */}
      <nav className="px-3 py-4 flex flex-col gap-6 flex-1">
        {nav.map((section) => (
          <div key={section.title}>
            <p className="px-2 mb-1 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-gray-400)" }}
            >
              {section.title}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.title}
                  active={pathname === item.href}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 text-xs"
        style={{
          borderTop: "1px solid var(--color-gray-200)",
          color: "var(--color-gray-400)",
        }}
      >
        DEW Design System
      </div>
    </aside>
  );
}

function NavLink({
  href,
  label,
  active,
  icon: Icon,
}: {
  href: string;
  label: string;
  active: boolean;
  icon?: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
        active
          ? "font-medium"
          : "hover:bg-[var(--color-gray-100)]"
      )}
      style={{
        color: active ? "var(--color-gray-900)" : "var(--color-gray-600)",
        background: active ? "var(--color-gray-100)" : undefined,
      }}
    >
      {Icon && <Icon size={15} style={{ color: "var(--color-gray-400)" }} />}
      {label}
    </Link>
  );
}
