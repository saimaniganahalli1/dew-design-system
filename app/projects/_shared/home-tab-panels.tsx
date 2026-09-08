"use client";

import { useState } from "react";
import { TabPanel } from "react-aria-components";
import { AlertFullWidth } from "@/components/application/alerts/alerts";
import { HomeDashboardContent } from "@/app/projects/_shared/home-dashboard";
import { DataOverviewContent } from "@/app/projects/_shared/data-overview";

// Home's two TabPanels (My Dashboard / Data Overview), plus the alert banner both share. The
// banner used to live inside HomeDashboardContent with its own local dismiss state, so it only
// ever showed on the My Dashboard tab and dismissing it there didn't affect Data Overview -
// flagged directly by the user: it should show on both, and dismissing it in either dismisses it
// in both. Fixed by lifting the one `bannerOpen` state above both TabPanels - react-aria only
// mounts the selected TabPanel, but the state itself lives in this shared parent regardless of
// which panel is currently showing, so switching tabs never gets a stale/independent copy.
export function HomeTabPanels() {
  const [bannerOpen, setBannerOpen] = useState(true);

  const alert = bannerOpen && (
    <AlertFullWidth
      title="This is where alerts go"
      description=""
      confirmLabel="Learn more"
      onClose={() => setBannerOpen(false)}
      className="max-w-none px-6 py-4 md:px-6 md:py-3"
    />
  );

  return (
    <>
      <TabPanel id="dashboard">
        {alert}
        <HomeDashboardContent />
      </TabPanel>
      <TabPanel id="overview">
        {alert}
        <DataOverviewContent />
      </TabPanel>
    </>
  );
}
