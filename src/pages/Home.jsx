import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
};

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
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16 space-y-20">

      {/* ── HERO SECTION ── */}
      <motion.section
        initial="initial" animate="animate" variants={stagger}
        className="relative rounded-2xl overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-alt)' }}
      >
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="relative flex flex-col md:flex-row gap-8 md:gap-12 p-8 md:p-12 lg:p-16 items-start">
          <motion.div variants={fadeUp} className="flex-1 space-y-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest mb-3"
                style={{ color: 'var(--color-accent)' }}>
                University of Illinois at Chicago
              </p>
              <h1 className="heading-serif text-3xl md:text-4xl lg:text-[2.75rem]"
                style={{ color: 'var(--color-text)' }}>
                Associate Professor &amp;{' '}
                <span style={{ color: 'var(--color-accent)' }}>Decision Intelligence</span> Lead
              </h1>
            </div>

            <div className="text-base md:text-lg leading-relaxed space-y-4"
              style={{ color: 'var(--color-text-secondary)' }}>
              <p>
                I am an Associate Professor (with tenure) of Information and Decision Sciences and Bielinski Family Endowed Scholar at the College of Business Administration, University of Illinois at Chicago.
              </p>
              <p>
                I also serve as the Decision Intelligence R&D Lead at the Discovery Partners Institute (Innovation hub of the University of Illinois System), and work with Argonne National Laboratory.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-text)' }}>
                Research Areas
              </p>
              <div className="flex flex-wrap gap-2">
                {['Self-adapting Approximations', 'Energy Real Options', 'Energy & Computing Nexus'].map((area) => (
                  <span key={area} className="px-3 py-1.5 text-sm font-medium rounded-full"
                    style={{
                      backgroundColor: 'var(--color-accent-light)',
                      color: 'var(--color-accent)'
                    }}>
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`mailto:${profile?.metadata?.email || 'selvan@uic.edu'}`}
                className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 group"
                style={{ color: 'var(--color-accent)' }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'var(--color-accent-light)' }}>
                  <Mail className="w-4 h-4" />
                </div>
                <span className="group-hover:underline underline-offset-4">
                  {profile?.metadata?.email || 'selvan@uic.edu'}
                </span>
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="w-full md:w-[280px] lg:w-[300px] shrink-0 flex justify-center md:justify-end"
          >
            {profile?.image_url && (
              <div className="relative">
                <div className="absolute -inset-3 rounded-2xl opacity-20 blur-xl"
                  style={{ backgroundColor: 'var(--color-accent)' }} />
                <img
                  src={profile.image_url}
                  alt="Selvaprabu Nadarajah"
                  className="relative w-full max-w-[280px] h-auto rounded-2xl object-cover aspect-[3/4]"
                  style={{ boxShadow: 'var(--shadow-xl)' }}
                />
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* ── RESEARCH AREAS ── */}
      {researchAreas.length > 0 && (
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-10">
            <h2 className="heading-serif heading-underline text-2xl md:text-3xl" style={{ color: 'var(--color-text)' }}>
              Research Areas
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.id}
                variants={fadeUp}
                className="group"
              >
                <Link
                  to={createPageUrl('Research')}
                  className="card-elevated block h-full overflow-hidden"
                >
                  {area.image_url && (
                    <div className="h-48 overflow-hidden" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
                      <img
                        src={area.image_url}
                        alt={area.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold mb-2"
                      style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
                      {area.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4 flex-1"
                      style={{ color: 'var(--color-text-secondary)' }}>
                      {area.description}
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all"
                      style={{ color: 'var(--color-accent)' }}>
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── AWARDS ── */}
      {awards && (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-4 md:gap-6 p-6 md:p-8 rounded-xl"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderLeft: '3px solid var(--color-accent)',
              boxShadow: 'var(--shadow-sm)'
            }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'var(--color-accent-light)' }}>
              <Award className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
                Awards &amp; Honors
              </h3>
              <div className="text-base leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}>
                <p>{awards.body}</p>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ── ABOUT ME ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl pb-8"
      >
        <h2 className="heading-serif heading-underline text-2xl md:text-3xl mb-6"
          style={{ color: 'var(--color-text)' }}>
          About Me
        </h2>
        <div className="text-base md:text-lg leading-relaxed space-y-5"
          style={{ color: 'var(--color-text-secondary)' }}>
          <p>
            Before joining UIC, I did my PhD and MS in Operations Research at the Tepper School of Business, Carnegie Mellon University. My journey to North America started at the University of Waterloo, where I obtained an MASc in Operations Research and learnt the importance of asking 'Why Not?'.
          </p>
          <p>
            I was born in incredible India and grew up in the beautiful island of Sri Lanka (a.k.a. the pearl of the Indian ocean) before heading back to Chennai for my undergraduate studies at the Indian Institute of Technology Madras. I have enjoyed consulting with companies in the retail, high technology, and energy industries along the way.
          </p>
        </div>
      </motion.section>
    </div>
  );
}