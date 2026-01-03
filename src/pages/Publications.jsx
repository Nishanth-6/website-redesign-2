import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

function PublicationItem({ publication, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {publication.title}
          </h3>
          
          {publication.authors && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {publication.authors}
            </p>
          )}
          
          <div className="flex flex-wrap gap-3 items-center mb-3">
            {publication.venue && (
              <span className="text-sm italic text-gray-700 dark:text-gray-300">
                {publication.venue}
              </span>
            )}
            {publication.year && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {publication.year}
              </span>
            )}
            {publication.status && (
              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs rounded-full">
                {publication.status}
              </span>
            )}
          </div>

          {publication.abstract && (
            <div className="mb-3">
              <p className={`text-sm text-gray-600 dark:text-gray-400 leading-relaxed ${!expanded && 'line-clamp-3'}`}>
                {publication.abstract}
              </p>
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 flex items-center gap-1"
              >
                {expanded ? (
                  <>Show less <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>Read more <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
            </div>
          )}

          <div className="flex gap-3">
            {publication.pdf_url && (
              <a
                href={publication.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                PDF <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {publication.doi && (
              <a
                href={publication.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                DOI <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Publications() {
  const [filter, setFilter] = useState('all');

  const { data: publications = [] } = useQuery({
    queryKey: ['publications'],
    queryFn: () => base44.entities.Publication.list()
  });

  const types = ['all', 'working_paper', 'journal', 'conference', 'book_chapter'];
  
  const filteredPublications = filter === 'all'
    ? publications
    : publications.filter(p => p.type === filter);

  const getTypeLabel = (type) => {
    const labels = {
      all: 'All Publications',
      working_paper: 'Working Papers',
      journal: 'Journal Articles',
      conference: 'Conference Papers',
      book_chapter: 'Book Chapters'
    };
    return labels[type] || type;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
          Publications
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Research papers and scholarly works
        </p>
      </div>

      {/* Filter */}
      <div className="mb-8 flex flex-wrap gap-3">
        {types.map(type => (
          <Button
            key={type}
            onClick={() => setFilter(type)}
            variant={filter === type ? 'default' : 'outline'}
            size="sm"
            className={filter === type ? 'bg-blue-600 hover:bg-blue-700' : ''}
          >
            {getTypeLabel(type)}
          </Button>
        ))}
      </div>

      {/* Publications List */}
      <div className="space-y-6">
        {filteredPublications.map((pub, index) => (
          <PublicationItem key={pub.id} publication={pub} index={index} />
        ))}
      </div>

      {filteredPublications.length === 0 && (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No publications found for this category.</p>
        </div>
      )}
    </div>
  );
}