import React, { useState } from 'react';

export function Tabs({ children, defaultValue, onValueChange }) {
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

export function TabsList({ children, className = '' }) {
  return (
    <div className={`flex border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ children, value, currentValue, onValueChange, className = '' }) {
  return (
    <button
      onClick={() => onValueChange(value)}
      className={`px-4 py-3 font-medium border-b-2 transition-colors ${
        currentValue === value
          ? 'border-blue-600 text-blue-600 dark:text-blue-400'
          : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, currentValue }) {
  if (currentValue !== value) return null;
  return <>{children}</>;
}