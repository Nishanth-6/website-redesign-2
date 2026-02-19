import React from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CV() {
  const cvDownloadUrl = `${import.meta.env.BASE_URL}Selvaprabu_Nadarajah_CV.pdf`;
  // Version query prevents stale PDF viewer cache from showing old content/scroll.
  const embeddedCvUrl = `${cvDownloadUrl}?v=20260219#page=1&view=FitH`;

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16 h-[calc(100vh-200px)] flex flex-col">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 shrink-0"
      >
        <h1 className="heading-serif heading-underline text-4xl md:text-5xl" style={{ color: 'var(--color-text)' }}>
          Curriculum Vitae
        </h1>
        <p className="mt-4 text-base" style={{ color: 'var(--color-text-secondary)' }}>
          View and download my professional history.
        </p>

        <div className="mt-6">
          <a
            href={cvDownloadUrl}
            download="Selvaprabu_Nadarajah_CV.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))',
              boxShadow: '0 4px 14px rgba(29, 78, 216, 0.25)'
            }}
            onMouseEnter={(e) => e.target.style.boxShadow = '0 6px 20px rgba(29, 78, 216, 0.35)'}
            onMouseLeave={(e) => e.target.style.boxShadow = '0 4px 14px rgba(29, 78, 216, 0.25)'}
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>
      </motion.div>

      {/* PDF View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex-1 rounded-xl overflow-hidden relative"
        style={{
          backgroundColor: 'var(--color-bg-alt)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--color-border)'
        }}
      >
        <iframe
          src={embeddedCvUrl}
          key={embeddedCvUrl}
          className="w-full h-full border-none"
          title="Curriculum Vitae"
        />
      </motion.div>
    </div>
  );
}