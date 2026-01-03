import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

export function Alert({ children, variant = 'default', className = '' }) {
  const baseStyles = 'rounded-lg p-4 flex gap-3';
  const variants = {
    default: 'bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700',
    destructive: 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700',
    success: 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}

export function AlertTitle({ children, className = '' }) {
  return <h3 className={`font-semibold ${className}`}>{children}</h3>;
}

export function AlertDescription({ children, className = '' }) {
  return <p className={`text-sm ${className}`}>{children}</p>;
}