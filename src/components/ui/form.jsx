import React from 'react';

export function Form({ children, onSubmit, className = '' }) {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
}

export function FormField({ label, error, children, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>}
      {children}
      {error && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}