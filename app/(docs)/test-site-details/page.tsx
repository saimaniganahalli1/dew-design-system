"use client";

import { useState } from "react";
import type React from "react";
import { ChevronDown, Plus, Trash01, UploadCloud01, CheckCircle } from "@untitledui/icons";
import { PageHeader } from "@/components/PageHeader";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { Select } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Inspectable, InspectorProvider, type InspectableToken } from "@/components/scaffold/token-inspector";

// Figma source: https://www.figma.com/design/SQ58QgwP9Xz0uo3tBpuf6e/DEW-Toolkit--version-1.0-?node-id=88-11339
// "Site" (5 Accordion sections: Site Details, Observers, Location Information,
// Photopoint, Additional Details) - read-only view mapped 1:1, edit view built
// from the field-type annotations Figma attaches to each row (data-annotations
// in the pulled design context, e.g. "Ctrl vocab", "Yes/No", "Number Text Field").
// Per CONTEXT.md's "Generated screens" rules: real DEW components only, gaps
// flagged with a visible marker in place, never faked or silently dropped.

// ─────────────────────────────────────────────────────────────────────────
// Local screen chrome - NOT real DEW components. Accordion, in particular, is
// used 5 times identically in Figma - a strong signal it should eventually be
// a real ingested DEW component - but nothing under this name exists in
// components/base/** today, so it's composed here from real tokens
// (border-brand-100 / text-brand-tertiary / border-secondary) rather than
// invented as a fake "DEW Accordion". Flagged in the gap table below.
// ─────────────────────────────────────────────────────────────────────────

