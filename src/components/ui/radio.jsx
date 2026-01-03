import React from 'react';

export function RadioGroup({ children, value, onValueChange }) {
  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { currentValue: value, onValueChange })
      )}
    </div>
  );
}

export function RadioGroupItem({ value, currentValue, onValueChange, id, className = '' }) {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      checked={currentValue === value}
      onChange={() => onValueChange(value)}
      className={`w-4 h-4 cursor-pointer accent-blue-600 ${className}`}
    />
  );
}