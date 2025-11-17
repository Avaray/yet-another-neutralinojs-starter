import { useEffect, useRef, useState } from "react";
import { storage, window as W } from "@neutralinojs/lib";
import { useTranslation } from "react-i18next";
import { ThemesDrawer } from "../components/ThemeSwitcher";

interface AppSettings {
  windowMode: "normal" | "maximized" | "fullscreen";
  windowSize: { width: number; height: number };
  language: string;
  theme: string;
}

const STORAGE_KEY = "appSettings";

export default function Settings() {
  const { t, i18n } = useTranslation();

  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Refs to prevent infinite loops and track what actually changed
  const languageRef = useRef(i18n.language);
  const isSavingRef = useRef(false);
  const lastSavedSettingsRef = useRef<string>("");
  const hasLoadedRef = useRef(false); // Ensure we only load once EVER
  const isChangingLanguageRef = useRef(false); // Prevent double language changes
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Debounce saves

  // Load settings from storage on mount - ONLY ONCE
  useEffect(() => {
    if (hasLoadedRef.current) {
      console.log("Already loaded settings, skipping");
      return; // Already loaded, don't load again
    }

    async function loadSettings() {
      console.log("Loading settings from storage...");
      hasLoadedRef.current = true; // Set this IMMEDIATELY to prevent any race conditions

      try {
        const stored = await storage.getData(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as AppSettings;
          console.log("Loaded settings:", parsed);
          setSettings(parsed);
          languageRef.current = parsed.language;
          lastSavedSettingsRef.current = stored; // Track what was loaded
        } else {
          // No stored settings, create defaults
          const defaults: AppSettings = {
            windowMode: "normal",
            windowSize: { width: 800, height: 600 },
            language: i18n.language || "en",
            theme: document.documentElement.getAttribute("data-theme") ||
              "light",
          };
          console.log("No stored settings, using defaults:", defaults);
          setSettings(defaults);
          languageRef.current = defaults.language;
          lastSavedSettingsRef.current = JSON.stringify(defaults);
        }
      } catch (error) {
        console.warn("Failed to load settings", error);
        // Set defaults on error
        const defaults: AppSettings = {
          windowMode: "normal",
          windowSize: { width: 800, height: 600 },
          language: i18n.language || "en",
          theme: document.documentElement.getAttribute("data-theme") || "light",
        };
        setSettings(defaults);
        languageRef.current = defaults.language;
        lastSavedSettingsRef.current = JSON.stringify(defaults);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - run only once on mount

  // Save settings to storage when they change (but not during initial load)
  useEffect(() => {
    if (isLoading || !settings || isSavingRef.current) {
      return;
    }

    // Check if settings actually changed
    const currentSettingsStr = JSON.stringify(settings);
    if (currentSettingsStr === lastSavedSettingsRef.current) {
      console.log("Settings unchanged, skipping save");
      return; // No actual change, skip save
    }

    async function saveSettings() {
      isSavingRef.current = true;
      try {
        console.log("Saving settings:", settings);
        console.trace("Save triggered from:");
        const settingsStr = JSON.stringify(settings);
        await storage.setData(STORAGE_KEY, settingsStr);
        lastSavedSettingsRef.current = settingsStr;
        console.log("Settings saved successfully");
      } catch (error) {
        console.error("Failed to save settings", error);
      } finally {
        isSavingRef.current = false;
      }
    }
    saveSettings();
  }, [settings, isLoading]);

  // Handle theme change
  const updateTheme = (newTheme: string) => {
    setSettings((prevSettings) => {
      if (!prevSettings) return prevSettings;
      document.documentElement.setAttribute("data-theme", newTheme);
      return { ...prevSettings, theme: newTheme };
    });
  };

  // Handle language change safely to prevent infinite update loop
  const updateLanguage = async (lang: string) => {
    if (lang === languageRef.current || isChangingLanguageRef.current) {
      console.log(
        "Skipping language change - already changing or same language",
      );
      return;
    }

    isChangingLanguageRef.current = true;
    languageRef.current = lang;

    try {
      console.log("Changing language to", lang);

      await i18n.changeLanguage(lang);

      // Use functional update to ensure we have the latest settings
      setSettings((prevSettings) => {
        if (!prevSettings) return prevSettings;
        console.log("Updating language, window mode:", prevSettings.windowMode);
        return {
          ...prevSettings,
          language: lang,
        };
      });

      // Ensure window stays visible after language change
      await W.show();
      console.log("Language change complete");
    } catch (error) {
      console.warn("Failed to change language", error);
    } finally {
      // Reset flag after a short delay to allow React to settle
      setTimeout(() => {
        isChangingLanguageRef.current = false;
      }, 100);
    }
  };

  // Handle window mode change with proper transitions
  const updateWindowMode = async (mode: AppSettings["windowMode"]) => {
    if (!settings) return;

    const currentMode = settings.windowMode;

    try {
      console.log("Updating window mode from", currentMode, "to", mode);

      // First, exit current mode if needed
      if (currentMode === "fullscreen" && mode !== "fullscreen") {
        console.log("Exiting fullscreen");
        await W.exitFullScreen();
      }

      if (currentMode === "maximized" && mode !== "maximized") {
        console.log("Unmaximizing window");
        await W.unmaximize();
      }

      // Then apply new mode
      if (mode === "maximized") {
        console.log("Maximizing window");
        await W.maximize();
      } else if (mode === "fullscreen") {
        console.log("Entering fullscreen");
        await W.setFullScreen();
      } else {
        // Normal mode - ensure we're restored
        console.log("Restoring to normal");
        await W.unmaximize();
      }

      // Update state after successful mode change using functional update
      setSettings((prevSettings) => {
        if (!prevSettings) return prevSettings;
        console.log("State updated to mode:", mode);
        return { ...prevSettings, windowMode: mode };
      });
    } catch (error) {
      console.warn("Failed to update window mode", error);
    }
  };

  // Add ESC key listener to exit fullscreen
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === "Escape" && settings?.windowMode === "fullscreen") {
        try {
          console.log("ESC pressed, exiting fullscreen");
          await W.exitFullScreen();
          setSettings((prevSettings) => {
            if (!prevSettings) return prevSettings;
            console.log("Setting mode to normal via ESC");
            return { ...prevSettings, windowMode: "normal" };
          });
        } catch (error) {
          console.warn("Failed to exit fullscreen with ESC", error);
        }
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, [settings?.windowMode]); // Now we can safely depend on windowMode

  // Show loading state
  if (isLoading || !settings) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">{t("settings")}</h1>
        <div className="flex justify-center items-center h-32">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{t("settings")}</h1>

      {settings.windowMode === "fullscreen" && (
        <div className="alert alert-info mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            >
            </path>
          </svg>
          <span>
            Press <kbd className="kbd kbd-sm">ESC</kbd> to exit fullscreen mode
          </span>
        </div>
      )}

      <div className="mb-6">
        <label className="block mb-2">{t("theme")}</label>
        <ThemesDrawer selectedTheme={settings.theme} onChange={updateTheme} />
      </div>

      <div className="mb-6">
        <label className="block mb-2">{t("language")}</label>
        <select
          value={settings.language}
          onChange={(e) => updateLanguage(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="en">English</option>
          <option value="pl">Polski</option>
        </select>
      </div>

      <div>
        <label className="block mb-2">{t("windowMode")}</label>
        <select
          value={settings.windowMode}
          onChange={(e) =>
            updateWindowMode(e.target.value as AppSettings["windowMode"])}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="normal">{t("normal")}</option>
          <option value="maximized">{t("maximized")}</option>
          <option value="fullscreen">{t("fullScreen")}</option>
        </select>
      </div>
    </div>
  );
}
