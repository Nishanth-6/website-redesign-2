import React, { useState, createContext, useContext } from 'react';

const TabsContext = createContext();

export function Tabs({ children, defaultValue, value: controlledValue, onValueChange, className = '' }) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (newValue) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleChange }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-1 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ children, value, className = '' }) {
  const context = useContext(TabsContext);
  const isActive = context?.value === value;

  return (
    <button
      type="button"
      onClick={() => context?.onValueChange(value)}
      className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
          ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700/50'
        } ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, className = '' }) {
  const context = useContext(TabsContext);
  if (context?.value !== value) return null;
  return <div className={className}>{children}</div>;
}