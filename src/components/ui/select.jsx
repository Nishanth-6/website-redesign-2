import React, { useState } from 'react';

export function Select({ children, onValueChange, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  
  const handleChange = (newValue) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { value, onValueChange: handleChange })
      )}
    </div>
  );
}

export function SelectTrigger({ children, value, className = '' }) {
  return (
    <button className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-left bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white ${className}`}>
      {children}
    </button>
  );
}

export function SelectValue({ placeholder }) {
  return <span className="text-gray-600 dark:text-gray-400">{placeholder}</span>;
}

export function SelectContent({ children, value, onValueChange }) {
  return (
    <div className="border border-gray-300 rounded-lg mt-1 bg-white dark:bg-gray-700 dark:border-gray-600 shadow-lg">
      {children}
    </div>
  );
}

export function SelectItem({ children, value, currentValue, onValueChange }) {
  return (
    <button
      onClick={() => onValueChange(value)}
      className={`w-full px-3 py-2 text-left hover:bg-blue-50 dark:hover:bg-gray-600 ${
        currentValue === value ? 'bg-blue-100 dark:bg-gray-600 font-medium' : ''
      }`}
    >
      {children}
    </button>
  );
}