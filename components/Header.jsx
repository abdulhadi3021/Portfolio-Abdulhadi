import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { useRouter } from "next/router";
import Link from "next/link";

const ThemeSwitch = ({ mobile = false }) => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDark(!isDark);
  };

  if (!mounted) return (
    <div className={`w-10 h-10 rounded-full ${mobile ? 'ml-2' : ''}`} />
  );

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`p-2 rounded-full ${mobile ? 'ml-2' : ''} ${
        isDark 
          ? "bg-gray-800 text-yellow-300 hover:bg-gray-700" 
          : "bg-gray-100 text-orange-500 hover:bg-gray-200"
      }`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <IoMdSunny size={20} /> : <IoMdMoon size={20} />}
    </motion.button>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const headerRef = useRef(null);
  const router = useRouter();
  const { scrollY } = useScroll();

  // Updated scroll handler that works with older Framer Motion versions
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setScrolled(latest > 10);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const navItems = [
    { name: "Home", path: "/" },
    { 
      name: "Services", 
      path: "#services",
      subItems: [
        { name: "Web Development", path: "#web-dev" },
        { name: "UI/UX Design", path: "#ui-ux" },
        { name: "Consulting", path: "#consulting" },
      ]
    },
    { name: "Portfolio", path: "/#portfolio" },
    { 
      name: "About", 
      path: "#about",
      subItems: [
        { name: "Our Team", path: "#team" },
        { name: "Company History", path: "#history" },
      ]
    },
    { name: "Contact", path: "/#contact" },
  ];

  const handleSubMenuToggle = (itemName) => {
    setActiveSubMenu(activeSubMenu === itemName ? null : itemName);
  };

  const isActive = (path) => {
    return router.pathname === path || (path !== '/' && router.pathname.startsWith(path));
  };

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', damping: 10 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 shadow-lg py-2 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" passHref legacyBehavior>
            <a className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                AH
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AbdulHadi.dev
              </span>
            </a>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Link href={item.path} passHref legacyBehavior>
                  <a 
                    className={`flex items-center ${isActive(item.path) 
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold" 
                      : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                  >
                    {item.name}
                    {item.subItems && (
                      <FiChevronDown className="ml-1" size={16} />
                    )}
                  </a>
                </Link>
              </motion.div>

              {item.subItems && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 p-1 z-50 hidden group-hover:block"
                >
                  {item.subItems.map((subItem) => (
                    <Link key={subItem.name} href={subItem.path} passHref legacyBehavior>
                      <a 
                        className={`block px-4 py-2 text-sm rounded-md ${
                          isActive(subItem.path)
                            ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {subItem.name}
                      </a>
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
          <div className="ml-4">
            <ThemeSwitch />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeSwitch mobile />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-b-lg border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col py-2 px-4">
                {navItems.map((item) => (
                  <div key={item.name} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => handleSubMenuToggle(item.name)}
                          className="w-full flex justify-between items-center px-4 py-3 rounded-md text-left"
                        >
                          <span className={`${
                            isActive(item.path) 
                              ? "text-indigo-600 dark:text-indigo-400 font-medium" 
                              : "text-gray-700 dark:text-gray-300"
                          }`}>
                            {item.name}
                          </span>
                          {activeSubMenu === item.name ? (
                            <FiChevronUp className="text-gray-500" />
                          ) : (
                            <FiChevronDown className="text-gray-500" />
                          )}
                        </button>
                        <AnimatePresence>
                          {activeSubMenu === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 overflow-hidden"
                            >
                              {item.subItems.map((subItem) => (
                                <Link key={subItem.name} href={subItem.path} passHref legacyBehavior>
                                  <a 
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-md text-sm ${
                                      isActive(subItem.path)
                                        ? "text-indigo-600 dark:text-indigo-400 font-medium"
                                        : "text-gray-600 dark:text-gray-400"
                                    }`}
                                  >
                                    {subItem.name}
                                  </a>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link href={item.path} passHref legacyBehavior>
                        <a 
                          onClick={() => setIsMenuOpen(false)}
                          className={`block px-4 py-3 rounded-md ${
                            isActive(item.path)
                              ? "text-indigo-600 dark:text-indigo-400 font-medium"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {item.name}
                        </a>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;


