import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// @ts-ignore
import themesList from "daisyui/functions/themeOrder.js";

interface ThemesDrawerProps {
  selectedTheme?: string;
  onChange?: (theme: string) => void;
}

export const ThemesDrawer = (
  { selectedTheme, onChange }: ThemesDrawerProps,
) => {
  const [theme, setTheme] = useState<string>(selectedTheme || themesList[0]);
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedTheme && selectedTheme !== theme) {
      setTheme(selectedTheme);
      document.documentElement.setAttribute("data-theme", selectedTheme);
    }
  }, [selectedTheme]);

  const handleThemeChange = (newTheme: string) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
    onChange?.(newTheme);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        const currentIndex = themesList.indexOf(theme);
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          const previousTheme = themesList[currentIndex - 1] ??
            themesList[themesList.length - 1];
          handleThemeChange(previousTheme);
        } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          const nextTheme = themesList[currentIndex + 1] ?? themesList[0];
          handleThemeChange(nextTheme);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [theme]);

  return (
    <div>
      {themesList.map((themeName: string) => (
        <button
          key={themeName}
          className={`btn btn-sm m-1 ${
            theme === themeName ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleThemeChange(themeName)}
          aria-label={t("theme") + ": " + themeName}
        >
          {themeName}
        </button>
      ))}
    </div>
  );
};
