import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Download, FileText, Loader2, AlertCircle } from 'lucide-react';
import { createPageUrl } from '../utils';
import { Link } from 'react-router-dom';

export default function CV() {
  const { data: contents = [], isLoading } = useQuery({
    queryKey: ['contents'],
    queryFn: () => base44.entities.Content.list()
  });

  // Looks for 'cv' or 'CV'
  const cv = contents.find(c => c.key.toLowerCase() === 'cv');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 h-[calc(100vh-100px)] flex flex-col">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Curriculum Vitae</h1>
        </div>
        
        {/* DOWNLOAD BUTTON */}
        {cv?.file_url && (
          <a
            href={cv.file_url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        )}
      </div>

      {/* 5. PDF EMBED SECTION (Handshake Style) */}
      <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden relative">
        {cv?.file_url ? (
          // Using <object> is more robust for PDF embedding than iframe
          <object 
            data={cv.file_url} 
            type="application/pdf" 
            className="w-full h-full"
            aria-label="Curriculum Vitae PDF"
          >
            {/* FALLBACK if browser doesn't support embedding */}
            <div className="flex flex-col items-center justify-center h-full text-center p-10">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your browser doesn't support PDF viewing.
              </p>
              <a 
                href={cv.file_url} 
                className="text-blue-600 underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Click here to download the PDF instead.
              </a>
            </div>
          </object>
        ) : (
          // IF NO FILE
          <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center bg-gray-50 dark:bg-gray-800/50">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              CV Not Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              Please upload a PDF file in the Admin Panel with the key <strong>cv</strong>.
            </p>
            <Link 
              to={createPageUrl('CMS')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium text-sm"
            >
              Go to Admin Panel
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}