import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeSwitch = ({ mobile = false }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved preference or system preference
    const savedMode = localStorage.getItem("darkMode") === "true";
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
    setDarkMode(savedMode || (!("darkMode" in localStorage) && systemPrefersDark));
  }, []);
  

  useEffect(() => {
    // Apply the class to the document element
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save preference to localStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`${
        mobile ? "p-2" : "p-2.5"
      } rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300`}
      aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
    >
      {darkMode ? (
        <motion.div
          key="moon"
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 30, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiMoon size={mobile ? 18 : 20} />
        </motion.div>
      ) : (
        <motion.div
          key="sun"
          initial={{ rotate: 30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -30, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiSun size={mobile ? 18 : 20} />
        </motion.div>
      )}
    </motion.button>
  );
};

export default ThemeSwitch;