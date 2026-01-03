import React from 'react';
import { X } from 'lucide-react';

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
}

export function DialogTrigger({ asChild, children, onClick }) {
  return <div onClick={onClick}>{children}</div>;
}

export function DialogContent({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

export function DialogHeader({ children, className = '' }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function DialogTitle({ children, className = '' }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

export function DialogClose({ onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${className}`}
    >
      <X className="w-5 h-5" />
    </button>
  );
}