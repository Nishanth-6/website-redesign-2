import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
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
  const awards = getContent('awards');

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-16">
      
      {/* 1. HERO SECTION */}
      <section className="bg-blue-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start transition-colors duration-300">
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl md:text-4xl font-normal text-gray-800 dark:text-gray-200 leading-tight">
            Associate Professor & <br/> Decision Intelligence Lead
          </h1>

          <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg space-y-4">
            <p>
              I am an Associate Professor (with tenure) of Information and Decision Sciences and Bielinski Family Endowed Scholar at the College of Business Administration, University of Illinois at Chicago.
            </p>
            <p>
              I also serve as the Decision Intelligence R&D Lead at the Discovery Partners Institute (Innovation hub of the University of Illinois System), and work with Argonne National Laboratory.
            </p>
            <p className="font-medium mt-4">
              My research areas include (see publications for more details):
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Self-adapting Approximations</li>
              <li>Energy Real Options</li>
              <li>Energy and Computing Nexus</li>
            </ul>
          </div>

          <div className="pt-2">
            <a
              href={`mailto:${profile?.metadata?.email || 'selvan@uic.edu'}`}
              className="text-blue-600 dark:text-blue-400 hover:underline text-lg inline-flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Email: {profile?.metadata?.email || 'selvan@uic.edu'}
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/3 shrink-0 flex justify-center md:justify-end">
          {profile?.image_url && (
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={profile.image_url}
              alt="Selvaprabu Nadarajah"
              className="w-full max-w-[280px] h-auto rounded-2xl shadow-sm object-cover aspect-[3/4]"
            />
          )}
        </div>
      </section>

      {/* 2. RESEARCH AREAS */}
      {researchAreas.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Research Areas
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative"
              >
                {/* CARD LINK */}
                <Link 
                  to={createPageUrl('Research')}
                  className="block h-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col"
                >
                  {area.image_url && (
                    <div className="h-48 rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700">
                      <img
                        src={area.image_url}
                        alt={area.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col">
                    {/* FIXED: Removed group-hover:text-blue-600 to keep text color static */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                      {area.description}
                    </p>
                    
                    <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:underline">
                      Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 3. AWARDS SECTION */}
      {awards && (
        <section className="bg-gray-50/80 dark:bg-gray-800/50 rounded-3xl p-8 md:p-10 transition-colors duration-300">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Awards & Honors</h3>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
             <p>{awards.body}</p>
          </div>
        </section>
      )}

      {/* 4. ABOUT ME SECTION */}
      <section className="max-w-4xl pb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2 inline-block">
          About Me
        </h2>
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg space-y-6">
          <p>
            Before joining UIC, I did my PhD and MS in Operations Research at the Tepper School of Business, Carnegie Mellon University. My journey to North America started at the University of Waterloo, where I obtained an MASc in Operations Research and learnt the importance of asking 'Why Not?'.
          </p>
          <p>
            I was born in incredible India and grew up in the beautiful island of Sri Lanka (a.k.a. the pearl of the Indian ocean) before heading back to Chennai for my undergraduate studies at the Indian Institute of Technology Madras. I have enjoyed consulting with companies in the retail, high technology, and energy industries along the way.
          </p>
        </div>
      </section>

    </div>
  );
}