import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Hexagon, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.projects'), path: '/projects' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 py-3 shadow-sm dark:shadow-none'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo with Glassmorphism Pill for better visibility */}
          <NavLink 
            to="/" 
            className="flex items-center gap-2 group relative z-10 px-4 py-2 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:bg-white dark:hover:bg-slate-900 transition-all duration-300"
          >
            <div className="relative">
                <Hexagon className="w-8 h-8 text-violet-600 dark:text-emerald-500 fill-violet-600/10 dark:fill-emerald-500/10 group-hover:fill-violet-600/20 dark:group-hover:fill-emerald-500/20 transition-all duration-300" />
                <div className="absolute inset-0 bg-violet-500 dark:bg-emerald-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-full"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-emerald-400 transition-colors">
              GIN PORTFOLIO
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Enhanced Nav Container with higher opacity */}
            <div className="flex items-center space-x-1 bg-white/80 dark:bg-slate-900/80 p-1.5 rounded-full backdrop-blur-xl border border-slate-200 dark:border-slate-700 mr-4 shadow-sm">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 relative ${
                      isActive 
                        ? 'text-slate-900 dark:text-white' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-emerald-400'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{link.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="desktop-nav-pill"
                          className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-sm dark:shadow-inner border border-slate-200/50 dark:border-slate-600/50"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-2 pl-4 border-l border-slate-200/50 dark:border-slate-700/50">
               {/* Language Toggle with background */}
               <button
                onClick={toggleLanguage}
                className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-800 transition-all focus:outline-none flex items-center gap-1 text-xs font-bold w-16 justify-center shadow-sm"
                aria-label="Toggle Language"
              >
                 <Globe className="w-4 h-4" /> {language.toUpperCase()}
              </button>

               {/* Theme Toggle with background */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-white dark:hover:bg-slate-800 transition-all focus:outline-none shadow-sm"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <NavLink
                to="/contact"
                className="ml-2 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-slate-900/20 dark:shadow-emerald-900/20 hover:scale-105 active:scale-95"
              >
                {t('nav.talk')}
              </NavLink>
            </div>
          </div>

          {/* Mobile Menu Button with background */}
          <div className="flex items-center gap-2 md:hidden">
             <button
                onClick={toggleLanguage}
                className="p-2 rounded-full text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 text-xs font-bold w-10 h-10 flex items-center justify-center shadow-sm"
              >
                {language.toUpperCase()}
              </button>
             <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 text-slate-800 dark:text-slate-200 hover:text-violet-600 dark:hover:text-emerald-400 transition-colors shadow-sm"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-2xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-violet-50 dark:bg-emerald-500/10 text-violet-700 dark:text-emerald-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;