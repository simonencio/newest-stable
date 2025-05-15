import { useState, useEffect } from "react";

const STORAGE_KEY = "app-dark-mode";

export function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(null); // null = segui sistema

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "true") setIsDarkMode(true);
        else if (saved === "false") setIsDarkMode(false);
        else setIsDarkMode(null);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        function applyClass(enable) {
            if (enable) document.documentElement.classList.add("dark");
            else document.documentElement.classList.remove("dark");
        }

        if (isDarkMode === null) {
            applyClass(mediaQuery.matches);
            const listener = (e) => applyClass(e.matches);
            mediaQuery.addEventListener("change", listener);
            return () => mediaQuery.removeEventListener("change", listener);
        } else {
            applyClass(isDarkMode);
        }
    }, [isDarkMode]);

    function toggleDarkMode() {
        let newMode;
        if (isDarkMode === null) newMode = true;
        else if (isDarkMode === true) newMode = false;
        else newMode = null;

        setIsDarkMode(newMode);

        if (newMode === null) localStorage.removeItem(STORAGE_KEY);
        else localStorage.setItem(STORAGE_KEY, newMode.toString());
    }

    return { isDarkMode, toggleDarkMode };
}
