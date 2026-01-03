import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function Home() {
  const { data: contents = [] } = useQuery({
    queryKey: ['contents'],
    queryFn: () => base44.entities.Content.list()
  });

  const { data: researchAreas = [] } = useQuery({
    queryKey: ['researchAreas'],
    queryFn: () => base44.entities.ResearchArea.list()
  });

  const getContent = (key) => contents.find(c => c.key === key);
  const profile = getContent('profile');
  const bio = getContent('bio');
  const awards = getContent('awards');

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white">
                Selvaprabu (Selva) <span className="font-semibold">Nadarajah</span>
              </h1>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {profile?.body || "I am an Associate Professor (with tenure) of Information and Decision Sciences and Bielinski Family Endowed Scholar at the College of Business Administration, University of Illinois at Chicago. I also serve as the Decision Intelligence R&D Lead at the Discovery Partners Institute (Innovation hub of the University of Illinois System), and work with Argonne National Laboratory."}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile?.metadata?.email || 'selvan@uic.edu'}`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Email: {profile?.metadata?.email || 'selvan@uic.edu'}
                </a>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              {profile?.image_url && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={profile.image_url}
                  alt="Selvaprabu Nadarajah"
                  className="w-64 h-80 object-cover rounded-lg shadow-xl"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      {researchAreas.length > 0 && (
        <section className="mb-20">
          <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-8">
            Research Areas
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
              >
                {area.image_url && (
                  <div className="h-48 bg-gray-100 dark:bg-gray-700">
                    <img
                      src={area.image_url}
                      alt={area.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {area.description}
                  </p>
                  <Link
                    to={createPageUrl('Research')}
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm hover:gap-3 transition-all"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Awards & Recognition */}
      {awards && (
        <section className="mb-20">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 md:p-10">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {awards.body}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Bio */}
      {bio && (
        <section>
          <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
            {bio.title || 'About Me'}
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {bio.body}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}