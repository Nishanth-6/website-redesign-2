import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CV() {
  const { data: contents = [] } = useQuery({
    queryKey: ['contents'],
    queryFn: () => base44.entities.Content.list()
  });

  const cvContent = contents.find(c => c.key === 'cv');

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
          Curriculum Vitae
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Academic credentials and professional experience
        </p>
      </div>

      {cvContent?.metadata?.pdf_url ? (
        <div className="space-y-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8 text-center">
            <FileText className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Download CV
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              View my complete curriculum vitae as a PDF document
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href={cvContent.metadata.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 gap-2">
                  <Download className="w-5 h-5" />
                  Download PDF
                </Button>
              </a>
              <a
                href={cvContent.metadata.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="gap-2">
                  <ExternalLink className="w-5 h-5" />
                  View in Browser
                </Button>
              </a>
            </div>
          </div>

          {cvContent.body && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {cvContent.body}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-sm border border-gray-200 dark:border-gray-700">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            CV not available yet. Please check back later or contact me directly.
          </p>
          <a href="mailto:selvan@uic.edu">
            <Button variant="outline">
              Contact via Email
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}