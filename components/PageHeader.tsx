type PageHeaderProps = {
  section?: string;
  title: string;
  description?: string;
};

export function PageHeader({ section, title, description }: PageHeaderProps) {
  return (
    <div className="mb-10" style={{ borderBottom: "1px solid var(--color-gray-200)", paddingBottom: "24px" }}>
      {section && (
        <p className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--color-gray-400)" }}
        >
          {section}
        </p>
      )}
      <h1 className="text-2xl font-semibold tracking-tight mb-2"
        style={{ color: "var(--color-gray-900)", letterSpacing: "-0.03em" }}
      >
        {title}
      </h1>
      {description && (
        <p className="text-sm" style={{ color: "var(--color-gray-500)", maxWidth: "560px", lineHeight: "1.7" }}>
          {description}
        </p>
      )}
    </div>
  );
}
