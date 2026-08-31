"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import {
  designSystemConfig as defaultConfig,
  type DesignSystemConfig,
} from "@/config/design-system.config";

const STORAGE_KEY = "dew-design-system-config-overrides";

interface ConfigContextValue {
  config: DesignSystemConfig;
  /** Master on/off for a whole component — hides it from sidebar, overview, and /llms.txt. */
  setComponentEnabled: (slug: string, enabled: boolean) => void;
  /** Toggles one entry in a `colors` / `sizes` / `types` list. */
  setVariantEnabled: (slug: string, category: "colors" | "sizes" | "types", key: string, enabled: boolean) => void;
  /** Toggles one boolean flag in a component's `features` map. */
  setFeatureEnabled: (slug: string, feature: string, enabled: boolean) => void;
  /** Discards every override and reverts to the checked-in defaults. */
  resetToDefaults: () => void;
  /** True once localStorage has been read — lets the config page avoid a "reset" flash. */
  hydrated: boolean;
}

const ConfigContext = createContext<ConfigContextValue | null>(null);

function cloneConfig(config: DesignSystemConfig): DesignSystemConfig {
  return JSON.parse(JSON.stringify(config));
}

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<DesignSystemConfig>(() => cloneConfig(defaultConfig));
  const [hydrated, setHydrated] = useState(false);

  // Runs once, client-only — applies any saved overrides on top of the
  // checked-in defaults. Server and first client render both use the
  // plain default, so this can only ever add a change, never mismatch.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setConfig(JSON.parse(raw));
    } catch {
      // Corrupt/unavailable storage — fall back to defaults silently.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Storage full/unavailable — overrides just won't persist this session.
    }
  }, [config, hydrated]);

  const setComponentEnabled = useCallback((slug: string, enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      [slug]: { ...prev[slug], enabled },
    }));
  }, []);

  const setVariantEnabled = useCallback(
    (slug: string, category: "colors" | "sizes" | "types", key: string, enabled: boolean) => {
      setConfig((prev) => {
        const list = prev[slug]?.[category] ?? [];
        return {
          ...prev,
          [slug]: {
            ...prev[slug],
            [category]: list.map((option) => (option.key === key ? { ...option, enabled } : option)),
          },
        };
      });
    },
    [],
  );

  const setFeatureEnabled = useCallback((slug: string, feature: string, enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      [slug]: {
        ...prev[slug],
        features: { ...prev[slug]?.features, [feature]: enabled },
      },
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setConfig(cloneConfig(defaultConfig));
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore — config state is already reset either way.
    }
  }, []);

  return (
    <ConfigContext.Provider
      value={{ config, setComponentEnabled, setVariantEnabled, setFeatureEnabled, resetToDefaults, hydrated }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

/** Live, mutable design-system config. Every doc page reads through this — not the static export — so the /config page's toggles apply immediately, site-wide. */
export function useConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error("useConfig must be used within a ConfigProvider");
  return ctx;
}
