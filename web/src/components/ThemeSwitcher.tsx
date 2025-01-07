import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import themesList from "daisyui/functions/themeOrder.js";

export const ThemesDrawer = () => {
  // this needs to be replaced in the future with app settings
  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute("data-theme") || themesList[0]
  );

  const handleThemeChange = (newTheme: string) => {
    document.documentElement.setAttribute(
      "data-theme",
      newTheme || themesList[Math.floor(Math.random() * themesList.length)],
    );
    setTheme(newTheme);
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
          const nextTheme = themesList[currentIndex + 1] ??
            themesList[0];
          handleThemeChange(nextTheme);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [theme]);

  return (
    <div className="drawer drawer-end z-50 w-min">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content w-min" title="Change theme">
        <label
          htmlFor="my-drawer"
          className="btn btn-lg btn-ghost btn-square"
        >
          <Icon
            icon="ion:color-filter-sharp"
            className="w-8 h-8"
          />
        </label>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        >
        </label>
        <ul className="text-base-content min-h-full w-80 select-none">
          {themesList.sort().map((theme: string, index: number) => (
            <li
              key={`${theme}-${index}`}
              className="capitalize p-2"
              data-theme={theme}
              onClick={() => handleThemeChange(theme)}
            >
              <div className="flex items-center">
                {["bg-primary", "bg-secondary", "bg-accent"].map((
                  color,
                ) => (
                  <div
                    key={`${color}-${index}`}
                    className={`w-4 h-4 rounded-full mr-2 ${color}`}
                  >
                  </div>
                ))}
                <span>{theme}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
