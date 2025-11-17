import { useEffect, useRef } from "react";
import { app, events, storage, window as W } from "@neutralinojs/lib";
import { Route, Switch } from "wouter";
import { useTranslation } from "react-i18next";

import "./i18next.ts";
import "./App.css";

import Home from "./pages/Home.tsx";
import Info from "./pages/Info.tsx";
import NotFound from "./pages/NotFound.tsx";
import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import Playground from "./pages/Playground.tsx";
import Settings from "./pages/Settings.tsx";

interface AppSettings {
  windowMode: "normal" | "maximized" | "fullscreen";
  windowSize: { width: number; height: number };
  language: string;
  theme: string;
}

const STORAGE_KEY = "appSettings";

async function getSettings(): Promise<AppSettings | null> {
  try {
    const settingsRaw = await storage.getData(STORAGE_KEY);
    if (!settingsRaw) throw new Error("No settings in storage");
    return JSON.parse(settingsRaw) as AppSettings;
  } catch {
    return null;
  }
}

async function saveSettings(settings: AppSettings) {
  await storage.setData(STORAGE_KEY, JSON.stringify(settings));
}

export default function App() {
  const { i18n } = useTranslation();
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    // Only run initialization once
    if (hasInitializedRef.current) {
      return;
    }

    hasInitializedRef.current = true;

    (async () => {
      let settings = await getSettings();
      if (!settings) {
        settings = {
          windowMode: "normal",
          windowSize: { width: 800, height: 600 },
          language: "en",
          theme: "light",
        };
        await saveSettings(settings);
      }

      // Apply theme
      document.documentElement.setAttribute("data-theme", settings.theme);

      // Apply language - do this ONCE here
      if (settings.language !== i18n.language) {
        await i18n.changeLanguage(settings.language);
      }

      // Apply window size
      await W.setSize({
        width: settings.windowSize.width,
        height: settings.windowSize.height,
      });

      // Apply window mode
      if (settings.windowMode === "maximized") {
        await W.maximize();
      } else if (settings.windowMode === "fullscreen") {
        await W.setFullScreen();
      } else {
        // Normal mode - ensure window is not maximized
        await W.unmaximize();
      }

      // Show the window
      await W.show();
      // Wait for paint to complete
      await new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      );
    })();

    // Handle window resize - save dimensions only in normal mode
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = async () => {
      try {
        const currentSettings = await getSettings();
        if (!currentSettings) return;

        // Only save dimensions in normal mode
        if (currentSettings.windowMode === "normal") {
          const isMaximized = await W.isMaximized();
          if (!isMaximized) {
            const size = await W.getSize();
            // Ensure we have valid numbers
            if (size.width && size.height) {
              const updatedSettings: AppSettings = {
                ...currentSettings,
                windowSize: { width: size.width, height: size.height },
              };
              await saveSettings(updatedSettings);
            }
          }
        }
      } catch (error) {
        console.error("Failed to save window size:", error);
      }
    };

    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 500);
    };

    // Cast to Window type to avoid the globals.d.ts conflict
    const browserWindow = window as unknown as Window;
    browserWindow.addEventListener("resize", debouncedResize);

    // Handle window close event - save settings before exit
    const handleWindowClose = async () => {
      try {
        // Get current settings from storage and save them again to ensure persistence
        const currentSettings = await getSettings();
        if (currentSettings) {
          await saveSettings(currentSettings);
        }
      } catch (error) {
        console.error("Failed to save settings on exit:", error);
      } finally {
        app.exit();
      }
    };

    events.on("windowClose", handleWindowClose);

    // Cleanup event listeners
    return () => {
      browserWindow.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimeout);
      events.off("windowClose", handleWindowClose);
    };
  }, []);

  // Disable context menu
  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", disableContextMenu);
    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  return (
    <>
      <Header />
      <Main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/info" component={Info} />
          <Route path="/playground" component={Playground} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </Main>
    </>
  );
}
