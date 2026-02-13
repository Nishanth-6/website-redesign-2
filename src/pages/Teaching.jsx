import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Building } from 'lucide-react';
import { SkeletonCourse } from '../components/SkeletonLoader';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
};

export default function Teaching() {
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => base44.entities.Course.list()
  });

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">
        <div className="mb-12">
          <div className="skeleton h-12 w-48 rounded mb-4" />
          <div className="skeleton h-6 w-96 max-w-full rounded" />
        </div>
        <div className="max-w-4xl space-y-5">
          <SkeletonCourse />
          <SkeletonCourse />
          <SkeletonCourse />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="heading-serif heading-underline text-4xl md:text-5xl" style={{ color: 'var(--color-text)' }}>
          Teaching
        </h1>
        <p className="max-w-2xl mt-4 text-base md:text-lg leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}>
          I teach courses in optimization, operations management, and decision sciences
          at both undergraduate and graduate levels.
        </p>
      </motion.div>

      {/* Course Cards */}
      <motion.div
        className="max-w-4xl space-y-5"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        {courses.map((course, idx) => (
          <motion.div
            key={course.id}
            variants={fadeUp}
            className="card-elevated p-5 md:p-6"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--color-accent-light)' }}>
                    <GraduationCap className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold"
                      style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
                      {course.name || course.course}
                    </h3>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
                      {course.code}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm"
                  style={{ color: 'var(--color-text-muted)' }}>
                  <div className="flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5" />
                    {course.institution}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {course.semesters || course.years}
                  </div>
                </div>
              </div>

              <span className="self-start px-3 py-1 text-xs font-semibold rounded-full"
                style={{
                  backgroundColor: 'var(--color-bg-alt)',
                  color: 'var(--color-text-secondary)'
                }}>
                {course.level}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {courses.length === 0 && (
        <div className="text-center py-16 rounded-xl" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
          <p style={{ color: 'var(--color-text-muted)' }}>No courses added yet.</p>
        </div>
      )}
    </div>
  );
}