import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Layout({ children }) {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize Dark Mode from System or LocalStorage
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

  // Toggle Theme Function
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 font-sans">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* 1. FIXED NAME: Only Nadarajah is bold */}
          <Link to="/" className="text-lg md:text-xl text-gray-900 dark:text-white hover:opacity-80 transition-opacity">
            Selvaprabu (Selva) <span className="font-bold">Nadarajah</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* 3. ADDED DARK MODE BUTTON */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 dark:text-gray-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-6 flex flex-col gap-4 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium ${
                  isActive(link.path) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span>{isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
            </button>
          </div>
        )}
      </nav>

      <main className="animate-in fade-in duration-500">
        {children}
      </main>

      <footer className="border-t border-gray-100 dark:border-gray-800 mt-20 transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex justify-between items-center">
          <div className="text-center text-sm text-gray-500 dark:text-gray-500">
            <p>© {new Date().getFullYear()} Selvaprabu Nadarajah</p>
          </div>
          <Link to="/cms" className="text-xs text-gray-300 hover:text-gray-500 dark:text-gray-700 transition-colors">
            Admin
          </Link>
        </div>
      </footer>
    </div>
  );
}