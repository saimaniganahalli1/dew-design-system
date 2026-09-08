"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Key } from "react-aria-components";
import { SearchMd } from "@untitledui/icons";
import { ComboBox } from "@/components/base/select/combobox";
import { SelectItem } from "@/components/base/select/select-item";
import { searchableProjects } from "@/app/projects/_shared/project-list-content";

// The header search, made real - scoped to projects only for now, per the user directly ("just
// for projects"). Datasets and species stay in the placeholder text (the brief always described
// searching all three) but aren't wired, since neither has example content to search against yet.
//
// Built on the real ComboBox (react-aria's AriaComboBox + our Popover/SelectItem), not a
// hand-rolled input+dropdown - the same "only base components" rule applied everywhere else in
// this build. The wrapper component doesn't auto-filter its `items` (it just renders whatever
// array it's given), so filtering-as-you-type is done here, the same manual `.filter()` approach
// ProjectSwitcher already uses.
export function GlobalProjectSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const filtered = query ? searchableProjects.filter((project) => project.label.toLowerCase().includes(query.toLowerCase())) : searchableProjects;

  return (
    <ComboBox
      aria-label="Search for projects, datasets or species"
      placeholder="Search for projects, datasets or species"
      icon={SearchMd}
      shortcut={false}
      inputValue={query}
      onInputChange={setQuery}
      items={filtered}
      onSelectionChange={(id: Key | null) => {
        const project = searchableProjects.find((p) => p.id === id);
        router.push(project?.href ?? "/projects/project-list/option-1");
      }}
    >
      {(item) => <SelectItem id={item.id} label={item.label} supportingText={item.supportingText} />}
    </ComboBox>
  );
}
