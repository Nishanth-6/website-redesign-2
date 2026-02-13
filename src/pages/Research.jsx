import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import ResearchDiagram from '@/components/ResearchDiagram';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

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
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <h1 className="heading-serif heading-underline text-4xl md:text-5xl"
          style={{ color: 'var(--color-text)' }}>
          Research
        </h1>
      </motion.div>

      {/* ── Overview Text ── */}
      {researchOverview && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="max-w-4xl">
            <p className="text-base md:text-lg leading-relaxed whitespace-pre-line"
              style={{ color: 'var(--color-text-secondary)', lineHeight: '1.85' }}>
              {researchOverview.body}
            </p>
          </div>
        </motion.section>
      )}

      {/* ── Research Framework Diagram ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20"
      >
        <div className="research-diagram-frame">
          <ResearchDiagram />
        </div>

        {/* Elegant caption */}
        <div className="text-center mt-5">
          <p style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--color-text-muted)',
            fontSize: '0.875rem',
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '0.02em',
          }}>
            Research Overview: Large Scale Computing and Energy
          </p>
        </div>
      </motion.section>

      <div className="section-divider" />

      {/* ── Research Areas Detail ── */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="mb-10">
          <h2 className="heading-serif heading-underline text-2xl md:text-3xl"
            style={{ color: 'var(--color-text)' }}>
            Research Areas
          </h2>
        </motion.div>

        <div className="space-y-6">
          {researchAreas.map((area) => (
            <motion.div
              key={area.id}
              variants={fadeUp}
              className="research-area-card card-elevated overflow-hidden"
            >
              <div className="grid md:grid-cols-3 gap-0">
                {area.image_url && (
                  <div className="md:col-span-1 overflow-hidden">
                    <img
                      src={area.image_url}
                      alt={area.title}
                      className="w-full h-full object-cover min-h-56 hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className={`p-6 md:p-8 flex flex-col justify-center ${area.image_url ? 'md:col-span-2' : 'md:col-span-3'}`}>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3"
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
                    {area.title}
                  </h3>
                  <p className="leading-relaxed whitespace-pre-line"
                    style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                    {area.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {researchAreas.length === 0 && (
          <div className="text-center py-16 rounded-xl" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
            <p style={{ color: 'var(--color-text-muted)' }}>No research areas added yet.</p>
          </div>
        )}
      </motion.section>
    </div>
  );
}