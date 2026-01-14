import React from 'react';
import { Download, FileText } from 'lucide-react';

export default function CV() {
  // FIX: This automatically adds '/website-redesign-2/' to the path
  const cvUrl = `${import.meta.env.BASE_URL}Selvaprabu_Nadarajah_CV.pdf`;

  return (
    <section className="py-12 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-[calc(100vh-240px)] flex flex-col">

        {/* HEADER SECTION (Matched Teaching Page Style) */}
        <div className="text-center mb-12 shrink-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white inline-block mb-4">
            Curriculum Vitae
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
            View and download my professional history.
          </p>

          <div className="mt-6">
            <a
              href={cvUrl}
              download="Selvaprabu_Nadarajah_CV.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all font-bold text-sm"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </div>
        </div>

        {/* PDF VIEW SECTION */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden relative">
          <iframe
            src={cvUrl}
            className="w-full h-full border-none"
            title="Curriculum Vitae"
          />
        </div>

      </div>
    </section>
  );
}