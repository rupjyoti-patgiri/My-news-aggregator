src/components/ui/ThemeToggle.jsx
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react"; // Icons for dark and light modes

const ThemeToggle = () => {
  // Initialize with the user's saved theme, or default to light if not saved
  const savedTheme = localStorage.getItem("theme") || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  
  const [darkMode, setDarkMode] = useState(savedTheme === "light");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-md"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
