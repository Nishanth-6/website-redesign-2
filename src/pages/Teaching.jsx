import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';

export default function Teaching() {
  const { data: courses = [] } = useQuery({
    queryKey: ['courses'],
    queryFn: () => base44.entities.Course.list()
  });

  const groupedCourses = courses.reduce((acc, course) => {
    const level = course.level || 'other';
    if (!acc[level]) acc[level] = [];
    acc[level].push(course);
    return acc;
  }, {});

  const levelLabels = {
    phd: 'PhD Courses',
    mba: 'MBA Courses',
    masters: 'Masters Courses',
    undergraduate: 'Undergraduate Courses',
    other: 'Other Courses'
  };

  const levelOrder = ['phd', 'mba', 'masters', 'undergraduate', 'other'];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
          Teaching
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Courses taught across various programs
        </p>
      </div>

      {levelOrder.map((level) => {
        const levelCourses = groupedCourses[level];
        if (!levelCourses) return null;

        return (
          <section key={level} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              {levelLabels[level]}
            </h2>
            
            <div className="space-y-4">
              {levelCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {course.name}
                        </h3>
                        {course.code && (
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            ({course.code})
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {course.institution}
                      </p>
                      
                      {course.semesters && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {course.semesters}
                        </p>
                      )}
                      
                      {course.description && (
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {course.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}

      {courses.length === 0 && (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No courses added yet.</p>
        </div>
      )}
    </div>
  );
}