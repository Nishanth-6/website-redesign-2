import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Calendar, MapPin } from 'lucide-react';

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
      <div className="mb-16 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Teaching
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
          Overview of courses taught across PhD, MBA, and Undergraduate programs.
        </p>
      </div>

      {levelOrder.map((level) => {
        const levelCourses = groupedCourses[level];
        if (!levelCourses) return null;

        return (
          <section key={level} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <GraduationCap className="w-6 h-6" />
              </span>
              {levelLabels[level]}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {levelCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <BookOpen className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </div>
                    {course.code && (
                      <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full">
                        {course.code}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                    {course.name}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span>{course.institution}</span>
                    </div>
                    {course.semesters && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>{course.semesters}</span>
                      </div>
                    )}
                  </div>
                  
                  {course.description && (
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {course.description}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}

      {courses.length === 0 && (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">No courses available.</p>
        </div>
      )}
    </div>
  );
}