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

  // Handle arrow keys on the select to live update theme during navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLSelectElement>) => {
    if (
      event.key === "ArrowLeft" ||
      event.key === "ArrowUp" ||
      event.key === "ArrowRight" ||
      event.key === "ArrowDown"
    ) {
      const currentIndex = themesList.indexOf(theme);
      let newIndex = currentIndex;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        newIndex = (currentIndex - 1 + themesList.length) % themesList.length;
      } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        newIndex = (currentIndex + 1) % themesList.length;
      }
      const newTheme = themesList[newIndex];
      if (newTheme !== theme) {
        handleThemeChange(newTheme);
        event.preventDefault();
      }
    }
  };

  return (
    <div>
      <select
        className="select select-bordered w-full max-w-xs"
        value={theme}
        onChange={(e) => handleThemeChange(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label={t("theme")}
      >
        {themesList.map((themeName: string) => (
          <option key={themeName} value={themeName}>
            {themeName}
          </option>
        ))}
      </select>
    </div>
  );
};
