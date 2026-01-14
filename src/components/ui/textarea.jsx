import React from 'react';

export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`
        w-full px-4 py-3 
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700 
        rounded-lg 
        text-gray-900 dark:text-white 
        placeholder:text-gray-400 dark:placeholder:text-gray-500
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-900
        transition-colors duration-200
        resize-y min-h-[100px]
        ${className}
      `}
      {...props}
    />
  );
}