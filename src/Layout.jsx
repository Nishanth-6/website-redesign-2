import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
};

export default function Layout({ children }) {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Research', path: '/research' },
    { name: 'Teaching', path: '/teaching' },
    { name: 'Publications', path: '/publications' },
    { name: 'Students', path: '/students' },
    { name: 'CV', path: '/cv' },
  ];

  return (
    <div className="min-h-screen transition-colors duration-300 font-sans"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>

      {/* Refined Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
        : ''
        }`}
        style={{
          backgroundColor: isScrolled
            ? (isDark ? 'rgba(15, 23, 42, 0.92)' : 'rgba(250, 250, 248, 0.92)')
            : (isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(250, 250, 248, 0.8)'),
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `1px solid var(--color-border-subtle)`
        }}
      >
        {/* Top accent line */}
        <div className="h-[2px]" style={{ background: 'linear-gradient(to right, var(--color-accent), transparent 60%)' }} />

        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 md:h-[68px] flex items-center justify-between">
          {/* Name with serif treatment */}
          <Link to="/" className="group flex items-center gap-1 transition-opacity hover:opacity-80">
            <span className="text-lg md:text-xl tracking-tight" style={{ color: 'var(--color-text)' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>Selvaprabu</span>
              {' '}
              <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>(Selva)</span>
              {' '}
              <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}>Nadarajah</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative px-3.5 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors duration-200"
                style={{
                  color: isActive(link.path) ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                }}
                onMouseEnter={(e) => { if (!isActive(link.path)) e.target.style.color = 'var(--color-text)'; }}
                onMouseLeave={(e) => { if (!isActive(link.path)) e.target.style.color = 'var(--color-text-secondary)'; }}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3.5 right-3.5 h-[2px] rounded-full"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Dark Mode Button */}
            <button
              onClick={toggleTheme}
              className="ml-3 p-2 rounded-full transition-all duration-200"
              style={{
                backgroundColor: 'var(--color-bg-alt)',
                color: 'var(--color-text-secondary)'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-border)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-bg-alt)'}
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderBottom: '1px solid var(--color-border-subtle)'
              }}
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      to={link.path}
                      className="block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors"
                      style={{
                        color: isActive(link.path) ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                        backgroundColor: isActive(link.path) ? 'var(--color-accent-light)' : 'transparent',
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.04 }}
                >
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-3 px-4 py-3 mt-2 pt-4 rounded-lg transition-colors text-[15px]"
                    style={{
                      color: 'var(--color-text-secondary)',
                      borderTop: '1px solid var(--color-border-subtle)'
                    }}
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Page Content with Transition */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
          transition={pageTransition.transition}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Scroll to Top */}
      <ScrollToTop />

      {/* Refined Footer */}
      <footer style={{ borderTop: '1px solid var(--color-border-subtle)' }} className="mt-20 transition-colors">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-base font-medium" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
                Selvaprabu (Selva) Nadarajah
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                Associate Professor · College of Business Administration · University of Illinois at Chicago
              </p>
            </div>

            <div className="flex items-center gap-6">
              <nav className="hidden sm:flex items-center gap-4">
                {navLinks.slice(1, 5).map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-xs uppercase tracking-wider font-medium transition-colors"
                    style={{ color: 'var(--color-text-muted)' }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              © {new Date().getFullYear()} Selvaprabu (Selva) Nadarajah. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}