import React from 'react';

export function Checkbox({ checked, onCheckedChange, className = '', ...props }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className={`w-4 h-4 rounded border-gray-300 cursor-pointer accent-blue-600 ${className}`}
      {...props}
    />
  );
}