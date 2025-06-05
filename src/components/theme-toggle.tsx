"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    }
    if (theme === "dark") {
      setTheme("light");
    }
  }

  return (
    <div
      className="p-1.5 w-full aspect-square flex items-center gap-4 rounded-md border border-tertiary-200 cursor-pointer transition-[background-color] hover:bg-tertiary-200"
      onClick={toggleTheme}
    >
      <div>
        {theme === "dark" && (
          <div
            className="flex-x-center rounded-full group-data-[collapsible=icon]:text-tertiary-100"
            onClick={() => setTheme("light")}
          >
            <SunIcon className="size-4" />
          </div>
        )}
        {theme === "light" && (
          <div
            className="flex-x-center rounded-full group-data-[collapsible=icon]:text-tertiary-100"
            onClick={() => setTheme("dark")}
          >
            <MoonIcon className="size-4" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ThemeToggle;
