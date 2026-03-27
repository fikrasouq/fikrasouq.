"use client";

import { useEffect, useState } from "react";

type ThemeMode = "dark" | "light";

const STORAGE_KEY = "fikrasouq-theme";

function applyTheme(mode: ThemeMode) {
  document.documentElement.dataset.theme = mode;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    const nextTheme =
      storedTheme ??
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="motion-button inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-2 text-xs font-medium text-mist-100 transition hover:border-brand-400/40 hover:text-white"
      aria-label="تبديل الثيم"
    >
      <span className="text-sm">{theme === "dark" ? "☀" : "☾"}</span>
      <span>{theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن"}</span>
    </button>
  );
}
