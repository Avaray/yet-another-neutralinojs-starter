import { useEffect } from "react";
import { storage, window as W } from "@neutralinojs/lib";
import { Route, Switch } from "wouter";

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
}

async function getSettings(): Promise<AppSettings | null> {
  try {
    const settings = await storage.getData("appSettings");
    if (!settings) {
      throw new Error("No settings found in storage."); // Custom error for no settings
    }
    return JSON.parse(settings) as AppSettings; // Assuming the settings are stored as a JSON string
  } catch (error) {
    console.error("Error retrieving settings:");
    return null; // Return null if there's an error
  }
}

export default function App() {
  // This is part of "Eye protection" feature
  // By default window is starting with white background (changing HTML background color does not help)
  // So it causes a flash of white screen when the app is starting
  // I set app window to be hidden by default and then show it after React is loaded
  // Dev tools (if enabled) will show up before the main window is shown
  useEffect(() => {
    (async () => {
      const settings = await getSettings();

      if (settings === null) {
        console.warn(
          "Using default settings as no valid settings were loaded.",
        );
        // Load default settings or handle accordingly
        const defaultSettings: AppSettings = {
          windowMode: "normal",
          windowSize: { width: 800, height: 600 },
          language: "en",
        };
        // Proceed with opening the app window using defaultSettings
      } else {
        console.log("Settings loaded successfully:", settings);
        // Proceed with opening the app window and using the loaded settings
      }

      await W.show();
    })();
  }, []);

  return (
    <div className="flex flex-col h-screen">
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
    </div>
  );
}
