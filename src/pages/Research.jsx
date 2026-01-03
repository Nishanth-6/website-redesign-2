import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

export default function Research() {
  const { data: contents = [] } = useQuery({
    queryKey: ['contents'],
    queryFn: () => base44.entities.Content.list()
  });

  const { data: researchAreas = [] } = useQuery({
    queryKey: ['researchAreas'],
    queryFn: () => base44.entities.ResearchArea.list()
  });

  const researchOverview = contents.find(c => c.key === 'research_overview');

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-8">
        Research
      </h1>

      {/* Overview */}
      {researchOverview && (
        <section className="mb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {researchOverview.body}
            </p>
          </div>
          
          {researchOverview.image_url && (
            <div className="mt-8">
              <img
                src={researchOverview.image_url}
                alt="Research Overview"
                className="w-full rounded-xl shadow-lg"
              />
              {researchOverview.metadata?.caption && (
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
                  {researchOverview.metadata.caption}
                </p>
              )}
            </div>
          )}
        </section>
      )}

      {/* Research Areas Detail */}
      <section>
        <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-8">
          Research Areas
        </h2>
        
        <div className="space-y-12">
          {researchAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="grid md:grid-cols-3 gap-8">
                {area.image_url && (
                  <div className="md:col-span-1">
                    <img
                      src={area.image_url}
                      alt={area.title}
                      className="w-full h-full object-cover min-h-64"
                    />
                  </div>
                )}
                <div className={`p-8 ${area.image_url ? 'md:col-span-2' : 'md:col-span-3'}`}>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {area.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {area.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {researchAreas.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No research areas added yet.
          </div>
        )}
      </section>
    </div>
  );
}