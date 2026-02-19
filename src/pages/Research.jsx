import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { contentAPI } from '@/utils/contentLoader';
import { motion } from 'framer-motion';
import ResearchDiagram from '@/components/ResearchDiagram';

export default function Research() {
  const { data: contents = [] } = useQuery({
    queryKey: ['contents'],
    queryFn: () => contentAPI.entities.Content.list()
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
    </div>
  );
}