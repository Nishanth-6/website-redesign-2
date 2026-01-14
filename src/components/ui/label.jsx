import React from 'react';

export function Label({ children, className = '', required = false, ...props }) {
  return (
    <label
      className={`
        block text-sm font-medium 
        text-gray-700 dark:text-gray-300 
        mb-1.5
        ${className}
      `}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}