function Accordion({
  title,
  children,
  defaultOpen = true,
  inspectTokens,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  inspectTokens?: InspectableToken[];
}) {
  const [open, setOpen] = useState(defaultOpen);
  const titleEl = <p className="flex-1 text-md font-medium text-brand-tertiary">{title}</p>;
  return (
    <div className="w-full overflow-hidden rounded-lg" style={{ border: "1px solid var(--color-brand-100)" }}>
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-3 bg-primary px-4 py-3 text-left">
        {inspectTokens ? (
          <Inspectable label="Accordion (composed, not a real component)" source="app/test-site-details/page.tsx" tokens={inspectTokens} className="flex-1">
            {titleEl}
          </Inspectable>
        ) : (
          titleEl
        )}
        <ChevronDown className={`size-5 shrink-0 text-quaternary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="flex flex-col gap-4 border-t bg-primary p-4" style={{ borderColor: "var(--color-brand-100)" }}>
          {children}
        </div>
      )}
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div className="flex w-full gap-12 text-sm">
      <p className="w-[180px] shrink-0 text-secondary">{label}</p>
      <div className="flex-1 font-medium text-primary">{value ?? <span className="text-quaternary">-</span>}</div>
    </div>
  );
}

// Gap marker - no Textarea in components/base/** either.
function GapField({ note }: { note: string }) {
  return (
    <div className="flex flex-1 items-center gap-2 rounded-lg border border-dashed p-3" style={{ borderColor: "var(--color-gray-300)" }}>
      <span
        className="flex size-5 shrink-0 items-center justify-center rounded text-xs font-semibold"
        style={{ background: "var(--color-gray-100)", color: "var(--color-gray-400)" }}
      >
        ?
      </span>
      <span className="text-sm text-quaternary">{note}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Read-only data - matches the Figma frame's example values (Site - 5034,
// STO-001-02) where shown; everything else Figma showed as "-" stays "-".
// ─────────────────────────────────────────────────────────────────────────

const coordRows = ["Zone", "Easting", "Northing", "Latitude", "Longitude"];

const locationOptions = [
  { id: "gps", label: "GPS" },
  { id: "manual", label: "Manual entry" },
  { id: "shapefile-derived", label: "Shapefile derived" },
  { id: "estimated", label: "Estimated" },
];
const datumOptions = [
  { id: "gda2020", label: "GDA2020" },
  { id: "gda94", label: "GDA94" },
  { id: "wgs84", label: "WGS84" },
];
const reliabilityOptions = [
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
  { id: "estimated", label: "Estimated" },
];
const propertyOptions = [
  { id: "land-tenure", label: "Land tenure" },
  { id: "vegetation-type", label: "Vegetation type" },
  { id: "soil-type", label: "Soil type" },
  { id: "access-notes", label: "Access notes" },
  { id: "fencing-status", label: "Fencing status" },
];
const observerOptions = [
  { id: "olivia", label: "Olivia Wyatt", supportingText: "olivia@dew.design" },
  { id: "phoenix", label: "Phoenix Baker", supportingText: "phoenix@dew.design" },
  { id: "lana", label: "Lana Steiner", supportingText: "lana@dew.design" },
];

const inputTokens: InspectableToken[] = [
  { cls: "bg-primary", cssVar: "--ui-bg-primary", value: "#FFFFFF", swatch: true },
  { cls: "ring-primary", cssVar: "--ui-ring-primary → --color-gray-300", value: "#D2D0CE", swatch: true },
  { cls: "ring-brand (focus)", cssVar: "--ui-ring-brand → --color-brand-500", value: "#2A667C", swatch: true },
];
const selectTokens: InspectableToken[] = [
  { cls: "bg-primary", cssVar: "--ui-bg-primary", value: "#FFFFFF", swatch: true },
  { cls: "ring-primary", cssVar: "--ui-ring-primary → --color-gray-300", value: "#D2D0CE", swatch: true },
  { cls: "text-fg-quaternary (chevron)", cssVar: "--color-fg-quaternary → --color-gray-500", value: "#8F8B87", swatch: true },
];
const toggleTokens: InspectableToken[] = [
  { cls: "bg-brand-solid (on)", cssVar: "--ui-bg-brand-solid → --color-brand-600", value: "#185E74", swatch: true },
  { cls: "bg-tertiary (off)", cssVar: "--ui-bg-tertiary → --color-gray-100", value: "#F2F2F1", swatch: true },
];
const radioTokens: InspectableToken[] = [
  { cls: "bg-brand-solid ring-brand-solid (selected)", cssVar: "--ui-bg-brand-solid → --color-brand-600", value: "#185E74", swatch: true },
  { cls: "ring-primary (unselected)", cssVar: "--ui-ring-primary → --color-gray-300", value: "#D2D0CE", swatch: true },
];
const ghostButtonTokens: InspectableToken[] = [
  { cls: 'color="tertiary"', cssVar: "n/a - DEW's ghost equivalent", value: "no bg, no border" },
  { cls: "text-tertiary", cssVar: "--ui-text-tertiary → --color-gray-600", value: "#706B68", swatch: true },
  { cls: "hover:bg-primary_hover", cssVar: "--ui-bg-primary_hover → --color-gray-50", value: "#F8F8F7", swatch: true },
];
const accordionTokens: InspectableToken[] = [
  { cls: "border-brand-100 (composed, not a real component)", cssVar: "--color-brand-100", value: "#DCECEF", swatch: true },
  { cls: "text-brand-tertiary", cssVar: "--ui-text-brand-tertiary → --color-brand-600", value: "#185E74", swatch: true },
];

const mapping = [
  { layer: "Accordion (×5 sections)", figma: "Accordion, always open in this frame", dew: "Composed - not a real component", note: "border-brand-100 / text-brand-tertiary tokens. Used identically 5×; strong candidate for real ingest." },
  { layer: "Text Field / Free text / Number Text Field", figma: "Single-line input", dew: "Input", note: "components/base/input/input.tsx" },
  { layer: "Ctrl vocab", figma: "Controlled vocabulary dropdown", dew: "Select", note: "Location Method, Datum, Reliability, Property name" },
  { layer: "Yes/No", figma: "Binary field", dew: "Toggle", note: "Mud Map, Photopoint Marker Present" },
  { layer: "Radio", figma: "Mutually-exclusive choice", dew: "RadioButton / RadioGroup", note: "Location Details (shapefile vs. coordinates). Was ?-blocked - swapped for the real component the moment components/base/radio-buttons/** was ingested, per CONTEXT.md's flow-through rule." },
  { layer: "Two Values with unit / Degrees", figma: "Number input + unit suffix", dew: "InputGroup + InputBase (number)", note: "Sample Site Dimensions, Photopoint Direction" },
  { layer: "Shapefile upload", figma: "Dropzone card + uploaded-file row (see reference screenshot)", dew: "Composed - not a real component", note: "components/base/input/input-file.tsx exists but is a text-field+button row, not this drag-and-drop card style - composed from FeaturedIcon + Button + tokens instead of forcing a visual mismatch" },
  { layer: "System Generated (Site ID)", figma: "Read-only, system-assigned", dew: "Plain text, not editable", note: "Never rendered as an editable field, in view or edit mode" },
  { layer: "+ Add Properties / + Add Observer", figma: "Ghost-style action button", dew: 'Button color="tertiary"', note: "DEW's tertiary = no border/bg, hover fill - exactly \"ghost\". Real component, not a gap." },
];

export default function TestSiteDetailsPage() {
  const [mode, setMode] = useState<"view" | "edit">("edit");

  // Site Details
  const [siteName, setSiteName] = useState("");
  const [siteGrouping, setSiteGrouping] = useState("");
  const [propertyDetails, setPropertyDetails] = useState("");
  const [altitude, setAltitude] = useState("");
  const [mudMap, setMudMap] = useState(false);
  const [paddock, setPaddock] = useState("");

  // Observers - one shown by default (rule 3)
  const [observerCount, setObserverCount] = useState(1);

  // Location - shapefile XOR coordinates (rule 1)
  const [locationMode, setLocationMode] = useState<"shapefile" | "coordinates">("shapefile");
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [locationMethod, setLocationMethod] = useState<string | undefined>();
  const [datum, setDatum] = useState<string | undefined>();
  const [reliability, setReliability] = useState<string | undefined>();

  // Photopoint
  const [photoSeqNo, setPhotoSeqNo] = useState("");
  const [markerPresent, setMarkerPresent] = useState(false);
  const [discNumber, setDiscNumber] = useState("");
  const [direction, setDirection] = useState("");

  // Additional Details / Properties - three shown by default (rule 2)
  const [propertyCount, setPropertyCount] = useState(3);

  return (
    <InspectorProvider>
      <div className="mx-auto max-w-4xl px-8 py-10 font-barlow">
        <PageHeader
          section="Test"
          title="Site Details"
          description="Read/edit smoke test for Figma node 88:11339 - verifying every field type annotation maps to a real DEW component before this becomes a production screen."
          actions={
            mode === "view" ? (
              <Button color="primary" onClick={() => setMode("edit")}>Edit</Button>
            ) : (
              <div className="flex gap-2">
                <Button color="secondary" onClick={() => setMode("view")}>Cancel</Button>
                <Button color="primary" onClick={() => setMode("view")}>Save</Button>
              </div>
            )
          }
        />

        <div className="flex flex-col gap-4">
          {/* ── Site Details ── */}
          <Accordion title="Site Details" inspectTokens={accordionTokens}>
            {mode === "view" ? (
              <>
                <FieldRow label="Site ID" value="Site - 5034" />
                <FieldRow label="Site Name" value="STO-001-02" />
                <FieldRow label="Site Grouping" />
                <FieldRow label="Specific Property Details" />
                <FieldRow label="Altitude" />
                <FieldRow label="Mud Map" />
                <FieldRow label="Paddock" />
              </>
            ) : (
              <>
                <FieldRow label="Site ID" value="Site - 5034" />
                <div className="flex w-full gap-12">
                  <p className="w-[180px] shrink-0 pt-2 text-sm text-secondary">Site Name</p>
                  <div className="max-w-sm flex-1">
                    <Inspectable label="Input" source="components/base/input/input.tsx" tokens={inputTokens}>
                      <Input aria-label="Site Name" placeholder="Enter site name" value={siteName} onChange={setSiteName} />
                    </Inspectable>
                  </div>
                </div>
                <div className="flex w-full gap-12">
                  <p className="w-[180px] shrink-0 pt-2 text-sm text-secondary">Site Grouping</p>
                  <div className="max-w-sm flex-1">
                    <Input aria-label="Site Grouping" placeholder="Enter site grouping" value={siteGrouping} onChange={setSiteGrouping} />
                  </div>
                </div>
                <div className="flex w-full gap-12">
                  <p className="w-[180px] shrink-0 pt-2 text-sm text-secondary">Specific Property Details</p>
                  <div className="max-w-sm flex-1">
                    <Input aria-label="Specific Property Details" placeholder="Enter details" value={propertyDetails} onChange={setPropertyDetails} />
                  </div>
                </div>
                <div className="flex w-full gap-12">
                  <p className="w-[180px] shrink-0 pt-2 text-sm text-secondary">Altitude</p>
                  <div className="max-w-[160px] flex-1">
                    <InputGroup trailingAddon={<InputGroup.Prefix position="trailing">m</InputGroup.Prefix>}>
                      <InputBase aria-label="Altitude" type="number" placeholder="0" value={altitude} onChange={(e) => setAltitude(e.target.value)} />
                    </InputGroup>
                  </div>
                </div>
                <div className="flex w-full items-center gap-12">
                  <p className="w-[180px] shrink-0 text-sm text-secondary">Mud Map</p>
                  <Inspectable label="Toggle" source="components/base/toggle/toggle.tsx" tokens={toggleTokens}>
                    <Toggle aria-label="Mud Map" isSelected={mudMap} onChange={setMudMap} />
                  </Inspectable>
                </div>
                <div className="flex w-full gap-12">
                  <p className="w-[180px] shrink-0 pt-2 text-sm text-secondary">Paddock</p>
                  <div className="max-w-sm flex-1">
                    <Input aria-label="Paddock" placeholder="Enter paddock" value={paddock} onChange={setPaddock} />
                  </div>
                </div>
              </>
            )}
          </Accordion>

          {/* ── Observers ── */}
          <Accordion title="Observers">
            {mode === "view" ? (
              <>
                <FieldRow label="Observer 1" />
                <FieldRow label="Observer 2" />
                <FieldRow label="Observer 3" />
              </>
            ) : (
              <>
                {Array.from({ length: observerCount }).map((_, i) => (
                  <div key={i} className="flex w-full gap-12">
                    <p className="w-[180px] shrink-0 pt-2 text-sm text-secondary">Observer {i + 1}</p>
                    <div className="max-w-sm flex-1">
                      <Select aria-label={`Observer ${i + 1}`} placeholder="Select observer" items={observerOptions}>
                        {(item) => <Select.Item {...item}>{item.label}</Select.Item>}
                      </Select>
                    </div>
                  </div>
                ))}
                <Button color="tertiary" size="sm" iconLeading={Plus} onClick={() => setObserverCount((c) => Math.min(c + 1, observerOptions.length))} className="w-max">
                  Add Observer
                </Button>
              </>
            )}
          </Accordion>

          {/* ── Location Information ── */}
          <Accordion title="Location Information">
            {mode === "view" ? (
              <>
                <div className="aspect-[792/219] w-full rounded-lg bg-secondary" />
                <FieldRow label="Shapefile" value={<span className="font-semibold text-brand-secondary">Shapefile.shp</span>} />
                <div className="flex w-full gap-12">
                  <p className="w-[180px] shrink-0 text-sm text-secondary">Coordinates</p>
                  <div className="flex-1 overflow-hidden rounded-lg border border-secondary shadow-xs">
                    <div className="grid grid-cols-3 bg-secondary text-xs font-semibold text-quaternary">
                      <div className="px-3 py-2">Coordinate</div>
                      <div className="px-3 py-2">Entered Value</div>
                      <div className="px-3 py-2">GDA2020 Equivalent</div>
                    </div>
                    {coordRows.map((r) => (
                      <div key={r} className="grid grid-cols-3 border-t border-secondary text-sm">
                        <div className="px-3 py-2 font-medium text-primary">{r}</div>
                        <div className="px-3 py-2 text-tertiary">-</div>
                        <div className="px-3 py-2 text-tertiary">-</div>
                      </div>
                    ))}
                  </div>
                </div>
                <FieldRow label="Location Method" value={<span className="text-secondary">12 <span className="font-medium text-primary">[Location method name]</span></span>} />
                <FieldRow label="Datum" />
                <FieldRow label="Reliability" />
                <FieldRow label="Sample Site Dimensions" />
                <FieldRow label="Location Comment" />
              </>
            ) : (
              <>
                <div className="flex w-full gap-12">
                  <p className="w-[180px] shrink-0 pt-2 text-sm text-secondary">Location Details</p>
                  <div className="flex-1">
                    <Inspectable label="RadioGroup" source="components/base/radio-buttons/radio-buttons.tsx" tokens={radioTokens} className="mb-3">
                      <RadioGroup
                        orientation="horizontal"
                        size="sm"
                        value={locationMode}
                        onChange={(value) => setLocationMode(value as "shapefile" | "coordinates")}
                        aria-label="Location Details"
                      >
                        <RadioButton value="shapefile" label="Upload Shape file" />
                        <RadioButton value="coordinates" label="Define Coordinates" />
                      </RadioGroup>
                    </Inspectable>

                    {locationMode === "shapefile" ? (
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-secondary p-8 text-center">
                          <FeaturedIcon icon={UploadCloud01} size="md" color="gray" theme="modern" />
                          <p className="text-sm">
                            <Button color="link-color" size="sm" onClick={() => setUploadedFile({ name: "Cleland National Park.shp", size: "200 KB" })}>
                              Click to upload
                            </Button>{" "}
                            <span className="text-tertiary">or drag and drop</span>
                          </p>
                          <p className="max-w-sm text-xs text-quaternary">
                            <span className="font-semibold">File formats:</span> .geojson or a .shp file. Please ensure your shapefile is in WGS84 EPSG:4236
                            (latitude, longitude) projection. The area must be less than 25,000km2.
                          </p>
                        </div>
                        {uploadedFile && (
                          <Inspectable label="Composed uploaded-file row (not a real component)" source="app/test-site-details/page.tsx" tokens={inputTokens}>
                            <div className="flex items-center gap-3 rounded-lg border border-secondary p-3">
                              <div
                                className="flex size-9 shrink-0 items-center justify-center rounded text-[10px] font-bold text-white"
                                style={{ background: "var(--color-error-600)" }}
                              >
                                SHP
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-primary">{uploadedFile.name}</p>
                                <p className="flex items-center gap-1 text-xs text-tertiary">
                                  {uploadedFile.size}
                                  <CheckCircle className="size-3.5 text-fg-success-primary" /> 100%
                                </p>
                              </div>
                              <button type="button" onClick={() => setUploadedFile(null)} aria-label="Remove file">
                                <Trash01 className="size-4 text-fg-quaternary" />
                              </button>
                            </div>
                          </Inspectable>
                        )}
                      </div>
                    ) : (
                      <div className="grid max-w-md grid-cols-2 gap-3">
                        {coordRows.map((r) => (
                          <Input key={r} aria-label={r} label={r} placeholder="0" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex w-full gap-12">
                  <p className="w-[180px] shrink-0 pt-2 text-sm text-secondary">Location Method</p>
                  <div className="max-w-sm flex-1">
                    <Inspectable label="Select" source="components/base/select/select.tsx" tokens={selectTokens}>
                      <Select aria-label="Location Method" placeholder="Select method" items={locationOptions} selectedKey={locationMethod} onSelectionChange={(k) => setLocationMethod(k as string)}>
                        {(item) => <Select.Item {...item}>{item.label}</Select.Item>}
                      </Select>
                    </Inspectable>
                  </div>
                </div>
                <div className="flex w-full gap-12">
                  <p className="w-[180px] shrink-0 pt-2 text-sm text-secondary">Datum</p>
                  <div className="max-w-sm flex-1">
                    <Select aria-label="Datum" placeholder="Select datum" items={datumOptions} selectedKey={datum} onSelectionChange={(k) => setDatum(k as string)}>
                      {(item) => <Select.Item {...item}>{item.label}</Select.Item>}
                    </Select>
                  </div>
                </div>
                <div className="flex w-full gap-12">
                  <p className="w-[180px] shrink-0 pt-2 text-sm text-secondary">Reliability</p>
                  <div className="max-w-sm flex-1">
                    <Select aria-label="Reliability" placeholder="Select reliability" items={reliabilityOptions} selectedKey={reliability} onSelectionChange={(k) => setReliability(k as string)}>
                      {(item) => <Select.Item {...item}>{item.label}</Select.Item>}
                    </Select>
                  </div>
                </div>
                <div className="flex w-full gap-12">
                  <p className="w-[180px] shrink-0 pt-2 text-sm text-secondary">Sample Site Dimensions</p>
                  <div className="flex max-w-sm flex-1 gap-3">
                    <InputGroup trailingAddon={<InputGroup.Prefix position="trailing">m</InputGroup.Prefix>}>
                      <InputBase aria-label="Width" type="number" placeholder="Width" />
                    </InputGroup>
                    <InputGroup trailingAddon={<InputGroup.Prefix position="trailing">m</InputGroup.Prefix>}>
                      <InputBase aria-label="Length" type="number" placeholder="Length" />
                    </InputGroup>
                  </div>
                </div>
                <div className="flex w-full gap-12">
                  <p className="w-[180px] shrink-0 pt-2 text-sm text-secondary">Location Comment</p>
                  <GapField note="Textarea - not in DEW yet (2000-word comment field)" />
                </div>
              </>
            )}
          </Accordion>

          {/* ── Photopoint ── */}
          <Accordion title="Photopoint">
            {mode === "view" ? (
              <>
                <FieldRow label="Photo Seq No" />
                <FieldRow label="Photopoint Marker Present" />
                <FieldRow label="Photopoint Disc Number" />
                <FieldRow label="Photopoint Direction" />
              </>
            ) : (
              <>
                <div className="flex w-full gap-12">
                  <p className="w-[180px] shrink-0 pt-2 text-sm text-secondary">Photo Seq No</p>
                  <div className="max-w-[160px] flex-1">
                    <Input aria-label="Photo Seq No" type="number" placeholder="0" value={photoSeqNo} onChange={setPhotoSeqNo} />
                  </div>
                </div>
                <div className="flex w-full items-center gap-12">
                  <p className="w-[180px] shrink-0 text-sm text-secondary">Photopoint Marker Present</p>
                  <Toggle aria-label="Photopoint Marker Present" isSelected={markerPresent} onChange={setMarkerPresent} />
                </div>
                <div className="flex w-full gap-12">
                  <p className="w-[180px] shrink-0 pt-2 text-sm text-secondary">Photopoint Disc Number</p>
                  <div className="max-w-sm flex-1">
                    <Input aria-label="Photopoint Disc Number" placeholder="Enter disc number" value={discNumber} onChange={setDiscNumber} />
                  </div>
                </div>
                <div className="flex w-full gap-12">
                  <p className="w-[180px] shrink-0 pt-2 text-sm text-secondary">Photopoint Direction</p>
                  <div className="max-w-[160px] flex-1">
                    <InputGroup trailingAddon={<InputGroup.Prefix position="trailing">°</InputGroup.Prefix>}>
                      <InputBase aria-label="Photopoint Direction" type="number" placeholder="0" value={direction} onChange={(e) => setDirection(e.target.value)} />
                    </InputGroup>
                  </div>
                </div>
              </>
            )}
          </Accordion>

          {/* ── Additional Details (Properties) ── */}
          <Accordion title="Additional Details">
            {mode === "view" ? (
              <>
                <FieldRow label="[Custom field name]" value={<span className="block text-xs font-normal text-tertiary">Description</span>} />
                <FieldRow label="[Custom field name]" value={<span className="block text-xs font-normal text-tertiary">Description</span>} />
                <FieldRow label="[Custom field name]" value={<span className="block text-xs font-normal text-tertiary">Description</span>} />
              </>
            ) : (
              <>
                {Array.from({ length: propertyCount }).map((_, i) => (
                  <div key={i} className="flex w-full gap-12">
                    <div className="w-[180px] shrink-0 pt-2">
                      <Select aria-label={`Property ${i + 1} name`} size="sm" placeholder="Select property" items={propertyOptions}>
                        {(item) => <Select.Item {...item}>{item.label}</Select.Item>}
                      </Select>
                    </div>
                    <div className="max-w-sm flex-1">
                      <Input aria-label={`Property ${i + 1} value`} placeholder="Enter value" />
                    </div>
                  </div>
                ))}
                <Inspectable label='Button color="tertiary" (DEW ghost)' source="components/base/buttons/button.tsx" tokens={ghostButtonTokens} className="w-max">
                  <Button color="tertiary" size="sm" iconLeading={Plus} onClick={() => setPropertyCount((c) => Math.min(c + 1, propertyOptions.length))}>
                    Add Properties
                  </Button>
                </Inspectable>
              </>
            )}
          </Accordion>
        </div>

        {/* ── Component mapping ── */}
        <div className="mt-12">
          <h2 className="mb-2 text-xl font-semibold text-primary">Component mapping</h2>
          <p className="mb-4 text-sm text-tertiary">Every Figma field-type annotation traced to the DEW component (or honest gap) that renders it.</p>
          <div className="overflow-hidden rounded-lg border border-secondary">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-xs text-quaternary">
                <tr>
                  <th className="px-3 py-2 font-semibold">Figma annotation</th>
                  <th className="px-3 py-2 font-semibold">Figma layer</th>
                  <th className="px-3 py-2 font-semibold">DEW mapping</th>
                  <th className="px-3 py-2 font-semibold">Note</th>
                </tr>
              </thead>
              <tbody>
                {mapping.map((m) => (
                  <tr key={m.layer} className="border-t border-secondary align-top">
                    <td className="px-3 py-2 font-medium text-primary">{m.layer}</td>
                    <td className="px-3 py-2 text-tertiary">{m.figma}</td>
                    <td className="px-3 py-2"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs">{m.dew}</code></td>
                    <td className="px-3 py-2 text-tertiary">{m.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-8 mb-2 text-xl font-semibold text-primary">New components identified (not blocking)</h2>
          <p className="mb-4 text-sm text-tertiary">
            One gap remains open while mapping this screen - it doesn&apos;t block the rest of it. It&apos;s marked with a visible <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">?</code> in
            the edit view above, per the convention in <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">CONTEXT.md</code>. Radio was the same kind of gap until{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">components/base/radio-buttons/**</code> was ingested - its <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">?</code> was swapped for the real{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">RadioButton</code>/<code className="rounded bg-secondary px-1.5 py-0.5 text-xs">RadioGroup</code> above the moment that landed, per CONTEXT.md&apos;s
            &quot;flow-through&quot; rule.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Textarea", note: "Location Comment (2000 words)" },
              { label: "Accordion", note: "Structural - composed from tokens, not \"?\"-blocked (see mapping table)" },
            ].map((g) => (
              <div key={g.label} className="flex w-56 flex-col items-center gap-2 rounded-xl p-6" style={{ border: "1.5px dashed var(--color-gray-300)", background: "var(--color-gray-50)" }}>
                <div className="flex size-9 items-center justify-center rounded-lg text-lg font-semibold" style={{ background: "var(--color-gray-200)", color: "var(--color-gray-500)" }}>
                  ?
                </div>
                <p className="text-center text-xs text-quaternary">{g.label}</p>
                <p className="text-center text-[11px] text-quaternary">{g.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InspectorProvider>
  );
}
