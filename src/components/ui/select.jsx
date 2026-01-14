import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const SelectContext = createContext();

export function Select({ children, onValueChange, defaultValue, value: controlledValue }) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
  const [isOpen, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const containerRef = useRef(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (newValue, text) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    setDisplayText(text);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <SelectContext.Provider value={{ value, onValueChange: handleChange, isOpen, setIsOpen, displayText }}>
      <div ref={containerRef} className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children, className = '', placeholder = 'Select...' }) {
  const context = useContext(SelectContext);

  return (
    <button
      type="button"
      onClick={() => context?.setIsOpen(!context?.isOpen)}
      className={`
        w-full px-4 py-2.5 
        flex items-center justify-between gap-2
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700 
        rounded-lg 
        text-left
        text-gray-900 dark:text-white 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition-colors duration-200
        ${className}
      `}
    >
      <span className={!context?.displayText ? 'text-gray-400 dark:text-gray-500' : ''}>
        {context?.displayText || placeholder}
      </span>
      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${context?.isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
}

export function SelectValue({ placeholder }) {
  const context = useContext(SelectContext);
  return <span>{context?.displayText || placeholder}</span>;
}

export function SelectContent({ children, className = '' }) {
  const context = useContext(SelectContext);

  if (!context?.isOpen) return null;

  return (
    <div className={`
      absolute z-50 w-full mt-1
      bg-white dark:bg-gray-800 
      border border-gray-200 dark:border-gray-700 
      rounded-lg shadow-lg
      py-1 max-h-60 overflow-auto
      animate-in fade-in-0 zoom-in-95 duration-100
      ${className}
    `}>
      {children}
    </div>
  );
}

export function SelectItem({ children, value }) {
  const context = useContext(SelectContext);
  const isSelected = context?.value === value;

  return (
    <button
      type="button"
      onClick={() => context?.onValueChange(value, children)}
      className={`
        w-full px-4 py-2.5 text-left text-sm
        flex items-center justify-between
        transition-colors
        ${isSelected
          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }
      `}
    >
      {children}
      {isSelected && <Check className="w-4 h-4" />}
    </button>
  );
}