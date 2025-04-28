import { ThemeNames, themes } from "@/registry/theme";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
type ThemeName = ThemeNames;

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  storageKeyTheme?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: ({
    theme,
    themeName,
  }: {
    theme?: Theme;
    themeName?: ThemeName;
  }) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  storageKeyTheme = "vite-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [themeName, setThemeName] = useState<ThemeNames>(
    () => (localStorage.getItem(storageKey) as ThemeNames) || "orange"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);

      const theme = themes.filter(
        (v) => v.name === (localStorage.getItem(storageKeyTheme) ?? "orange")
      );

      if (theme.length) {
        const t = theme[0];
        root.style.setProperty("--primary", t.cssVars.light.primary);
        root.style.setProperty(
          "--primary-foreground",
          t.cssVars.light["primary-foreground"]
        );
      }

      return;
    }

    root.classList.add(theme);
    const storageTheme = themes.filter(
      (v) => v.name === (localStorage.getItem(storageKeyTheme) ?? "orange")
    );

    if (storageTheme.length) {
      const t = storageTheme[0];
      root.style.setProperty("--primary", t.cssVars.light.primary);
      root.style.setProperty(
        "--primary-foreground",
        t.cssVars.light["primary-foreground"]
      );
    }
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;

    const theme = themes.filter((v) => v.name === themeName);

    if (theme.length) {
      const t = theme[0];
      root.style.setProperty("--primary", t.cssVars.light.primary);
      root.style.setProperty(
        "--primary-foreground",
        t.cssVars.light["primary-foreground"]
      );
    }
  }, [themeName]);

  const value = {
    theme,
    setTheme: ({
      theme,
      themeName = (localStorage.getItem(storageKeyTheme) as ThemeNames) ??
        "blue  ",
    }: {
      theme?: Theme;
      themeName?: ThemeNames;
    }) => {
      if (theme) {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
      }

      if (themeName) {
        localStorage.setItem(storageKeyTheme, themeName);
        setThemeName(themeName);
      }
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
