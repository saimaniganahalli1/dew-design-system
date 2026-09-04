import { PageHeader } from "@/components/PageHeader";

type PlaceholderPageProps = {
  section: string;
  title: string;
  description?: string;
};

export function PlaceholderPage({ section, title, description }: PlaceholderPageProps) {
  return (
    <div className="prose-doc">
      <PageHeader
        section={section}
        title={title}
        description={description ?? `Documentation for the ${title} ${section.toLowerCase()} is coming soon.`}
      />

      <div
        className="rounded-xl flex flex-col items-center justify-center py-20 gap-3"
        style={{
          border: "1.5px dashed var(--color-gray-300)",
          background: "var(--color-gray-50)",
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "var(--color-gray-200)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="5" width="12" height="8" rx="1.5" stroke="var(--color-gray-500)" strokeWidth="1.25" />
            <path d="M5 5V4a3 3 0 0 1 6 0v1" stroke="var(--color-gray-500)" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-sm font-medium text-balance" style={{ color: "var(--color-gray-500)" }}>
          In progress
        </p>
        <p className="text-xs text-balance" style={{ color: "var(--color-gray-400)" }}>
          This page will be documented as the component is built.
        </p>
      </div>
    </div>
  );
}
