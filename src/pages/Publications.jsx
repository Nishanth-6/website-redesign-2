import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { contentAPI } from '@/utils/contentLoader';
import { FileText, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkeletonPublication } from '../components/SkeletonLoader';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

export default function Publications() {
  const { data: publications = [], isLoading } = useQuery({
    queryKey: ['publications'],
    queryFn: () => contentAPI.entities.Publication.list()
  });

  const [activeCategory, setActiveCategory] = useState('All Publications');

  const categories = [
    'All Publications',
    'Journal Publications',
    'Working Papers',
    'Conference Proceedings'
  ];

  const categoryToDataValues = {
    'Journal Publications': ['journal'],
    'Working Papers': ['working_paper'],
    'Conference Proceedings': ['conference', 'conference_proceeding']
  };

  const filteredPublications = activeCategory === 'All Publications'
    ? publications
    : publications.filter(p => {
      const dataValues = categoryToDataValues[activeCategory] || [];
      return dataValues.includes(p.category) || dataValues.includes(p.type);
    });

  const sortedPublications = [...filteredPublications].sort((a, b) => b.year - a.year);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-10 md:py-16">
        <div className="mb-10">
          <div className="skeleton h-9 w-48 rounded mb-4" />
          <div className="skeleton h-6 w-96 max-w-full rounded" />
        </div>
        <div className="space-y-5">
          <SkeletonPublication />
          <SkeletonPublication />
          <SkeletonPublication />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-10 md:py-16">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="heading-serif heading-underline text-3xl md:text-4xl" style={{ color: 'var(--color-text)' }}>
          Publications
        </h1>
        <p className="text-base mt-4 max-w-2xl leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}>
          Selected research papers, articles, and conference proceedings.
        </p>
      </motion.div>

      {/* Filter Tabs — underline style */}
      <div className="relative mb-10">
        <div className="flex gap-1 md:gap-0 overflow-x-auto scrollbar-hide pb-px -mx-6 px-6 md:mx-0 md:px-0"
          style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative shrink-0 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap"
              style={{
                color: activeCategory === category ? 'var(--color-accent)' : 'var(--color-text-muted)',
              }}
            >
              {category}
              {activeCategory === category && (
                <motion.div
                  layoutId="pub-tab-indicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Publication Cards */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {sortedPublications.map((pub) => (
            <motion.div
              key={pub.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="group p-5 md:p-6 rounded-xl transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
            >
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1 space-y-2.5">
                  {/* Meta row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold"
                      style={{ backgroundColor: 'var(--color-bg-alt)', color: 'var(--color-text-secondary)' }}>
                      <Calendar className="w-3 h-3" />
                      {pub.year}
                    </span>
                    {(pub.category || pub.type) && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: 'var(--color-accent-light)',
                          color: 'var(--color-accent)'
                        }}>
                        {pub.category || pub.type}
                      </span>
                    )}
                    {pub.venue && (
                      <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                        {pub.venue}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-lg font-semibold leading-snug"
                    style={{ color: 'var(--color-text)' }}>
                    {pub.title}
                  </h3>

                  {/* Abstract */}
                  {pub.abstract && (
                    <p className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}>
                      {pub.abstract}
                    </p>
                  )}

                  {/* Authors */}
                  {pub.authors && (
                    <p className="text-sm italic" style={{ color: 'var(--color-text-muted)' }}>
                      {pub.authors}
                    </p>
                  )}
                </div>

                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--color-bg-alt)',
                      color: 'var(--color-accent)',
                      border: '1px solid var(--color-border-subtle)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-light)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-bg-alt)';
                    }}
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
          <div className="text-center py-16 rounded-xl"
            style={{ backgroundColor: 'var(--color-bg-alt)', border: '2px dashed var(--color-border)' }}>
            <p style={{ color: 'var(--color-text-muted)' }}>
              No publications found in "{activeCategory}".
            </p>
          </div>
        )}
      </div>
    </div>
  );
}