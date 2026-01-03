import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Users, ExternalLink, GraduationCap } from 'lucide-react';

export default function Students() {
  const { data: students = [] } = useQuery({
    queryKey: ['students'],
    queryFn: () => base44.entities.Student.list()
  });

  const { data: contents = [] } = useQuery({
    queryKey: ['contents'],
    queryFn: () => base44.entities.Content.list()
  });

  const noteToStudents = contents.find(c => c.key === 'note_to_students');

  const currentPhD = students.filter(s => s.status === 'current' && s.degree === 'phd');
  const formerPhD = students.filter(s => s.status === 'former' && s.degree === 'phd');
  const currentMasters = students.filter(s => s.status === 'current' && s.degree === 'masters');
  const formerMasters = students.filter(s => s.status === 'former' && s.degree === 'masters');

  const StudentCard = ({ student, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {student.website_url ? (
              <a
                href={student.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-2"
              >
                {student.name}
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              student.name
            )}
          </h3>
          {student.program && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {student.program}, {student.institution}
            </p>
          )}
        </div>
        
        {student.status === 'current' && student.start_year && (
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded-full">
            Started {student.start_year}
          </span>
        )}
      </div>

      <div className="space-y-2 text-sm">
        {student.background && (
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Background:</span> {student.background}
          </p>
        )}
        
        {student.research_interests && (
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Research Interests:</span> {student.research_interests}
          </p>
        )}
        
        {student.thesis_title && (
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Thesis:</span> {student.thesis_title}
          </p>
        )}
        
        {student.co_supervisors && (
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Co-supervisors:</span> {student.co_supervisors}
          </p>
        )}
        
        {student.graduation_year && (
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Graduated:</span> {student.graduation_year}
          </p>
        )}
        
        {student.first_position && (
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">First Position:</span> {student.first_position}
          </p>
        )}
        
        {student.current_position && (
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Current Position:</span> {student.current_position}
          </p>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
          Students
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Current and former graduate students
        </p>
      </div>

      {/* Note to Students */}
      {noteToStudents && (
        <section className="mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {noteToStudents.title || 'Note to Prospective Students'}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {noteToStudents.body}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Current PhD Students */}
      {currentPhD.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Current PhD Students
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {currentPhD.map((student, index) => (
              <StudentCard key={student.id} student={student} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Former PhD Students */}
      {formerPhD.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Users className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            Former PhD Students
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {formerPhD.map((student, index) => (
              <StudentCard key={student.id} student={student} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Current Masters Students */}
      {currentMasters.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Current Masters Students
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {currentMasters.map((student, index) => (
              <StudentCard key={student.id} student={student} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Former Masters Students */}
      {formerMasters.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Users className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            Former Masters Students
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {formerMasters.map((student, index) => (
              <StudentCard key={student.id} student={student} index={index} />
            ))}
          </div>
        </section>
      )}

      {students.length === 0 && (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No students added yet.</p>
        </div>
      )}
    </div>
  );
}