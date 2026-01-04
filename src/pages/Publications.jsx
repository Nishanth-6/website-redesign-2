import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { FileText, Calendar, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Publications() {
  const { data: publications = [], isLoading } = useQuery({
    queryKey: ['publications'],
    queryFn: () => base44.entities.Publication.list()
  });

  const [activeCategory, setActiveCategory] = useState('All Publications');

  // Define your exact categories here
  const categories = [
    'All Publications',
    'Journal Publications',
    'Working Papers', 
    'Conference Proceedings'
  ];

  // Filter logic
  const filteredPublications = activeCategory === 'All Publications'
    ? publications
    : publications.filter(p => p.category === activeCategory || p.type === activeCategory);

  // Sort by year (descending)
  const sortedPublications = [...filteredPublications].sort((a, b) => b.year - a.year);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Publications</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
          Selected research papers, articles, and conference proceedings.
        </p>
      </div>

      {/* 2. CATEGORY TABS (Matching the image style) */}
      <div className="flex flex-wrap gap-8 border-b border-gray-200 dark:border-gray-700 mb-10">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`pb-3 text-base font-medium transition-all relative ${
              activeCategory === category
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            {category}
            {activeCategory === category && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {sortedPublications.map((pub) => (
            <motion.div
              key={pub.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="group bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300">
                      <Calendar className="w-3 h-3" />
                      {pub.year}
                    </span>
                    {/* Show Category Tag if available */}
                    {(pub.category || pub.type) && (
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900 px-2 py-0.5 rounded-full">
                        {pub.category || pub.type}
                      </span>
                    )}
                    {pub.venue && (
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {pub.venue}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                    {pub.title}
                  </h3>
                  
                  {pub.abstract && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                      {pub.abstract}
                    </p>
                  )}

                  {pub.authors && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 italic">
                      Authors: {pub.authors}
                    </p>
                  )}
                </div>

                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors font-medium text-sm mt-2 md:mt-0"
                  >
                    <FileText className="w-4 h-4" />
                    Read Paper
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {sortedPublications.length === 0 && (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">No publications found in "{activeCategory}".</p>
          </div>
        )}
      </div>
    </div>
  );
}