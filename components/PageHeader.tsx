import type { ReactNode } from "react";

type PageHeaderProps = {
  section?: string;
  title: string;
  description?: string;
  /** Optional right-aligned slot, e.g. a "Config" trigger button. */
  actions?: ReactNode;
};

export function PageHeader({ section, title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-10 flex items-start justify-between gap-6 border-b border-secondary pb-6">
      <div>
        {section && (
          <p className="mb-2 text-xs font-semibold text-quaternary uppercase tracking-widest text-balance">
            {section}
          </p>
        )}
        <h1 className="mb-2 text-2xl font-semibold text-primary tracking-tight text-balance" style={{ letterSpacing: "-0.03em" }}>
          {title}
        </h1>
        {description && (
          <p className="text-sm text-quaternary text-balance" style={{ maxWidth: "560px", lineHeight: "1.7" }}>
            {description}
          </p>
        )}
      </div>
      {actions && <div className="shrink-0 pt-1">{actions}</div>}
    </div>
  );
}
