import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Download, FileText, Loader2 } from 'lucide-react';

export default function CV() {
  const { data: contents = [], isLoading } = useQuery({
    queryKey: ['contents'],
    queryFn: () => base44.entities.Content.list()
  });

  const cv = contents.find(c => c.key.toLowerCase() === 'cv');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Curriculum Vitae</h1>
        <p className="text-gray-600 dark:text-gray-400">View and download my professional history.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
          <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Academic CV</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
          Download the full curriculum vitae including publications and research history.
        </p>

        {cv?.image_url || cv?.file_url ? (
          <a
            href={cv.image_url || cv.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-500/20 transition-all font-bold"
          >
            <Download className="w-5 h-5" />
            Download CV (PDF)
          </a>
        ) : (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-xl text-sm italic">
            CV file not found. Please upload it in the Admin panel with the key "cv".
          </div>
        )}
      </div>
    </div>
  );
}