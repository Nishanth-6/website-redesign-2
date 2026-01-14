import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Building } from 'lucide-react';
import { SkeletonCourse } from '../components/SkeletonLoader';

export default function Teaching() {
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => base44.entities.Course.list()
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="text-center mb-16">
          <div className="skeleton h-12 w-48 mx-auto rounded mb-4" />
          <div className="skeleton h-6 w-96 max-w-full mx-auto rounded" />
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          <SkeletonCourse />
          <SkeletonCourse />
          <SkeletonCourse />
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* Title with NO underline */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white inline-block mb-4">
            Teaching
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6 text-lg">
            I teach courses in optimization, operations management, and decision sciences
            at both undergraduate and graduate levels.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {courses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                // Card Elevated Style
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {course.name || course.course}
                        </h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          {course.code}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {course.institution}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {course.semesters || course.years}
                      </div>
                    </div>
                  </div>

                  {/* Badge Style */}
                  <span className="self-start px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">
                    {course.level}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {courses.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No courses added yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}