import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Moon, Sun } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const [darkMode, setDarkMode] = React.useState(false);

  const navItems = [
    { name: 'About', page: 'Home' },
    { name: 'Research', page: 'Research' },
    { name: 'Publications', page: 'Publications' },
    { name: 'Teaching', page: 'Teaching' },
    { name: 'Students', page: 'Students' },
    { name: 'CV', page: 'CV' }
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        {/* Navigation */}
        <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex justify-between items-center h-16">
              <Link to={createPageUrl('Home')} className="text-lg font-normal">
                Selvaprabu (Selva) <span className="font-semibold">Nadarajah</span>
              </Link>
              
              <div className="flex items-center gap-8">
                <div className="hidden md:flex items-center gap-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.page}
                      to={createPageUrl(item.page)}
                      className={`text-sm transition-colors ${
                        currentPageName === item.page
                          ? 'text-blue-600 dark:text-blue-400 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap gap-4">
            {navItems.map((item) => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`text-sm transition-colors ${
                  currentPageName === item.page
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <p>© {new Date().getFullYear()} Selvaprabu Nadarajah</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}