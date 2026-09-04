import { Sidebar } from "@/components/Sidebar";

// This is the doc site's own shell (Sidebar + constrained content column),
// scoped to the `(docs)` route group so it applies to every documented
// page (primitives, components, patterns, /test-*, home, llms.txt) without
// affecting routes outside the group, e.g. /pages/<page-name> full-screen
// previews - see app/pages/**, which intentionally render with no sidebar.
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="ml-56 min-h-screen max-w-5xl px-12 py-10">{children}</main>
    </>
  );
}
