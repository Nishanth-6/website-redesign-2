import React from 'react';

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${className}`}
      {...props}
    />
  );
}