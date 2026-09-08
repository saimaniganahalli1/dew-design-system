"use client";

import { useState } from "react";
import type React from "react";
import { Folder, File02 } from "@untitledui/icons";
import type { Selection } from "react-aria-components";
import { PageHeader } from "@/components/PageHeader";
import { TreeView } from "@/components/application/tree-view/tree-view";

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-wrap items-start gap-6 rounded-xl border border-secondary bg-secondary p-6">
    <p className="mb-1 w-full text-xs font-semibold text-quaternary uppercase tracking-widest text-balance">
      {label}
    </p>
    {children}
  </div>
);

export default function TreeViewPatternPage() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["design-components"]));

  return (
    <div className="prose-doc">
      <PageHeader
        section="Patterns"
        title="Tree selection"
        description="A multi-select file/folder tree built by composing the Tree view with our base Checkbox - giving hierarchical lists the same checkbox styling, focus ring, and tri-state (indeterminate) treatment used everywhere else in the system."
      />

      <h2 className="text-balance">Why this pattern</h2>
      <p className="text-balance">
        React Aria's <code>Tree</code> handles keyboard navigation, expand/collapse, and selection state, but it doesn't render a
        selection checkbox by itself and has no concept of cascading (tri-state) selection - selecting a parent doesn't select its
        children. <code>TreeView</code> layers both on top: its item content renders <code>CheckboxBase</code> from{" "}
        <code>components/base/checkbox/checkbox.tsx</code> for the selection control, and a small utility (
        <code>cascadeSelection</code> in <code>tree-view-utils.ts</code>) diffs each selection change to propagate it up and down the
        hierarchy and to mark partially-selected parents as indeterminate.
      </p>
      <p className="text-balance">
        The result: reuse the same checkbox visual language (colours, focus-visible ring, disabled state) inside a component that
        would otherwise need its own bespoke selection indicator.
      </p>

      <h2 className="text-balance">Example</h2>
      <p className="text-balance">
        Selecting <strong>Design</strong> selects all of its descendants; selecting only some children of <strong>Engineering</strong>{" "}
        leaves it indeterminate.
      </p>
      <Section label="Multi-select, with connectors">
        <TreeView
          aria-label="Project files"
          selectionMode="multiple"
          showConnectors
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          className="w-full max-w-sm"
        >
          <TreeView.Item id="design" textValue="Design">
            <TreeView.ItemContent icon={Folder}>Design</TreeView.ItemContent>
            <TreeView.Item id="design-components" textValue="Components">
              <TreeView.ItemContent icon={File02}>Components</TreeView.ItemContent>
            </TreeView.Item>
            <TreeView.Item id="design-wireframes" textValue="Wireframes">
              <TreeView.ItemContent icon={File02}>Wireframes</TreeView.ItemContent>
            </TreeView.Item>
          </TreeView.Item>
          <TreeView.Item id="engineering" textValue="Engineering">
            <TreeView.ItemContent icon={Folder}>Engineering</TreeView.ItemContent>
            <TreeView.Item id="engineering-api" textValue="API">
              <TreeView.ItemContent icon={File02}>API</TreeView.ItemContent>
            </TreeView.Item>
            <TreeView.Item id="engineering-frontend" textValue="Frontend">
              <TreeView.ItemContent icon={File02}>Frontend</TreeView.ItemContent>
            </TreeView.Item>
          </TreeView.Item>
        </TreeView>
      </Section>

      <h2 className="text-balance">Usage</h2>
      <pre className="overflow-x-auto rounded-xl border border-secondary bg-secondary p-5">
        <code className="font-mono text-[13px] text-secondary">
{`import { TreeView } from "@/components/application/tree-view/tree-view";
import { Folder, File02 } from "@untitledui/icons";

<TreeView aria-label="Project files" selectionMode="multiple" showConnectors>
  <TreeView.Item id="design" textValue="Design">
    <TreeView.ItemContent icon={Folder}>Design</TreeView.ItemContent>
    <TreeView.Item id="design-components" textValue="Components">
      <TreeView.ItemContent icon={File02}>Components</TreeView.ItemContent>
    </TreeView.Item>
  </TreeView.Item>
</TreeView>`}
        </code>
      </pre>
      <p className="text-balance">
        The checkbox only appears when <code>selectionMode</code> is <code>"single"</code> or <code>"multiple"</code>; leave it{" "}
        <code>"none"</code> (the default) for a plain navigable tree.
      </p>

      <h2 className="text-balance">Notes</h2>
      <ul>
        <li>Selection checkboxes are always rendered at the <code>sm</code> checkbox size, regardless of the tree's own <code>size</code> prop.</li>
        <li>Indeterminate parents render with the same dash glyph as a standalone indeterminate <code>Checkbox</code>.</li>
        <li>This is a composition pattern, not a standalone component - see <code>components/application/tree-view/tree-view.tsx</code> for the implementation.</li>
      </ul>
    </div>
  );
}
