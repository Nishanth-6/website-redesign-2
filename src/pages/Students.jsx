import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { contentAPI } from '@/utils/contentLoader';
import { motion } from 'framer-motion';
import { Users, ExternalLink, GraduationCap } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } }
};

export default function Students() {
  const { data: students = [] } = useQuery({
    queryKey: ['students'],
    queryFn: () => contentAPI.entities.Student.list()
  });

  const { data: contents = [] } = useQuery({
    queryKey: ['contents'],
    queryFn: () => contentAPI.entities.Content.list()
  });

  const noteToStudents = contents.find(c => c.key === 'note_to_students');

  const currentPhD = students.filter(s => s.status === 'current' && s.degree === 'phd');
  const formerPhD = students.filter(s => s.status === 'former' && s.degree === 'phd');
  const currentMasters = students.filter(s => s.status === 'current' && s.degree === 'masters');
  const formerMasters = students.filter(s => s.status === 'former' && s.degree === 'masters');

  const StudentCard = ({ student, index }) => (
    <motion.div
      variants={fadeUp}
      className="card-elevated p-5 md:p-6"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>
            {student.website_url ? (
              <a
                href={student.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:underline underline-offset-4"
                style={{ color: 'var(--color-text)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}
              >
                {student.name}
                <ExternalLink className="w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} />
              </a>
            ) : (
              student.name
            )}
          </h3>
          {student.program && (
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              {student.program}, {student.institution}
            </p>
          )}
        </div>

        {student.status === 'current' && student.start_year && (
          <span className="px-2.5 py-1 text-xs font-medium rounded-full shrink-0"
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              color: 'rgb(34, 158, 84)'
            }}>
            Since {student.start_year}
          </span>
        )}
      </div>

      <div className="space-y-1.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        {student.background && (
          <p><span className="font-medium" style={{ color: 'var(--color-text)' }}>Background:</span> {student.background}</p>
        )}
        {student.research_interests && (
          <p><span className="font-medium" style={{ color: 'var(--color-text)' }}>Research:</span> {student.research_interests}</p>
        )}
        {student.thesis_title && (
          <p><span className="font-medium" style={{ color: 'var(--color-text)' }}>Thesis:</span> {student.thesis_title}</p>
        )}
        {student.co_supervisors && (
          <p><span className="font-medium" style={{ color: 'var(--color-text)' }}>Co-supervisors:</span> {student.co_supervisors}</p>
        )}
        {student.graduation_year && (
          <p><span className="font-medium" style={{ color: 'var(--color-text)' }}>Graduated:</span> {student.graduation_year}</p>
        )}
        {student.first_position && (
          <p><span className="font-medium" style={{ color: 'var(--color-text)' }}>First Position:</span> {student.first_position}</p>
        )}
        {student.current_position && (
          <p><span className="font-medium" style={{ color: 'var(--color-text)' }}>Current Position:</span> {student.current_position}</p>
        )}
      </div>
    </motion.div>
  );

  const SectionHeader = ({ icon: Icon, title, iconColor }) => (
    <motion.h2
      variants={fadeUp}
      className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-3"
      style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: iconColor === 'accent' ? 'var(--color-accent-light)' : 'var(--color-bg-alt)' }}>
        <Icon className="w-4 h-4" style={{ color: iconColor === 'accent' ? 'var(--color-accent)' : 'var(--color-text-muted)' }} />
      </div>
      {title}
    </motion.h2>
  );

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
          Students
        </h1>
        <p className="text-base mt-4" style={{ color: 'var(--color-text-secondary)' }}>
          Current and former graduate students
        </p>
      </motion.div>

      {/* Note to Students */}
      {noteToStudents && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="p-6 md:p-8 rounded-xl"
            style={{
              backgroundColor: 'var(--color-accent-light)',
              borderLeft: '3px solid var(--color-accent)'
            }}>
            <h2 className="text-xl font-semibold mb-3"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
              {noteToStudents.title || 'Note to Prospective Students'}
            </h2>
            <p className="leading-relaxed whitespace-pre-line"
              style={{ color: 'var(--color-text-secondary)' }}>
              {noteToStudents.body}
            </p>
          </div>
        </motion.section>
      )}

      {/* Current PhD */}
      {currentPhD.length > 0 && (
        <motion.section
          className="mb-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <SectionHeader icon={GraduationCap} title="Current PhD Students" iconColor="accent" />
          <div className="grid md:grid-cols-2 gap-5">
            {currentPhD.map((student, index) => (
              <StudentCard key={student.id} student={student} index={index} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Former PhD */}
      {formerPhD.length > 0 && (
        <motion.section
          className="mb-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <SectionHeader icon={Users} title="Former PhD Students" iconColor="muted" />
          <div className="grid md:grid-cols-2 gap-5">
            {formerPhD.map((student, index) => (
              <StudentCard key={student.id} student={student} index={index} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Current Masters */}
      {currentMasters.length > 0 && (
        <motion.section
          className="mb-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <SectionHeader icon={GraduationCap} title="Current Masters Students" iconColor="accent" />
          <div className="grid md:grid-cols-2 gap-5">
            {currentMasters.map((student, index) => (
              <StudentCard key={student.id} student={student} index={index} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Former Masters */}
      {formerMasters.length > 0 && (
        <motion.section
          className="mb-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <SectionHeader icon={Users} title="Former Masters Students" iconColor="muted" />
          <div className="grid md:grid-cols-2 gap-5">
            {formerMasters.map((student, index) => (
              <StudentCard key={student.id} student={student} index={index} />
            ))}
          </div>
        </motion.section>
      )}

      {students.length === 0 && (
        <div className="text-center py-20" style={{ color: 'var(--color-text-muted)' }}>
          <Users className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p>No students added yet.</p>
        </div>
      )}
    </div>
  );
}